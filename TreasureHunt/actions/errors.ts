import { IAction } from "../typescript";

const setError = (error: Error, action: string): IAction => ({
    type: action,
    payload: error
})

export {
    setError
}