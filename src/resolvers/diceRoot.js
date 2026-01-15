class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }
    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }
    roll({ numRolls }) {
        return Array.from({ length: numRolls }, () => this.rollOnce());
    }
}

export const diceRoot = {
    getDie: ({ numSides }) => new RandomDie(numSides || 6)
};
