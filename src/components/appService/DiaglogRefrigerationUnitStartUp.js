import React, { useEffect } from 'react'

import { Button, ButtonGroup, Checkbox, 
    Dialog, DialogContent, DialogTitle, Divider, 
    Fade, 
    FormControlLabel, FormGroup, Grid, IconButton, 
    TextField, Typography 
} from '@material-ui/core';

import { Add, AddCircle, Clear, Delete, DeleteForever, Save } from '@material-ui/icons';


const CustCheckbox = (props) => {
    return(
        <Checkbox 
            {...props}
            color='primary'
        />
)}

const DialogRefrigerationUnitStartUp = (props) => {
    // function debounce(func, wait, immediate) {
    //     var timeout;
    //     return function() {
    //         var context = this, args = arguments;
    //         var later = function() {
    //             timeout = null;
    //             if (!immediate) func.apply(context, args);
    //         };
    //         var callNow = immediate && !timeout;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(later, wait);
    //         if (callNow) func.apply(context, args);
    //     };
    // };

    // const test = (n, e) => {
    //     e.persist()
    //     props.updateRefUnit(n, 'unit_nickname', e.target.value)
    // }

    // const sendDebounce = debounce(test, 2000)

    // PROPS variables
    
    const getRefUnit = props.selectedRefUnit
    const refUnitIndex = props.selectedIndex

    const [unitNickname, setUnitNickname] = React.useState('')

    useEffect(()=>{
        console.log('...', unitNickname)
    },[refUnitIndex])

    return(
        // This dialog is too slow with text fields because they are nested fields
        // onBlur is used to save updates to the text fields
        // text fields (like unit_nickname) must be stored in local state until input onBlur fires
        // on blur updates the root form
        // the dialog HOWEVER does not unmount (state remains the same) between opening
        // ...to remedy this 'onEnter' function is used to correctly set the state whenever the dialog is opened
        // ...onEnter fires BEFORE loading dialog
        // ...future alternative => https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
        
        <Dialog 
            open={props.open} 
            onClose={()=>props.onClose(false)} 
            maxWidth={'md'} 
            fullWidth
            scroll='paper'
            onEntering={()=>setUnitNickname(getRefUnit(refUnitIndex).unit_nickname)}
            // fullScreen
        >
            <DialogTitle style={{paddingBottom: '10px'}}>
                <Grid container 
                    alignItems={'center'}
                    justify='space-between'
                    direction='row'
                    wrap='nowrap'
                    // style={{display: 'flex',justifyContent:'space-between', width:'100%'}}
                >
                    {/* <Typography 
                        variant='h5'
                        noWrap
                    >
                        Refrigeration Unit - {props.selectedRow ? props.getTechFullName(props.selectedRow.id) : '1'} 
                    </Typography> */}
                        <Grid item xs={10} sm={6} md={4} >
                            <TextField 
                                variant='outlined'
                                margin='dense'
                                label='Unit Nickname'
                                style={{marginRight:'15px'}}
                                fullWidth
                                // value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).unit_nickname : ''}
                                // onChange={(e)=>props.updateRefUnit(refUnitIndex, 'unit_nickname', e)}

                                value={unitNickname || ''}
                                onChange={e=>setUnitNickname(e.target.value)}
                                onBlur={(e)=>props.updateRefUnit(refUnitIndex, 'unit_nickname', e.target.value)}

                            />
                        </Grid>
                    <IconButton onClick={()=>props.onClose(false)}>
                        <Clear />
                    </IconButton>
                </Grid>
            </DialogTitle>

            {/* <Divider variant='fullWidth'/> */}

            <DialogContent dividers={true}>
                <Grid container >
                    {/* <Grid item xs={12} sm={12} md={4}>
                        <TextField 
                            variant='outlined'
                            margin='dense'
                            label='Unit Nickname'
                            style={{marginRight:'15px'}}
                        />
                    </Grid> */}
                    <Grid item >
                        <FormGroup row>

                            <FormControlLabel
                                control={<CustCheckbox  
                                    value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).vacuumed_control_panel : false}
                                    onChange={(e)=>props.updateRefUnit(refUnitIndex, 'vacuumed_control_panel', e.target.checked)}

                                    // value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                                    // onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                                />}
                                label="Vacuumed Control Panels"
                            />
                            <FormControlLabel
                                control={<CustCheckbox  
                                    value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).checked_bypass_doors : false}
                                    onChange={(e)=>props.updateRefUnit(refUnitIndex, 'checked_bypass_doors', e.target.checked)}

                                    // value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                                    // onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                                />}
                                label=" Check Bypass Doors"
                            />
                            <FormControlLabel
                                control={<CustCheckbox  
                                    value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).inspected_contactors : false}
                                    onChange={(e)=>props.updateRefUnit(refUnitIndex, 'inspected_contactors', e.target.checked)}

                                    // value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                                    // onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                                />}
                                label="Inspect Contactors"
                            />
                        </FormGroup>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider />
                        <Typography >
                            Compressors

                            <IconButton color='primary'>
                                <AddCircle />
                            </IconButton>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} >
                        <Divider />
                        <FormGroup row>
                            
                            <FormControlLabel
                                control={<CustCheckbox  
                                    value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).test_calibrate_controls : false}
                                    onChange={(e)=>props.updateRefUnit(refUnitIndex, 'test_calibrate_controls', e.target.checked)}

                                    // value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                                    // onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                                    />}
                                    label="Test & Calibrate Controls"
                            />

                            <FormControlLabel
                                control={<CustCheckbox  
                                    value={getRefUnit(refUnitIndex) ? getRefUnit(refUnitIndex).check_failure_circuit : false}
                                    onChange={(e)=>props.updateRefUnit(refUnitIndex, 'check_failure_circuit', e.target.checked)}

                                    // value={props.preSeasonFormData.louver_linkages_lubed_and_tested} 
                                    // onChange={(e)=>onCheckedHandler('louver_linkages_lubed_and_tested', e)}    
                                />}
                                label="Check Failure Circuit Operation"
                            />

                        </FormGroup>
                    </Grid>

                </Grid>

                {/* <Divider variant='fullWidth'/> */}

            </DialogContent>


            {/* <DialogContent > */}
                
            <Grid item xs={12} sm={12} md={12} style={{margin:'5px'}}>
                <Grid container >
                    <Grid item xs={12}>
                        <ButtonGroup fullWidth >

                        <Button                            
                            variant='contained'
                            color='primary'
                            startIcon={
                                // <Save />
                                <Add />
                            }
                            fullWidth
                            
                            >
                            Compressor
                        </Button>
                    {/* </Grid>
                    <Grid item xs={5}> */}

                        <Button                            
                            variant='contained'
                            color='secondary'
                            startIcon={
                                // <Save />
                                <DeleteForever />
                            }
                            // fullWidth
                            style={{width:'50%'}}
                            >
                            Unit
                        </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {/* <Button 
                    variant='contained'
                    color='primary'
                >
                    +Compressor
                </Button> */}
            </Grid>
            {/* </DialogContent> */}


        </Dialog>
    )
}
export default DialogRefrigerationUnitStartUp;