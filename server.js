import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';

const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }    
`);

const root = {
    quoteOfTheDay() {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random() {
        return Math.random();
    },
    rollThreeDice() {
        return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
    }
};

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
