import * as actionTypes from './actionTypes';

export const reorderCards = (type, cards) => {
    return dispatch => {
        dispatch({
            type: actionTypes.REORDER_CARDS,
            cardType: type,
            payload: cards
        })
    }
};