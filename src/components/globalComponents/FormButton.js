import React from 'react'
import { ButtonBase,
        makeStyles,
        Typography
    } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root:{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: '2px 7px',
        margin: '10px',
        fontSize: '15px',
        borderRadius: '3px'
    },
    dangerous:{
        backgroundColor: theme.palette.secondary.main
        // backgroundColor: 'green'
    }
}))

const FormButton = (props) => {
    const classes = useStyles()
    return(
        <span hidden={props.hidden}
            style={props.style}
        >
            <ButtonBase 
                elevation={3}
                className={`${classes.root} 
                    ${props.buttontype === 'dangerous' ? classes.dangerous : ''}

                `} 
                onClick={props.onClick} 
                style={{backgroundColor:`${props.bgColor}`}} 
                disabled={props.disabled}
                buttontype={props.buttontype}
            >
                {props.children}
            </ButtonBase>
        </span>
    )
}
export default FormButton;