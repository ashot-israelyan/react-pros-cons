import * as actionTypes from './actionTypes';

export const reorderCards = (type, cards) => {
    return {
        type: actionTypes.REORDER_CARDS,
        cardType: type,
        payload: cards
    }
};

export const editCard = (cardType, id, value) => {
    return {
        type: actionTypes.EDIT_CARD,
        id,
        value,
        cardType
    }
};

export const addCard = (cardType, value) => {
    return {
        type: actionTypes.ADD_CARD,
        cardType,
        value
    }
}

export const deleteCard = (cardType, id) => {
    return {
        type: actionTypes.DELETE_CARD,
        cardType,
        id
    }
}