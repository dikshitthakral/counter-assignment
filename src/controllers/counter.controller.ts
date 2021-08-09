import responseWrapper from '../responseWrapper';
import { Request, Response } from 'express';
import CounterService from '../services/counter.service';
import { ISuccess } from '../common/common.type';
import { StatusCode } from '../common/http.enum';

class CounterController {
    counterService: CounterService;
    constructor() {
        this.counterService = new CounterService();
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const counter = await this.counterService.createCounter(req.body.key, req.body.counts);
            const response: ISuccess = {
                statusCode: StatusCode.Created,
                data: counter
            }
            return responseWrapper.success(res, response);
        } catch (err) {
            return responseWrapper.error(res, err);
        }
    };

    fetchCountersByCriteria = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await this.counterService.fetchCounters(req.body);
            let response: ISuccess;
            if (!result) {
                response = {
                    statusCode: StatusCode.No_Content,
                    data: result
                }
            }
            else {
                response = {
                    statusCode: StatusCode.OK,
                    data: result
                }
            }
            return responseWrapper.success(res, response);
        } catch (err) {
            return responseWrapper.error(res, err);
        }
    };
}

export default CounterController;