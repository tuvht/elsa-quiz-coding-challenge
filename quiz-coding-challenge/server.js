import app from './app.js';
import './api/utils/init.mongo.js';

app.listen(process.env.PORT, () => {
    console.log('Server is running with url ' + process.env.HOST + ':' + process.env.PORT);
});