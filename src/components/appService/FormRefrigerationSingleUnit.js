import { FormControlLabel, Grid, IconButton, Typography, Checkbox, TextField, Button, Divider } from '@material-ui/core';
import { Add, AddCircle, DeleteForever } from '@material-ui/icons';
import React, { useEffect } from 'react'
import FormRefrigCompressorSingle from './FormRefrigCompressorSingle'

// const CustCheckbox = (props) => {
//     return(
//         <Checkbox 
//             {...props}
//             color='primary'
//         />
// )}


const FormRefrigerationSingleUnit = (props) => {

    // PROPS
    const refUnit = props.refrigerationUnit
    const index = props.index
    const getRefUnit = props.getRefUnit
    const updateRefUnit = props.updateRefUnit

    
    const [unitNickname, setUnitNickname] = React.useState(refUnit ? refUnit.unit_nickname : '')
    
    const compressors = refUnit !== undefined ? refUnit.compressors : []
    
    const addCompressor = () => {
        let newCompressor = {
            // 'name':'test compressor', 
            'created_at':Date.now(),
            'run_system':false,
            'check_oil':false,
            'check_refrigerant_levels': false,
            'suction_psi':'',
            'discharge_psi':'',
            'heater_amps':[],
            'compressor_loaded_amps':[],
            'fans_amps':[]
        }
        let otherCompressors = [
            ...compressors,
            newCompressor
        ]
        updateRefUnit(index, 'compressors', otherCompressors)
    }

    const updateCompressor = (compressorIndex, field, value) => {
        let selectedCompressor = compressors[compressorIndex]
        let updatedCompressor = {
            ...selectedCompressor,
            [field]:value
        }
        let freshCompressors = compressors
        compressors[compressorIndex] = updatedCompressor
        updateRefUnit(index, 'compressors', freshCompressors)
    }

    const deleteCompressor = (compIndex, created_at) => {
        if(window.confirm(`DELETE Compressor ${compIndex+1} from Unit ${index+1} ?`) === false){
            return
        }
        let remainingCompressors = compressors.filter(c => c.created_at !== created_at)
        updateRefUnit(index, 'compressors', remainingCompressors)
        console.log('delete compressor....', index, 'compressors', remainingCompressors)
    }

    //set cursor focus to nickname field on initial
    useEffect(()=>{
        document.getElementById(`unit${index}`).focus()
        // document.getElementById(`unit${index}`).scrollTop -= 10
        document.getElementById(`unit${index}`).scrollIntoView({behavior: "smooth"})
    },[])

    useEffect(()=>{
        console.log(`updating Unit: ${index}`, refUnit, )
    },[refUnit])

    useEffect(()=>{
        console.log(`compressors...`, compressors )
    },[compressors])

    return(
        <>

            <Grid container spacing={0}>

                <Grid item  xs={12} sm={12} md={12}>
                    {/* <Typography style={{display:'flex', justifyContent:'space-between', width:'100%'}}> */}
                        {/* <div> */}
                            {/* {index+1} */}
                            {/* <span style={{fontWeight:'600'}}>{refUnit.unit_nickname}</span> */}
                            <Grid container direction='row' justify='space-between'>

                                <TextField 
                                    id={`unit${index}`}
                                    variant='outlined'
                                    margin='dense'
                                    label={`Unit ${index+1} Nickname`}
                                    style={{marginRight:'15px', maxWidth:'70%'}}
                                    // fullWidth
                                    // value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).unit_nickname : ''}
                                    // onChange={(e)=>props.updateRefUnit(refUnitIndex, 'unit_nickname', e)}
                                    // ref={ref}
                                    value={unitNickname || ''}
                                    onChange={e=>setUnitNickname(e.target.value)}
                                    onBlur={(e)=>props.updateRefUnit(index, 'unit_nickname', e.target.value)}
                                    />
                            {/* </div> */}
                                <IconButton color='secondary' 
                                    onClick={()=> props.deleteRefUnit(index)}
                                    >
                                    {/* <Edit /> */}
                                    <DeleteForever />
                                </IconButton>

                            </Grid>
                    {/* </Typography> */}
                </Grid>

                <Grid item >
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    color='primary'
                                    checked={refUnit.vacuumed_control_panel || false}
                                    // value={getRefUnit(index) ? getRefUnit(index).vacuumed_control_panel : false}
                                    onChange={(e)=>updateRefUnit(index, 'vacuumed_control_panel', e.target.checked)}

                                />
                            }
                            // disabled
                            label="Vacuumed Control Panels"
                            />
                </Grid>

                <Grid item>
                    {/* {refUnit.checked_bypass_doors  ? 'yes':'no'} */}
                    <FormControlLabel
                            control={
                                <Checkbox 
                                color='primary'
                                checked={refUnit.checked_bypass_doors || false}
                                // value={getRefUnit(index) ? getRefUnit(index).checked_bypass_doors : false}
                                onChange={(e)=>updateRefUnit(index, 'checked_bypass_doors', e.target.checked)}

                                />
                            }
                            // disabled
                            label="Check Bypass Doors"
                            />
                </Grid>

                <Grid item>
                    <FormControlLabel
                            control={
                                <Checkbox 
                                color='primary'
                                checked={refUnit.inspected_contactors || false}
                                // value={getRefUnit(index) ? getRefUnit(index).inspected_contactors : false}
                                onChange={(e)=>updateRefUnit(index, 'inspected_contactors', e.target.checked)}
                                />
                            }
                            // disabled
                            label="Inspect Contactors"
                            />
                </Grid>

            </Grid>

            <Grid container style={{margin:'5px 0px'}}>
                    <Grid item xs={12} sm={12} md={12} 
                        style={{
                            backgroundColor:'lightgray',
                            padding:'10px',
                            marginBottom:'10px',
                        }}
                        hidden={compressors === undefined || compressors.length === 0}
                    >
                        { compressors !== undefined ? 
                            compressors.map((c,comp_index) => 
                                <>
                                    <Divider style={{marginBottom:'10px'}} 
                                        hidden={comp_index === 0}
                                    />
                                    <FormRefrigCompressorSingle 
                                        key={c.created_at}
                                        refIndex={index}
                                        index={comp_index}
                                        compressor={c}
                                        updateCompressor={updateCompressor}
                                        deleteCompressor={deleteCompressor}
                                    />
                                </>
                            )
                            :
                            ''
                        }

                    </Grid>
                <Button 
                    onClick={()=>addCompressor()}
                    startIcon={
                        // <AddCircle /> 
                        <Add />
                    }
                    variant='contained'
                    color={'primary'}
                    disableElevation
                    size={'small'}
                >
                     compressor
                </Button>
            </Grid>

            <Grid container >
                <Grid item>
                    <FormControlLabel
                            control={
                                <Checkbox 
                                color='primary'
                                checked={refUnit.test_calibrate_controls || false}
                                // value={getRefUnit(index) ? getRefUnit(index).test_calibrate_controls : false}
                                onChange={(e)=>updateRefUnit(index, 'test_calibrate_controls', e.target.checked)}
                                />
                            }
                            // disabled
                            label="Test & Calibrate Controls"
                            />
                </Grid>

                <Grid item>
                    <FormControlLabel
                            control={
                                <Checkbox 
                                color='primary'
                                checked={refUnit.check_failure_circuit || false}
                                // value={getRefUnit(index) ? getRefUnit(index).check_failure_circuit : false}
                                onChange={(e)=>updateRefUnit(index, 'check_failure_circuit', e.target.checked)}
                                />
                            }
                            // disabled
                            label="Check Failure Circuit Operation"
                            />
                </Grid>

            </Grid>
                <Divider style={{marginTop:'15px', marginBottom:'15px', color:'black'}} />
            
        </>
    )
}
export default FormRefrigerationSingleUnit;