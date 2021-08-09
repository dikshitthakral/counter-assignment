import { Joi, celebrate } from 'celebrate';

class CounterValidator {
    startDate = Joi.date();
    endDate = Joi.date();
    minCount = Joi.number();
    maxCount = Joi.number();

    fetchCountersValidator = celebrate({
        body: Joi.object().keys({
            startDate: this.startDate.required(),
            endDate: this.endDate.ruleset.greater(Joi.ref('startDate'))
                .rule({ message: 'endDate must be greater than startDate' })
                .required(),
            minCount: this.minCount.required(),
            maxCount: this.maxCount.ruleset.greater(Joi.ref('minCount'))
                .rule({ message: 'maxCount must be greater than minCount' })
                .required()
        }),
    });
}

export default CounterValidator;