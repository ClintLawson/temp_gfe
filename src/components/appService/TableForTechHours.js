import React, { useEffect, useState } from 'react'
import DialogFormEditHours from './DialogFormEditHours'
import { Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        TableHead,
        makeStyles,
        withStyles,
        TextField,
        Typography,
        InputAdornment,
        Box
        } from '@material-ui/core';
import { formatDiagnostic } from 'typescript';

const TableCellCustom = withStyles((theme)=> ({
    root:{
        padding:'5px 10px',
        alignItems: 'center'
    }
}))(TableCell)

const useStyles = makeStyles((theme) => ({
    paper:{
        background: 'lightgrey'
    }, 
    header:{
        paddingTop: '30px',
        '& .MuiTableCell-root':{
            border: 'none'
        }
    },
    input:{
        '& .MuiInputBase-input':{
            textAlign: 'center'
        }
    }
}))

const TableForTechHours = (props) => {
    const classes = useStyles()

    const [ selectedRow, setSelectedRow ] = React.useState('')
    const [ openDialog, setOpenDialog] = React.useState(false)

    const handleSelect = (index) => {
        setOpenDialog(true)
        setSelectedRow(index)
    }

    return(
        <>
        {/* For viewing updating Tech hours from table */}
        <DialogFormEditHours 
            open={openDialog}
            onClose={setOpenDialog}
            selectedRow={props.rows[selectedRow]}

            getTechFullName={props.getTechFullName}
            submitChange={props.updateTechHoursInfo} 
            removeRow={props.removeTech}
            elapsedTime={props.form.elapsed_hours}
        />
        <TableContainer >
            <Table size='small'>
                <TableHead >
                    <TableRow className={classes.header}><TableCell></TableCell></TableRow>
                    <TableRow >
                        <TableCell colSpan={1} align="center" width={'25%'} >
                            Service&nbsp;Tech
                        </TableCell>
                        <TableCell colSpan={1} align="center">
                            Work&nbsp;Hrs
                        </TableCell>
                        <TableCell colSpan={1} align="center">
                            N/C
                        </TableCell>
                        <TableCell colSpan={1} align="left" width={'45%'}>
                            Notes
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    { props.rows.length === 0 ? 
                        <TableRow>
                            <TableCell colSpan={7} align='center' color='primary'>
                                <Typography> No Service Techs Assigned </Typography>
                            </TableCell>
                        </TableRow>
                    
                    :
                    props.rows.map((row, index) => (
                        <TableRow 
                        key={row.id} 
                        hover 
                        onClick={()=>{handleSelect(index)}}
                        >
                                <TableCellCustom>
                                    {props.getTechFullName(row.id)}
                                </TableCellCustom>
                                <TableCellCustom align='center'>
                                    {row.work_hours || '-'}
                                </TableCellCustom>
                                {/* <TableCellCustom align='center'>
                                    {row.travel_hours}
                                </TableCellCustom> */}
                                <TableCellCustom align='center'>
                                    {row.no_charge_hours || '-'}
                                </TableCellCustom>
                                <TableCellCustom>
                                    {row.notes}
                                </TableCellCustom>
                            </TableRow>
                        ))
                    }

                    { props.rows.length === 0 ? '' : 
                    <>
                        <TableRow >
                            <TableCell align='right'>
                                <Typography size='large'>
                                    Travel
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <TextField 
                                    className={classes.input}
                                    value={props.form.travel_hours}
                                    onChange={(e)=>
                                        props.setForm({...props.form, travel_hours:e.target.value}
                                    )}
                                    type='number'
                                    inputProps={{
                                        min:'0',
                                        max:'100',
                                        step:'.1'
                                    }}
                                />
                            </TableCell>
                            <TableCell >
                                <TextField 
                                    className={classes.input}
                                    value={props.form.travel_hours_no_charge }
                                    // onChange={(e)=>props.updateTravelHours('travel_hours_no_charge',e)}
                                    onChange={(e)=>
                                        props.setForm({...props.form, travel_hours_no_charge: e.target.value}
                                    ) }
                                    type='number'
                                    inputProps={{
                                        min:'0',
                                        max:'100',
                                        step:'.1',
                                    }}
                                    />
                            </TableCell>
                            <TableCell />
                        </TableRow>
                        <TableRow >
                            <TableCell align='right'>
                                <Typography size='large'>
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <TextField 
                                    className={classes.input}
                                    contentEditable={false}
                                    value={props.totals.total_hours || '0'}
                                    // value={calculateTotalHours() ? calculateTotalHours().toFixed(1) : '0'}
                                    />
                            </TableCell>
                            <TableCell >
                                <TextField 
                                    className={classes.input}
                                    contentEditable={false}
                                    // value={parseFloat(props.form.total_no_charge_hours) : '0'}
                                    value={props.totals.total_no_charge_hours || '0'}
                                    />
                            </TableCell>
                            <TableCell >
                                <TextField 
                                    // className={classes.input}
                                    contentEditable={false}
                                    style={{width: '50px'}}
                                    value={props.totals.total_billable_hours || '   0'}
                                    />
                            </TableCell>
                        </TableRow>
                    </>
                    }
                </TableBody>
            </Table>

        </TableContainer>
        </>
    )
}
export default TableForTechHours;