const http = require('http');
const url = require('url');

const routes = require('./routes');

const server = http.createServer((request, response) => {
    const parseUrl = url.parse(request.url, true);
    console.log(`Request method: ${request.method} | Endpoint: ${parseUrl.pathname}`);

    const route = routes.find((routeObj) => (
        routeObj.endpoint === parseUrl.pathname && routeObj.method === request.method
    ));

    if (route) {
        request.query = parseUrl.query;
        
        route.handler(request, response);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(`Cannot ${request.method} ${parseUrl.pathname}`);
    }
});

server.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));