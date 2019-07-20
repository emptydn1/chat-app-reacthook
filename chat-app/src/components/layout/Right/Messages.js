import React, { useRef, useEffect } from 'react';
import { Chip, Typography } from '@material-ui/core';



const Messages = (props) => {
    const { data, user, activeChat } = props;
    const scrollEnd = useRef(null);

    const compare = (a, b) => {
        let c = [];
        a.roomName.forEach((x, key) => {
            if (x === b[key]) {
                c.push('ok');
            }
            else {
                console.log(false)
            }
        })
        if (c.length === 2)
            return true;
        return false;
    }


    useEffect(() => {
        scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }, [data]);

    const show = () => {
        if (data !== null) {
            if (activeChat === 'community') {
                return data.map((x, key) => {
                    return (
                        x.name === user.dataUser.name ?
                            <div key={key} style={{ display: 'flex', alignItems: 'center', wordBreak: 'break-all', justifyContent: x.name === user.dataUser.name ? 'flex-end' : '', margin: 10 }} >
                                <Typography style={{ margin: 10, backgroundColor: '#c0e5ff', padding: '9px 19px', borderRadius: 999 }}>
                                    {x.text}
                                </Typography>
                            </div>
                            :
                            <div key={key} style={{ display: 'flex', alignItems: 'center', wordBreak: 'break-all', justifyContent: x.name === user.dataUser.name ? 'flex-end' : '', margin: 10 }} >
                                <Chip label={x.name} />
                                <Typography style={{ margin: 10 }}>
                                    {x.text}
                                </Typography>
                            </div>
                    )
                })
            }
            else {
                return data.map((x, key) => {
                    if (compare(x, [activeChat, user.dataUser.socketId]) === true) {
                        return (
                            x.name === user.dataUser.name ?
                                <div key={key} style={{ display: 'flex', alignItems: 'center', wordBreak: 'break-all', justifyContent: x.name === user.dataUser.name ? 'flex-end' : '', margin: 10 }} >
                                    <Typography style={{ margin: 10, backgroundColor: '#c0e5ff', padding: '9px 19px', borderRadius: 999 }}>
                                        {x.text}
                                    </Typography>
                                </div>
                                :
                                <div key={key} style={{ display: 'flex', alignItems: 'center', wordBreak: 'break-all', justifyContent: x.name === user.dataUser.name ? 'flex-end' : '', margin: 10 }} >
                                    <Chip label={x.name} />
                                    <Typography style={{ margin: 10 }}>
                                        {x.text}
                                    </Typography>
                                </div>
                        )
                    }
                    else {
                        return null;
                    }
                })
            }
        }
    }

    return (
        <div style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
            {show()}
            <div ref={scrollEnd} />
        </div>
    )
}

export default Messages;