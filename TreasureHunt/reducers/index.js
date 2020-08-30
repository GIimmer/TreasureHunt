import { combineReducers } from 'redux';

import locationsReducer from './locationsReducer'
import treasureReducer from './treasureReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
    locations: locationsReducer,
    treasure: treasureReducer,
    error: errorReducer
});

export default rootReducer;