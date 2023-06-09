import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './lib/redux/store';
import ContextProvider from './lib/context/ContextProvider';
import App from './App';

/**
 * Entry point, puts the react/typescript code inside the index.html in public
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
	<BrowserRouter>
	<ContextProvider>
	<Provider store={store}>
		<App/>
	</Provider>
	</ContextProvider>
	</BrowserRouter>
  </React.StrictMode>
);
