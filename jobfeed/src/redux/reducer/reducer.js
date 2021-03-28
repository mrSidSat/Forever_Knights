import {SET_CURRENT_USER}  from '../constants';

const initialState={
    isAuthenticated:false,
    user:{}
}



export default function (state=initialState,action){

    switch (action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
    }
}