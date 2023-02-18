/* eslint-disable jsx-a11y/alt-text */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Link } from "react-router-dom";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    // verify if the form validation is successful or not
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="flex justify-center">

        <div className="hidden lg:block">
            <img className="w-screen h-full object-cover" alt="myimage" src={window.location.origin + '/images/loginimg.jpg'} />
        </div>

        <div className="w-full h-screen pt-12 mx-auto">
          <div className="bg-white rounded py-8 px-10">
          <Link to={"/"}>
          <img className="w-48 mx-auto" src={window.location.origin + '/images/logo.png'} />
          </Link>

            <Form
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
              className="mt-8"
            >
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <Input
                  type="text"
                  className="border border-gray-400 rounded p-2 w-full"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <Input
                  type="password"
                  className="border border-gray-400 rounded p-2 w-full"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="mb-4 ">
                <button
                  className={`bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded  w-full ${this.state.loading ? "cursor-not-allowed opacity-50 " : ""
                    }`}
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Login
                </button>
              </div>

              <div className="mb-4 ">
              <p className="mt-2 text-center text-sm text-gray-600">Don't have an Accout?
                <Link to='/register'>
                <span href="#" className="m-1 font-medium text-orange-700 hover:text-orange-500 transition delay-75">
                  Click here
                </span>
                </Link>
                </p>
              </div>

              {this.state.message && (
                <div className="mb-4">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(Login);