import React, { useEffect, useState, useCallback } from 'react'
import Debounce from 'lodash/debounce'
// import { createHistory, LocationProvider } from '@reach/router'
import FormButton from '../globalComponents/FormButton'
import TableForTechHours from './TableForTechHours'
import TableForParts from './TableForParts'
import DialogFormAddPart from './DialogFormAddPart'
import PreSeasonForm from './PreSeasonForm'
import DataLegend from './data/AppDataLegend'

import ExpandMore from '@material-ui/icons/ExpandMore'
import Event from '@material-ui/icons/Event'
import Add from '@material-ui/icons/Add'
import AddAPhoto from '@material-ui/icons/AddAPhoto'

import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import { Button, ButtonGroup, debounce, Divider, FormHelperText, ListSubheader, Menu } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import RefrigerationStartUpForm from './RefrigerationStartUpForm'
import { ArrowBackIos, Flag, More, MoreVert, Publish, Save } from '@material-ui/icons'
import FormActionBar from './FormActionBar'
import FormActionButtons from './FormActionButtons'
import { globalHistory } from '@reach/router'
import { serviceSheetDefault } from './data/dataTemplates'
import AppDataLegend from './data/AppDataLegend'

const useStyles = makeStyles((theme)=> ({
    // appBar:{
    //     backgroundColor: 'grey',
    //     marginTop: '48px',
    //     position:'relative',
    //     borderRadius: '5px',
    //     height: '48px'
    // },
    primaryBG:{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    dangerousBG:{
        backgroundColor: theme.palette.dangerousButton.main,
        color: theme.palette.primary.contrastText
    },
    grayBG:{
        backgroundColor: 'grey',
        color: theme.palette.primary.contrastText
    },
    container: {
    //   marginTop: '64px',
      margin: '24px 0px',
      maxWidth: '1050px',
      paddingBottom:'20vh',
      [theme.breakpoints.down('md')]: {
        margin: '0px',
        width: '100%',
        padding: '0px',
        paddingBottom:'20vh',
      }, 
      [theme.breakpoints.up('lg')]: {
        // margin: '10px 0px',
        // paddingBottom:'20vh',
      },
    },
    paper: {
        padding: '10px',
        [theme.breakpoints.up('lg')]: {
            margin: '0px ',
        },
        [theme.breakpoints.down('xs')]: {
            // margin: '0px ',
            padding:'0px'
        },
    },
    paperTable:{
        backgroundColor: 'lightgrey'
    },
    accordion: {
        '&.MuiAccordion-root.Mui-expanded':{
            margin: '0px auto'
        },
    },
    accordionSum: {
        backgroundColor: 'black',
        color: theme.palette.primary.contrastText,
        '&.MuiAccordionSummary-root':{
            maxHeight: '30px',
            minHeight: '20px',
        },
        '& .MuiAccordion-root.Mui-expanded':{
            marginTop: '0px'
        },
    },
    expandIcon: {
        color: theme.palette.primary.contrastText,
    },
    square: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '0px'
        },
    },
    selectFormControl:{
        marginTop: '8px',
        '& .MuiOutlinedInput-root':{
            // borderRadius: '0px',
        }
    },
    selectInputLabel: {
        '&.MuiInputLabel-outlined': {
            transform: 'translate(14px, 12px) scale(1)',
        },
        '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)'
        }
    },
    inlineRadio:{
        '&.MuiFormControl-root': {
            flexDirection: 'row'
        }, 
        '& .PrivateSwitchBase-root-89':{
            padding: '0px'
        }
    },
    radioLabel: {
        margin: '10px 20px 4px 10px',
    }

}))

const AccordionCustom = withStyles({
    root:{
        '&.MuiAccordion-root.Mui-expanded':{
            margin: '0px auto'
        },
    }
})(Accordion)

const AccordionSumCustom = withStyles((theme)=> ({
    root:{
        backgroundColor: 'black',
        // borderTop: 'darkgrey solid 1px',
        marginTop: '1px',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.up('md')]:{
            '&.MuiAccordionSummary-root':{
                maxHeight: '30px',
                minHeight: '20px'
            },
        },
        '&.Mui-focused':{
            backgroundColor:'black'
        },
        '& .MuiAccordion-root.Mui-expanded':{
            // marginTop: '0px'
        },
    }
}))(AccordionSummary)

const AccordionDetailsCustom = withStyles({

})(AccordionDetails)

