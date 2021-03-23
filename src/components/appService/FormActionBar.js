import React from 'react'
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

// for use in the main app content area as a toolbar that sticks to the bottom of the screen.

const useStyles = makeStyles((theme) =>({
    actionBarMobile: {
        top: 'auto',
        bottom: 0,
        left: 0,
        alignItems:'center',
        paddingLeft: '230px',
        maxWidth:'1280px',
        [theme.breakpoints.down('sm')]:{
            paddingLeft: '0px',

        }
    },
}))

const FormActionBar = (props) => {
    const classes = useStyles()

    return(
        <AppBar position='fixed' color='transparent' className={classes.actionBarMobile} elevation={0}>
            <Toolbar style={{width:'100%'}} >
                {props.children}
            </Toolbar>
        </AppBar>
    )
}
export default FormActionBar;