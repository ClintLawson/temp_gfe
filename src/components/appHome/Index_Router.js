import { Router, Redirect } from '@reach/router'
import Home from './views/Home'

const Router_AppContent = () => {

    return (
        <Router>
            <Redirect from='/' to='dashboard' noThrow/>

            <Home path='/dashboard' />
            
        </Router>
    )
}
export default Router_AppContent;