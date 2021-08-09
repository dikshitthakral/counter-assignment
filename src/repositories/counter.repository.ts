
import { CounterDocument, CounterModel } from '../schema/counter.schema';
import { ICounter, ICounterRequestBody, ICounterResponseBody } from '../models/counter';
import { getCountersAggregation } from './counter.aggregation';
import { isEmpty } from 'lodash';

class CounterRepository {
    convertCounterDocumentToObject = (document: CounterDocument) =>
        document.toObject({
            getters: true,
        }) as ICounter;

    createCounters = async (key: string, counts: number[]): Promise<ICounter> => {
        const newCounter = new CounterModel({
            key,
            counts
        });

        await newCounter.save();
        return this.convertCounterDocumentToObject(newCounter);
    }

    fetchBySearchCriteria = async (request: ICounterRequestBody): Promise<ICounterResponseBody[]> => {
        const aggregationArray = getCountersAggregation(request);
        console.log(`aggregationArray: ${JSON.stringify(aggregationArray)}`);
        const counters = await CounterModel.aggregate(aggregationArray).exec();
        if (isEmpty(counters)) {
            return [];
        }
        return counters;
    }
}

export default CounterRepository;
