const io = require('./server').io;
const uuidv1 = require('uuid/v1');
const { COMMUNITY_CHAT, USER_CONNECTED, PRIVATE_USER, PRIVATE_MESS, TYPINGOUT, TYPING, VERIFY_USER, LOGOUT, TYPING_PRIVATE } = require('./constants/index');

let userConnected = []

module.exports = (socket) => {
    console.log(socket.id, 'ketnoi');
    socket.on(VERIFY_USER, (dataUser, callback) => {
        if (checkUser(userConnected, dataUser)) {
            callback({ isUser: false, user: null })
        }
        else {
            callback({ isUser: true, user: createUser({ name: dataUser, socketId: socket.id }) })
        }
    });

    socket.on(USER_CONNECTED, (user) => {
        userConnected = addUser(userConnected, user);
        socket.user = user;
        io.emit(USER_CONNECTED, userConnected);
    });

    socket.on(LOGOUT, () => {
        userConnected = removeUser(userConnected, socket.user.name);
        socket.broadcast.emit(USER_CONNECTED, userConnected);
    });

    socket.on(COMMUNITY_CHAT, (value) => {
        io.emit(COMMUNITY_CHAT, { name: socket.user.name, text: value });
    });

    socket.on(TYPING, (data) => {
        // socket.broadcast.emit(TYPING, socket.user.name)
    })

    socket.on(TYPINGOUT, () => {
        socket.broadcast.emit(TYPINGOUT, null)
    })

    socket.on(PRIVATE_MESS, (data) => {
        io.to(data.socketId).emit(PRIVATE_USER, { roomName: [socket.user.socketId, data.socketId], name: socket.user.name, text: data.text });
    })

    socket.on('disconnect', function () {
        if ('user' in socket) {
            userConnected = removeUser(userConnected, socket.user.name);
            io.emit(USER_CONNECTED, userConnected);
        }
        console.log('user disconnected');
    });

}


// create
const createUser = ({ name = "", socketId }) => {
    return {
        id: uuidv1(),
        name,
        socketId
    }
}

const createMassage = ({ message = "", sender = "" }) => {
    return {
        id: uuidv1(),
        time: new Date(Date.now()),
        message,
        sender
    }
}

const createChat = ({ message = [], name = "community", users = [] }) => {
    return {
        id: uuidv1(),
        name,
        message,
        users,
        typingUsers: []
    }
}

const getTime = (date) => {
    return `${date.getHours()}:${"0" + date.getMinutes().slice(-2)}`;
}
//end create




const addUser = (listUser, dataUser) => {
    let newList = Object.assign([], listUser);
    newList.push(dataUser);
    return newList;
}

const checkUser = (listUser, dataUser) => {
    a = listUser.findIndex(x => x.name === dataUser);
    return a !== -1;
}

const removeUser = (listUser, dataUser) => {
    listUser = listUser.filter(x => x.name !== dataUser);
    return listUser;
}