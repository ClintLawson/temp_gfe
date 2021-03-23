import React, { useState } from 'react'
import ButtonCreateSheet from './ButtonCreateSheet'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputBase from '@material-ui/core/InputBase';
import { IconButton, ButtonBase, Button, ButtonGroup } from '@material-ui/core'
import { Search, Today, MoreVert, FilterList, AddBox, AddCircle, Add, SignalWifi1BarLockSharp, Settings, Flag, OfflineBoltSharp, CloudUpload, CheckCircle, Check, Error, ErrorOutline, Map, CalendarViewDay, CalendarToday, TableChart} from '@material-ui/icons'
import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import FormButton from '../globalComponents/FormButton';
import MainButton from '../globalComponents/MainButton';
import { navigate } from '@reach/router';



const useStyles = makeStyles((theme)=> ({
    paper: {
        // backgroundColor: theme.palette.primary.contrastText
        margin: '10px',
        maxWidth: '1200px',
        // maxWidth: '100%',  
        // padding: '10px',
        // height: '1000px',
        backgroundColor: 'white',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0px',
        }
    },
    tableHead: {
        '&.MuiTableCell-head':{
            color: theme.palette.primary.light,
            fontWeight: '600'
        }
    },
    table:{
        // maxHeight: 'calc(100vh - 48px)',
    },
    grow: {
        flexGrow: 2,
    },
    search: {
        display: 'flex',
        // padding: '1px 5px',
        // background: 'grey'
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginLeft: 0,
        width: '150px',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(1),
            width: '250px',
          },
        // background: theme.palette.info.light,
        background: 'lightgrey',
        [theme.breakpoints.up('sm')]: {
            display: 'inherit'
        },
        display: 'none',
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        // pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput:{
        marginLeft: '35px',
        marginRight: '5px'
    },
    desktopOnly:{
        [theme.breakpoints.up('sm')]: {
            display: 'inherit'
        },
        display: 'none'
    },
    cellPadding:{
        '&.MuiTableCell-root':{
            padding:'11px'
        }
    }
}))

const ToolbarForSheetsTable = (props) => {
    const classes = useStyles()
    
    return(
        <Toolbar className={classes.toolbar}>
            <MainButton
                startIcon={<Add />}
                size='large'
                onClick={()=>{navigate('/service_sheets/create')}}
            >
                sheet 
            </MainButton>
            <Typography color='primary' variant={'h5'} style={{marginLeft: '25px',fontStyle:'italic', fontWeight:'bolder'}}>
                {props.title}
            </Typography>
            <div className={classes.grow} style={{display:'flex'}} >


            <ButtonGroup variant='contained' style={{margin: 'auto'}}>
                <IconButton size='small' >
                    <TableChart />
                </IconButton>
                <IconButton size='small' >
                    <Today />
                </IconButton>
                <IconButton size='small' >
                    <Map />
                </IconButton>
                

            </ButtonGroup>
            </div>


            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <Search />
                </div>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <IconButton 
                aria-label="display more actions" 
                edge="end" 
                color="inherit"
            >
                <Settings />
            </IconButton>
        </Toolbar>
    )
}
export default ToolbarForSheetsTable