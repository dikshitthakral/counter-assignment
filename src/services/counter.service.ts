import { AppError } from '../common/appError';
import { ErrorCode } from '../common/error';
import CounterRepository from '../repositories/counter.repository';
import { ICounterRequestBody, ICounterResponseBody, ICounter } from '../models/counter';

class CounterService {
    counterRepository: CounterRepository;
    constructor() {
        this.counterRepository = new CounterRepository();
    }

    createCounter = async (key: string, counts: number[]): Promise<ICounter> => {
        try {
            return this.counterRepository.createCounters(key, counts);
        } catch (err) {
            console.log(`Logging Error : ${err && err.message}`);
            throw err;
        }
    }

    fetchCounters = async (request: ICounterRequestBody): Promise<ICounterResponseBody[]> => {
        try {
            return this.counterRepository.fetchBySearchCriteria(request);
        } catch (err) {
            console.log(`Logging Error : ${err && err.message}`);
            throw new AppError(ErrorCode.COUNTER_NOT_FOUND);
        }
    }
}

export default CounterService;