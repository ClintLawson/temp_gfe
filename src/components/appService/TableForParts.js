import React from 'react'
import DialogFormAddPart from './DialogFormAddPart'
import { Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        TableHead,
        makeStyles,
        withStyles,
        } from '@material-ui/core';

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
    }
}))

const TableForParts = (props) => {
    const classes = useStyles()

    const [ selectedPart, setSelectedPart ] = React.useState('')
    const [ openDialog, setOpenDialog] = React.useState(false)

    const handleSelect = (index) => {
        setOpenDialog(true)
        setSelectedPart(index)
    }
    // test notes...

    return(
        <>
        <DialogFormAddPart 
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            selectedPart={props.rows[selectedPart]}
        
        />
        <TableContainer >
            <Table size='small'>
                <TableHead >
                    <TableRow className={classes.header}><TableCell></TableCell></TableRow>
                    <TableRow >
                        <TableCell colSpan={1} align="center" width={'15%'} >
                            Part&nbsp;#
                        </TableCell>
                        <TableCell colSpan={1} align="center" width={'30%'}>
                            Description
                        </TableCell>
                        <TableCell colSpan={1} align="center" width={'15%'}>
                            Unit
                        </TableCell>
                        <TableCell colSpan={1} align="center" width={'10%'}>
                            QTY
                        </TableCell>
                        <TableCell colSpan={1} align="center" width={'15%'}>
                            Unit Cost
                        </TableCell>
                        <TableCell colSpan={1} align="center" width={'15%'}>
                            Total
                        </TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody >
                    { props.rows.length === 0 ? 

                        <TableRow>
                            <TableCell colSpan={7} align='center' color='primary'>
                                There are no parts
                            </TableCell>
                        </TableRow>
                    
                    :
                    props.rows.map((row, index) => (
                        <TableRow 
                        key={row.part_number} 
                        hover 
                        onClick={()=>{handleSelect(index)}}
                        >
                                <TableCellCustom>
                                    {row.part_number}
                                </TableCellCustom>
                                <TableCellCustom>
                                    {row.description}
                                </TableCellCustom>
                                <TableCellCustom align='center'>
                                    {row.unit}
                                </TableCellCustom>
                                <TableCellCustom align='center'>
                                    {row.quantity}
                                </TableCellCustom>
                                <TableCellCustom align='right'>
                                    {row.unit_cost != '' ?
                                        parseFloat(row.unit_cost).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })
                                        : '-'
                                    }
                                </TableCellCustom>
                                <TableCellCustom>
                                    {/* ${row.unit_cost} */}
                                </TableCellCustom>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </TableContainer>
        </>
    )
}
export default TableForParts;