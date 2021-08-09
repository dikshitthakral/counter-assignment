import mongoose, { Schema, Model, Document } from 'mongoose';
import { ICounter } from '../models/counter';

const counterSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    counts: {
        type: [{ type: Number }],
        required: true
    }
}, { timestamps: true }
);

export const collectionName = 'counters';
export type CounterDocument = ICounter & Document;
export const CounterModel: Model<CounterDocument> = mongoose.model(
    collectionName,
    counterSchema
);