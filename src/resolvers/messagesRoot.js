const fakeDatabase = {};

export const messagesRoot = {
    getMessage: ({ id }) => fakeDatabase[id] || null,
    getMessages: () => Object.values(fakeDatabase),

    createMessage: ({ input }) => {
        const id = String(Object.keys(fakeDatabase).length + 1);
        const message = { id, ...input };
        fakeDatabase[id] = message;
        return message;
    },

    updateMessage: ({ id, input }) => {
        const message = fakeDatabase[id];
        if (!message) throw new Error('Message not found');
        Object.assign(message, input);
        return message;
    }
};
