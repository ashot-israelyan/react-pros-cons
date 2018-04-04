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
            id: uniqueId('pros_'),
            text: 'It\'s really tasty dfsagdfg'
        }, 
        {
            id: uniqueId('pros_'),
            text: 'It\'s really fast hsdhgd'
        }
    ]
}

export default () => {
    return (state = initialState, action) => {
        switch(action.type) {
            case actionTypes.REORDER_CARDS:
                return {
                    ...state,
                    [action.cardType]: action.payload
                };
            default:
            return state;
        }
    }
}