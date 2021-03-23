import { makeStyles, Paper, Toolbar } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
// import { selectSheetDrafts } from "../data/Reducer"
// import { transformSheetsForTableView } from '../data/Reducer'
import produce from 'immer'
import { selectCustomersById } from "../../appHome/data/customersSlice"
import { selectStoragesById } from "../../appHome/data/storagesSlice"
import { getServiceSheetStatusName, getServiceSheetUrgencyName } from "../data/AppDataLegend"

import {drawerWidth, toolbarHeight} from '../../layouts/AppLayout'
import MainButton from "../../globalComponents/MainButton"
import { Add, Search, ErrorOutline, Flag, Check, CloudUpload  } from "@material-ui/icons"
import ToolbarForSheetsTable from "../ToolbarForSheetsTable"

const useStyles = makeStyles((theme)=> ({
    paper: {
        // backgroundColor: theme.palette.primary.contrastText
        margin: '30px',
        paddingBottom:'63px',
        maxWidth: '1200px',
        height:'100vh',
        maxHeight: `calc(100vh - ${toolbarHeight}px - 60px)`,
        backgroundColor: 'white',
        [theme.breakpoints.down('sm')]: {
            maxHeight: `calc(100vh - ${toolbarHeight}px - 1px)`,
            width: '100%',
            margin: '0px',
        },
        [theme.breakpoints.down('md')]: {
            margin:'0px',
            maxHeight: `calc(100vh - ${toolbarHeight}px - 1px)`,
            width: '100%',
            margin: '0px',
        }
    },
    dataGrid:{
        '&.MuiDataGrid-root':{
            border: 'none'
        },
        '&.MuiDataGrid-root .MuiDataGrid-colCellTitle':{
            color:theme.palette.primary.light,
            fontSize:'15px',
            fontWeight: '510',
            textAlign: 'center'
        }
    }
}))

const Drafts = (props) => {
    const classes = useStyles()

    const state = props.state
    // const columns = props.columns
    const sheets = props.serviceSheets

    const fakeOfflineStatus = (t) => (t%4 === 0 ? 'pending':(t%5 === 0 ? 'failed':'success'))
    const fakeOffline = (f) => {
        switch(f.value){
            case 'success':
                return <Check style={{color: 'green'}}/>
            case 'pending':
                return <CloudUpload style={{color: 'orange'}} />
            case 'failed': 
                return <ErrorOutline style={{color: 'red'}} />
            default:
                return
        }
    }

    // takes a sheet object and adds in the fields necessary to make the data readable....
    // .... eg. customer_id requires something like customer_name to accompany it
    // ....NOTE! adding these fields with their plain text makes them SEARCHable and SORTable!!!!
    const prepareDataSet = (sheets) => produce(sheets, newSheets => {
        newSheets.map(ns => {
            let customer = selectCustomersById(state, ns.customer_id)
            ns.customer_name = customer ? customer.name : '- -'

            let storage = selectStoragesById(state, ns.storage_id)
            ns.storage_name = storage ? storage.name : ' - - '
            
            let status = getServiceSheetStatusName(ns.status)
            ns.status_name = `(${ns.status}) ${status}`

            ns.urgency_name = getServiceSheetUrgencyName(ns.urgency) || 'ERROR'
            ns.created_at_client_yyyy_mm_dd = 
                `${new Date(parseInt(ns.created_at_client)).toLocaleString("ja-JP")}`

            //FAKE DATA 
            ns.uploading = fakeOfflineStatus(Math.floor(Math.random()*100))
            return ns
        })
        return newSheets
    })

    const dataSet = prepareDataSet(sheets)

    console.log('new sheets....', dataSet, sheets)



    const columns = [
        {field: 'customer_name', headerName:'Customer', width:170},
        {field: 'storage_name', headerName:'Storage', width:170},
        {field: 'urgency_name', headerName:'Urgency', width:120},
        {field: 'status_name', headerName:'Status', width:170},
        {field: 'created_at_client_yyyy_mm_dd', headerName:'Submitted', width:170},
        {field: 'requested_by', headerName:'Requested By', width:170},
        {field: 'flagged', headerName:' ', width:30,
            renderCell: (f) => (f.value === true ? <Flag style={{color: 'red'}}/> : <span/>)
        },
        {field: 'uploading', headerName:' ', width:70,
            renderCell: (f) => fakeOffline(f)
        }
    ]

    return(
        // <div style={{ height: '90vh', width: '100%' }} >
            <Paper className={classes.paper} elevation={3}>
                
                <ToolbarForSheetsTable 
                    title={props.title}
                />

                <DataGrid  
                    columns={columns}
                    rows={dataSet}
                    
                    className={classes.dataGrid}
                    
                    density={'standard'}     
                    hideFooter={true}
                />


            </Paper>
    )
}
export default Drafts

  