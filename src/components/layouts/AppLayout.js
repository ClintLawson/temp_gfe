import React from 'react'
import { makeStyles } from '@material-ui/core'
import { AppBar,
        Toolbar,
        Typography,
        List,
        IconButton,
        Drawer,
        Hidden,
        SwipeableDrawer,
    } from '@material-ui/core';

import {AccountBox,
        Notifications,
        Menu,
    } from '@material-ui/icons'

import  AppsMenu from './AppsMenu'

import Router_AppTitle from './Router_AppTitle'
import Router_InAppSideMenu from './Router_InAppSideMenu'
// --------------------------------------------------------------------

export const drawerWidth = 230;
export const toolbarHeight = 48;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '55vw',
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        top: 0,
        bottom: 'auto'
    },
    toolbar: theme.mixins.toolbar,
    toolbarIcon:{
        color: theme.palette.secondary.light
        // color: theme.palette.success.main
    },
    toolbar_height:{
        minHeight: toolbarHeight,
    },
    navMenuContainer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    drawer: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        flex: 1, //this makes the elements in the drawer stretch out for 100% coverage,
        '&.MuiList-padding': {
            padding: '0px',
        },
        overflow: 'auto',
        maxHeight: '100vh',
        // transform: 'TranslateY(100%)',
        // overflow: 'auto',
    },
    drawerPaper: {
        "& .MuiPaper-root": {
            border: 'none',
            boxShadow: "2px 0px 14px rgba(0,0,0,0.75);",
        }
    },
    appContentWindow: {
        height: `calc(100vh - ${toolbarHeight}px)`,
        width: '100vw',
        overflow: 'auto',
        [theme.breakpoints.up('md')]: {
            width: `calc(100vw - ${drawerWidth}px)`,
            // marginLeft: drawerWidth,
        },
    },

}))

const AppLayout = (props) => {
    
    const classes = useStyles();
    
    // this is form mobile menu
    const [drawerState, setDrawer] = React.useState({
        left: false,
    })
    const toggleDrawer = (anchor, status) => (event) => {
        setDrawer({[anchor]:status})
    }

    const appTitle = (
        <Router_AppTitle {...props} />
    );

    const inAppMenu = (
        <List className={classes.drawer}> 
            <AppsMenu {...props}/>
            <Router_InAppSideMenu {...props}/>
        </List>
    );


    return (
        
        <div className={classes.grow}>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar className={classes.toolbar_height} >
                <Hidden mdUp implementation="css">
                    <IconButton edge='start' onClick={toggleDrawer('left', true)} >
                        <Menu  className={classes.toolbarIcon}/>
                    </IconButton>
                </Hidden>

                    <Typography variant='h5' className={classes.title}>
                        { appTitle }
                    </Typography>

                    <div className={classes.grow}></div>

                    <IconButton edge='end'>
                        <Notifications className={classes.toolbarIcon} />
                    </IconButton>

                    <IconButton edge='end'>
                        <AccountBox className={classes.toolbarIcon} />
                    </IconButton>

                </Toolbar>

            </AppBar>
            
            <div className={classes.navMenuContainer}>
                {/* MOBILE NAV MENU */}
                <SwipeableDrawer
                    className={classes.drawerPaper}
                    anchor={'left'} 
                    open={drawerState['left']}
                    onOpen={toggleDrawer('left', true)} 
                    onClose={toggleDrawer('left', false)}
                    // keeping it mounted is more efficient for mobile use  
                    ModalProps={{keepMounted: true, }}>
                        
                    { inAppMenu }
                    
                </SwipeableDrawer>

                {/* DESKTOP NAV MENU */}
                <Hidden smDown implementation="css">
                    <Drawer
                        className={classes.drawerPaper}
                        // PaperProps={{ elevation: 10 }}
                        variant='permanent'
                        open>

                        { inAppMenu }

                    </Drawer>
                </Hidden>
            </div>
            

            <div className={classes.appBar}>
                {/* class toolbar required to keep this app content below toolbar dynamically */}
                <div className={classes.toolbar_height}></div>

                {/* App Content here!! */}
                <div className={classes.appContentWindow}>
                    {props.children}
                </div>

            </div>

        </div>
    );
}

export default AppLayout;