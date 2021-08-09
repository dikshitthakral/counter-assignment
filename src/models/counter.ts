export interface ICounter {
    key: string;
    createdAt: Date;
    counts: number[];
}

export interface ICounterRequestBody {
    startDate: Date;
    endDate: Date;
    minCount: Number;
    maxCount: Number;
}

export interface ICounterResponseBody {
    key: String;
    createdAt: Date;
    totalCount: Number;
}