import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
// import { StoreProvider } from './store';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles';
import store from './redux/store';
import { Provider } from 'react-redux';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';

const px2rem = px2remTransformer({
    rootValue: 10, // 32px = 1rem; @default 16
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StyleProvider transformers={[px2rem]}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </StyleProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
