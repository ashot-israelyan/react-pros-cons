import { combineReducers } from 'redux';
import prosConsReducer from './prosConsReducer';

export default () => {
    return combineReducers({
        prosCons: prosConsReducer()
    });
}