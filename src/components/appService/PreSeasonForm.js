import React, { useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
// import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { keys } from '@material-ui/core/styles/createBreakpoints'
import { Add, Backspace, BackspaceOutlined, DoneAll, PlaylistAddCheck, DeleteForever } from '@material-ui/icons'
import FormButton from '../globalComponents/FormButton'
import SingleInputAndButton from '../globalComponents/SingleInputUncontrolledAndButton'

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

const PreSeasonForm = (props) => {
    const classes = useStyles()

    const [formComplete, setFormComplete] = useState(false) 

    const [tasksCompleted, setTasksCompleted] = useState(0)
    const [tasksTotal, setTasksTotal] = useState(23)

    const preSeasonIsCompleted = () => {
        let count = 0
        for(const field in props.preSeasonFormData){
            if(props.preSeasonFormData[field] === true){ count++ }
        }

        if(count >= tasksTotal){
            setFormComplete(true)
        }
        else{
            setFormComplete(false)
        }
        setTasksCompleted(count)
    }
    
    
    const onCheckedHandler = (field, e) => {
        console.log(field, e.target.checked)
        props.updatePreSeasonForm({...props.preSeasonFormData, [field]:e.target.checked})
    }

    const addFanMotorAmps = (amps) => {
        if(isNaN(amps) || amps === ''){
            return
        }

        const amps_list = props.preSeasonFormData.fans_motors_amps || []

        props.updatePreSeasonForm({...props.preSeasonFormData, 
            fans_motors_amps:[...amps_list, amps]
        })
    }

    const popLastFanMotorAmps = () => {
        let amps_list = props.preSeasonFormData.fans_motors_amps || []
        amps_list.pop()
        props.updatePreSeasonForm({...props.preSeasonFormData, 
            fans_motors_amps:amps_list
        })
    }

    const addClimcellPumpMotorAmps = (amps) => {
        if(isNaN(amps) || amps === ''){
            return
        }

        const amps_list = props.preSeasonFormData.climacell_pump_motors_amps || []

        props.updatePreSeasonForm({...props.preSeasonFormData, 
            climacell_pump_motors_amps:[...amps_list, amps]
        })
    }

    const popLastClimcellPumpMotorAmps = () => {
        let amps_list = props.preSeasonFormData.climacell_pump_motors_amps || []
        amps_list.pop()
        props.updatePreSeasonForm({...props.preSeasonFormData, 
            climacell_pump_motors_amps:amps_list
        })
    }

    const addHumidifiersMotorsAmps = (amps) => {
        if(isNaN(amps) || amps === ''){
            return
        }

        const amps_list = props.preSeasonFormData.humidifiers_motors_amps || []

        props.updatePreSeasonForm({...props.preSeasonFormData, 
            humidifiers_motors_amps:[...amps_list, amps]
        })
    }

    const popLastHumidifiersMotorsAmps = () => {
        let amps_list = props.preSeasonFormData.humidifiers_motors_amps || []
        amps_list.pop()
        props.updatePreSeasonForm({...props.preSeasonFormData, 
            humidifiers_motors_amps:amps_list
        })
    }

    // updates preseason form completion status
    useEffect(()=>{
        preSeasonIsCompleted()
    },[props.preSeasonFormData])

    return(
        <Accordion 
            elevation={3} 
            className={formComplete ? classes.formSuccess : classes.formIncomplete}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                
                <div style={{ display:'flex', width:'15%'}}> 
                    <PlaylistAddCheck fontSize='large' />

                </div>
                <Typography variant='h6' align='center' style={{width:'70%'}} noWrap>

                    Pre-Season Form 
                    {/* <DoneAll fontSize='medium' /> */}

                </Typography>

                <Typography variant='h6' style={{marginLeft:'3px', width:'15%', textAlign: 'end'}} noWrap>
                        {tasksCompleted}/{tasksTotal} 
                </Typography>

            </AccordionSummary>

            <AccordionDetails>

            <FormControl component="fieldset"  >
            {/* <Divider /> */}
                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>Fresh Air Doors</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox color='primary' 
                            value={props.preSeasonFormData.fresh_air_doors_actuators_lubed_doors_tested} 
                            onChange={(e)=>onCheckedHandler('fresh_air_doors_actuators_lubed_doors_tested', e)}
                        />}
                        label="Lubricate actuator(s), test door(s) open & closed."
                        />
                    
                    <FormControlLabel
                        control={<CustCheckbox  name="jason" 
                            value={props.preSeasonFormData.fresh_air_doors_are_calibrated} 
                            onChange={(e)=>onCheckedHandler('fresh_air_doors_are_calibrated', e)}
                        />}
                        label="Check settings & make necessary calibrations."
                        />
                </FormGroup>

                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>Louvers</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                            onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                        />}
                        label="Lubricate all linkage & ball joints, test louver(s) open & closed."
                    />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.louver_linkages_and_mod_motors_checked} 
                            onChange={(e)=>onCheckedHandler('louver_linkages_and_mod_motors_checked', e)}    
                        />}
                        label="Check linkage & operation of mod motors."
                    />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.louvers_are_calibrated} 
                            onChange={(e)=>onCheckedHandler('louvers_are_calibrated', e)}    
                        />}
                        label="Check settings & make necessary calibrations."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.exhaust_louvers_checked} 
                            onChange={(e)=>onCheckedHandler('exhaust_louvers_checked', e)}    
                        />}
                            label="Check exhaust louver(s)."
                        />
                </FormGroup>

                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>Fans</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.fans_checked_for_cracks_and_damage} 
                            onChange={(e)=>onCheckedHandler('fans_checked_for_cracks_and_damage', e)}    
                        />}
                        label="Inspect fan propellers & frames for cracks or other damage."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.fans_motors_tested_and_inspected} 
                            onChange={(e)=>onCheckedHandler('fans_motors_tested_and_inspected', e)}    
                        />}
                        label="Run fan motor(s) & check for any unusual bearing noise."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.fans_motors_amps_checked} 
                            onChange={(e)=>onCheckedHandler('fans_motors_amps_checked', e)}    
                        />}
                        label={
                            <>
                                <span>Record amperages of fan motors. </span>
                                <div style={{fontWeight:'600'}}>
                                    {
                                        props.preSeasonFormData.fans_motors_amps ?
                                        props.preSeasonFormData.fans_motors_amps.map((f, index) => `(${index+1})${f}a`).join(' - ')
                                        : ''
                                    }
                                </div>
                            </>
                        }
                    />

                    <SingleInputAndButton 
                        style={{marginLeft:'20px'}}
                        inputProps={{
                            type:'number',
                            inputMode:"numeric",
                            placeholder:'AMPS',
                        }}
                        onClick1={addFanMotorAmps}
                        button1={
                            <>
                                <Add />
                                ADD
                            </>
                        }

                        button2={
                            <>
                                {/* <BackspaceOutlined /> */}
                                {/* <Backspace /> */}
                                <DeleteForever />
                            </>
                        }
                        onClick2={popLastFanMotorAmps}
                    >

                    </SingleInputAndButton>
                    
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.fans_frequency_drives_checked} 
                            onChange={(e)=>onCheckedHandler('fans_frequency_drives_checked', e)}    
                        />}
                        label="Check operation of Frequency Drive(s)."
                        />
                </FormGroup>

                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>ClimaCell</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.climacell_tank_cleaned_refilled_and_float_inspected} 
                            onChange={(e)=>onCheckedHandler('climacell_tank_cleaned_refilled_and_float_inspected', e)}    
                        />}
                        label="Clean tank, check operation of float valve, and fill tank with fresh water."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.climacell_pumps_checked_and_cleaned} 
                            onChange={(e)=>onCheckedHandler('climacell_pumps_checked_and_cleaned', e)}    
                        />}
                        label="Check operation of pump and clean screens around pump."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.climacell_distribution_pipe_cleaned} 
                            onChange={(e)=>onCheckedHandler('climacell_distribution_pipe_cleaned', e)}    
                        />}
                        label="Clean distribution pipe on top of ClimaCell."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.climacell_aspirator_cabinet_and_wick_checked_cleaned} 
                            onChange={(e)=>onCheckedHandler('climacell_aspirator_cabinet_and_wick_checked_cleaned', e)}    
                        />}
                        label="If applicable, clean aspirator cabinet and check wick."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.climacell_pump_motors_amps_checked} 
                            onChange={(e)=>onCheckedHandler('climacell_pump_motors_amps_checked', e)}    
                        />}
                        label={
                            <>
                                <span>Record amperages of pumps. </span>
                                <div style={{fontWeight:'600'}}>
                                    {
                                        props.preSeasonFormData.climacell_pump_motors_amps ?
                                        props.preSeasonFormData.climacell_pump_motors_amps.map((f, index) => `(${index+1})${f}a`).join(' - ')
                                        : ''
                                    }
                                </div>
                            </>
                        }
                        
                    />

                    <SingleInputAndButton 
                        style={{marginLeft:'20px'}}
                        inputProps={{
                            type:'number',
                            inputMode:"numeric",
                            placeholder:'AMPS',
                        }}
                        onClick1={addClimcellPumpMotorAmps}
                        button1={
                            <>
                                <Add />
                                ADD
                            </>
                        }

                        button2={
                            <>
                                {/* <BackspaceOutlined /> */}
                                {/* <Backspace /> */}
                                <DeleteForever />
                            </>
                        }
                        onClick2={popLastClimcellPumpMotorAmps}
                    />

                </FormGroup>

                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>Humidifiers</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.humidifiers_water_tubs_float_valves_cleaned_refilled} 
                            onChange={(e)=>onCheckedHandler('humidifiers_water_tubs_float_valves_cleaned_refilled', e)}    
                        />}
                        label="Clean water tubs, check operation of float valve, and fill with fresh water."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.humidifiers_motors_tested_inspected} 
                            onChange={(e)=>onCheckedHandler('humidifiers_motors_tested_inspected', e)}    
                        />}
                        label="Run humidifier motor(s) and check for any unusual bearing noise."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.humidifiers_motors_amps_checked} 
                            onChange={(e)=>onCheckedHandler('humidifiers_motors_amps_checked', e)}    
                        />}
                        label={
                            <>
                                <span>Record amperages of humidifier motors. </span>
                                <div style={{fontWeight:'600'}}>
                                    {
                                        props.preSeasonFormData.humidifiers_motors_amps ?
                                        props.preSeasonFormData.humidifiers_motors_amps.map((f, index) => `(${index+1})${f}a`).join(' - ')
                                        : ''
                                    }
                                </div>
                            </>
                        }
                        />

                    <SingleInputAndButton 
                        style={{marginLeft:'20px'}}
                        inputProps={{
                            type:'number',
                            inputMode:"numeric",
                            placeholder:'AMPS',
                        }}
                        onClick1={addHumidifiersMotorsAmps}
                        button1={
                            <>
                                <Add />
                                ADD
                            </>
                        }

                        button2={
                            <>
                                {/* <BackspaceOutlined /> */}
                                {/* <Backspace /> */}
                                <DeleteForever />
                            </>
                        }
                        onClick2={popLastHumidifiersMotorsAmps}
                    />

                </FormGroup>

                <Typography variant='subtitle1'><span style={{textDecoration:'underline'}}>Control Panel</span></Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.control_panel_modes_tested} 
                            onChange={(e)=>onCheckedHandler('control_panel_modes_tested', e)}    
                        />}
                        label="	Test modes of operation for proper function."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.control_panel_sensors_checked_calibration} 
                            onChange={(e)=>onCheckedHandler('control_panel_sensors_checked_calibration', e)}
                        />}
                        label="Check sensor(s) calibration - Outdoor air control, plenum, low limit safety, humidity)"
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.control_panel_light_tree_bulbs_checked} 
                            onChange={(e)=>onCheckedHandler('control_panel_light_tree_bulbs_checked', e)}
                        />}
                        label="Check light bulbs in light tree"
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.control_panel_cleaned_inside_out} 
                            onChange={(e)=>onCheckedHandler('control_panel_cleaned_inside_out', e)}
                        />}
                        label="Clean interior and exterior of control panel."
                        />
                    <FormControlLabel
                        control={<CustCheckbox  
                            value={props.preSeasonFormData.control_panel_setpoint_is_set} 
                            onChange={(e)=>onCheckedHandler('control_panel_setpoint_is_set', e)}
                        />}
                        label="Set plenum temperature at 55°. Control panel ok - ready to run."
                        />
                </FormGroup>

            </FormControl>

            </AccordionDetails>

        </Accordion>
    )
}
export default PreSeasonForm;