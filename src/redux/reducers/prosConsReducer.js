import * as actionTypes from '../actions/actionTypes';
import uniqueId from 'lodash/uniqueId';

const initialState = {
    pros: [
        {
            id: uniqueId('pros_'),
            text: 'It\'s really tasty'
        },
        {
            id: uniqueId('pros_'),
            text: 'It\'s really fast'
        },
        {
            id: uniqueId('pros_'),
            text: ''
        }
    ],
    cons: [
        {
            id: uniqueId('cons_'),
            text: 'Too expensive'
        },
        {
            id: uniqueId('cons_'),
            text: 'It\'s dangerous for health'
        },
        {
            id: uniqueId('cons_'),
            text: 'It\'s really tasty dfsagdfg'
        },
        {
            id: uniqueId('cons_'),
            text: 'It\'s really fast hsdhgd'
        },
        {
            id: uniqueId('cons_'),
            text: ''
        }
    ]
}

export default () => {
    return (state = initialState, action) => {
        let newState = {};
        let cardIndex = 0;
        switch (action.type) {
            case actionTypes.REORDER_CARDS:
                return {
                    ...state,
                    [action.cardType]: action.payload
                };

            case actionTypes.EDIT_CARD:
                newState = {...state};

                cardIndex = newState[action.cardType].findIndex(el => el.id === action.id);

                if (cardIndex > -1) {
                    newState[action.cardType][cardIndex].text = action.value;
                }

                return newState;
            case actionTypes.ADD_CARD:
                newState = {...state};

                newState[action.cardType].push({
                    text: action.value,
                    id: uniqueId(action.cardType + '_')
                });

                return newState;
            case actionTypes.DELETE_CARD:
                newState = { ...state };

                cardIndex = newState[action.cardType].findIndex(el => el.id === action.id);

                newState[action.cardType].splice(cardIndex, 1);

                return newState;
            default:
                return state;
        }
    }
}