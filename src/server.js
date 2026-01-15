import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

import { root } from './resolvers/root.js';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync('src/schema/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
});

const app = express();

app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: root
    })
);

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
