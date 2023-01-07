import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'app/components/base/Theme';
import { Provider } from 'react-redux';
import App from 'views/App';
import store from 'app/store';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
<ThemeProvider theme={theme}>
    <Provider store={store}>
        <App />
    </Provider>
</ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
