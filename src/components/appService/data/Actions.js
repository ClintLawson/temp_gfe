
export const SET_MESSAGE_POPUP = (msg = undefined) => {
    // payload schema is ... type:'', messages:['xxx','abc']
    return {type: 'SET_MESSAGE_POPUP', payload: msg}
}

export const SET_SELECTED_SHEET = (sheet = undefined) => {
    return {type: 'SET_SELECTED_SHEET', payload: sheet}
}

export const CREATE_SERVICE_SHEET = (serviceSheet, userID) => {

    serviceSheet['created_by'] = userID 

    const action = {
        type:'CREATE_SERVICE_SHEET',
        payload: {serviceSheet},
        // meta:{
        //     offline:{
        //         effect: { url: `${apiURL}tasks/`, method: 'GET' },
        //         commit: { type: 'Tasks_Get_Commit' },
        //         rollback: { type: 'Tasks_Get_Rollback' }
        //     }
        // }
    }
    return action
}

export const UPDATE_SERVICE_SHEET = (serviceSheet) => {
    console.log('creating action "UPDATE_SERVICE_SHEET"....', serviceSheet)
    const action = {
        type:'UPDATE_SERVICE_SHEET',
        payload: {serviceSheet},
        // meta:{
        //     offline:{
        //         effect: { url: `${apiURL}tasks/`, method: 'GET' },
        //         commit: { type: 'Tasks_Get_Commit' },
        //         rollback: { type: 'Tasks_Get_Rollback' }
        //     }
        // }
    }
    return action
}


// Drafts are actual serviceSheet Objects that have changes to them that have not been submitted 
export const CREATE_DRAFT = (serviceSheet) => {
    const action = {
        type: 'CREATE_DRAFT',
        payload:{serviceSheet}
    }
    return action
}

export const UPDATE_DRAFT = (serviceSheet) => {
    const action = {

    }
    return action
}