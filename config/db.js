import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Read configuration values from the .env file
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'user_auth_db', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASSWORD || '1234', 
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: console.log,
        define: {
            timestamps: false 
        },
        dialectOptions: {
            // Cloud providers require safe SSL connections. 
            // If running on localhost, SSL is automatically ignored.
            ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' 
                ? { rejectUnauthorized: false } 
                : false
        }
    }
);

export default sequelize;
