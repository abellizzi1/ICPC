import { useAppDispatch } from './redux/store';
import { updateTitle } from './redux/pageSlice';
// import { useAppSelector } from '../redux/store';

export function SetTitle (newTitle : string) {
	const dispatch = useAppDispatch();
	dispatch(updateTitle(newTitle));
}