import React, { useEffect, useState } from 'react'
import FormButton from '../globalComponents/FormButton'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    InputAdornment,
    MenuItem,
    Divider,
    ButtonGroup,
    IconButton,
} from '@material-ui/core'
import { 
    Clear,
    ClearAll,
    Delete,
    Save 
} from '@material-ui/icons'


const DialogFormEditHours = (props) => {

    useEffect(()=>{
        setTechInfo(props.selectedRow)
    },[props.selectedRow])

    const [ techInfo, setTechInfo ] = useState({})

    const submitChanges = () => {
        props.submitChange(techInfo)
        props.onClose(false)
    }

    const onChangeTechInfo = (field, e) => {
        setTechInfo({...techInfo, [field]:e.target.value})
    }

    const deleteTech = () => {
        props.removeRow(techInfo.id)
        props.onClose(false)
    }
    
    return(
        <Dialog open={props.open} onClose={()=>props.onClose(false)} maxWidth='sm' >
            <DialogTitle>
                <div style={{display: 'flex',justifyContent:'space-between', width:'100%'}}>
                    <div>Hours - {props.selectedRow ? props.getTechFullName(props.selectedRow.id) : ''} </div>
                    <IconButton onClick={()=>props.onClose(false)}>
                        <Clear />
                    </IconButton>
                </div>
                <Divider variant='fullWidth'/>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1} justify='space-between'>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='Work Hours'
                            variant='outlined' 
                            margin='dense'
                            type='number'
                            inputProps={{
                                'step': '0.1',
                                'min':'0'
                                }}
                            fullWidth
                            value={techInfo ? techInfo.work_hours : ''}
                            onChange={(e)=>onChangeTechInfo('work_hours', e)}
                            helperText={props.elapsedTime ? `Spanned ${props.elapsedTime} hrs` : ''}
                            />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='No Charge'
                            variant='outlined' 
                            margin='dense'
                            placeholder='Hours'
                            type='number'
                            inputProps={{
                                'step': '0.1',
                                'min':'0'
                                }}
                            fullWidth
                            value={techInfo ? techInfo.no_charge_hours : ''}
                            onChange={(e)=>onChangeTechInfo('no_charge_hours', e)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            label='Notes'
                            variant='outlined' 
                            margin='dense'
                            fullWidth
                            multiline
                            rows='3'
                            rowsMax='3'
                            value={techInfo ? techInfo.notes : ''}
                            onChange={(e)=>onChangeTechInfo('notes', e)}
                            />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4} ></Grid>

                    <Grid item xs={8} sm={4} md={4} >
                        <ButtonGroup fullWidth >
                            <FormButton onClick={submitChanges}><Save />  Save </FormButton>
                            <FormButton onClick={deleteTech} bgColor={'grey'}><Delete />  Remove</FormButton>
                        </ButtonGroup>
                    </Grid>
                    
                    <Grid item xs={2} sm={4} md={4} ></Grid>

                </Grid>

            </DialogContent>
        </Dialog>
    )
}
export default DialogFormEditHours;