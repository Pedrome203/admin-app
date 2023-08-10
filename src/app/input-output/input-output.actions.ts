import { createAction, props } from '@ngrx/store';
import { InputOutput } from '../models/input-output.model';

export const setItems = createAction('[InputOutput] setItems', props<{ items: InputOutput[] }>())
export const unSetItems = createAction('[InputOutput] unSetItems')
