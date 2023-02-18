/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import BarChart from "../Charts/Bargraph.steps";
import DoughnutWater from "../Charts/Doughnut.water";
import HalfDoughnut from "../Charts/Chart.calories";
import HeartRate from "../Charts/Chart.heartRate";
import ChartPull from "../Charts/Chart.pullup";
import ChartPush from "../Charts/Chart.push";
import ChartMuscle from "../Charts/Chart.muscle";



export default class GoalsContent extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeHeight = this.onChangeHeight.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            image: null,
            showModal: false,
            series: this.props.series,
            weight: "",
            height: "",
            age: "",
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    handleImageChange = (event) => {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        });
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
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


    handleRegister(e) {
        e.preventDefault();

        console.log(e);
        this.setState({
            message: "",
            successful: false
        });

        // checks all validation functions
        this.form.validateAll();

        // verify if the form validation is successful or not
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.profile(
                this.state.weight,
                this.state.height,
                this.state.age,
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
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        //BMI
        let Bmi = (currentUser.weight / ((currentUser.height * currentUser.height) / 10000)).toFixed(2);

        //Calorie Intake
        let bmr = 66 + (13.7 * currentUser.weight) + (5 * currentUser.height) - (6.8 * currentUser.age)

        //BMI
        let bmiResult;
        if (Bmi < 18.6) {
            bmiResult = "Underweight";
        } else if (Bmi >= 18.6 && Bmi < 24.9) {
            bmiResult = "Normal";
        } else {
            bmiResult = "Overweight";
        }


        return (

            <div className="h-screen w-full" >
                <div className="lg:flex bg-white">
                    {/* Main Content */}
                    <div className="lg:w-3/4 md:w-screen w-fit h-fit lg:h-screen px-10 py-7 lg:py-0 md:px-16 lg:ml-0">
                        <div className="flex justify-between">

                            <div className="my-5">
                                <p className="text-2xl font-bold ">Your Goals</p>
                            </div>
                        </div>

                        <section className="justify-center items-center mt-3">
                            {/* 1st chart section */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 lg:gap-x-4 md:gap-x-4">
                                <div className="bg-teal-500 px-5 pt-5 pb-14 lg:py-5 rounded-lg mb-4 justify-center items-center text-center">
                                    <div className="flex gap-x-4 items-center text-2xl text-white justify-center mx-auto mr-4">
                                        <ion-icon className="" name="footsteps"></ion-icon> <h1>Steps</h1>
                                    </div>
                                    <BarChart />

                                </div>
                                <div className="bg-orange-500 p-5 rounded-lg mb-4 text-center">
                                    <div className="flex gap-x-4 items-center text-2xl text-white justify-center mb-4 mr-4">
                                        <ion-icon name="accessibility-outline"></ion-icon> <h1>BMI type</h1>
                                    </div>
                                    <DoughnutWater />
                                    <h2 className="text-2xl font-semibold text-white mt-4 text-center">{bmiResult}</h2>
                                </div>
                                <div className="bg-pink-500 p-5 rounded-lg mb-4">
                                    <div className="flex gap-x-4 items-center text-2xl text-white mb-4 justify-center mr-4">
                                        <ion-icon className="" name="flame"></ion-icon> <h1>Calorie</h1>
                                    </div>
                                    <HalfDoughnut />
                                    <h2 className="text-2xl font-semibold text-white mt-4 text-center">{bmr} <span className="text-xs">Ideal intake</span></h2>
                                </div>
                                <div className="bg-purple-500 px-5 pt-5 pb-9 rounded-lg mb-4">
                                    <div className="flex gap-x-4 items-center text-2xl text-white justify-center">
                                        <ion-icon className="" name="pulse-outline"></ion-icon> <h1>Body Mass Index</h1>
                                    </div>
                                    <HeartRate />
                                    <h2 className="text-2xl font-semibold text-white mt-2  text-center"> {Bmi} BMI</h2>
                                </div>
                            </div>
                            {/* 2nd chart section */}

                            <h2 className="text-xl pb-4 mt-4 font-semibold">Progress</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-3 p-y-10 p-0 gap-x-5 gap-y-4 mt-4">

                                <div className="items-center bg-gray-100 p-5 rounded-lg flex justify-between ">
                                    <div>
                                        <ion-icon name="ribbon-outline"></ion-icon>
                                        <h3 className="text-md">Pull Up</h3>
                                        <h3 className="text-gray-400">630/1000 reps</h3>
                                    </div>
                                    <div>
                                        <ChartPull />
                                    </div>
                                </div>

                                <div className="items-center bg-gray-100 p-5 rounded-lg flex justify-between ">
                                    <div>
                                        <ion-icon name="ribbon-outline"></ion-icon>
                                        <h3 className="text-md">Push Up</h3>
                                        <h3 className="text-gray-400">500/1000 reps</h3>
                                    </div>
                                    <div>
                                        <ChartPush />
                                    </div>
                                </div>

                                <div className="items-center bg-gray-100 p-5 rounded-lg flex justify-between ">
                                    <div>
                                        <ion-icon name="ribbon-outline"></ion-icon>
                                        <h3 className="text-md">Muscle Ups</h3>
                                        <h3 className="text-gray-400">75/200 reps</h3>
                                    </div>
                                    <div>
                                        <ChartMuscle />
                                    </div>
                                </div>

                            </div>
                        </section>

                        {/* 3rd section */}

                        <h2 className="text-xl text-center items-center mt-20 font-semibold text-gray-300">Add more workouts don't be lazy!</h2>
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-1/4 md:w-screen w-full font-semibold bg-gray-300 py-12 px-10 lg:px-10 md:px-20">
                        <div className="flex items-center">
                            <img className="w-14 h-14 object-contain rounded-full border-2 border-orange-600 mr-2 cursor-pointer" alt="myimage" src={this.state.file ? URL.createObjectURL(this.state.file) : window.location.origin + '/images/profile.jpg'} onClick={this.toggleModal} />

                            {/* Modal */}
                            {this.state.showModal && (
                                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                    <div className="w-64 h-32 bg-white p-4 rounded">
                                        <input
                                            type="file"
                                            onChange={this.handleImageChange}
                                        />
                                        <button
                                            className="bg-red-500 text-white p-2 rounded mt-4"
                                            onClick={this.toggleModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="">
                                <p className="text-xl">{currentUser.firstname} {currentUser.lastname}</p>
                                <p className="text-slate-400 text-xs left-5 relative">
                                    <span className="absolute -left-9 flex items-center pl-3 text-xl text-orange-700">
                                        <ion-icon name="location-outline"></ion-icon>
                                    </span>
                                    {currentUser.country}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-x-10 p-5 rounded-lg bg-white my-5">

                            <div className="text-center items-center">
                                <h3 className="text-2xl">{currentUser.weight}<span className="text-sm text-gray-500">kg</span></h3>
                                <h3 className="text-gray-400">Weight</h3>
                            </div>

                            <div className="text-center items-center">
                                <h3 className="text-2xl">{currentUser.height}<span className="text-sm text-gray-500">cm</span></h3>
                                <h3 className="text-gray-400">Height</h3>
                            </div>

                            <div className="text-center items-center">
                                <h3 className="text-2xl">{currentUser.age}</h3>
                                <h3 className="text-gray-400">Age</h3>
                            </div>

                        </div>

                        <h2 className="text-lg pb-4">Update Progpress</h2>

                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-medium mb-2" htmlFor="weight">Routine</label>
                                        <Input
                                            type="text"
                                            className="border border-gray-400 p-2 w-full"
                                            name="weight"
                                            placeholder="kg"
                                            value={this.state.weight}
                                            onChange={this.onChangeWeight}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-4">

                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="height">Progress</label>
                                            <Input
                                                type="number"
                                                className="border border-gray-400 p-2 w-full"
                                                name="height"
                                                placeholder="cm"
                                                value={this.state.height}
                                                onChange={this.onChangeHeight}
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <label className="block text-gray-700 font-medium mb-2" htmlFor="age">Goal</label>
                                            <Input
                                                type="number"
                                                className="border border-gray-400 p-2 w-full"
                                                name="age"
                                                placeholder="year/s"
                                                value={this.state.age}
                                                onChange={this.onChangeAge}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="block text-gray-700 font-medium mb-2">
                                            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">Add Workout +</button>
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
            </div>
        );
    }
}