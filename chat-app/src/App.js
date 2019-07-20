import React, { useState } from 'react';
import './App.css';
import io from '../../node_modules/socket.io-client';
import { USER_CONNECTED, LOGOUT } from './constants/index';
import Login from './components/Login';
import Chat from './components/layout/Chat';
import Store from './Store';


// http://localhost:4000/
// https://chat-app-reacthook.herokuapp.com/
const socketUrl = "http://localhost:4000"

function App() {
    const [stateSocket, setSocket] = useState({});
    const { socket } = stateSocket;
    if (!socket) {
        const socket = io.connect(socketUrl);
        setSocket({ socket });
    }



    const [userOnline, setUserOnline] = useState(null);
    const [user, setUser] = useState(null);
    const userLogin = (dataUser) => {
        socket.emit(USER_CONNECTED, dataUser);
        socket.on(USER_CONNECTED, UsersOnline => {
            setUserOnline(UsersOnline);
        });
        setUser({
            ...user,
            dataUser
        })
    }

 
    const userLogout = () => {
        socket.emit(LOGOUT);
        setUser(null);
    }




    return (
        <Store>
            <div style={{ height: '100%' }}>
                {
                    !user ?
                        <Login socket={socket} userLogin={userLogin} />
                        :
                        <Chat socket={socket} userOnline={userOnline} user={user} userLogout={userLogout} />
                }
            </div>
        </Store>
    );
}

export default App;
