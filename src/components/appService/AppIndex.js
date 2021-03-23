import { Router, Redirect } from '@reach/router'
import React, { useEffect, useState } from 'react'
import Requests from './TableServiceSheets'
import CreateSheet from './CreateServiceSheet'
import SheetsTable from './views/DataTable'
import FlexTable from '../globalComponents/FlexTable'

import MessagePopup from './MessagePopup'

import {useDispatch, useSelector} from 'react-redux'

// Actions
import { CREATE_SERVICE_SHEET, SET_MESSAGE_POPUP, SET_SELECTED_SHEET, UPDATE_SERVICE_SHEET  } from './data/Actions'

import fakeSheets from '../fakeAPI/ServiceSheets'
import fakeCustomers from '../fakeAPI/Customers'
import fakeStorages from '../fakeAPI/Storages'
import { selectUserById, selectUsersAll } from '../appHome/data/usersSlice'
import { Checkbox } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { selectSheetDrafts, selectSheetRequests, selectSheetsJobs, selectSheetsMyJobs, selectSheetsByStatusValue, selectSheetsCorporate } from './data/Reducer'
import { selectStoragesAll, selectStoragesById } from '../appHome/data/storagesSlice'
import { selectCustomersAll, selectCustomersById } from '../appHome/data/customersSlice'
import { selectPartsAll } from '../appHome/data/partsSlice'

// const test = () => useDispatch()

const Router_AppContent = () => {

    const dispatch = useDispatch()

    
    // const [customers, setCustomers] = useState(fakeCustomers)
    // const [storages, setStorages] = useState(fakeStorages)
    
    const state = useSelector( state => state )

    const users = selectUsersAll(state)
    const customers = selectCustomersAll(state)
    const storages = selectStoragesAll(state)
    const parts = selectPartsAll(state)
    
    
    const messagePopup = state.serviceSheets.messagePopup
    const serviceSheets = state.serviceSheets.sheetsInProcess || []
    const selectedSheet = state.serviceSheets.selectedSheet || undefined

    useEffect(()=>{
        console.log('state change detected', selectedSheet)
    },[state])
    
    const createNewSheet = (newSheet) => {
        console.log('creating ...')        
        dispatch(CREATE_SERVICE_SHEET(newSheet, 'clint@gellert.com'))
    }

    return (
        <>
        {/* messagePopup controlled by redux state */}
            <MessagePopup 
                messagePopup={messagePopup || null}
                onClose={()=>dispatch(SET_MESSAGE_POPUP())}
            />

            <Router>
                {/* DEFAULT  */}
                <Redirect from='/' to='requests' noThrow/>

                <CreateSheet path='/create' 
                    submitNew={createNewSheet} //function
                    update={(s)=>dispatch(UPDATE_SERVICE_SHEET(s))}
                    selectedSheet={selectedSheet} //sheet instance
                    unMountSelected={()=>dispatch(SET_SELECTED_SHEET())}
                    // update={} //function 
                    
                    customers={customers}
                    storages={storages}
                    parts={parts}
                    serviceTechs={users}
                />

                <SheetsTable path='/drafts'
                    // title={'Drafts'}
                    state={state}
                    serviceSheets={selectSheetDrafts(state)}
                />

                <SheetsTable path='/uploading'
                    // title={'Pending Uploads'}
                    state={state}
                    serviceSheets={[]}
                />

                <SheetsTable path='/requests'
                    // title={'Service Requests'}
                    state={state}
                    serviceSheets={selectSheetRequests(state)}
                />

                <SheetsTable path='/jobs'
                    // title={'Service Jobs'}
                    state={state}
                    serviceSheets={selectSheetsJobs(state)}
                />

                <SheetsTable path='/jobs/my_jobs'
                    // title={'My Jobs'}
                    state={state}
                    serviceSheets={selectSheetsMyJobs(state, '1234')}
                />

                <SheetsTable path='/jobs/in_progress'
                    // title={'Work In Progress'}
                    state={state}
                    serviceSheets={selectSheetsByStatusValue(state, '40')}
                />

                <SheetsTable path='/jobs/department_review'
                    // title={'Ready to Review'}
                    state={state}
                    serviceSheets={selectSheetsByStatusValue(state, '50')}
                />

                <SheetsTable path='/corporate'
                    // title={'Corporate Review'}
                    state={state}
                    serviceSheets={selectSheetsCorporate(state)}
                />

                <SheetsTable path='/corporate/preliminary_review'
                    // title={'Preliminary Corporate Review'}
                    state={state}
                    serviceSheets={selectSheetsByStatusValue(state, '60')}
                />

                <SheetsTable path='/corporate/accounting_review'
                    // title={'Accounting Review'}

                    state={state}
                    serviceSheets={selectSheetsByStatusValue(state, '70')}
                />

                <SheetsTable path='/corporate/invoicing'
                    // title={'Ready to Invoice'}

                    state={state}
                    serviceSheets={selectSheetsByStatusValue(state, '80')}
                />

            </Router>

        </>
    )
}
export default Router_AppContent;