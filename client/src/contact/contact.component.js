import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import EmailComponent from './contact-methods/email.component.js'
import PhoneComponent from './contact-methods/phone.component.js'
import TwitterComponent from './contact-methods/twitter.component.js'

class ContactComponent extends Component {
    render() {
        const url = this.props.match.url;
        return (
            <div>
                <section className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h2 className="display-3">Contact Us</h2>
                        <p className="lead">
                            We would love to hear from you!
                        </p>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                        <ul className="list-unstyled list-inline mt-3">
                            <li className="list-inline-item">
                                <NavLink to={`${url}/email`} exact activeStyle={{
                                    fontWeight: 'bold',
                                    color: '#222'
                                }}>
                                    <i className="fa fa-envelope-o fa-3x"></i><br/>
                                    Email
                                </NavLink>
                            </li>
                            <li className="mx-5 list-inline-item">
                                <NavLink to={`${url}/phone`} exact activeStyle={{
                                    fontWeight: 'bold',
                                    color: '#222'
                                }}>
                                    <i className="fa fa-mobile fa-3x"></i><br/>
                                    Phone
                                </NavLink>
                            </li>
                            <li className="list-inline-item">
                                <NavLink to={`${url}/twitter`} exact activeStyle={{
                                    fontWeight: 'bold',
                                    color: '#222'
                                }}>
                                    <i className="fa fa-twitter fa-3x"></i><br/>
                                    Twitter
                                </NavLink>
                            </li>
                        </ul>
                        </div>
                        <div className="col-sm-12 text-center mt-5">
                            <Switch>
                                <Route path="/contact/email" component={EmailComponent} />
                                <Route path="/contact/phone" component={PhoneComponent} />
                                <Route path="/contact/twitter" component={TwitterComponent} />
                            </Switch>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default ContactComponent;