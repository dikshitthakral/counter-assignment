import { ICounterRequestBody } from "../models/counter";
import { AggregationArray } from "../common/common.type";


const addTotalCountField = () => ({ $addFields: { totalCount: { $sum: "$counts" }, } });

const createMatch = (
    obj: Record<string, any>
): { [key: string]: any } => {
    const match = {
        $match: obj
    };
    return match;
};

const createRangeCondition = (low: any, high: any) => {
    return { $gte: low, $lte: high };
}

const fetchCondition = (counterArguments: ICounterRequestBody): Record<string, any> => {
    const condition: Record<string, any> = {};
    if (counterArguments.startDate && counterArguments.endDate) {
        condition['createdAt'] = createRangeCondition(new Date(counterArguments.startDate), new Date(counterArguments.endDate));
    }
    if (counterArguments.minCount >= 0 && counterArguments.maxCount > 0) {
        condition['totalCount'] = createRangeCondition(counterArguments.minCount, counterArguments.maxCount);
    }
    return condition;
}

const createProjection = () => ({ $project: { totalCount: 1, key: 1, createdAt: 1, _id: 0 } });

export const getCountersAggregation = (filterArgs: ICounterRequestBody): AggregationArray => {
    const aggregationArray = [
        addTotalCountField(),
        createMatch(fetchCondition(filterArgs)),
        createProjection()
    ];
    return aggregationArray;
};