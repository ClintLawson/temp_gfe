import { Button, ButtonGroup, Typography, ListItemIcon, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { Comment, Flag, MoreVert, Publish, Save } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme)=> ({
    primaryBG:{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    dangerousBG:{
        backgroundColor: theme.palette.dangerousButton.main,
        color: theme.palette.primary.contrastText
    },
    grayBG:{
        backgroundColor: 'grey',
        color: theme.palette.primary.contrastText
    },
    listIcons:{
        '&.MuiListItemIcon-root':{
            color: theme.palette.primary.contrastText,
            minWidth:'40px'
        }
    },
    moreMenu:{
        '& .MuiMenu-paper':{
            backgroundColor: 'grey',
            color: theme.palette.primary.contrastText
        }
    }
}))

const FormActionButtons = (props) => {
    const form = props.form

    const [moreActionsMenuAnchor, setMoreActionsMenuAnchor] = React.useState(null)

    const classes = useStyles()

    return(
        
        <div style={{width:'100%', textAlign:'center', display:'flex'}}>
        {
            // this will present different buttons for new forms vs updating a form
            !form.id ? 
            <Button                             
                onClick={() => props.submit(form)}
                className={classes.primaryBG} 
                startIcon={<Publish />}
                style={{width:'70vw', maxWidth:'600px', margin: 'auto'}}
            >
                Submit
            </Button>
            :
            // <ButtonGroup size={'large'} >
            <div
                style={{width:'100%', textAlign:'center', display:'flex', justifyContent: 'center'}}
            >

                {/* <Button 
                    className={classes.grayBG} 
                    // startIcon={<ArrowBackIos />}
                    >
                    <ArrowBackIos />
                </Button> */}
                <Button 
                    onClick={() => props.update(form)}
                    className={classes.primaryBG} 
                    startIcon={<Save />}  
                    style={{width:'70vw', maxWidth:'500px', marginRight:'5px'}}
                    >
                    Save&nbsp;Changes
                </Button>
                <Button 
                    
                    // aria-controls='more-service-form-actions-menu'
                    onClick={(e)=>setMoreActionsMenuAnchor(e.currentTarget)}
                    className={classes.grayBG} 
                    endIcon={<MoreVert />} 
                    style={{width:'150px', maxWidth:'30vw'}}
                    >
                    more
                </Button>
                <Menu
                    className={classes.moreMenu} 
                    id='more-service-form-actions-menu'
                    variant='menu'
                    autoFocus={false}
                    anchorEl={moreActionsMenuAnchor}
                    open={moreActionsMenuAnchor !== null} 
                    onClose={()=>setMoreActionsMenuAnchor(null)}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                    >
                    
                        <MenuItem >
                            <ListItemIcon className={classes.listIcons}>
                                <Flag /> 
                            </ListItemIcon> 
                                <Typography> Flag Error </Typography>
                            </MenuItem>
                        <MenuItem >
                            <ListItemIcon className={classes.listIcons}>
                                <Comment /> 
                            </ListItemIcon>  
                            <Typography>
                                Comments
                            </Typography>   
                        </MenuItem>
                </Menu>

            </div>
            // </ButtonGroup>
        }
        </div>
    )
}
export default FormActionButtons;