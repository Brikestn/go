import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

let endpoint = "http://localhost:8080";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: this.props.match.params.table,
      name: "",
      tel: "",
      date: new Date(),
      items: [],
    };
  }

  componentDidMount() {
    this.getBooking();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit = () => {
    let { table } = this.state;
    let { name } = this.state;
    let { tel } = this.state;
    let { date } = this.state;
    console.log("pRINTING book",this.state.table, this.state.name ,this.state.tel ,this.state.state);
    
      axios
        .post(
          endpoint + "/api/booking",
          {
           table,name,tel,date,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          this.getBooking();
          this.setState({
            table: "",
            name: "",
            tel: "",
            date: new Date(),
          });
          console.log(res);
        });
    
  };

  getBooking = () => {
    axios.get(endpoint + "/api/booking").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            return (
              <div className="col-md-4">
              <Card key={item._id}fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div>โต๊ะที่จอง: {item.table}</div>
                    <br></br>
                    <div>ชื่อผู้จอง: {item.name} </div>
                    <br></br>
                    <div>เบอร์โทรศัพท์: {item.tel}</div>
                    <br></br>
                    <div>วันที่จอง: {item.date}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteBooking(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
              <br></br>
              </div>
            );
          }),
        });
      } else {
        this.setState({
          items: [],
        });
      }
    });
  };


  deleteBooking = (id) => {
    axios
      .delete(endpoint + "/api/deletebooking/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getBooking();
      });
  };

  render() {
    return (

      <div>
        <div className="row">
        </div>
        <br></br>
        <div><h1>Table Booking</h1></div>
        <hr></hr>
        <div className="row">
        <div className="col-md-12">
          <br></br>
          <div>โต๊ะที่จอง: </div>
          <Form onSubmit={this.onSubmit}>
          <div>
          <input
              type="text"
              name="table"
              onChange={this.onChange}
              value={this.props.match.params.table}
              fluid
              
            />
          </div>
          <br></br>
          <div>ชื่อผู้จอง: </div>
          <div>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              fluid
              placeholder="Name"
            />
            </div>
            <br/>
            <div>เบอร์โทรศัพท์: </div>
            <div>
             <input
              type="text"
              name="tel"
              onChange={this.onChange}
              value={this.state.tel}
              fluid
              placeholder="Telephone Number"
            />
            </div>
            <br/>
            <div>วันที่จอง: </div>
            <div>
            <DatePicker
              name="date"
              selected={this.state.date}
              value={this.state.date}
              onChange={this.onChangeDate}
            />
            </div>
            <br/>
            <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
            {/* <Button >Create Task</Button> */}
          </Form>
          <hr></hr>
          <br/>
        <br/>
        <div className="row">
        <div className="col-md-12">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Booking;
