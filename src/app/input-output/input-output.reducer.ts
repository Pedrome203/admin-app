import { createReducer, on } from '@ngrx/store';
import * as actions from './input-output.actions';
import { InputOutput } from '../models/input-output.model';

export interface State {
    items: InputOutput[];
}

export const initialState: State = {
    items: [],
}

export const _inputOutputReducer = createReducer(initialState,

    on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(actions.unSetItems, state => ({ ...state, items: [] })),


);