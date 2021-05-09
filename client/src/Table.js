import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
let endpoint = "http://localhost:8080";

class Table extends Component {
 constructor(props) {
    super(props);
    this.state = {
      table: "",
      seat: "",
      img: "",
      items: [],
    };
  }

  componentDidMount() {
    this.getTable();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  onSubmit = () => {
    let { table } = this.state;
    let { seat } = this.state;
    let { img } = this.state;
    console.log("PRINTING table",this.state.table, this.state.seat);
    if (table) {
      axios
        .post(
          endpoint + "/api/table",
          {
           table,seat,img,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          this.getTable();
          this.setState({
            table: "",
            seat: "",
            img: "",
          });
          console.log(res);
        });
    }
  };

  getTable = () => {
    axios.get(endpoint + "/api/table").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            let color = "green";
            let style = {
              wordWrap: "break-word",
            };

            if (item.status) {
              color = "yellow";
              style["textDecorationLine"] = "line-through";
            }

            return (
              <div className="col-md-4">
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                  <center><img src={item.img} style={{ height: 200 }}></img></center>
                  <br></br>
                  <hr></hr>
                    <div >{item.table}</div>
                    <div >จำนวน: {item.seat} เก้าอี้</div>
                  </Card.Header>
                  <br></br>
                  <Card.Meta textAlign="right">
                  <NavLink to={`/bookingpage/${item.table}`}><button className="btn btn-success">Booking</button>
                  </NavLink>
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

  updateTable = (id) => {
    axios
      .put(endpoint + "/api/table/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTable();
      });
  };

  undoTable = (id) => {
    axios
      .put(endpoint + "/api/undotable/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTable();
      });
  };

  deleteTable = (id) => {
    axios
      .delete(endpoint + "/api/deletetable/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTable();
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
        <br></br>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default Table;
