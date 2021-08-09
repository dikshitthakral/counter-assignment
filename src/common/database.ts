import { config } from "../config/dbConfig";
import { connection, connect } from 'mongoose';

export const connectMongo = () =>
    new Promise<void>((resolve, reject) => {

        const dbUri = config.mongoURI;

        connection.once('open', () => resolve());

        connection.on('error', err => {
            console.log('error while connecting to mongodb', err);
            reject(err);
        });

        connect(dbUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    });
