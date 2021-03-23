import {React, useState} from 'react'
import { Link } from '@reach/router'
import { Accordion, 
        AccordionSummary, 
        MenuItem, 
        makeStyles, 
        Toolbar, 
        Typography, 
        ClickAwayListener,
        ListItemIcon} from '@material-ui/core'

import { Apps, Business, BusinessCenter, EmojiTransportation, HomeWork, LibraryBooks } from '@material-ui/icons'

const useStyles = makeStyles((theme)=> ({
    root: {
        "&.MuiAccordion-root": {
            backgroundColor: theme.palette.secondary.main,
            boxShadow: "none",
            color: theme.palette.secondary.contrastText
        },
        '&.Mui-expanded':{
            margin: '0px'
        }
    },
    grow: {
        // width: '100%',
        marginLeft: '10px',
        fontWeight: '600'
    },
    noPadding: {
        padding: '0px',
        margin: '0px',
        '&.MuiAccordionSummary-root.Mui-expanded':{
            backgroundColor: 'transparent',
            minHeight:'48px'
        },
        '& .MuiAccordionSummary-content':{
            margin: '0px'
        },
        '& .Mui-expanded':{
            margin: '0px',
        },
    },
    appLink: {
        paddingLeft: '25px',
        '&.MuiMenuItem-root':{
            minHeight: 'auto',
            width: 'auto'
        },
        '&.Mui-selected':{
            backgroundColor: theme.palette.secondary.dark,
            // boxShadow: "0px 0px 5px rgba(0,0,0,0.7);"
        },
    },
    appIcon: {
        '&.MuiListItemIcon-root':{
            minWidth:'35px'
        }
    },
    link:{
        color: theme.palette.secondary.contrastText,
        textDecoration: 'none',
        '& :hover':{
            color: 'lightgrey'
        },
    },
    toolbar_height:{
        minHeight: 'auto',
        '&.MuiToolbar-gutters':{
            paddingLeft: '10px'
        }
    },

}))

const AppsMenu = (props) => {
    const classes = useStyles()

    const [appsEpanded, setAppsExpanded] = useState(false)

    const toggleAppsExpanded = () => {
        setAppsExpanded(!appsEpanded)
    }

    const closeApps = () => {
        setAppsExpanded(false)
    }

    const apps = [
        {
            'name':'Business Center',
            'icon':<HomeWork />,
            'url' :'/home'
        },
        {
            'name':'Service Sheets',
            'icon':<LibraryBooks />,
            'url' :'/service_sheets'
        }
    ]

    return(
        <ClickAwayListener onClickAway={closeApps}>
            <Accordion 
                id='AppsMenuContainer_for_reading_height'
                square 
                expanded={appsEpanded} 
                className={classes.root} elevation={2}>

                <AccordionSummary 
                    className={classes.noPadding} 
                    onClick={toggleAppsExpanded}>
                    
                    <Toolbar className={classes.toolbar_height}>
                        <Apps />
                        <Typography className={classes.grow} >
                            Agri-Stor &nbsp;Apps
                        </Typography>
                    </Toolbar>

                </AccordionSummary>


            {/* APPS LIST BELOW!!! */}

                {apps.map((app) => 
                    <Link key={app.url} to={app.url} className={classes.link}>
                        <MenuItem 
                            className={classes.appLink} 
                            selected={app.url === props.location.pathname.slice(0,app.url.length)} 
                        >
                            <ListItemIcon className={classes.appIcon} >
                                {app.icon}
                            </ListItemIcon>
                            <Typography >
                                {app.name}
                            </Typography>
                        </MenuItem>
                    </Link>
                )}

            </Accordion>
        </ClickAwayListener>
    )
}

export default AppsMenu;