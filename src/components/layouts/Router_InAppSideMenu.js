import React from 'react'
import { Router } from '@reach/router'

import DashboardMenu from '../appHome/SideMenu'
import ServiceMenu from '../appService/AppSideMenu'

const Router_InAppSideMenu = (props) => {
    return(
        <Router>
            <DashboardMenu path='/*' props={props} />
            <ServiceMenu path='/service_sheets/*' props={props} />
        </Router>
    )
}
export default Router_InAppSideMenu;