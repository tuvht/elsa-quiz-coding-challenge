import { connect } from 'mongoose';
import { MONGODB_URI } from '../../api/configs/database.js';

// connect to db
(async () => {
    try {
        const db = await connect(MONGODB_URI);
        console.log('MongoDB connected to', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();
