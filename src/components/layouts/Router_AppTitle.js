import {Router} from '@reach/router'

import DashboardTitle from '../appHome/Title'
import ServiceTitle from '../appService/AppTitle'

const Router_AppTitle = (props) => {

    return(
        <Router>
            <DashboardTitle path='/*' />
            <ServiceTitle path='/service_sheets/*' />
        </Router>
    )
}
export default Router_AppTitle;