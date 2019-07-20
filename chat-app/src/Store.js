import React, { createContext, useReducer } from 'react';
import { COMMUNITY_CHAT, PRIVATE_MESS, PRIVATE_USER } from './constants/index'

export const Ms = createContext();

const InitialState = {
    user: [],
    community: []
}
const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case COMMUNITY_CHAT:
            return { ...state, community: [...state.community, action.payload] };
        case PRIVATE_USER:
            return { ...state, user: [...state.user, action.payload] };
        default:
            return state;
    }
}

const Store = (props) => {
    const [state, dispatch] = useReducer(reducer, InitialState);
    const sendMessageCommunity = (socket, value) => {
        socket.emit(COMMUNITY_CHAT, value);
    }

    const sendMessPrivate = (socket, value) => {
        socket.emit(PRIVATE_MESS, value);
    }

    const updateMessPrivate = (data) => {
        dispatch({
            type: PRIVATE_USER,
            payload: data
        })
    }

    const updateCommunity = (data) => {
        dispatch({
            type: COMMUNITY_CHAT,
            payload: data
        })
    }

    // console.log(state);

    return (
        <Ms.Provider value={{ state, sendMessageCommunity, updateCommunity, sendMessPrivate, updateMessPrivate }}>
            {props.children}
        </Ms.Provider>
    )
}

export default Store;