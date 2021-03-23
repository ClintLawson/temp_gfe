export const serviceSheetDefault = () => (
    {
        'customer_id':'',
        'storage_id':'', 
        'requested_by':'', // string name
        'urgency':'50', //10
        'status':'10', //40
        'billing_type':'',
        // 'type_of_work': '', //**this has been depricated
        'request_notes':'',
        'request_photos':[],
        // 'approved_by':'', //**depricated
        'purchase_order_no':'',
        'sheet_type':'service_work_order', //refrigeratoin_start-up, pre-season_storage_check
        'scheduled_date':'', //2020-02-25
        'scheduled_time':'',//06:14
        'lead_tech':'',
        'all_techs':[],
        'preparation_notes':'',
        'start_date':'', //2020-02-26
        'start_time':'', //06:15
        'finish_date':'',
        'finish_time':'',
        'travel_hours':'',
        'refrigeration_start_up_report':{
            'start_up_is_completed':'',
            'refrigeration_units':[

            ]
        },
        'preseason_storage_check_report':{

        },
        'follow_up_required':'',
        'parts':[
            
        ],
        'elapsed_hours':'',
        'travel_hours_no_charge':'',
        'flagged':false,
        
        // META data
        'created_at_client': '',
        'created_at_server': '',
        'created_by': ''
        
    }
)