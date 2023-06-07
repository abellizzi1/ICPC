import React from 'react';
import { UserContext } from "./Context";
// import { UserTypes } from './Context';
import { UserContextData } from './Context';

interface Props {
	children?: React.ReactNode
}

/**
 * Provides site wide state data for when re-rendering is required
 * 
 * @returns html react element
 */
function ContextProvider({children}: Props) {
	// const globalContext: UserContextData = new UserContextData();

	return (
		<UserContext.Provider value={{globalContext: new UserContextData()}}>
			{children}
		</UserContext.Provider>
	);
}

export default ContextProvider;
