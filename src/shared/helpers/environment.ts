import dotenv from 'dotenv';

const path = `${__dirname}/../../../.env`;

dotenv.config({ path });

export const { MONGO_DB_URL } = process.env;
export const { JWT_SECRET_TOKEN } = process.env;
export const { JWT_SECRET_REFRESH_TOKEN } = process.env;
