import {React, useState} from 'react'
import '../App.css';
import AppLayout from './layouts/AppLayout'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import companyTheme from './themes/companyTheme'
import { Redirect, Router } from '@reach/router'

import { useSelector } from 'react-redux'

import DashboardApp_Router from './appHome/Index_Router' 
import ServiceApp_Router from './appService/AppIndex'

import NotFound from './layouts/NotFound'
import AppSplash from './layouts/AppSplash'

export default function App(props) {
  // const appSplash = (
  //   <AppSplash/>
  // )
  
  const state = useSelector(state => state)

  console.log(state)

  return (
    <div className="App">
      <CssBaseline/>
      <ThemeProvider theme={ companyTheme }>

        {/* {
          state.offline.isBusy ? 

          <AppSplash /> :
           */}

          <>
          {/* APP STARTS HERE!! */}
            <Router>
              {/* app layout handles the header and side menu */}
              <AppLayout path='/' >

                {/* REDIRECT '/' sets up home page */}
                <Redirect from="/" to="home" noThrow/>

                {/* ROUTE to App here!!! */}
                <DashboardApp_Router path='home/*' />
                <ServiceApp_Router path='service_sheets/*' />
                
                {/* <NotFound default /> */}
                <NotFound path='/not_found' default/>

              </AppLayout>
            </Router>
          </>

        {/* } */}

      </ThemeProvider>
    </div>
  );
}
