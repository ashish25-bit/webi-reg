import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import Profile from '../docs/Profile'
import Home from '../docs/Home'
import Search from '../docs/Search'
import CreatePost from '../docs/CreatePost'
import CreateProfile from '../themes/CreateProfile'
import EditProfile from '../themes/EditProfile'
import AddExperience from '../themes/AddExperience'
import AddEducation from '../themes/AddEducation'
import Posted from '../docs/Posted'
import YourPost from '../docs/YourPost'
import Registered from '../docs/Registered'
import PrivateRoute from './PrivateRoute'
import AuthRoutes from './AuthRoutes'
import NotFound from '../layout/NotFound'

const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <AuthRoutes exact path='/' component={Signup} />
                <AuthRoutes exact path='/login' component={Login} />
                <PrivateRoute exact path='/event' component={Home} />
                <PrivateRoute exact path='/event/post' component={CreatePost} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <PrivateRoute exact path='/event/search' component={Search} />
                <PrivateRoute exact path='/event/registered' component={Registered} />
                <PrivateRoute exact path='/settings/profile/setup' component={CreateProfile} />
                <PrivateRoute exact path='/settings/profile/edit' component={EditProfile} />
                <PrivateRoute exact path='/event/posted' component={Posted} />
                <PrivateRoute exact path='/settings/profile/experience' component={AddExperience} />
                <PrivateRoute exact path='/settings/profile/education' component={AddEducation} />
                <PrivateRoute exact path='/event/posted/:id' component={YourPost} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    )
}

export default Routes
