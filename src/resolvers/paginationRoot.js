// src/resolvers/usersRoot.js
const users = [
    { id: '1', name: 'Ada Lovelace' },
    { id: '2', name: 'Alan Turing' },
    { id: '3', name: 'Grace Hopper' },
    { id: '4', name: 'Katherine Johnson' },
    { id: '5', name: 'Edsger Dijkstra' },
    { id: '6', name: 'Donald Knuth' }
];

function encodeCursor(index) {
    return Buffer.from(`cursor:${index}`).toString('base64');
}

function decodeCursor(cursor) {
    try {
        const decoded = Buffer.from(cursor, 'base64').toString('utf8');
        const match = decoded.match(/^cursor:(\d+)$/);
        return match ? Number(match[1]) : null;
    } catch {
        return null;
    }
}

export const paginationRoot = {
    users: ({ first, after }) => {
        const limit = first ?? users.length;

        let startIndex = 0;

        if (after) {
            const decodedIndex = decodeCursor(after);
            if (Number.isFinite(decodedIndex)) {
                startIndex = decodedIndex + 1;
            } else {
                startIndex = 0;
            }
        }

        const slice = users.slice(startIndex, startIndex + limit);

        const edges = slice.map((user, i) => ({
            node: user,
            cursor: encodeCursor(startIndex + i)
        }));

        const startCursor = edges.length ? edges[0].cursor : null;
        const endCursor = edges.length ? edges[edges.length - 1].cursor : null;

        const hasNextPage = startIndex + slice.length < users.length;
        const hasPreviousPage = startIndex > 0;

        return {
            edges,
            pageInfo: {
                startCursor,
                endCursor,
                hasNextPage,
                hasPreviousPage
            }
        };
    }
};
