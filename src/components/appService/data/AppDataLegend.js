export const getServiceSheetStatusName = (statusValue) => {
    return AppDataLegend().service_sheet.status.filter(s => s.value === statusValue)[0].name
}

export const getServiceSheetStatusValue = (statusName) => {
    return AppDataLegend().service_sheet.status.filter(s => s.name === statusName)[0].value
}

export const getServiceSheetUrgencyName = (value) => 
    AppDataLegend().service_sheet.urgency.filter(u => u.value === value)[0].name

const AppDataLegend = () => {
    return {
        'service_sheet':{
            'status':[
                {
                    'value':'10',
                    'name':'Requested'
                },
                // {
                //     'value':'20',
                //     'name':'Approved'
                // },
                {
                    'value':'30',
                    'name':'Scheduled'
                },
                {
                    'value':'40',
                    'name':'In Progress'
                },
                {
                    'value':'50',
                    'name':'Work Completed'
                },
                {
                    'value':'60',
                    'name':'Manager Reviewed'
                },
                {
                    'value':'70',
                    'name':'Preliminary Reviewed'
                },
                {
                    'value':'80',
                    'name':'Accounting Reviewed'
                },
                {
                    'value':'90',
                    'name':'Invoiced'
                }
            ],
            'urgency':[
                {
                    'value':'10',
                    'name':'Low'
                },
                {
                    'value':'50',
                    'name':'Medium'
                },
                {
                    'value':'90',
                    'name':'High'
                },
                {
                    'value':'100',
                    'name':'Emergency!'
                }
            ],
            'sheet_type':[
                {
                    'value':'service_work_order',
                    'name':'Service Work Order'
                },
                {
                    'value':'pre-season_storage_check',
                    'name':'Pre-Season Storage Check'
                },
                {
                    'value':'refrigeratoin_start-up',
                    'name':'Refrigeration Start Up'
                },
            ],
            'billing_type':[
                {
                    'value':'ventilation',
                    'name':'Ventilation'
                },
                {
                    'value':'refrigeration',
                    'name':'Refrigeration'
                },
                {
                    'value':'electrical',
                    'name':'Electrical'
                },
                {
                    'value':'overtime',
                    'name':'Overtime'
                },
            ]
        }
    }
}
export default AppDataLegend;
