/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import AuthService from "../services/auth.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


export default class EventsContent extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);

        this.state = {
            userReady: false,
            currentUser: { username: "" },
            showModal: false,
            series: this.props.series,
            firstname: "",
            lastname: "",
            country: "",
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }


    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
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
                this.state.country,
                this.state.firstname,
                this.state.lastname,
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

            <div className="h-screen w-full">
                <div className="lg:flex bg-white">
                    {/* Main Content */}
                    <div className="w-full px-10 py-7 lg:py-0 md:px-16 lg:ml-0">
                        <div className="flex justify-between">

                            <div className="my-5 grid grid-cols-2 w-screen justify-items-end items-center">
                                <h2 className="text-4xl font-bold">Your Events</h2>
                                <div className="text-4xl flex gap-x-4 items-center" onClick={this.toggleModal}>
                                    <h2 className="text-xl font-bold">New Event</h2>
                                    <ion-icon className="" name="add-circle-outline"></ion-icon>
                                </div>
                            </div>

                        </div>

                        <section className="justify-center items-center mt-3">
                            {/* 1st chart section */}

                            <div className="grid grid-rows-2 p-0 gap-y-10">

                                <div className="grid grid-cols-3 bg-gray-200 rounded-lg overflow-x-hidden overflow-y-hidden">
                                    <div className="p-10 bg-gray-100">
                                        <h2 className="text-xl">Spartan Race - Philippines</h2>
                                        <h3 className="text-gray-600">Sprint | Super | HH24</h3>
                                        <h3 className="text-gray-600">Vermosa, Daang Hari</h3>
                                        <h3 className="text-gray-600">February 18, 2023</h3>
                                    </div>
                                    <div className="p-10">
                                        <h2 className="text-gray-600 mb-4">About the race</h2>
                                        <h4 className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
                                    </div>
                                    <div className="w-34">
                                        <img className="w-fit h-full rounded-lg " src="http://www.smartshanghai.com/uploads/articles/2019/smsh1554869744.jpg" alt="events"></img>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 bg-gray-200 rounded-lg overflow-x-hidden overflow-y-hidden">
                                    <div className="p-10 bg-gray-100">
                                        <h2 className="text-xl">Spartan Race - New Zealand</h2>
                                        <h3 className="text-gray-600">Sprint | Super | Beast</h3>
                                        <h3 className="text-gray-600">Auckland, Waitakere</h3>
                                        <h3 className="text-gray-600">December 12, 2023</h3>
                                    </div>
                                    <div className="p-10">
                                        <h2 className="text-gray-600 mb-4">About the race</h2>
                                        <h4 className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
                                    </div>
                                    <div className="w-34">
                                        <img className="w-fit h-full rounded-lg " src="https://s3-ap-southeast-1.amazonaws.com/v7-ap-uploads-sp/wp-content/uploads/sites/15/2018/02/07075041/3-1024x681.jpg" alt="events"></img>
                                    </div>
                                </div>
                            </div>


                            {/* Modal */}
                            {this.state.showModal && (

                                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                    <div className="w-1/2 h-auto bg-white p-4 rounded">

                                        <h2 className="text-4xl font-bold">Set Event</h2>

                                        <Form
                                            onSubmit={this.handleRegister}
                                            ref={c => {
                                                this.form = c;
                                            }}
                                        >
                                            {!this.state.successful && (
                                                <div>

                                                    <div className="grid grid-cols-4 gap-x-4">
                                                        <div className="mb-6">
                                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="firstname">Event</label>
                                                            <Input
                                                                type="text"
                                                                className="border border-gray-400 p-2 w-full"
                                                                name="firstname"
                                                                placeholder="name"
                                                                value={this.state.firstname}
                                                                onChange={this.onChangeFirstname}
                                                            />
                                                        </div>

                                                        <div className="mb-6">
                                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Venue</label>
                                                            <Input
                                                                type="text"
                                                                className="border border-gray-400 p-2 w-full"
                                                                name="lastname"
                                                                placeholder="Country/City"
                                                                value={this.state.lastname}
                                                                onChange={this.onChangeLastname}
                                                            />
                                                        </div>

                                                        <div className="mb-6">
                                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Date</label>
                                                            <Input
                                                                type="date"
                                                                className="border border-gray-400 p-2 w-full"
                                                                name="lastname"
                                                                placeholder="when"
                                                                value={this.state.lastname}
                                                                onChange={this.onChangeLastname}
                                                            />
                                                        </div>

                                                        <div className="mb-6">
                                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Time</label>
                                                            <Input
                                                                type="time"
                                                                className="border border-gray-400 p-2 w-full"
                                                                name="lastname"
                                                                placeholder="am/pm"
                                                                value={this.state.lastname}
                                                                onChange={this.onChangeLastname}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-6">
                                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Category</label>
                                                        <Input
                                                            type="text"
                                                            className="border border-gray-400 p-2 w-full"
                                                            name="lastname"
                                                            value={this.state.lastname}
                                                            onChange={this.onChangeLastname}
                                                        />
                                                    </div>

                                                    <div className="mb-6">
                                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="lastname">Description</label>
                                                        <textarea
                                                            type="text"
                                                            className="border border-gray-400 p-2 w-full"
                                                            name="lastname"
                                                            value={this.state.lastname}
                                                            onChange={this.onChangeLastname}
                                                        />
                                                    </div>

                                                    <div className="mb-6">
                                                        <div className="block text-gray-700 font-medium mb-2">
                                                            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" onClick={this.toggleModal}>Add Event</button>
                                                        </div>
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

                            )}
                        </section>
                    </div>
                </div>
            </div>


        );
    }
}



