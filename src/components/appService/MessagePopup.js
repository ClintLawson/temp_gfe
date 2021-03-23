import { Dialog, Typography } from '@material-ui/core'
import { CheckCircle, Error, Warning } from '@material-ui/icons'
import PopupTimeout from '../globalComponents/PopupTimeout'



const SuccessPopup = (props) => {
    console.log('success popup')
    return(
        
        <PopupTimeout 
            isOpen={props.messagePopup.type === 'success'} 
            onClose={props.onClose}
            timerMS={1500}
        >
            <div style={{padding:'20px', display:'grid', justifyContent:'center'}}>
                <Typography style={{margin:'auto', padding: '10px'}}>
                    {props.messagePopup.messages[0]}
                </Typography>
                {   
                    props.messagePopup.type === 'success' ? 
                    <CheckCircle fontSize='large' style={{margin:'auto', color:'green'}} />
                    : ''
                }
            </div>
        </PopupTimeout>
    )
}

const WarningPopup = (props) => {
    console.log('warning popup')
    return(
        <Dialog 
            open={props.messagePopup.type === 'warning'}
            onClose={()=>props.onClose()}
        >
            <div style={{padding:'20px', display:'grid', justifyContent:'center'}}>
                    <Warning fontSize='large' style={{margin:'auto', color:'orange'}} />
                <Typography variant={'h5'} style={{margin:'auto', padding: '10px'}}>
                    Warning !
                </Typography>
                <Typography style={{margin:'auto', padding: '10px'}}>
                    {props.messagePopup.messages.map(m => m)}
                </Typography>
                <button onClick={()=>props.onClose()} style={{width:'75px', padding:'5px 13px', margin:'auto'}}>OK</button>
            </div>
        </Dialog>
    )
}

const ErrorPopup = (props) => {
    console.log('error popup')
    return(
        <Dialog 
            open={props.messagePopup.type === 'error'}
            onClose={()=>props.onClose()}
        >
            <div style={{padding:'20px', display:'grid', justifyContent:'center'}}>
                    <Error fontSize='large' style={{margin:'auto', color:'red'}} />
                <Typography variant={'h5'} style={{margin:'auto', padding: '10px'}}>
                    Error !
                </Typography>
                <Typography style={{margin:'auto', padding: '10px'}}>
                    {props.messagePopup.messages.map(m => m)}
                </Typography>
                <button onClick={()=>props.onClose()} style={{width:'75px', padding:'5px 13px', margin:'auto'}}>OK</button>
            </div>
        </Dialog>
    )
}

const MessagePopup = (props) => {

    const displayedComponent = () => {
        switch(props.messagePopup.type){
            case 'success':
                return <SuccessPopup 
                    messagePopup={props.messagePopup}
                    onClose={props.onClose}
                />

            case 'warning':
                return <WarningPopup 
                    messagePopup={props.messagePopup}
                    onClose={props.onClose}
                />

            case 'error':
                return <ErrorPopup 
                    messagePopup={props.messagePopup}
                    onClose={props.onClose}
                />

            default:
                return 
        }
    }

    return(
        <>
            {displayedComponent()}
        </>
    )
}
export default MessagePopup