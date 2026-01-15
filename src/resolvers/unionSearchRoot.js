export const unionSearchRoot = {
    search: () => [
        { __typename: 'Book', id: 'b1', title: 'GraphQL Guide', isbn: '978-123' },
        { __typename: 'Author', id: 'a1', name: 'Alice', bio: 'Writes about APIs' },
        { __typename: 'Publisher', id: 'p1', name: 'TechBooks', catalogSize: 120 }
    ],

    SearchResult: {
        __resolveType(value) {
            if (value.isbn) return 'Book';
            if (value.bio) return 'Author';
            if (value.catalogSize) return 'Publisher';
            return null;
        }
    }
};
