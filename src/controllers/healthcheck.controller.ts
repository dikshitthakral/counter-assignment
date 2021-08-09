import responseWrapper from '../responseWrapper';
import { Request, Response } from 'express';
import { StatusCode } from '../common/http.enum';
import { ISuccess } from '../common/common.type';

class HealthCheckController {
    constructor() {
    }
    ping = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: ISuccess = {
                statusCode: StatusCode.OK,
                data: 'Service Up!'
            }
            return responseWrapper.success(res, response);
        } catch (err) {
            return responseWrapper.error(res, err);
        }
    };
}

export default HealthCheckController;