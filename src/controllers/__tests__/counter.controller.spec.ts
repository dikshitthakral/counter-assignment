import CounterService from '../../services/counter.service';
import CounterController from '../counter.controller';
import { interceptor } from '../__mocks__/counter.controller.data';
import { AppError } from '../../common/appError';
import { ErrorCode, ErrorList } from '../../common/error';

const createCounterFn = jest.fn();
const fetchCountersFn = jest.fn();
jest.mock('../../services/counter.service', () => {
    class CounterService {
        createCounter: any = createCounterFn;
        fetchCounters: any = fetchCountersFn;
    }
    return CounterService;
});

describe('counter controller', () => {
    let counterController: CounterController;
    beforeAll(async () => {
        counterController = new CounterController();
    });

    afterEach(async () => {
        expect.hasAssertions();
        jest.resetAllMocks();
    });

    describe('create controller', () => {
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
            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            // When
            const response = await counterController.create(
                req,
                res
            );

            // Then
            expect(response).toBeDefined();
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                code: 0,
                message: 'SUCCESS',
                records: {
                    "key": "TAKwGc6Jr4i8Z492",
                    "counts": [2000, 400, 800],
                    "createdAt": expect.anything()
                }
            });
        });

        it('should throw error when creating counter', async () => {
            // Given
            (createCounterFn as jest.Mock).mockRejectedValueOnce(new AppError(ErrorCode.INTERNAL_SERVER_ERROR))
            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            // When
            const response = await counterController.create(
                req,
                res
            );

            // Then
            expect(response).toBeDefined();
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                message: ErrorList[ErrorCode.INTERNAL_SERVER_ERROR].message,
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                records: [],
                errors: undefined
            });
        });
    });

    describe('fetchCountersByCriteria controller', () => {
        it('should fetchCountersByCriteria successfully', async () => {
            // Given
            let counterModel = {
                "key": "TAKwGc6Jr4i8Z492",
                "totalCount": 2800,
                "createdAt": new Date()
            };
            (fetchCountersFn as jest.Mock).mockResolvedValueOnce({
                ...counterModel,
                createdAt: new Date()
            })
            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            // When
            const response = await counterController.fetchCountersByCriteria(
                req,
                res
            );

            // Then
            expect(response).toBeDefined();
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                code: 0,
                message: 'SUCCESS',
                records: {
                    "key": "TAKwGc6Jr4i8Z492",
                    "totalCount": 2800,
                    "createdAt": expect.anything()
                }
            });
        });

        it('should throw error when fetching counter', async () => {
            // Given
            (fetchCountersFn as jest.Mock).mockRejectedValueOnce(new AppError(ErrorCode.INTERNAL_SERVER_ERROR))
            const req = interceptor.mockRequest();
            const res = interceptor.mockResponse();
            // When
            const response = await counterController.fetchCountersByCriteria(
                req,
                res
            );

            // Then
            expect(response).toBeDefined();
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                message: ErrorList[ErrorCode.INTERNAL_SERVER_ERROR].message,
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                records: [],
                errors: undefined
            });
        });
    });
});