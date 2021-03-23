import React from 'react'
import { ButtonBase,
        makeStyles,
        Typography
    } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    createButton: {
        // paddingLeft: '0px',
        padding: '3px 5px',
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.primary.contrastText,
    },
    title: {
        padding: '0px 5px',
        '&.MuiTypography-body1': {
            fontWeight: '700',
            fontSize: '1.1rem',
        }
    },
}))

const ButtonCreateSheet = (props) => {
    const classes = useStyles()

    return(
        <ButtonBase className={classes.createButton} onClick={props.onClick}>
            <Typography className={classes.title}>
                {props.label}
            </Typography>
            {/* <AddCircle /> */}
            <Add />
            {/* <AddBox /> */}
        </ButtonBase> 
    )
}
export default ButtonCreateSheet;