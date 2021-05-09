import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

class TableList extends Component {
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
                    <div ><h3>{item.table}</h3></div>
                    <div >จำนวน {item.seat} เก้าอี้</div>
                  </Card.Header>
                  <br></br>
                  <Card.Meta textAlign="right">
                  <Icon
                      name="check circle"
                      color="green"
                      onClick={() => this.undoTable(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>พร้อม</span>

                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() => this.updateTable(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>ทำความสะอาด</span>
        
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTable(item._id)}
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
        <div><h1>Create Table</h1></div>
        <hr></hr>
        <div className="row">
        <div className="col-md-12">
          <Form onSubmit={this.onSubmit}>
          <div>หมายเลขโต๊ะ:</div>
          <div>
            <input
              type="text"
              name="table"
              onChange={this.onChange}
              value={this.state.table}
              fluid
              placeholder="Create Table"
            />
            </div>
            <br/>
            <div>จำนวนเก้าอี้:</div>
            <div>
             <input
              type="text"
              name="seat"
              onChange={this.onChange}
              value={this.state.seat}
              fluid
              placeholder="Seat"
            />
            </div>
            <br/>
            <div>รูปภาพ:</div>
            <div>
            <input
              type="text"
              name="img"
              onChange={this.onChange}
              value={this.state.img}
              fluid
              placeholder="Image"
            />
            </div>
            <br/>
            <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
            {/* <Button >Create Task</Button> */}
          </Form>
          <hr></hr>
        </div>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default TableList;
