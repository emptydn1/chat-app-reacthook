import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, TextField } from '@material-ui/core';
import { VERIFY_USER } from '.././constants/index';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        display: `flex`,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textField: {
        margin: 50
    },
}));

const Login = (props) => {
    const { socket, userLogin } = props;

    const [user, setUser] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setUser(value);
    }

    const [err, setErr] = useState('');
    const feebbackUser = (data) => {
        if (data.isUser) {
            userLogin(data.user);
            // setErr('') sinh ra loi~ huy tien trinh k dong bo vi`khi t thay doi state ma` con chuyen props sang lam re-render componen khac k nen
        }
        else {
            setErr('user name is exist')
        }
    }

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            socket.emit(VERIFY_USER, user, feebbackUser);
        }
    }



    const classes = useStyles();
    return (
        <Container maxWidth="sm" style={{ position: "absolute", top: `50%`, left: `50%`, transform: `translate(-50%, -50%)` }}>
            <Paper className={classes.root + " first"}>
                <TextField
                    id="outlined-password-input"
                    label="Name"
                    className={classes.textField}
                    variant="outlined"
                    value={user}
                    helperText={err}
                    onChange={handleChange}
                    onKeyPress={handlePress}
                />
            </Paper>
        </Container>
    )
}

export default Login;