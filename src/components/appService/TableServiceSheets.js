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
import { IconButton, ButtonBase, Button } from '@material-ui/core'
import { Search, MoreVert, FilterList, AddBox, AddCircle, Add, SignalWifi1BarLockSharp, Settings, Flag, OfflineBoltSharp, CloudUpload, CheckCircle, Check, Error, ErrorOutline} from '@material-ui/icons'
import { makeStyles, Toolbar, Typography } from '@material-ui/core';
import FormButton from '../globalComponents/FormButton';
import MainButton from '../globalComponents/MainButton';
import { navigate } from '@reach/router';

// PROPS 
// sheets - 
    //  they must be prefiltered to get only the intended sheets (ex. display requests must be filtered for only requests prior to display)
    //  further more they must filtered in such a way that ones with errors that are in the next phase still show up in the previous
// noRowsMessage - this will be displayed in place of 



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

const Rows = (props) => {
    const classes = useStyles()

    return(
    // <React.Fragment>
        // {
            props.sheets.map(s => 
                <TableRow hover={true} key={s.uuid} >
                    <TableCell >
                        {s.customer_id}
                    </TableCell >
                    <TableCell >
                        {s.storage_id}
                    </TableCell >
                    <TableCell >
                        {s.urgency}
                    </TableCell >
                    <TableCell >
                        {/* {s.status} */}Nov-3
                    </TableCell >
                    {/* <TableCell >
                        {s.status}
                    </TableCell > */}
                    <TableCell >
                        {s.type_of_work}
                    </TableCell >
                    <TableCell >
                        {s.requested_by}
                    </TableCell >
                    {/* <TableCell >
                        {s.status}
                    </TableCell > */}
                    <TableCell  className={classes.cellPadding}>
                        {s.flagged ? <Flag style={{color:'red'}}/>: ''}
                        {s.flagged ? <CloudUpload style={{color:'orange'}}/>: <Check style={{color:'green'}}/>}
                        {s.flagged ? <ErrorOutline style={{color:'red'}}/>: ''}
                    </TableCell >


                </TableRow>
            )
        // }
    // </React.Fragment>
)}

const NoRows = (props) => {
    return(
        <TableRow>
            <TableCell style={{'textAlign': 'center', 'color':'grey'}} colSpan={4} >
                <Typography variant='h6'>
                    {props.noRowsMessage}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

// PROPS to be passed in => tableData, tableTitle, tableHeaders?, 
const Requests = (props) => {

    const classes = useStyles()

    const [requests, setRequests] = useState('v')    

    return(
        <React.Fragment>
        <Paper className={classes.paper} elevation={3}>

            <Toolbar className={classes.toolbar}>
                {/* <ButtonCreateSheet label={'Request'}/> */}
                {/* <Button startIcon={<Add />} color={'primary'} > sheet </Button> */}
                {/* <FormButton >
                    sheet
                </FormButton> */}
                <MainButton
                    startIcon={<Add />}
                    size='large'
                    onClick={()=>{navigate('/service_sheets/create')}}
                >
                    sheet &nbsp;
                </MainButton>
                
                <div className={classes.grow} />
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
                    // className={classes.desktopOnly}
                    aria-label="display more actions" 
                    edge="end" 
                    color="inherit"
                >
                    {/* <MoreVert /> */}
                    {/* <FilterList /> */}
                    <Settings />
                </IconButton>
            </Toolbar>

            <TableContainer className={classes.table}>
                <Table  >
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.tableHead} >
                                Customer
                            </TableCell>
                            <TableCell className={classes.tableHead}>
                                Storage
                            </TableCell>
                            <TableCell className={classes.tableHead}>
                                Urgency
                            </TableCell>
                            <TableCell className={classes.tableHead}>
                                Date Created
                            </TableCell>
                            {/* <TableCell className={classes.tableHead}>
                                Status
                            </TableCell> */}
                            <TableCell className={classes.tableHead}>
                                Work Type
                            </TableCell>
                            <TableCell className={classes.tableHead}>
                                Requested By
                            </TableCell>

                            {/* <TableCell className={classes.tableHead}>
                                Flagged
                            </TableCell>
                            <TableCell className={classes.tableHead}>
                                Status
                            </TableCell> */}
                            <TableCell className={classes.tableHead}>
                                {/* Details */}
                            </TableCell>
                        </TableRow>
                    </TableHead>                
                    <TableBody>

                        { 
                            props.sheets.length > 0 ? 
                                <Rows 
                                    sheets={props.sheets} 
                                />  
                                : <NoRows noRowsMessage={props.noRowsMessage}/> 
                        }
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
        </React.Fragment>
    )
}
export default Requests;