import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'An ISO-8601 encoded UTC date string.',
    specifiedByURL: 'https://scalars.graphql.org/andimarek/date-time.html',

    serialize(value) {
        if (!(value instanceof Date)) {
            throw new TypeError('DateTime can only serialize Date instances');
        }
        return value.toISOString();
    },

    parseValue(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            throw new TypeError(`DateTime cannot represent an invalid date: ${value}`);
        }
        return date;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new TypeError(`DateTime can only parse string values, but got: ${ast.kind}`);
        }
        const date = new Date(ast.value);
        if (Number.isNaN(date.getTime())) {
            throw new TypeError(`DateTime cannot represent an invalid date: ${ast.value}`);
        }
        return date;
    }
});
