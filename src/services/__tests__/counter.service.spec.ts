import CounterRepository from '../../repositories/counter.repository';
import CounterService from '../counter.service';

const createCounterFn = jest.fn();
const fetchBySearchCriteriaFn = jest.fn();
jest.mock('../../repositories/counter.repository', () => {
    class CounterRepository {
        createCounters: any = createCounterFn;
        fetchBySearchCriteria: any = fetchBySearchCriteriaFn;
    }
    return CounterRepository;
});

describe('counter service', () => {
    let counterService: CounterService;
    beforeAll(async () => {
        counterService = new CounterService();
    });

    afterEach(async () => {
        expect.hasAssertions();
        jest.resetAllMocks();
    });
    describe('create method', () => {
        it('should create Counter successfully', async () => {
            // Given
            let counterModel = {
                "key": "TAKwGc6Jr4i8Z492",
                "counts": [2000, 400, 800]
            };
            (createCounterFn as jest.Mock).mockResolvedValueOnce({
                ...counterModel,
                createdAt: new Date()
            })
            // When
            const response = await counterService.createCounter(
                counterModel.key,
                counterModel.counts
            );

            // Then
            expect(response).toBeDefined();
            expect(response).toEqual(
                expect.objectContaining({
                    key: 'TAKwGc6Jr4i8Z492',
                    counts: [2000, 400, 800]
                })
            );
        });

        it('should throw error when creating counter', async () => {
            // Given
            let counterModel = {
                "key": "TAKwGc6Jr4i8Z492",
                "counts": [2000, 400, 800]
            };
            (createCounterFn as jest.Mock).mockRejectedValueOnce('Error Occured.')
            // When
            let error;
            try {
                await counterService.createCounter(
                    counterModel.key,
                    counterModel.counts
                );
            } catch (err) {
                error = err;
            }


            // Then
            expect(error).toBeDefined();
            expect(error).toEqual('Error Occured.');
        });
    });

    describe('fetchCounters method', () => {
        it('should fetch Counter by criteria successfully', async () => {
            // Given
            let counterModel = {
                "key": "TAKwGc6Jr4i8Z492",
                "totalCount": 2800,
                "createdAt": new Date()
            };
            (fetchBySearchCriteriaFn as jest.Mock).mockResolvedValueOnce({
                ...counterModel,
                createdAt: new Date()
            })
            // When
            const pastDate = new Date((new Date()).setDate((new Date()).getDate() - 5));
            const futureDate = new Date((new Date()).setDate((new Date()).getDate() + 5));
            const response = await counterService.fetchCounters(
                {
                    "startDate": pastDate,
                    "endDate": futureDate,
                    "minCount": 2000,
                    "maxCount": 3000
                }
            );

            // Then
            expect(response).toBeDefined();
            expect(response).toEqual(
                expect.objectContaining({
                    key: 'TAKwGc6Jr4i8Z492',
                    totalCount: 2800,
                })
            );
        });

        it('should throw error when fetching counter', async () => {
            // Given
            (fetchBySearchCriteriaFn as jest.Mock).mockRejectedValueOnce('Error Occured.')
            // When
            const pastDate = new Date((new Date()).setDate((new Date()).getDate() - 5));
            const futureDate = new Date((new Date()).setDate((new Date()).getDate() + 5));
            let error;
            try {
                await counterService.fetchCounters(
                    {
                        "startDate": pastDate,
                        "endDate": futureDate,
                        "minCount": 2000,
                        "maxCount": 3000
                    }
                );
            } catch (err) {
                error = err;
            }
            // Then
            expect(error).toBeDefined();
            expect(error).toEqual('Error Occured.');
        });
    });
});
