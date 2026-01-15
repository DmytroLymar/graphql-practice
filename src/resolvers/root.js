class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

const fakeDatabase = {};

export const root = {
    getMessage: ({ id }) => {
        return fakeDatabase[id];
    },
    getMessages: () => {
        return Object.values(fakeDatabase);
    },
    createMessage: ({ input }) => {
        const id = String(Object.keys(fakeDatabase).length + 1);
        const message = new Message(id, input);
        fakeDatabase[id] = message;
        return message;
    },
    updateMessage: ({ id, input }) => {
        const message = fakeDatabase[id];
        Object.assign(message, input);
        return message;
    }
};
