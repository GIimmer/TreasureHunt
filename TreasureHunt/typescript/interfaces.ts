import { ILocationsState } from "../reducers/locationsReducer";
import { ITreasureState } from "../reducers/treasureReducer";
import { IErrorState } from "../reducers/errorReducer";

interface IAction {
    type: string,
    payload?: any
}

interface ILocation {
    id: number,
    latitude: number,
    longitude: number
}

interface IState {
    locations: ILocationsState,
    treasure: ITreasureState,
    error: IErrorState
}

export type { IAction, ILocation, IState };