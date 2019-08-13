import * as actionTypes from './actions';

const initialState = {
    user: null

};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_USER:

            return {
              user:{
              ...action.userData
              }
            };
        default:
            return state;
    }
};

export default reducer;
