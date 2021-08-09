import { Response } from 'express';
import { StatusCode } from './common/http.enum';
import { ISuccess } from './common/common.type';
import { ErrorList, ErrorCode } from './common/error';
import { AppError } from './common/appError';

const success = (res: Response, result: ISuccess): Response => {
    const statusCode = result.statusCode || StatusCode.OK;
    return res.status(statusCode).json({
        code: 0,
        message: result.message || 'SUCCESS',
        records: result.data
    })
}

const error = (res: Response, errorRes: any): Response => {
    if (errorRes instanceof AppError) {
        const errors = errorRes.getErrors(ErrorList)
        return res.status(errors.statusCode).json({
            message: errors.message,
            code: errorRes.errorCode,
            records: [],
            errors: errors.errors
        });
    }
    const defaultError = ErrorList[ErrorCode.INTERNAL_SERVER_ERROR];
    const statusCode = errorRes.statusCode || defaultError.statusCode;
    return res.status(statusCode).json({
        code: errorRes.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
        message: errorRes.message || defaultError.message,
        records: [],
        errors: errorRes.errors
    });
}

const responseWrapper = {
    success,
    error
}

export default responseWrapper;