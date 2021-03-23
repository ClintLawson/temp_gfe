import React, { useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, Divider, FormControl, FormGroup, Grid, IconButton, InputLabel, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AcUnit, Add, CheckBox, CheckBoxOutlineBlank, Clear, DeleteForever, DoneAll, DoneOutlined, Edit, ExpandMore } from '@material-ui/icons';
import DialogRefrigerationUnitStartUp from './DiaglogRefrigerationUnitStartUp';
import FormRefrigerationSingleUnit from './FormRefrigerationSingleUnit';



const useStyles = makeStyles((theme) => ({
    checkbox:{
        
    },
    formSuccess:{
        // backgroundColor: theme.palette.success.light
        backgroundColor: theme.palette.successHighlight.main,
        '& .Mui-focused':{
            backgroundColor: theme.palette.successHighlight.main
        }
    },
    formIncomplete:{
        // backgroundColor: theme.palette.error.light
        backgroundColor: theme.palette.errorHighlight.main,
        '& .Mui-focused':{
            backgroundColor: theme.palette.errorHighlight.main
        }
    }
}))

const CustCheckbox = (props) => {
    return(
        <Checkbox 
            {...props}
            color='primary'
        />
)}

const RefrigerationStartUpForm = (props) => {
    const classes = useStyles()

    // PROPS VARIABLES HERE 
    const refrigForm = props.refrigerationStartUpFormData 
    const updateRefrigForm = props.updateRefrigerationStartUpForm 

    // refrigeration form object in parent
    // 'refrigeration_start_up_report':{
    //     'start_up_is_completed':false,
    //     'refrigeration_units':[]
    // },
    const newRefrigerationUnit = () =>{
        return {
        'unit_nickname':'',
        'created_at':(Date.now()),
        'vacuumed_control_panel':false,
        'checked_bypass_doors':false,
        'inspected_contactors':false,
        'compressors':[],
        'test_calibrate_controls':false,
        'check_failure_circuit':false
    }}

    const [refrigerationDialogOpen, setRefrigerationDialogOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)


    const selectedRefUnit = (index) => {
        if(refrigForm.refrigeration_units && refrigForm.refrigeration_units != ''){
            return refrigForm.refrigeration_units[index]
        }
        return 
    }

    const updateRefUnit = (index, field, value) => {
        console.log(index, field, value)
        let unit = selectedRefUnit(index)
        let otherUnits = refrigForm.refrigeration_units.filter(u => u !== unit)
        let allUnits = [...otherUnits, 
                {
                    ...unit,
                    // [field]:event.target.value
                    [field]:value
                }
            ]

        updateRefrigForm({
            ...refrigForm,
            refrigeration_units:allUnits.sort((a,b)=>
                a.created_at > b.created_at ?
                1 : -1
            )
        })
    }



    const addRefrigerationUnit = () => {
        props.updateRefrigerationStartUpForm({
            ...refrigForm,
            refrigeration_units:[
                ...refrigForm.refrigeration_units,
                newRefrigerationUnit()
            ]
        })
        setSelectedIndex(refrigForm.refrigeration_units.length)
        setRefrigerationDialogOpen(true)
    }

    const deleteRefUnit = (index) => {
        if(window.confirm(`DELETE Refrigeration Unit ${index+1} ?`) === false){
            return
        }
        let remainingUnits = refrigForm.refrigeration_units.filter((u, count)=> count !== index )
        props.updateRefrigerationStartUpForm({
            ...refrigForm,
            refrigeration_units:[
                ...remainingUnits
            ]
        })
    }

    const onCheckedHandler = (field, e) => {
        console.log(field, e.target.checked)
        props.updateRefrigerationStartUpForm({...refrigForm, [field]:e.target.checked})
    }

    return(
        <>
        <Accordion
        // expanded
            className={
                refrigForm.start_up_is_completed === true ? 
                classes.formSuccess : classes.formIncomplete
            }
        >
            <AccordionSummary 
                expandIcon={<ExpandMore />}
                
            >

                <div style={{ display:'flex', width:'15%', padding:'3px 0px 0px 0px'}}> 
                    {/* <PlaylistAddCheck fontSize='large' /> */}
                    <AcUnit />
                </div>

                <Typography variant='h6' align='center' style={{width:'70%'}} noWrap>
                    Refrigeration Start Up
                </Typography>

                <div style={{marginLeft:'3px', width:'15%', textAlign: 'end', paddingTop:'3px'}} >
                    {/* {tasksCompleted}/{tasksTotal}  */}
                    {
                        refrigForm.start_up_is_completed === true ?
                        <CheckBox />
                        // <DoneAll />
                        // <DoneOutlined />
                        :
                        <CheckBoxOutlineBlank />
                    }
                </div>

            </AccordionSummary>

            <AccordionDetails >

                <Grid container direction='row' justify='center'>
                    <Grid item xs={12} sm={12} md={12} lg={12}
                        hidden
                    >
                        <FormControl >

                            <Typography >
                                <span style={{fontWeight:'600'}}>
                                    Refrigeration Unit:
                                </span>
                                {/* <input /> */}
                            </Typography>



                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}
                        style={{marginBottom:'15px'}}
                    >
                        {/* {
                            refrigForm.refrigeration_units.map((r,index) => 
                                <Typography>
                                    Unit {index+1} {r.unit_nickname ? ' - ' : '' }{r.unit_nickname}
                                </Typography> 
                            )
                        } */}
                        {/* <TableContainer component={Paper} >
                            <Table size='small'>
                                <TableBody > */}
                                    <Divider style={{marginTop:'5px', marginBottom:'5px', color:'black'}} />

                                    {
                                        refrigForm.refrigeration_units.map((r, index)=> (
                                            <div key={r.created_at}>
                                                {/* <TableCell > */}

                                                    <FormRefrigerationSingleUnit 
                                                        // justAdded={true}
                                                        refrigerationUnit={r}
                                                        index={index}

                                                        getRefUnit={selectedRefUnit}
                                                        updateRefUnit={updateRefUnit}

                                                        deleteRefUnit={deleteRefUnit}
                                                    />
 
                                                {/* </TableCell> */}
                                            </div>
                                        ))
                                    }
                                {/* </TableBody>

                            </Table>
                        </TableContainer> */}
                    </Grid>

                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Button 
                            variant='contained' 
                            color='primary' 
                            fullWidth 
                            disableElevation
                            onClick={addRefrigerationUnit}
                            startIcon={
                                <Add />
                            }
                        >
                            Refrigeration Unit
                        </Button>
                    </Grid>

                    <Grid item xs={10} sm={6} md={5} lg={5}>
                            <FormGroup >
                                <FormControlLabel
                                    style={{display:'flex', justifyContent:'center', marginTop:'15px'}} 
                                    control={
                                        <CustCheckbox color='primary' 
                                        value={refrigForm.start_up_is_completed} 
                                        onChange={(e)=>onCheckedHandler('start_up_is_completed', e)}
                                        />
                                    }
                                    label={'Start Up Completed'}
                                />
                            </FormGroup>
                    </Grid>

                </Grid>
            </AccordionDetails>

        </Accordion>
        
        {/* Dialog to add new unit */}
        {/* <DialogRefrigerationUnitStartUp 
            open={refrigerationDialogOpen} 
            onClose={()=>setRefrigerationDialogOpen(false)} 
            selectedIndex={selectedIndex}
            refrigerationUnits={
                refrigForm ? 
                refrigForm.refrigeration_units 
                : []
            }
            
            selectedRefUnit={selectedRefUnit}
            updateRefUnit={updateRefUnit}
        /> */}

        {/* Dialog to update unit */}
        {/* <DialogRefrigerationUnitStartUp 

        /> */}

        </>
)}
export default RefrigerationStartUpForm;