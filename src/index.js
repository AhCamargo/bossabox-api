require('./services/mongodb');

import Hapi from '@hapi/hapi';
import Routes from './routes/routes';

const app = Hapi.server({
    port: 7000,
    host: 'localhost'
});

async function main() {  

    app.route(Routes);

    await app.start();
    console.log('Server running on %s', app.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

main();