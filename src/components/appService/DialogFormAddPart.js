import React, { useState } from 'react'
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
    Save 
} from '@material-ui/icons'

const resetForm = 
{
    'part_number':'',
    'description':'',
    'unit':'',
    'quantity':'',
    'unit_cost':'',
    'total':'',
    'adjusted_total':'',
}

const units = [
    {'name':'Feet', 'value':'feet'},
    {'name':'Inches', 'value':'inches'},
    {'name':'Gallons', 'value':'gallons'},
    {'name':'Pieces', 'value':'pieces'},
]

const DialogFormAddPart = (props) => {

    const [ newPart, setNewPart ] = useState(
        props.selectedPart === undefined ? resetForm : props.selectedPart
    )

    const savePart = () => {
        props.addPart(newPart)
        console.log(newPart)
        console.log(props.selectedPart)
    }

    const onChangeNewPart = (field, e) => {
        setNewPart({...newPart, [field]:e.target.value})
    }

    const clearNewPart = () => {
        setNewPart(resetForm)

        console.log(newPart)
        console.log(props.selectedPart)
    }
    
    return(
        <Dialog open={props.open} onClose={props.onClose} maxWidth='sm'>
            <DialogTitle>
                <div style={{display: 'flex',justifyContent:'space-between', width:'100%'}}>
                    <div>Add Parts</div>
                    <IconButton onClick={props.onClose}>
                        <Clear />
                    </IconButton>
                </div>
                <Divider variant='fullWidth'/>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1} justify='flex-end'>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            label='Part #'
                            variant='outlined' 
                            margin='dense'
                            fullWidth
                            value={props.selectedPart ? props.selectedPart.part_number : newPart.part_number}
                            onChange={(event) => onChangeNewPart('part_number', event)}
                            />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            label='Description'
                            variant='outlined' 
                            margin='dense'
                            fullWidth
                            value={newPart.description}
                            onChange={(event) => onChangeNewPart('description', event)}
                            />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='Unit'
                            variant='outlined' 
                            margin='dense'
                            fullWidth
                            select
                            value={newPart.unit}
                            onChange={(event) => onChangeNewPart('unit', event)}
                            defaultValue=''
                            >
                                { 
                                    units.map( unit => (
                                        <MenuItem 
                                            key={unit.name}
                                            selected={unit.value !== newPart.unit ? true : false } 
                                            value={unit.value} 
                                            >
                                                {unit.name}
                                        </MenuItem>
                                    ))
                                }
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='Quantity'
                            variant='outlined' 
                            margin='dense'
                            type='number'
                            value={newPart.quantity}
                            onChange={(event) => onChangeNewPart('quantity', event)}
                            fullWidth
                            />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='Unit Cost'
                            variant='outlined' 
                            margin='dense'
                            fullWidth
                            type='number'
                            value={newPart.unit_cost}
                            onChange={(event) => onChangeNewPart('unit_cost', event)}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {'$'}
                                    {/* <AttachMoney /> */}
                                  </InputAdornment>
                                ),
                            }}
                            />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <TextField
                            label='Total'
                            variant='outlined' 
                            margin='dense'
                            type='number'
                            fullWidth
                            value={newPart.total}
                            onChange={(event) => onChangeNewPart('total', event)}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {'$'}
                                  </InputAdornment>
                                ),
                            }}
                            />
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12}></Grid>
                    <Grid item xs={12} sm={12} md={12}></Grid>
                                        
                    <Grid item xs={2} sm={4} md={4} ></Grid>

                    <Grid item xs={8} sm={4} md={4} >
                        <ButtonGroup fullWidth >
                            <FormButton onClick={savePart}><Save />  Save </FormButton>
                            <FormButton onClick={clearNewPart} bgColor={'grey'}><ClearAll />  Clear</FormButton>
                        </ButtonGroup>
                    </Grid>
                    
                    <Grid item xs={2} sm={4} md={4} ></Grid>

                </Grid>

            </DialogContent>
        </Dialog>
    )
}
export default DialogFormAddPart;