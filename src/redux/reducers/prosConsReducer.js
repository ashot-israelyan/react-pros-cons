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
        let cardIndex = 0;
        switch (action.type) {
            case actionTypes.REORDER_CARDS:
                return {
                    ...state,
                    [action.cardType]: action.payload
                };

            case actionTypes.EDIT_CARD:
                const newStateEdits = [ ...state[action.cardType] ];

                cardIndex = newStateEdits.findIndex(el => el.id === action.id);

                if (cardIndex > -1) {
                    newStateEdits[cardIndex].text = action.value;
                }

                return {
                    ...state,
                    [action.cardType]: newStateEdits
                }
            case actionTypes.ADD_CARD:
                const newStateAdds = [ ...state[action.cardType] ];

                newStateAdds.push({
                    text: action.value,
                    id: uniqueId(action.cardType + '_')
                });

                return {
                    ...state,
                    [action.cardType]: newStateAdds
                }
            case actionTypes.DELETE_CARD:
                const newStateDeletes = [ ...state[action.cardType] ];
                
                cardIndex = newStateDeletes.findIndex(el => el.id === action.id);

                if (cardIndex > -1) {
                    newStateDeletes.splice(cardIndex, 1);
                }

                return {
                    ...state,
                    [action.cardType]: newStateDeletes
                }
            default:
                return state;
        }
    }
}