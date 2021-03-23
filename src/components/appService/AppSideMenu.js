import { Add, Build, BusinessCenter, CloudUpload, Drafts, Flag, MarkunreadMailbox, Search } from '@material-ui/icons';
import InAppSideMenu from '../layouts/InAppSideMenu'

const SideMenu = (props) => {

    const menuContent = [
        {
            'appPath':'/service_sheets',
            'icon':<Add />,
            'section':'New Sheet',
            'sectionPath':'/create',
            'subSections': [
                // {
                //     'name':'Create New + ',
                //     'url':'/create'
                // },
            ]
        },
        {
            'appPath':'/service_sheets',
            'icon':<Drafts fontSize="small"/>,
            'section':'Drafts',
            'sectionPath':'/drafts',
            'subSections': [
                // {
                //     'name':'Create New + ',
                //     'url':'/create'
                // },
            ]
        },
        {
            'appPath':'/service_sheets',
            'icon':<CloudUpload fontSize="small"/>,
            'section':'Outbox',
            'sectionPath':'/uploading',
            'subSections': [
                // {
                //     'name':'Create New + ',
                //     'url':'/create'
                // },
            ]
        },
        {
            'appPath':'/service_sheets',
            'icon':<Flag fontSize="small"/>,
            'lowerDivider':true,
            'section':'Flagged',
            'sectionPath':'/flagged',
            'subSections': [
                // {
                //     'name':'Create New + ',
                //     'url':'/create'
                // },
            ]
        },
        {
            'appPath':'/service_sheets',
            'icon':<MarkunreadMailbox fontSize="small"/>,
            'section':'Requests',
            'sectionPath':'/requests',
            'subSections': [
                // {
                //     'name':'Create New + ',
                //     'url':'/create'
                // },
            ]
        },

        {
            'appPath':'/service_sheets',
            'icon':<Build fontSize="small"/>,
            'section':"Service Jobs",
            'sectionPath':'/jobs',
            'subSections': [
                {
                    'name':'My Jobs',
                    'url':'/my_jobs'
                },
                {
                    'name':'Work In Progress',
                    'url':'/in_progress'
                },
                {
                    'name':'Manager Review',
                    'url':'/department_review'
                },
                {
                    'name':'Flagged',
                    'url':'/flagged'
                },
                
            ]
        },
        
        {
            'appPath':'/service_sheets',
            'icon':<BusinessCenter />,
            'section':"Coporate",
            'lowerDivider':true,

            'sectionPath':'/corporate',
            'subSections': [
                {
                    'name':'Preliminary',
                    'url':'/preliminary_review'
                },
                {
                    'name':'Accounting',
                    'url':'/accounting_review'
                },                
                {
                    'name':'Invoicing',
                    'url':'/invoicing'
                },
                {
                    'name':'Flagged',
                    'url':'/error'
                },
            ]
        },
        {
            'appPath':'/service_sheets',
            'icon':<Search />,
            'section':"Find Sheets",
            'sectionPath':'/search',
            'subSections': [ 
                {
                    'name':'In Process',
                    'url':'/sheets_in_process'
                },
                {
                    'name':'Invoiced',
                    'url':'/invoices'
                },
                {
                    'name':'Archived',
                    'url':'/archive'
                },
            ]
        }
    ]

    return(
        <InAppSideMenu menuContent={menuContent} location={props.location}/>
    )
}
export default SideMenu;