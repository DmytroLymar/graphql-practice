import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';

const schema = buildSchema(`type Query { ip: String } `);

function loggingMiddleware(req, _res, next) {
    console.log('ip:', req.ip);
    next();
}

const root = {
    ip(_args, context) {
        return context.ip;
    }
};

const app = express();
app.use(loggingMiddleware);
app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: root,
        context: (req) => ({
            ip: req.raw.ip
        })
    })
);

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
