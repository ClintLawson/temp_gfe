import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({

    palette: {
        primary: {
            // dark: '#04098a',
            main: '#014188',
        },
        secondary: {
            light: '#df0000',
            // main: '#c51700'
            // main: '#b10000'
            main: '#c40202',
        },
        text: {
            primary: '#fffff'
        },
        success:{
            main:'#4caf50'
        },
        successHighlight:{
            main:'#adeaa4'
        },
        error:{
            main:'#f44336'
        },
        errorHighlight:{
            main:'#ffcccc'
        },
        warning:{
            main:'#ff9800'
        },
        goodButton:{
            main:''
        },
        dangerousButton:{
            main:'#d32f2f'
        }
        
    },
    typography: {
        htmlFontSize: 18
    }
})  