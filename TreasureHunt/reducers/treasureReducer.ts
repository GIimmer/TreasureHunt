import { TREASURE } from '../constants';
import { IAction } from '../typescript';

export interface ITreasureState {
    loading: boolean,
    hasTreasure: boolean | null,
}

const initialState: ITreasureState = {
    loading: false,
    hasTreasure: null
}

const treasureReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case TREASURE.CHECK:
            return { ...state, loading: true };

        case TREASURE.FOUND:
            return { loading: false, hasTreasure: true };

        case TREASURE.NOT_FOUND:
            return { loading: false, hasTreasure: false };

        default:
            return state;
    }
};

export default treasureReducer;