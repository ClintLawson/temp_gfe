import {v4 as uuidv4} from 'uuid'
import AppDataLegend, { getServiceSheetStatusValue } from './AppDataLegend'

import fakeSheets from '../../fakeAPI/ServiceSheets'

// service sheets app schema
// [X] invoiced sheets will NOT be loaded into redux
// sheetsInProcess:[]
// selectedSheet:{obj} -> represents 
// drafts:[]  //these are ones that have not been submitted or changes that haven't been submitted
// ........each draft object should contain a time stamp so a user knows how OLD it is AND the form itself
// offlineErrors:[]  //will keep track of any failed submissions and will need to be dismissed... 
// ....................will be displayed under cloud queue section
// tableSettings: {
    // requests: {
        // visibleColumns:[]
        // }
        // jobs:{}
        // corporate:{}
        // }
        


export const selectSheetDrafts = state => state.serviceSheets.drafts

export const selectSheetRequests = state => {
    return state.serviceSheets.sheetsInProcess.filter(s => s.status === getServiceSheetStatusValue('Requested'))
}

export const selectSheetsJobs = state => {
    return state.serviceSheets.sheetsInProcess.filter(s => parseInt(s.status) > 10 && parseInt(s.status) <= 60)
}

export const selectSheetsCorporate = state => {
    return state.serviceSheets.sheetsInProcess.filter(s => parseInt(s.status) >= 60 && parseInt(s.status) < 90)
}

export const selectSheetsMyJobs = (state, myID) => {
    return selectSheetsJobs(state).filter(s => s.lead_tech === myID || s.all_techs.filter(t => t.id === myID).length !== 0)
}

export const selectSheetsByStatusValue = (state, value) => {
    return state.serviceSheets.sheetsInProcess.filter(s => s.status === value)
}

const initial = {
    sheetsInProcess: fakeSheets(),
    selectedSheet: undefined, //{} // must be set to undefined or will throw errors because it fools checks that it exists
    drafts:fakeSheets(),
    offlineErrors:[],
    messagePopup:{ //use 'DISMISS_MESSAGE' to change state of popup
        //type: '', //success - error - warning
        //messages:[] //['message 1','message 2','message 3']
    } 
}
// console.log(fakeSheets)

export default function reducer(state = initial, action){
    console.log('beginning reducer state...',state)
    switch(action.type){

        case 'SET_MESSAGE_POPUP':
            console.log('message dismissed')
            return {...state, messagePopup:{}}

        case 'SET_SELECTED_SHEET':
            console.log('setting selected sheet...')
            return {...state, selectedSheet:action.payload}

        case 'GET_SERVICE_SHEETS_IN_PROCESS':

            return state
        // case 'GET_SERVICE_SHEETS_COMMIT':
            // return state
        // ROLLBACK ??
        
        
        case 'CREATE_SERVICE_SHEET':
            console.log('creating!')
            const newSheet = {...action.payload.serviceSheet,
                // requested_by:'working1',
                id: uuidv4(),
                created_at_client: Date.now(),
                created_by: '1234',
            }
            return {...state, 
                sheetsInProcess:[ newSheet, ...state.sheetsInProcess],
                selectedSheet: newSheet, 
                messagePopup:{
                    type:'success',
                    messages:['Successfully Created!']
                }
            }

        // case 'CREATE_SERVICE_SHEET_COMMIT':
        // case 'CREATE_SERVICE_SHEET_ROLLBACK':


        case 'UPDATE_SERVICE_SHEET':
            // remove draftID
            console.log('updating!!', action.payload)
            const newState = {...state,
                selectedSheet: action.payload.serviceSheet,
                sheetsInProcess: [...state.sheetsInProcess.map(s => 
                    s.id === action.payload.serviceSheet.id ? action.payload.serviceSheet : s) 
                ],
                messagePopup:{
                    type:'success',
                    messages:['Successfully Updated!']
                }
            }
            console.log(newState)
            return newState

        // case 'UPDATE_SERVICE_SHEET_COMMIT':
        // case 'UPDATE_SERVICE_SHEET_ROLLBACK':
        
        case 'CREATE_DRAFT':
            // set timestamp for Last_Edited

            // add draft to drafts: []

            // set this sheet instance as the selectedSheet

            return state

        case 'UPDATE_DRAFT':


            return state

        default:
            return state
    }
}