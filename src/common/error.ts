import { IErrorList } from './common.type';
import { StatusCode } from './http.enum';

enum ErrorCode {
    UNAUTHORIZED = 'UNAUTHORIZED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    COUNTER_NOT_FOUND = 'COUNTER_NOT_FOUND',
    API_VALIDATION_ERROR = 'API_VALIDATION_ERROR',
}

const ErrorList: IErrorList = {
    [ErrorCode.UNAUTHORIZED]: {
        statusCode: StatusCode.Unauthorized,
        message: 'User do not have permission to perform action'
    },
    [ErrorCode.INTERNAL_SERVER_ERROR]: {
        statusCode: StatusCode.Internal_Server_Error,
        message: 'Error occured while performing a particular action.'
    },
    [ErrorCode.API_VALIDATION_ERROR]: {
        statusCode: StatusCode.Bad_Request,
        message: 'Error while validating input payload'
    },
};
const MONGO_ERROR = 'MongoError';

enum MONGO_ERROR_CODE {
    DUPLICATED_KEY = 11000
}

export { ErrorCode, ErrorList, MONGO_ERROR, MONGO_ERROR_CODE };