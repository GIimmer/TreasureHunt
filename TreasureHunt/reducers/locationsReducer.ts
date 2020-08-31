import { LOCATIONS } from '../constants';
import { IAction, ILocation } from '../typescript';

export interface ILocationsState {
    loading: boolean,
    locations: ILocation[]
}

const initialState: ILocationsState = {
    loading: false,
    locations: []
}

const locationsReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case LOCATIONS.LOAD:
            return { ...state, loading: true };
        
        case LOCATIONS.LOAD_SUCCESS:
            return { ...state, locations: action.payload };
        
        case LOCATIONS.CLICK:
        default:
            return state;
    }
};

export default locationsReducer;