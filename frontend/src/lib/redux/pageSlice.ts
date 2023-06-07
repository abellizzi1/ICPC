import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
// import { AppThunk, AppDispatch } from './store';

interface PageState {
	title: string
}

const initialState: PageState = {
	title: ''
}

const pageSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		updateTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		}
	}
});

export const { updateTitle } = pageSlice.actions;
// export const getTitle = (state: RootState) => state.pages.title;
export default pageSlice.reducer;
