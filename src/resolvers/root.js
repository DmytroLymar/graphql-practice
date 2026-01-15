import { contentRoot } from './contentRoot.js';
import { diceRoot } from './diceRoot.js';
import { messagesRoot } from './messagesRoot.js';
import { paginationRoot } from './paginationRoot.js';
import { unionSearchRoot } from './unionSearchRoot.js';

export const root = {
    ...diceRoot,
    ...messagesRoot,
    ...contentRoot,
    ...unionSearchRoot,
    ...paginationRoot
};
