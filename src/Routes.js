import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/HomePage';
// import GraphHome from './components/home/GraphHome';
import FavPage from './components/favs/FavPage';
import LoginPage from './components/login/LoginPage';
import { connect } from 'react-redux';

const Routes = ({AUTH}) => {

    const PrivateRoute = ({path,component,...rest}) => {
        if(AUTH.user && AUTH.user.loggedIn === true){
            return <Route path={path} component={component} {...rest}/>
        }else {
            return <Redirect to='/login' {...rest}/>
        }

    }
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        AUTH: state
    }
}

export default connect(mapStateToProps)(Routes);
