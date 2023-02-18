/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="text-red-700 bg-red-400" role="alert">
        This field is required!
      </div>
    );
  }
};

//verify email
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="text-red-700 bg-red-400" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-red-700 bg-red-400" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-red-700 bg-red-400" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      weight: "",
      height: "",
      age: "",
      country: "",
      successful: false,
      message: ""
    };
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }

  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    // checks all validation functions
    this.form.validateAll();

    // verify if the form validation is successful or not
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        this.state.weight,
        this.state.height,
        this.state.age,
        this.state.country
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="flex h-screen">

        <div className="hidden lg:block">
          <img className="w-screen h-full object-cover" alt="myimage" src={window.location.origin + '/images/loginimg.jpg'} />
        </div>

        <div className="w-full h-full mx-auto lg:mt-10 md:mt-10">
          <div className="bg-white rounded px-8 lg:px-20 ">
            <Link to={"/"}>
              <img className="w-48 mx-auto" src={window.location.origin + '/images/logo.png'} alt="mylogo" />
            </Link>

            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="border border-gray-400 p-2 w-full"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="border border-gray-400 p-2 w-full"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="border border-gray-400 p-2 w-full"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="firstname">Firstname</label>
                      <Input
                        type="text"
                        className="border border-gray-400 p-2 w-full"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
                        validations={[required]}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Lastname</label>
                      <Input
                        type="text"
                        className="border border-gray-400 p-2 w-full"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.onChangeLastname}
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-x-4">
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="weight">Weight</label>
                      <Input
                        type="number"
                        className="border border-gray-400 p-2 w-full"
                        name="weight"
                        placeholder="kg"
                        value={this.state.weight}
                        onChange={this.onChangeWeight}
                        validations={[required]}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="height">height</label>
                      <Input
                        type="number"
                        className="border border-gray-400 p-2 w-full"
                        name="height"
                        placeholder="cm"
                        value={this.state.height}
                        onChange={this.onChangeHeight}
                        validations={[required]}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="age">Age</label>
                      <Input
                        type="number"
                        className="border border-gray-400 p-2 w-full"
                        name="age"
                        placeholder="year/s"
                        value={this.state.age}
                        onChange={this.onChangeAge}
                        validations={[required]}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="country">Country</label>
                    <select
                      className="border border-gray-400 p-2 w-full"
                      name="country"
                      value={this.state.country}
                      onChange={this.onChangeCountry}
                      validations={[required]}
                    >
                      <option value="">Select a country</option>
                      <option value="Philippines">Philippines</option>
                      <option value="USA">USA</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="China">China</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <div className="block text-gray-700 font-medium mb-2">
                      <button className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full">Sign Up</button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="flex mt-2 text-center justify-center text-sm text-gray-600">Already have an Account?
                      <Link to='/login'>
                        <span href="#" className="ml-2 font-medium text-orange-700 hover:text-orange-500 transition delay-75">
                          Login
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="mb-6">
                  <div className="block text-gray-700 font-medium mb-2">
                    <div
                      className={
                        this.state.successful
                          ? "text-green-700 p-2 text-center"
                          : "text-red-700 p-2 text-center"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
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
