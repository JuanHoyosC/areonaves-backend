const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('bd.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log('Proceso corriendo en el purto', port)
});