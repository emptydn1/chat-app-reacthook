import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Bar from './Left/Bar';
import Messages from './Right/Messages';
import { Ms } from '../../Store';
import { COMMUNITY_CHAT, TYPING, TYPINGOUT, PRIVATE_USER, TYPING_PRIVATE } from '../../constants/index';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

let c = 1;
const Chat = (props) => {
    const { socket, user, userLogout, userOnline } = props;

    const value = useContext(Ms);
    const [textValue, setextValue] = useState('');
    const [activeChat, setActiveChat] = useState(null);
    const { updateCommunity, sendMessageCommunity, sendMessPrivate, updateMessPrivate } = value;
    const [type, setTyping] = useState(null);
    if (c === 1) {
        socket.on(COMMUNITY_CHAT, (data) => {
            updateCommunity(data)
        });
        socket.on(PRIVATE_USER, (data) => {
            updateMessPrivate(data)
        })
        socket.on(TYPING, (data) => {
            setTyping(data);
        });
        socket.on(TYPINGOUT, (data) => {
            setTyping(data);
        });
        c = 2;
    }


    const handleChange = (e) => {
        setextValue(e.target.value)
    }


    const handlePress = (e) => {
        if (e.key === 'Enter') {
            if (activeChat === "community") {
                sendMessageCommunity(socket, textValue);
            }
            else {
                updateMessPrivate({ roomName: [activeChat, user.dataUser.socketId], name: user.dataUser.name, text: textValue })
                sendMessPrivate(socket, { text: textValue, socketId: activeChat })
            }
        }
    }

    const activeText = (text) => {
        setActiveChat(text);
    }

    const onInputFocus = () => {
        socket.emit(TYPING, 'community');
    }

    const onInputBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            socket.emit(TYPINGOUT);
        }
    }
    


    const classes = useStyles();
    return (
        <div style={{ height: '100%' }}>
            <Grid
                style={{ height: '100%' }}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item sm={3} style={{ height: '60%' }}>
                    <Bar user={user} dataChat={value.state.user} activeText={activeText} userLogout={userLogout} userOnline={userOnline} />
                </Grid>
                <Grid item sm={6} style={{ height: '60%' }}>
                    <Paper style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }} className={classes.paper}>
                        <h5>{activeChat === 'community' ? 'community' : 'private'}</h5>
                        {
                            activeChat === 'community' ?
                                (
                                    <Messages user={user} activeChat={activeChat} data={value.state.community} />
                                )
                                :
                                (
                                    value.state.user && activeChat !== null ?
                                        <Messages user={user} activeChat={activeChat} data={value.state.user} />
                                        :
                                        ''
                                )
                        }
                        <div>
                            {activeChat === 'community' ? type ? type + " dang tra loi" : '' : ''}

                        </div>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            style={{ width: '100%', height: '50px', marginTop: 10 }}
                            label={user.dataUser.name}
                            disabled={activeChat !== null ? false : true}
                            onChange={handleChange}
                            onFocus={onInputFocus}
                            onBlur={onInputBlur}
                            onKeyPress={handlePress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
}

export default Chat;