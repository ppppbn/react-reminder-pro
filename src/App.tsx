import {Button, Col, DatePicker, Form, Icon, Input, Layout, List, Row } from 'antd';
import * as React from 'react';
import { addReminder, checkReminder, deleteReminder  } from './actions/index/index';
// tslint:disable-next-line:ordered-imports
import { bindActionCreators } from 'redux';
// tslint:disable-next-line:ordered-imports
import { connect } from 'react-redux';
// tslint:disable-next-line:ordered-imports
import moment from "moment";
import './App.css';

const dateFormat = "YYYY-MM-DD"
class App extends React.Component<any, any> {
  constructor(props : any){
    super(props);
    this.state = {      
      date : "",
      error : "",
      text : ""
    }
;  }

  public handleSubmit = (e : any) => {
    e.preventDefault();
    if(!this.state.text) {
      this.setState({
        error : "Missing todo!"
      });
      return;
    }
    else {
      if(!this.state.date) {
        this.setState({
          error : "Missing deadline!"
        });
        return;
      }
      else {
        this.props.addReminder(this.state.text, this.state.date);
        this.setState({
          date : "",
          error : "",
          text : ""
        })
      }
    }
  }

  public handleChange = (e : any) => {
    this.setState({
      error : "",
      text : e.target.value
    })
  }

  public handlePickTime = (e : any) => {
    const date = moment(e._d, dateFormat);
    this.setState({
      date
    })
  }

  public deleteItem = (id : number) => {
    this.props.deleteReminder(id)
  }

  public checkItem = (id : number) => {
    this.props.checkReminder(id);
  }

  public renderTime = (deadline : string) => {
    const now = new Date();
    deadline = moment(deadline).format('MM-DD-YYYY')
    const seconds = (new Date(deadline).getTime()/1000) - (now.getTime() / 1000);
    const days = Math.floor(seconds / (3600*24));
    if(days > 0){ 
      return <h5 className=""><i>{"in " + (days+1) + " day" + (days > 1 ? "s" : "")}</i></h5>
    }
    else {
      const hours = Math.floor(seconds / 3600);
      if(hours > 0) {
        return <h5 className=""><i>{"in " + hours + " hour" + (hours > 1 ? "s" : "")}</i></h5>
      }
      else {
        const minutes = Math.floor(seconds /60);
        if(minutes > 0) {
          return <h5 className=""><i>{"in " + minutes + " minute"  + (minutes > 1 ? "s" : "")}</i></h5>
        }
        else {
          if(seconds > 0){
            return <h5 className=""><i>{seconds + " second"  + (seconds > 1 ? "s" : "")}</i></h5>
          }          
          else {
            return <h5 className="text-danger"><i>Time's up!</i></h5>
          }
        }
      }
    } 
  }

  public renderReminders = () => {
    const reminders = this.props.reminders.map((reminder : any) => {
      return reminder;
    });
    return reminders.length ? (
      <List dataSource={reminders}  renderItem={this.renderItem}/>
    ) : "";
  }

  public renderItem = (item : any) => {
    return <List.Item className="full-width custom-position-relative">
      <div className="list-item-container">
        <h3 className="custom-break-word">{item.text}</h3>
        {this.renderTime(item.deadline)}
        {/* tslint:disable-next-line */}
        <div onClick={() => this.deleteItem(item.id)}>
          <Icon className="delete-icon" type="close" />
        </div>
        {/* tslint:disable-next-line */}
        <div className="check-icon-container" onClick={() => this.checkItem(item.id)}>
          {item.checked ? <Icon className="check-icon" type="check" /> : ""}
        </div>
      </div>
    </List.Item>
  }

  public render() {
    return (
      <Layout className="big-container">
        <Layout className="text-center">
          <h2 className="app-title">Reminder Pro</h2>
          <Form onSubmit={this.handleSubmit}>
        <Row gutter={{md : 30}}>
          <Col xs={{span : 20, offset: 2}} sm={{span : 16, offset : 4}} lg={{span : 14, offset : 5}} xl={{span : 10, offset : 7}}>
            <Row gutter={{md : 30, xs : 0, sm : 0}}>
              <Col md={8} xs={24}>
                <Form.Item className="custom-form-item">
                  <Input placeholder="I have to..." onChange={this.handleChange} value={this.state.text}/>
                </Form.Item>
              </Col>
              <Col md={16} xs={24} className="vertical-center-mobile">
                <Row gutter={{md : 30, xs : 16}} className="vertical-center">
                  <Col md={12} xs={12}>
                    <Form.Item className="custom-form-item">
                      <DatePicker onChange={this.handlePickTime} value={this.state.date || null}/>
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={12}>
                    <Button type="primary" htmlType="submit">Add Reminder</Button>
                  </Col>
                </Row>
              </Col>
              <Col md={{span : 8, offset : 8}} xs={{span : 16, offset : 4}} className="error-message-container">
                <h3 className="error-message">{this.state.error}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
          <Layout>
            <Row gutter={{md : 30, xs : 10, sm : 20}}>
              <Col className="text-justify" md={{span : 8, offset : 8}} xs={{span : 20, offset : 2}} sm={{span : 14, offset : 5}}>
                {this.renderReminders()}
              </Col>
            </Row>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state : any){
  return {
    reminders : state
  }
}

function mapDispatchToProps(dispatch : any) {
  return bindActionCreators({addReminder, checkReminder, deleteReminder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
