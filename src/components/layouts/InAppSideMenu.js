import { Divider, List,
    ListItemIcon,
        makeStyles,
        MenuItem,
        MenuList,
        Typography,
    } from '@material-ui/core'
import { Link } from '@reach/router'

const useStyles = makeStyles((theme) => ({

    sectionTitle: {
        '& .MuiTypography-displayBlock':{
            paddingLeft: '15px',
            display: 'flex'
        },
        // '&.MuiMenuItem-root': {
        //     fontWeight: 'bolder',
        // },
        '& :hover':{
            color: 'lightgray',
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    sectionIcon:{
        '&.MuiListItemIcon-root':{
            minWidth:'35px',
            display:'flex',
            color:'inherit'
        }
    },
    list: {
        '& .MuiListItem-root':{
            display: 'block',
            margin: '0px',
        },
    },
    sectionList: {
        '&.MuiList-padding': {
            paddingTop: '0px',
            paddingBottom: '0px',
        }
    },
    nestedList: {
        '&.MuiMenuItem-root': {
            paddingLeft: '25px',
            '& :hover':{
                color: 'lightgray'
            }
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
    },
    selected: {
    }
}))

const InAppSideMenu = (props) => {
    const classes = useStyles()

    return(
        <MenuList component='nav' className={classes.list}>
            {
                props.menuContent.map(item => 
                    <div key={item.section} >
                        {/* <Divider /> */}
                        
                        <Link to={`${item.appPath}${item.sectionPath}`} className={classes.link}>
                            <MenuItem
                                className={classes.sectionTitle}
                                selected={ `${item.appPath}${item.sectionPath}` === props.location.pathname } 
                            >
                                <div style={{display:'flex'}}>
                                <ListItemIcon className={classes.sectionIcon}>
                                    {item.icon}
                                </ListItemIcon>
                                    <Typography variant='subtitle1' className={classes.sectionTitle}>
                                        {item.section}
                                    </Typography>
                                </div>
                            </MenuItem>
                        </Link>
                        
                        <List  component='div' className={classes.sectionList} >
                            {item.subSections.map(sub => 
                            <Link key={`${item.section}${sub.name}`} to={`${item.appPath}${item.sectionPath}${sub.url}`} className={classes.link}>
                                <MenuItem 
                                    key={sub.name} 
                                    className={classes.nestedList} 
                                    selected={ `${item.appPath}${item.sectionPath}${sub.url}` === props.location.pathname } 
                                    >
                                    <Typography variant='subtitle2' style={{paddingLeft:'3%'}}>
                                        {sub.name}
                                    </Typography>
                                </MenuItem>
                            </Link>
                            )}
                        </List>
                        {
                            item.lowerDivider === true ?
                            <Divider variant='middle' style={{backgroundColor:'grey', marginBottom:'5px'}} />
                            :''
                        }

                    </div>
                )
            }
        </MenuList>
    )
}
export default InAppSideMenu;