const ExpandMoreIcon = withStyles((theme)=>({
    root:{
        color: theme.palette.primary.contrastText,
    }
}))(ExpandMore)


const AccordionSection = (props) => {
    return(
        <AccordionCustom 
            {...props}
            elevation={0}
        >
            <AccordionSumCustom
                expandIcon={<ExpandMoreIcon />}
                >
                {/* {props.summary} */}
                <Box width='100%' display="flex" justifyContent="center" >
                    { !props.sum1 ? <></> :

                        <Box display='flex' width='100%' justifyContent='start' >
                            <Typography>
                                {props.sum1}
                            </Typography> 
                        </Box>
                    }
                    { !props.sum2 ? <></> :
                        <Box width='100%' justifyContent='center' >
                            <Typography align='center'>
                            {   props.sum2} 
                            </Typography>
                        </Box>
                    }
                    { !props.sum3 ? <></> :
                        <Box width='100%' justifyContent='end' >
                            <Typography align='right'>
                                {props.sum3}
                            </Typography>
                        </Box>
                    }
                </Box>
            </AccordionSumCustom>
            <AccordionDetailsCustom>
                <Grid container direction='row' justify='space-between' spacing={2} alignItems='stretch'>
                    {props.children}
                </Grid>
            </AccordionDetailsCustom>
        </AccordionCustom>
    )
}

const SelectInputCustom = (props) => {
    return(
        <FormControl variant="outlined" margin='dense' fullWidth >
            <InputLabel id={props.id}>{props.title}</InputLabel>
            <Select
                labelId={props.id}
                id={props.selectId}
                defaultValue={props.defaultValue ? props.defaultValue : ''}
                value={props.value}
                onChange={props.onChange}
                label={props.label}
                {...props}
            >
                {props.children}
            </Select>
            {
                props.error ? 
                <FormHelperText  children={props.helperText}/>
                :
                ''
            }
        </FormControl>
)}

