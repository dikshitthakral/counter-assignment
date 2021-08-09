import { StatusCode } from "./http.enum";
import { ErrorCode } from "./error";

export interface ISuccess {
    message?: string;
    statusCode?: StatusCode,
    data: any
}
export interface IErrorDetail {
    message: string;
    key: string;
    code: string;
}

export interface IError {
    errorCode?: ErrorCode,
    message?: string,
    statusCode?: StatusCode,
    errors?: IErrorDetail[]
}

export interface IErrorListDetail {
    message: string;
    statusCode: StatusCode;
}

export interface IErrorList {
    [key: string]: IErrorListDetail;
}

export type AggregationArray = Record<string, any>[];