import {List, ListItem, Menu, MenuItem} from '@material-ui/core'
import { BusinessCenter, Dashboard, People } from '@material-ui/icons'
import InAppSideMenu from '../layouts/InAppSideMenu'

const SideMenu = (props) => {

    const menuContent = [
        {
            'appPath':'/home',
            'icon':<Dashboard />,
            'section':'Dashboard',
            'sectionPath':'/dashboard',
            'subSections': [
                // {
                //     'name':'page_1',
                //     'url':'/page_1'
                // },
                // {
                //     'name':'page_2',
                //     'url':'/page_2'
                // }
            ]
        },
        {
            'appPath':'/home',
            'icon':<BusinessCenter />,
            'section':"Corporate",
            'sectionPath':'/corporate',
            'subSections': [
                {
                    'name':'Dealers',
                    'url':'/dealers'
                },
                {
                    'name':'Departments',
                    'url':'/departments'
                },
                {
                    'name':'Users',
                    'url':'/users'
                },
                {
                    'name':'Catalog',
                    'url':'/catalog'
                },
                {
                    'name':'Purchases',
                    'url':'/purchases'
                },
            ]
        },
        {
            'appPath':'/home',
            'icon':<People />,
            'section':"Customers",
            'sectionPath':'/customers',
            'subSections': [
                {
                    'name':'Storages',
                    'url':'/storages'
                },
                {
                    'name':'Equipment',
                    'url':'/equipment'
                },
                {
                    'name':'Events',
                    'url':'/events'
                },
                {
                    'name':'New Event +',
                    'url':'/agristars'
                },
            ]
        }
    ]

    return(
        <InAppSideMenu 
            // icons={}
            menuContent={menuContent} 
            location={props.location}
        />
    )
}
export default SideMenu;