// MAIN STARTS HERE
const CreateServiceSheet = (props) => {
    const classes = useStyles()
    const dataLegend = DataLegend().service_sheet
 
    // Incoming data
    const serviceTechs = props.serviceTechs
    const customers = props.customers
    const storages = props.storages
    const partsCatalog = props.parts
    const defaultForm = serviceSheetDefault()
    
    
    //Handle FORM DATA
    const [ form, setForm ] = React.useState(props.selectedSheet || defaultForm)
    const [errors, setErrors] = React.useState({})

    const refreshForm = () => {
        console.log('selected....',props.selectedSheet, form)
        const refreshedForm = (props.selectedSheet || defaultForm)
        // must reset both in order for the 'save as draft' protection to kick in
        setForm(refreshedForm)
        setOriginalForm(refreshedForm)  
        window.onbeforeunload = undefined  
        // setIsOriginalForm(true)
    }

    // detects when the form has been replaced with the redux 'selectedSheet'
    useEffect(()=>{
        refreshForm()
    },[props.selectedSheet])

    useEffect(()=>{
        //unmounts the selected item when this component navigated away from
        return props.unMountSelected 
    },[])
    
    // Preserve Original form to detect Changes & Alert if there are unsaved changes before renavigating
    const [orginalForm, setOriginalForm] = React.useState(form)
    
    // form controlls
    const [ dialogAddPart, setDialogAddPart ] = React.useState(false) 
    const openDialogAddPart = () => {
        setDialogAddPart(true)
    }
    const closeDialogAddPart = () => {
        setDialogAddPart(false)
    }

    // Utility functions
    const getTechShortName = (tech_id) => {
        const tech = serviceTechs.filter(t => t.id === tech_id)[0]
        return `${tech.firstName} ${tech.lastName[0].toUpperCase()}`
    }
    const getTechFullName = (tech_id) => {
        const tech = serviceTechs.filter(t => t.id === tech_id)[0]
        return `${tech.firstName} ${tech.lastName}`
    }


    const updateForm = (field, e) => {
        setForm({...form, [field] : e.target.value})
    }

        
    const updateRequestPhotos = (e) =>{
        // react docs say this should not be controlled. 
        setForm({...form, request_photos: e.target.files})
    }

    const addPart = (newPart) => {
        setForm({...form, 
            parts:[...form.parts, newPart]
        }) 
    } 
    
    const removePart = () => {

    }

    const updateAllTechsList = (event) => {
        const existing = (tech) => { return form.all_techs.filter(t => t.id === tech)[0] }
        let all_techs =  event.target.value.map((tech) =>  
            existing(tech) ? existing(tech) : 
            {
                'id':`${tech}`,
                'work_hours':'',
                'no_charge_hours': '',
                'notes' : ''
            }   
        )
        setForm({...form,
            'all_techs': all_techs
        })
    };

    const removeTech = (id) => {
        setForm({...form, all_techs:form.all_techs.filter(t => t.id !== id)})
    }

    const handleStartedFinishedFields = (field, e) => {
        const updatedForm = {...form, [field]: e.target.value}
        const elapsed_hours = calculateElapsedHours(updatedForm)
        if(elapsed_hours != undefined){
            setForm({...updatedForm, elapsed_hours: `${elapsed_hours.toFixed(1)}`})
        }
        else{
            setForm({...updatedForm})
        }
        isValidFinishDateTime(elapsed_hours)                
    }

    const calculateElapsedHours = (obj=form) => {
        // unless called by useEffect, this must be passed the most up to date version of form
        let elapsed_time
        if(obj.start_date && obj.finish_date){
            let start = new Date(Date.parse(
                `${obj.start_date}${obj.start_time && obj.finish_time ? ` ${obj.start_time}` : ''}`
            ))
            let finish = new Date(Date.parse(
                `${obj.finish_date}${obj.start_time && obj.finish_time ? ` ${obj.finish_time}` : ''}`
            ))
            elapsed_time = (finish.getTime()-start.getTime())/(1000*60*60)
        }
        return elapsed_time
    }

    const updatePreSeasonForm = (newForm) => {
        console.log('update Pre season.....',newForm)
        setForm({...form, 
            preseason_storage_check_report: newForm
        })
    }

    const updateRefrigerationStartUpForm = (newForm) => {
        // console.log('update refrigeration start up.....',newForm)
        setForm({...form, 
            refrigeration_start_up_report: newForm
        })
    }

    const updateTechHoursInfo = (updatedTech) => {
        let allTechs = form.all_techs.map(t => 
            t.id === updatedTech.id ? updatedTech : t
        )
        let updatedForm = {...form, all_techs: allTechs}
        setForm({...updatedForm})
    }

    const calculateTotalHours = (newForm) => {
        return newForm.all_techs.reduce(
            (sum, t) => parseFloat(t.work_hours ? t.work_hours : 0) + sum, 0
        ) + (newForm.travel_hours ? parseFloat(newForm.travel_hours) : 0)
    } 

    const calculateTotalNoCharge = (newForm) => {
        return newForm.all_techs.reduce(
            (sum, t) => parseFloat(t.no_charge_hours ? t.no_charge_hours : 0) + sum, 0
        ) + (parseFloat(newForm.travel_hours_no_charge) || 0)
    }
    
    const [ techHourTotals, setTechHourTotals ] = React.useState({})
    
    // keep hours totals updated... must be after declaration of form
    useEffect(()=>{
        const hours = calculateTotalHours(form)
        const noCharge = calculateTotalNoCharge(form)
        setTechHourTotals({
            'total_hours': hours,
            'total_no_charge_hours':noCharge,
            'total_billable_hours': (hours-noCharge).toFixed(1)
        })
    },[form.all_techs, form.travel_hours, form.travel_hours_no_charge])
    
    // Form Validations
    useEffect(()=>{
        setErrors({...errors, storage_input: validateStorage() })
    },[form.storage_id, form.customer_id])

    const validateStorage = () => {
        // if storage is undefined
        if(!form.storage_id){
            // no error storage can be blank 
            return
        }
        // must return '' if 1st if storage is undefined. otherwise Browser ERROR
        const storage = storages.filter(s => s.id === form.storage_id)[0]
        const errorMessage = `Storage owner is ${customers.find(c => c.id === storage.owner_id).name}`
        // if both are DEFINED
        if(form.customer_id && form.storage_id){
            // throw error if owner id of storage does not match customer id
            if(storage.owner_id != form.customer_id){
                return errorMessage
            }
            // delete errors.storage_input
            return
        }        
        // if customer is undefined
        if(!form.customer_id){
            // throw error  
            return errorMessage
        }
        return
    }

    useEffect(()=>{
        isValidFinishDateTime(calculateElapsedHours())                
    },[form.start_date, form.start_time, form.finish_date, form.finish_time])

    const isValidFinishDateTime = (elapsed_hours) => {
        // start date/time can't be greater than finished date/time
        if(parseFloat(elapsed_hours) < 0){
            setErrors({...errors, finish_date:"Finish is before Start"})
        }
        else{
            let updatedErrors = errors
            delete errors.finish_date
            setErrors({...updatedErrors})
        }
    }

    // Form Transformation Controlls according to its current status 
    const [approvalSectionIsHidden, setApprovalSectionIsHidden] = React.useState(true)
    const [scheduleSectionIsHidden, setScheduleSectionIsHidden] = React.useState(true)
    const [workPerformedSectionIsHidden, setWorkPerformedSectionIsHidden] = React.useState(true)

    const setHiddenSections = () => {
        setApprovalSectionIsHidden(parseInt(form.status) < 20)
        setScheduleSectionIsHidden(parseInt(form.status) < 30)
        setWorkPerformedSectionIsHidden(parseInt(form.status) < 40)

    }
    
    const [requestAccordion, setRequestAccordion] = React.useState(false)
    const [scheduleAccordion, setScheduleAccordion] = React.useState(false)
    const [workPerformedAccordion, setWorkPerformedAccordion] = React.useState(false)

    const setAccordionsExpanded = () => {
        setRequestAccordion(parseInt(form.status) <= 30 || parseInt(form.status) > 40)
        setScheduleAccordion(parseInt(form.status) >= 30)
        setWorkPerformedAccordion(parseInt(form.status) >= 40)
    }

    // const [focusedField, setFocusedField] = useState('')

    useEffect(()=>{
        setAccordionsExpanded()
        console.log('form status....')
        setHiddenSections()
    },[form.status])


// -------------------------------Unsaved changes protection----------------------------------------------

    // Save to Drafts on unload Event
    const getIsOriginalForm = () => (JSON.stringify(orginalForm) === JSON.stringify(form))
    const [isOrignalForm, setIsOriginalForm] = React.useState(getIsOriginalForm())
        

    useEffect(() => {
        // Unsaved Changes Descision pop up
        return () => {
            console.log('unloading', getIsOriginalForm())
            if(getIsOriginalForm() === false){
                // alert("Unsaved changes have been saved in DRAFTS")
                let decision = window.confirm("Save changes as Draft?")
                console.log('unloading... SAVED in DRAFTS', decision)
                if (decision){
                    props.saveDraft(form)
                }
            }
        }
    },[isOrignalForm])
    
    // This is just for testing purposes to see when the form changes 
    const displayForm = () => console.log('form updated....',form)
    
    useEffect(()=>{
        displayForm()

        // this must be a one way switch, it can only change to FALSE, 
        // ...never back to TRUE or the unload event will fire at the wrong time, due to the above useEffect.
        if(isOrignalForm === true){
            console.log('getting isOriginalForm...', getIsOriginalForm())
            setIsOriginalForm(()=>{
                return getIsOriginalForm()
            })        
        }

        console.log("original?...", getIsOriginalForm())
        if(!getIsOriginalForm()){
            console.log('adding unloading listener to prevent nav away and losing unsaved data')
            window.onbeforeunload = (e) => {
                // Cancel the event
                e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
                // Chrome requires returnValue to be set
                e.returnValue = '';
            } ;
        }
        else{
            console.log('removing listener...')
            window.onbeforeunload = undefined;
        }
        // on umount, overwrite the listener or it will fire in other parts of the app
        return () => {
            window.onbeforeunload = undefined
        }
    },[form])



    return (
        <>
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                {/* HEADER with Storage and  Service Type */}
        


        {/* REQUEST section */}
                <AccordionSection 
                    sum1={`
                            ${form.customer_id ? customers.find(c => c.id === form.customer_id).name : '?'} 
                            - 
                            ${form.storage_id ? storages.find(c => c.id === form.storage_id).name : '?'}
                        `}
                    sum2={dataLegend.status.find(s => s.value === form.status).name || '?'}

                    expanded={requestAccordion}
                    onChange={() => setRequestAccordion(!requestAccordion)}
                >
                    {/* Customer and Storage */}
                    <Grid item xs={12} sm={4} md={4}>
                        <Grid container spacing={1} direction={'column'} alignItems='stretch'>
                            {/* <SelectInputCustom title='Customer' label='customer' >
                                {customers.map((customer)=> (
                                    <MenuItem key={customer.id} value={customer.id} >
                                        {customer.name}
                                    </MenuItem>
                                ))}
                            </SelectInputCustom> */}
                            <Autocomplete 
                                value={customers.filter(c => c.id === form.customer_id)[0] || '' }
                                
                                variant='outlined'
                                autoComplete

                                options={customers.sort((c, b) => (c.name > b.name) ? 1:-1)} //sort in chrome requires returning 1 or -1 to determine order
                                getOptionLabel={(option)=> ((option.name || '') || '')} 
                                getOptionSelected={option => option.id === form.customer_id }
                                
                                onChange={(e, value) =>
                                    setForm({...form, 
                                        'customer_id':(value ? value.id : '')
                                    })
                                }
                                renderInput={(params) => 
                                    <TextField {...params} 
                                        label="Customer" 
                                        margin="normal" 
                                        variant='outlined'
                                        margin='dense'
                                        error={form.customer_id ? false : true}
                                    />
                                }
                                
                            />
                            {/* <SelectInputCustom title='Storage' label='storage' >
                                {storages.map((storage)=>(
                                    <MenuItem key={storage.id} value={storage.id}>
                                        {storage.name}
                                    </MenuItem>
                                ))}
                            </SelectInputCustom> */}
                            <Autocomplete 
                                value={storages.filter(s => s.id === form.storage_id)[0] || '' }

                                variant='outlined'
                                autoComplete

                                options={form.customer_id ? 
                                    storages.filter(s => s.owner_id === form.customer_id) :
                                    storages
                                }
                                groupBy={option => option.owner_id}
                                renderGroup={(params) => 
                                    [
                                    <Divider />,
                                    <ListSubheader  key={params.key} component="div" disableSticky={true}>
                                      {customers.filter(c => c.id === params.group)[0].name}
                                    </ListSubheader >,
                                    params.children,
                                    ] 
                                }

                                getOptionLabel={(option)=>(option.name || '')}
                                getOptionSelected={option => option.id === form.storage_id }
                                
                                onChange={(e, value)=>{
                                    setForm({...form, 
                                        'storage_id':(value ? value.id : ''),
                                        'customer_id':(value ? value.owner_id : form.customer_id)
                                    })
                                }}
                                
                                renderInput={(params) => 
                                    <TextField {...params} 
                                        label="Storage" 
                                        margin="normal" 
                                        variant='outlined'
                                        margin='dense'
                                        // error when customer_id doesn't match storage owner_id
                                        error={errors.storage_input || form.storage_id === '' ? true : false}
                                        helperText={errors.storage_input}
                                        // error={form.storage_id ? false : true}
                                    
                                    />
                                    
                                }
                            />
                        </Grid>
                    </Grid>
                    
                    {/* Requester and Urgency */}
                    <Grid item xs={12} sm={4} md={4}>
                        <Grid container spacing={1} direction={'column'}>
                            <SelectInputCustom 
                                title='Urgency' 
                                label='urgency' 
                                defaultValue='normal' 
                                value={form.urgency}
                                onChange={e => updateForm('urgency',e)}
                            >
                                {
                                    dataLegend.urgency.map(choice => 
                                        <MenuItem key={choice.value} value={choice.value}>{choice.name}</MenuItem>
                                )}
                            </SelectInputCustom>
                            <TextField 
                                value={form.requested_by}
                                onChange={e => updateForm('requested_by', e)}
                                variant='outlined' 
                                margin='dense' 
                                label='Requested By' 
                                error={form.requested_by === '' ? true : false}
                            />
                            
                        </Grid> 

                    </Grid>

                    {/* Status & Type */}
                    <Grid item xs={12} sm={4} md={4}>
                        <Grid container spacing={1} direction={'column'}>
                            <SelectInputCustom title='Status' label='status' 
                                value={form.status}
                                onChange={e => updateForm('status', e)}
                            >
                                {
                                    dataLegend.status.map((choice) => 
                                        <MenuItem key={choice.value} value={choice.value}>{choice.name}</MenuItem>
                                    )
                                }
                            </SelectInputCustom>

                            <TextField 
                                variant='outlined' 
                                label='P.O. #' 
                                margin='dense'
                                value={form.purchase_order_no}
                                onChange={e => updateForm('purchase_order_no', e)}
                            />
{/* 
                            <Autocomplete 
                                autoSelect
                                value={form.type_of_work}
                                onChange={(e, value) => setForm({...form, type_of_work:(value || '')})}
                                options={[
                                        "Climate Automation",
                                        "Ventalation",
                                        "Humidification",
                                        "Refrigeration", 
                                        "VFD / Pump",
                                        "Electrical",
                                        "Pre-Season Storage check",
                                        "Refrigeration Start Up",
                                        
                                        
                                    ].map(option => option)
                                }
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        label='Type of Work'
                                        margin='dense'
                                        variant='outlined'
                                        error={form.type_of_work === '' ? true : false}
                                    />
                                }
                            /> */}
                            

                        </Grid>

                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider  style={{width: '100%', marginTop:'8px', marginBottom:'8px'}} />

                        <Grid container spacing={0}>

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField 
                                    label='Request Notes'
                                    placeholder='What is the issue? (not visible to customer)'
                                    multiline
                                    variant='outlined'
                                    margin='dense'
                                    fullWidth
                                    rows={2}
                                    rowsMax='4'
                                    value={form.request_notes}
                                    onChange={e => updateForm('request_notes', e)}
                                    error={form.request_notes ? false : true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                            {/* https://medium.com/trabe/controlled-file-input-components-in-react-3f0d42f901b8 */}
                            {/* https://codeburst.io/react-image-upload-with-kittens-cc96430eaece */}
                                <Button color='primary' style={{margin:'5px'}}
                                    disabled
                                    onClick={()=>document.getElementById("addPhotos").click()}
                                >   
                                    <AddAPhoto/>
                                        <input id='addPhotos' 
                                            type='file' 
                                            accept='image/*' 
                                            multiple 
                                            hidden
                                            files={form.request_photos}
                                            onChange={(e)=>updateRequestPhotos(e)}
                                        />
                                        <div style={{marginLeft: '15px'}}> Add Photos</div>
                                </Button>
                            </Grid>

                        </Grid>
                                            
                    </Grid>

                    {/* <Grid 
                        item 
                        hidden={approvalSectionIsHidden}
                        xs={12} sm={12} md={12} lg={12}
                    >
                        <Divider  style={{width: '100%', marginTop:'8px', marginBottom:'8px'}} />
                        <Grid container 
                            spacing={1}
                        >
                            <Grid item xs={12} sm={4} md={4}>
                                    <TextField 
                                        variant='outlined' 
                                        label='Approved By' 
                                        margin='dense'
                                        value={form.approved_by}
                                        onChange={e => updateForm('approved_by', e)}
                                        fullWidth
                                        />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}> 

                            </Grid>
                            <Grid item sm={4} md={4}></Grid>
                        </Grid>
                    </Grid> */}

                </AccordionSection>

        {/* APPROVAL */}
                {/* <AccordionSection
                    // sum1={'Approval Details'}
                    sum1={`Approved By: ${form.approved_by || '--'}`}
                    sum2={`PO#: ${form.purchase_order_no || '--'}`}
                    >

                </AccordionSection> */}

            {/* SCHEDULe */}
                <AccordionSection 
                    sum1={form.scheduled_date ? 
                            new Date(
                                parseInt(form.scheduled_date.slice(0,4)),
                                parseInt(form.scheduled_date.slice(5,7)-1),
                                parseInt(form.scheduled_date.slice(8,10))
                            ).toDateString() 
                            : 'Not Scheduled'
                        }
                    sum2={form.lead_tech ? `${getTechShortName(form.lead_tech)}` : 'Unassigned'}

                    hidden={scheduleSectionIsHidden}
                    expanded={scheduleAccordion}
                    onChange={()=>setScheduleAccordion(!scheduleAccordion)}
                >
                    {/* Date Time */}
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={1} direction={'row'}>
                            <Grid item xs={12} sm={4} md={3}  >
                                <SelectInputCustom title='Sheet Type' label='sheet_type' 
                                    value={form.sheet_type}
                                    onChange={e => updateForm('sheet_type', e)}
                                    error={ form.sheet_type === ''? true : false }
                                    // helperText={form.sheet_type === '' ? 'Sheet Type is required' : undefined}
                                >
                                    {
                                        AppDataLegend().service_sheet.sheet_type.map(t => 
                                            <MenuItem value={t.value}>{t.name}</MenuItem>                                            
                                        )
                                    }
                                </SelectInputCustom>
                            </Grid>
                            <Grid item xs={12} sm={5} md={3}  >
                                <TextField style={{maxWidth:'50%', width:'50%'}}
                                    id="date"
                                    label="Scheduled Date"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="date"
                                    format="MM/dd/yyyy"
                                    value={form.scheduled_date}
                                    onChange={e => updateForm('scheduled_date',e)}
                                    // fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField style={{maxWidth:'50%', width:'50%'}}
                                    id="time"
                                    label="Time"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="time"
                                    value={form.scheduled_time}
                                    onChange={e => updateForm('scheduled_time',e)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />  
                                {/* <Event style={{marginTop:'15px', marginLeft: '10px' }}/> */}

                            </Grid>

                            <Grid item xs={12} sm={3} md={3} >
                                <SelectInputCustom 
                                    title='Billing Type'
                                    label='billing_type'
                                    value={form.billing_type}
                                    onChange={(e) => updateForm('billing_type', e)}
                                >
                                    {
                                        AppDataLegend().service_sheet.billing_type.map(t => 
                                            <MenuItem value={t.value}>{t.name}</MenuItem>                                            
                                        )
                                    }
                                </SelectInputCustom>
                            </Grid>
                            
                        </Grid>
                    {/* </Grid> */}
                    
                    {/* <Grid item xs={12} sm={12} md={12} > */}
                        <Grid container spacing={1} >
                            {/* Lead Tech */}
                            <Grid item xs={12} sm={4} md={4} >
                                <SelectInputCustom 
                                    title='Lead Tech' 
                                    label='lead_tech'
                                    value={form.lead_tech} 
                                    onChange={(e) => updateForm('lead_tech', e)}
                                >
                                    {serviceTechs.map((tech) => (
                                        <MenuItem key={tech.id} value={tech.id}>
                                            {tech.firstName}  {tech.lastName}
                                        </MenuItem>
                                    ))}
                                </SelectInputCustom>
                            </Grid>
                            {/* All Techs */}
                            <Grid item xs={12} sm={8} md={8} >
                                <FormControl  variant="outlined" fullWidth className={classes.selectFormControl}>
                                    <InputLabel id="all_techs-label" className={classes.selectInputLabel} >All Techs</InputLabel>
                                    <Select multiple
                                    id="all_techs"
                                    label='all_techs'
                                    labelId="all_techs-label"
                                    variant='outlined'
                                    
                                    margin='dense'
                                    value={form.all_techs.map(t => t.id)}
                                    renderValue={(selected) => selected.map(t => getTechShortName(t)).join(', ')}
                                    onChange={updateAllTechsList}
                                    MenuProps={{
                                        getContentAnchorEl: () => null,
                                        PaperProps: {
                                            style: {
                                                maxHeight: 48 * 4.2 + 8,
                                                width: 250,
                                            },
                                        },
                                    }}
                                    >
                                    {serviceTechs.map((tech) => (
                                        <MenuItem key={tech.id} value={tech.id}>
                                            <Checkbox checked={form.all_techs.map(t => t.id).indexOf(tech.id) > -1} />
                                            <ListItemText primary={`${tech.firstName} ${tech.lastName}`} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    {/* </Grid> */}
                    {/* Prep Notes */}
                    {/* <Grid item xs={12} sm={12} md={12} > */}
                        <TextField
                            id="outlined-textarea"
                            label="Prep Notes"
                            placeholder="Job advice, Tools, Parts, etc... (Staff Only)"
                            multiline
                            rows={2}
                            rowsMax={10}
                            fullWidth
                            margin={'dense'}
                            variant="outlined"
                            value={form.preparation_notes}
                            onChange={e => updateForm('preparation_notes',e)}
                        />

                    </Grid>
                    
                </AccordionSection>


                <AccordionSection 
                    sum1={'Work Performed'}

                    hidden={workPerformedSectionIsHidden}
                    expanded={workPerformedAccordion}
                    onChange={()=>setWorkPerformedAccordion(!workPerformedAccordion)}
                >   

                    <Grid item xs={12} sm={6} md={5}>
                        <Grid container spacing={0} direction={'row'}>
                            <Grid item xs={7} sm={7} md={6}  >
                                <TextField
                                    id="date"
                                    label="STARTED"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="date"
                                    value={form.start_date || ''}
                                    onChange={(e) => handleStartedFinishedFields('start_date', e)}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={5}   >
                                <TextField
                                    id="time"
                                    label="Time"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="time"
                                    value={form.start_time || ''}
                                    onChange={(e) => handleStartedFinishedFields('start_time', e)}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />  
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <Divider dark style={{width: '100%'}} /> */}

                    <Grid item xs={12} sm={6} md={5}>
                        <Grid container spacing={0} direction={'row'}>
                            <Grid item xs={7} sm={7} md={6} >
                                <TextField
                                    id="date"
                                    label="FINISHED"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="date"
                                    value={form.finish_date || ''}
                                    onChange={(e) => handleStartedFinishedFields('finish_date', e)}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={errors.finish_date ? true : false}
                                    helperText={errors.finish_date || ''}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5} md={5}   >
                                <TextField
                                    id="time"
                                    label="Time"
                                    variant={'outlined'}
                                    margin={'dense'}
                                    type="time"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={form.finish_time || ''}
                                    onChange={(e) => handleStartedFinishedFields('finish_time', e)}
                                    error={errors.finish_date ? true : false}
                                    // helperText={errors.finish_time || ''}
                                />  
                                {/* <Event style={{marginTop:'15px', marginLeft: '10px' }}/> */}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <TextField 
                            label={'Travel Time'} 
                            variant='outlined'
                            type='number' 
                            margin='dense'
                            placeholder='Hours'
                            fullWidth
                            value={form.travel_hours}
                            onChange={(e)=>setForm({...form, travel_hours: e.target.value})}
                            inputProps={{
                                min:'0',
                                max:'100',
                                step:'.1',
                            }}
                            />
                    </Grid>

            {/* Additional forms go here!!!!! */}
                    
                            {/* PRE - SEASON FORM */}
                    {
                        form.sheet_type === 'pre-season_storage_check' ? 
                        <Grid item xs={12} sm={12} md={12} >
                            <PreSeasonForm 
                                preSeasonFormData={form['preseason_storage_check_report']}
                                updatePreSeasonForm={updatePreSeasonForm}
                                />
                        </Grid>
                        : ''
                    }

                            {/* REFRIGERATION START UP FORM */}
                    {
                        form.sheet_type === 'refrigeratoin_start-up' ? 
                        <Grid item xs={12} sm={12} md={12} >
                            <RefrigerationStartUpForm 
                                refrigerationStartUpFormData={form['refrigeration_start_up_report']}
                                updateRefrigerationStartUpForm={updateRefrigerationStartUpForm}
                                />
                        </Grid>
                        : '' 
                    }

            {/* ------------------------------------- */}

                    <Grid item xs={12} sm={9} md={10} >
                        <FormControl component="div" margin='dense' className={classes.inlineRadio}
                            fullWidth
                        >
                            <FormLabel 
                                style={{maxWidth:'45%'}}
                                component="div" 
                                color='primary' 
                                className={classes.radioLabel}
                                error={form.follow_up_required === 'true' ? true : false}
                            >
                                Follow Up Required?
                            </FormLabel>
                            <RadioGroup
                                name="follow_up" 
                                row
                                value={form.follow_up_required}
                                onChange={e => updateForm('follow_up_required', e)}
                                
                            >
                                <FormControlLabel value={'true'} control={<Radio size='small' />} label="Yes" />
                                <FormControlLabel value={'false'} control={<Radio size='small' color='primary'/>} label="No" />
                            </RadioGroup>
                            
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12} >
                        <TextField
                            id="outlined-textarea"
                            label="Work Performed"
                            placeholder="Viewable by Customer..."
                            multiline
                            rows={2}
                            rowsMax={7}
                            fullWidth
                            value={form.work_performed} 
                            onChange={e => updateForm('work_performed', e)}                           
                            margin={'dense'}
                            variant="outlined"
                        />

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} >
                        <Paper className={classes.paperTable}>
                            <TableForParts rows={form.parts} >

                            </TableForParts>
                            <FormButton onClick={openDialogAddPart} >
                                PART
                                <Add fontSize='small'/>
                            </FormButton>

                            {/* ADD PARTS FORM */}
                            <DialogFormAddPart 
                                addPart={addPart} 
                                open={dialogAddPart}
                                onClose={closeDialogAddPart}
                            />

                        </Paper>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} >
                        <Paper className={classes.paperTable}>
                            <TableForTechHours 
                                elapsed_hours={form.elapsed_hours} 
                                rows={form.all_techs} 
                                getTechFullName={getTechFullName}
                                updateTechHoursInfo={updateTechHoursInfo} 
                                removeTech={removeTech}
                                form={form}
                                setForm={setForm}
                                totals={techHourTotals}
                            />

                        </Paper>

                    </Grid>


                </AccordionSection>
            
            </Paper>
        </Container>
        
            <FormActionBar >
                <FormActionButtons 
                    form={form}
                    submit={props.submitNew}
                    update={props.update}
                />
            </FormActionBar>

        </>
    )
}
export default CreateServiceSheet;