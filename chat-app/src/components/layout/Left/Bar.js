import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountCircle, ExpandMore } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ItemsUser from './ItemsUser';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        display: 'block',
        padding: 10
    }
}));

const Bar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [open1, setopen1] = React.useState(false);

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }


    function handleClick() {
        setopen1(!open1);
    }


    const { userLogout, user, userOnline, activeText, dataChat } = props;
    return (
        <div className={classes.root} style={{ height: '100%' }}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <IconButton
                            aria-label="Account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <AccountCircle
                            />
                            {user.dataUser.name}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            style={{ marginLeft: 50 }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => userLogout()}>log out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="community" />
                    <ExpandMore />
                </ListItem>
                {open1 ? <ItemsUser activeText={activeText} community="community" /> : null}
            </List>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="online" />
                    <ExpandMore />
                </ListItem>
                {!open1 ? <ItemsUser dataChat={dataChat} userName={user.dataUser.name} activeText={activeText} userOnline={userOnline} /> : null}
            </List>
        </div>
    );
}
export default Bar;