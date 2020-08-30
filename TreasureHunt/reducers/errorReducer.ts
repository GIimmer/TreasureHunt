import { TREASURE, LOCATIONS } from '../constants';
import { IAction } from '../typescript';


export type IErrorState = Error | null;

const initialState = null;

const errorReducer = (state: IErrorState = initialState, action: IAction) => {
    switch (action.type) {
        case TREASURE.CHECK_FAILURE:
        case LOCATIONS.LOAD_FAIL:
            return action.payload;

        default:
            return state;
    }
};

export default errorReducer;