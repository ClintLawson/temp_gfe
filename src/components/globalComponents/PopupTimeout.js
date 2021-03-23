import React, { useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Typography } from '@material-ui/core'

// PROPS
//  isOpen = sets the state of whether it is visible or not
//  timerMS = sets duration that the dialog is visible for in miliseconds
//  children = injects the content as children usually does
//  bgColor = sets the dialog background color

const PopupTimeout = (props) => {
    // const [open, setOpen] = React.useState(false)
    // setOpen(props.isOpen)
    // const setup = () => 

    useEffect(()=>{
        setTimeout(
            ()=>props.onClose(false),
            props.timerMS
        )
    },[props.isOpen])

    return(
        <Dialog open={props.isOpen} onClose={()=>props.onClose(false)}> 
            {props.children}
            {/* <Typography> HERE IT IS!!! </Typography> */}
        </Dialog>
    )
}
export default PopupTimeout;