import React, { useState } from 'react'
// import ButtonCreateSheet from './ButtonCreateSheet'
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
// import FormButton from './FormButton';
// import MainButton from './MainButton';
import { navigate } from '@reach/router';

// NOTE!! -> decided to go with dataGrid from MUI library instead of building out this table, it is here though if it is required

// PROPS 
// sheets - 
    //  they must be prefiltered to get only the intended sheets (ex. display requests must be filtered for only requests prior to display)
    //  further more they must filtered in such a way that ones with errors that are in the next phase still show up in the previous
// noRowsMessage - this will be displayed in place of 


// USAGE 
{/* <FlexTable path='/uploading'
        rowKey={'id'}
        rows={[
                {'id':'1','title':'Red Fern', 'author':'Jimmy Hendricks', 'published_date':'1923'},
                {'id':'2','title':'Book of Eli', 'author':'Denzel', 'published_date':'2003'},
                {'id':'3','title':'Chunky Monkey', 'author':'Tarzan Helman', 'published_date':'1973'},
                {'id':'4','title':'Tree of Life', 'author':'Billy Bob', 'published_date':<span style={{color:'green'}}>'1990'</span>},
            ]}

        fields={[
            {'key':'title', 'title':'Title of Book', 'function':(r)=>console.log(r.id)},
            {'key':'author', 'title':'Writer!'},
            {'key':'published_date', 'title':'Published'}                        
        ]}

        firstColumn={[<Checkbox  />]}
        firstHeader={{'test':((e)=><Checkbox checked={e} />)}}
/> */}


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

const Rows = (props) => {
    const classes = useStyles()

    return(
        props.rows.map(r => 
            <TableRow hover={true} key={r.id} >
               { props.fields.map(f=>
                    <TableCell >
                        {r[f.key]}
                    </TableCell >
                )}
            </TableRow>
        )
)}


// PROPS to be passed in => tableData, tableTitle, tableHeaders?, 
const Requests = (props) => {

    const classes = useStyles()

    return(
        <React.Fragment>
        <Paper className={classes.paper} elevation={3}>

            <Toolbar className={classes.toolbar}>
                {/* <ButtonCreateSheet label={'Request'}/> */}
                {/* <Button startIcon={<Add />} color={'primary'} > sheet </Button> */}
                {/* <FormButton >
                    sheet
                </FormButton> */}
                {/* <MainButton
                    startIcon={<Add />}
                    size='large'
                    onClick={()=>{navigate('/service_sheets/create')}}
                >
                    sheet &nbsp;
                </MainButton> */}
                
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
                                {props.firstColumn ? 
                                    <TableCell >{props.firstHeader.test(true )}</TableCell>
                                    : ''
                                }
                                {
                                    props.fields.map(f => 
                                        <TableCell className={classes.tableHead} >
                                            {f.title}
                                        </TableCell>
                                    )
                                }

                        </TableRow>
                    </TableHead>                
                    <TableBody>

                        { 
                            props.rows.length > 0 ? 
                                props.rows.map(r => 
                                    <TableRow hover={true} key={r[props.rowKey]} >
                                        
                                        {props.firstColumn ? 
                                            <TableCell >
                                                { props.firstColumn.map(d => d ) }
                                            </TableCell>
                                            : ''
                                        }
                                        { props.fields.map(f=>
                                            <TableCell >
                                                {
                                                    r[f.key]
                                                }
                                            </TableCell >
                                        )}
                                    </TableRow>
                                )

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