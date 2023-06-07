import { combineReducers } from '@reduxjs/toolkit';
import pageSlice from './pageSlice';

const rootReducer = combineReducers({pages: pageSlice});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
