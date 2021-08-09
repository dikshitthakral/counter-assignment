import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CounterModel } from '../../schema/counter.schema';
import CounterRepository from '../counter.repository';
import { getCounterData } from '../__mocks__/counter.data';

jest.mock('mongoose', () => {
    const mongoose = jest.requireActual('mongoose');
    return new mongoose.Mongoose(); // new mongoose instance and connection for each test
});

describe('counter repository', () => {
    let mongod: MongoMemoryServer;
    let counterRepository: CounterRepository;

    beforeAll(async () => {
        mongod = new MongoMemoryServer();
        counterRepository = new CounterRepository();
        const mongoDbUri = await mongod.getUri();
        await mongoose.connect(mongoDbUri, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    });

    afterEach(async () => {
        expect.hasAssertions();
        await CounterModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });
    describe('create method', () => {
        it('should create counter record successfully with counts', async () => {
            // Given
            let counterModel = {
                "key": "TAKwGc6Jr4i8Z492",
                "counts": [2000, 400, 800]
            };

            // When
            const response = await counterRepository.createCounters(
                counterModel.key,
                counterModel.counts
            );

            // Then
            expect(response.key).toBeDefined();
            expect(response.counts).toEqual(
                counterModel.counts
            );
        });
    });

    describe('fetchBySearchCriteria', () => {
        it('should fetch records by filtering', async () => {
            // Given
            const counterModel = getCounterData();

            await counterRepository.createCounters(counterModel.key, counterModel.counts);
            await counterRepository.createCounters('TAKwGc6Jr4i8Z493', [2000, 400, 300]);
            await counterRepository.createCounters('TAKwGc6Jr4i8Z494', [2000, 400, 400]);
            const pastDate = new Date((new Date()).setDate((new Date()).getDate() - 5));
            const futureDate = new Date((new Date()).setDate((new Date()).getDate() + 5));
            // When
            const expected = await counterRepository.fetchBySearchCriteria(
                {
                    "startDate": pastDate,
                    "endDate": futureDate,
                    "minCount": 2700,
                    "maxCount": 3000
                }
            );
            // Then
            expect(expected).toBeDefined();
            expect(expected.length).toEqual(2);
            expect(expected).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    key: 'TAKwGc6Jr4i8Z493',
                    totalCount: 2700
                })
            ]));
            expect(expected).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    key: 'TAKwGc6Jr4i8Z494',
                    totalCount: 2800
                })
            ]))
        });

        it('should fetch empty array by filtering', async () => {
            // Given
            const counterModel = getCounterData();

            await counterRepository.createCounters(counterModel.key, counterModel.counts);
            await counterRepository.createCounters('TAKwGc6Jr4i8Z493', [2000, 400, 300]);
            await counterRepository.createCounters('TAKwGc6Jr4i8Z494', [2000, 400, 400]);
            const pastDate = new Date((new Date()).setDate((new Date()).getDate() - 5));
            const futureDate = new Date((new Date()).setDate((new Date()).getDate() + 5));
            // When
            const expected = await counterRepository.fetchBySearchCriteria(
                {
                    "startDate": pastDate,
                    "endDate": futureDate,
                    "minCount": 2000,
                    "maxCount": 2200
                }
            );
            // Then
            expect(expected).toBeDefined();
            expect(expected.length).toEqual(0);
        });
    });
});