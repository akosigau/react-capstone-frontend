import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="p-6">
      <header className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium">{this.state.content}</h3>
      </header>
    </div>
    );
  }
}
