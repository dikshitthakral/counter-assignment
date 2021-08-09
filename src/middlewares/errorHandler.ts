import { Request, Response, NextFunction } from 'express';
import { Joi, CelebrateError } from 'celebrate';
import { ErrorList, ErrorCode } from '../common/error';
import responseWrapper from '../responseWrapper';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let errorResponse;
    if (err instanceof CelebrateError) {
        errorResponse = {
            message: err.details.get("body").toString() || ErrorList[ErrorCode.API_VALIDATION_ERROR].message,
            statusCode: ErrorList[ErrorCode.API_VALIDATION_ERROR].statusCode,
            errorCode: ErrorCode.API_VALIDATION_ERROR,
            errors: err.details.get("body")
        }
    } else {
        errorResponse = err;
    }
    responseWrapper.error(res, errorResponse);
    next();
}

export {
    errorHandler
};