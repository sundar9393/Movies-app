import React, {Component} from 'react';
import Home from '../screens/home/Home';
import BookShow from '../screens/bookshow/BookShow';
import Details from '../screens/details/Details';
import Summary from '../screens/summary/Summary';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8085/api/v1/"
    }
    render() {
        return(
            <Router>
                <div className="main-container">
                    <Route exact path="/" render={({history},props) => (<Home history={history} {...props} baseUrl={this.baseUrl} />)} />
                    <Route path="/bookshow/:id" render={(props) => (<BookShow {...props} baseUrl={this.baseUrl} />)} />
                    <Route path="/movie/:id" render={(props) => (<Details {...props} baseUrl={this.baseUrl} />)} /> 
                    <Route path="/summary/:id" render={(props) => (<Summary {...props} baseUrl={this.baseUrl} />)}  />
                </div>
            </Router>
        )
    }
}

export default Controller;