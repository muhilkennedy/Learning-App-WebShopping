import { combineReducers } from 'redux';
import productReducer from './reducers/productReducer';


const appReducer = combineReducers({
    cartState: productReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;