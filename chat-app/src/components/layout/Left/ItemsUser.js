import React, { Fragment } from 'react';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';

const ItemsUser = (props) => {

    const handleClick = (id) => {
        props.activeText(id);
    }


    const { userOnline, community, userName, dataChat } = props;

    const checkId = (name, id) => {
        if (dataChat.length !== 0) {
            for (let i = dataChat.length - 1; i >= 0; i--) {
                if (dataChat[i].roomName[0] === id) {
                    return dataChat[i].text;
                }
                else {
                    if (i === 0)
                        return null;
                }
            }
        }
        return null;
    }

    const showItems = () => {
        if (userOnline) {
            return (
                userOnline.map((value, key) => {
                    if (value.name !== userName) {
                        return (
                            <ListItem key={value.id} button >
                                <ListItemText primary={value.name + ' - ' + checkId(value.name, value.socketId)} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleClick(value.socketId)} edge="end" aria-label="Comments">
                                        <CommentIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem >
                        )
                    }
                    return null;
                })
            )
        }
        else {
            if (community) {
                return (
                    <ListItem button>
                        <ListItemText primary={community} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleClick(community)} edge="end" aria-label="Comments">
                                <CommentIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        }
    }
    return (
        <Fragment>
            {showItems()}
        </Fragment>
    )
}

export default ItemsUser;