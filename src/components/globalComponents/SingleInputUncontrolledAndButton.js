import React from 'react'
import FormButton from './FormButton'


// custom props:
// onClick => will execute your function with input value as the value
// 

const SingleInputAndButton = (props) => {

    const [inputValue, setInputValue] = React.useState('')

    const handleClick1 = () => {
        props.onClick1(inputValue)
        setInputValue('')
    }

    const handleClick2 = () => {
        console.log('fired event 2')
        props.onClick2()
    }

    const handleEnter = (keyPress) => {
        if(keyPress === 'Enter'){
            handleClick1()
        }
    }
    

    return(
        <div style={props.style} >
            <input 
                id='target_input'
                onKeyPress={(e)=> handleEnter(e.key)}
                style={{padding:'5px', width:'75px'}} 
                {...props.inputProps}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <FormButton
                onClick={handleClick1}
                
            >
                {props.button1}
            </FormButton>
            <FormButton hidden={props.button2 ? false : true}
                onClick={handleClick2}
                // bgColor={'darkred'}
                buttontype={'dangerous'}
                style={{marginLeft:'-10px'}}
            >
                {props.button2}
            </FormButton>
        </div>
)}
export default SingleInputAndButton;