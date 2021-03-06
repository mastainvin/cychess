import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { getUsers } from "./actions/users.actions";


//Dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";



const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") , 
    
    );

    





