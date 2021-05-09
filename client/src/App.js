import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import "./App.css";
import { Container , Grid } from "semantic-ui-react";
import TableList from "./Table-List";
import Table from "./Table";
import Booking from "./Booking";
import TopNavbar from './nav/top-navbar.component';
import Header from './component/header.component';
import ContactComponent from './contact/contact.component';
class App extends Component {
  render() {
  return (
    <Router>
    <TopNavbar />
    <br></br>
      <Container>
      <Switch>
              <Route path="/" exact component={Table} />
              <Route path="/addtable" component={TableList} />
              <Route path="/bookingpage/:table?" component={Booking} />
              <Route path="/contact" component={ContactComponent} />
            </Switch>
      </Container>
    </Router>
  );
}
}

export default App;
