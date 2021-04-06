import React,{Component}from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Form from './Form.js';
import Studentdatalist  from './StudentdataList.js'

export default class Layout extends Component{
    render(){
        return(
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Router>
                    <Switch>
                        <Route exact path ="/"    component={Form} />
                        <Route exact path = "/Studentdatalist" component={Studentdatalist} />
                        <Route exact path ="/:stud_id"    component={Form} />
                       
                    </Switch>
                </Router>

            </div>
        )
    }
}