/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

import BarChart from "../Charts/Bargraph.steps";
import BarChartActivity from "../Charts/Bargraph.activity";
import DoughnutChart from "../Charts/Doughnut.progress";
import DoughnutWater from "../Charts/Doughnut.water";
import HalfDoughnut from "../Charts/Chart.calories";
import HeartRate from "../Charts/Chart.heartRate";
import ChartPull from "../Charts/Chart.pullup";
import ChartPush from "../Charts/Chart.push";
import ChartMuscle from "../Charts/Chart.muscle";
import BarAvocado from "../Charts/Bar.avocado";



export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      image: null,
      showModal: false,
      series: this.props.series,
      isDarkMode: false,
    };
    this.toggleMode = this.toggleMode.bind(this);
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

  toggleMode() {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode,
    }));
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    const { isDarkMode } = this.state;
    const toggleClass = isDarkMode ? 'dark' : '';

    //BMI
    let Bmi = (currentUser.weight / ((currentUser.height * currentUser.height) / 10000)).toFixed(2);

    // BMI type
    let bmiResult;
    if (Bmi < 18.6) {
      bmiResult = "Underweight";
    } else if (Bmi >= 18.6 && Bmi < 24.9) {
      bmiResult = "Normal";
    } else {
      bmiResult = "Overweight";
    }

     //Calorie Intake
     let bmr =  66 + (13.7 * currentUser.weight) + (5 * currentUser.height) - (6.8 * currentUser.age)



    return (

      <div id="toggleDark" className={`h-screen w-full ${toggleClass}`}>
        <div className="lg:flex bg-white dark:bg-gray-800 dark:text-gray-300 transition ease-in duration-150">
          {/* Main Content */}
          <div className="lg:w-3/4 md:w-screen w-fit h-fit lg:h-screen px-10 py-7 lg:py-0 md:px-16 lg:ml-0">
            <div className="mt-4">
              <p className="text-xl">Hi, {currentUser.firstname}!</p>
            </div>
            <div className="flex justify-between">

              <div className="my-5">
                <p className="text-2xl font-bold ">Welcome 🎉</p>
              </div>
              <div className="justify-end flex gap-5 items-center">
                <Link to='/contact'>
                  <button type="button" className="bg-orange-500 px-4 py-2 text-white rounded hidden lg:block md:block">Support</button></Link>
                <div className="text-2xl cursor-pointer text-gray-700 hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300">
                  <ion-icon name="notifications-outline"></ion-icon>
                </div>
                <div className="text-2xl cursor-pointer text-gray-700 hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300">
                  <ion-icon name={isDarkMode ? 'sunny' : 'moon'} onClick={this.toggleMode}></ion-icon>
                </div>
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
                    <ion-icon className="" name="flame"></ion-icon> <h1>Calories</h1>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 lg:gap-x-8 md:gap-x-4 mt-0">
                <div className="p-5 rounded-lg mb-4">
                  <div className="mb-4 items-center text-2xl text-black dark:text-gray-300">
                    <h1 className="text-center lg:text-left">Activity</h1>
                  </div>
                  <BarChartActivity />
                </div>
                <div className="p-5 rounded-lg mb-4 mx-auto">
                  <div className="mb-4 lg:mb-8 items-center text-2xl text-black dark:text-gray-300">
                    <h1 className="text-center lg:text-left">Progress</h1>
                  </div>
                  <div className="flex-none lg:flex justify-between gap-x-10">
                    <DoughnutChart />

                    <div className="grid grid-row-4">
                      <div className="grid grid-cols-2 gap-x-10 md:gap-x-5">
                        <h3 className="font-semibold"> <span className="text-teal-500">•</span> Cardio</h3>
                        <h4 className="">30hrs</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-x-10 md:gap-x-5">
                        <h3 className="font-semibold"> <span className="text-orange-500">•</span> Stretch</h3>
                        <h4 className="">40hrs</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-x-10 md:gap-x-5">
                        <h3 className="font-semibold"> <span className="text-pink-500">•</span> Run</h3>
                        <h4 className="">20hrs</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-x-10 md:gap-x-5">
                        <h3 className="font-semibold"> <span className="text-purple-500">•</span> Power</h3>
                        <h4 className="">10hrs</h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* 3rd section */}
            <div className="px-5 py-0 -mt-4">

              <div className="mb-4 items-center text-2xl text-black dark:text-gray-300">
                <h1 className="text-center lg:text-left">Program Diet</h1>
              </div>

              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 dark:text-gray-700">
                  <div className="">

                    <div className="p-3 bg-blue-100 rounded-lg mb-2 flex justify-between">
                      <p>Breakfast</p>
                      <p>10:00 am</p>
                    </div>

                    <h2 className="text-center font-semibold py-3 dark:text-gray-400">Avocado Salad</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8">

                      <div className="">
                        <img className="w-32 md:w-full rounded-lg" src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="breakfast"></img>
                      </div>

                      <div className="text-sm md:text-md lg:text-md dark:text-gray-400">
                        <div className="flex justify-between items-center mt-2 lg:mt-0 ">
                          <h3 className="font-semibold "> <span className="text-purple-500">•</span> Protein </h3>
                          <h3 className="font-semibold"> 30%</h3>

                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-orange-500">•</span> Carbs </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-pink-500">•</span> Fat </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>
                      </div>


                      <div className="lg:mt-0">
                        <BarAvocado />
                      </div>


                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 lg:mt-0">

                    <div className="p-3 bg-blue-100 rounded-lg mb-2 flex justify-between">
                      <p>Lunch</p>
                      <p>10:00 am</p>
                    </div>

                    <h2 className="text-center font-semibold py-3 dark:text-gray-400">Avocado Salad</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8">

                      <div className="">
                        <img className="w-32 md:w-full rounded-lg" src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="breakfast"></img>
                      </div>

                      <div className="text-sm md:text-md lg:text-md dark:text-gray-400">
                        <div className="flex justify-between items-center mt-2 lg:mt-0 ">
                          <h3 className="font-semibold "> <span className="text-purple-500">•</span> Protein </h3>
                          <h3 className="font-semibold"> 30%</h3>

                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-orange-500">•</span> Carbs </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-pink-500">•</span> Fat </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>
                      </div>


                      <div className="lg:mt-0">
                        <BarAvocado />
                      </div>


                    </div>

                  </div>

                  <div className="mt-4 md:mt-8 lg:mt-0">

                    <div className="p-3 bg-blue-100 rounded-lg mb-2 flex justify-between">
                      <p>Dinner</p>
                      <p>10:00 am</p>
                    </div>

                    <h2 className="text-center font-semibold py-3 dark:text-gray-400">Avocado Salad</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8">

                      <div className="">
                        <img className="w-32 md:w-full rounded-lg" src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="breakfast"></img>
                      </div>

                      <div className="text-sm md:text-md lg:text-md dark:text-gray-400">
                        <div className="flex justify-between items-center mt-2 lg:mt-0 ">
                          <h3 className="font-semibold "> <span className="text-purple-500">•</span> Protein </h3>
                          <h3 className="font-semibold"> 30%</h3>

                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-orange-500">•</span> Carbs </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold"> <span className="text-pink-500">•</span> Fat </h3>
                          <h3 className="font-semibold">30%</h3>
                        </div>
                      </div>


                      <div className="lg:mt-0">
                        <BarAvocado />
                      </div>


                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div className="lg:w-1/4 md:w-screen w-full font-semibold bg-gray-300 dark:bg-gray-700 py-12 px-10 lg:px-10 md:px-20 transition ease-in duration-150">
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

            <div className="grid grid-cols-3 gap-x-10 p-5 rounded-lg bg-white my-5 dark:bg-gray-600">

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

            <h2 className="text-lg pb-4">Your Goals</h2>

            <div className="grid grid-rows-3 p-y-10 p-0 gap-y-5 ">

              <div className="items-center bg-white p-5 rounded-lg flex justify-between dark:bg-gray-600">
                <div>
                  <ion-icon name="ribbon-outline"></ion-icon>
                  <h3 className="text-md">Pull Up</h3>
                  <h3 className="text-gray-400">630/1000 reps</h3>
                </div>
                <div>
                  <ChartPull />
                </div>
              </div>

              <div className="items-center bg-white p-5 rounded-lg flex justify-between dark:bg-gray-600">
                <div>
                  <ion-icon name="ribbon-outline"></ion-icon>
                  <h3 className="text-md">Push Up</h3>
                  <h3 className="text-gray-400">500/1000 reps</h3>
                </div>
                <div>
                  <ChartPush />
                </div>
              </div>

              <div className="items-center bg-white p-5 rounded-lg flex justify-between dark:bg-gray-600">
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
            <Link to="/goals">
              <p className="text-xs text-right mt-1 hover:text-orange-500">See more...</p></Link>


            <h2 className="text-lg py-5">Events</h2>

            <div className="grid grid-rows-2 p-y-10 p-0 gap-y-5">

              <div className="items-center bg-white rounded-lg flex justify-between overflow-x-hidden overflow-y-hidden dark:bg-gray-600">
                <div className="p-4">
                  <h3 className="text-md">Spartan Race</h3>
                  <h3 className="text-gray-400">Vermosa</h3>
                </div>
                <div className="bg-red-500 w-34">
                  <img className="w-32 h-full " src="https://s3-ap-southeast-1.amazonaws.com/v7-ap-uploads-sp/wp-content/uploads/sites/15/2018/02/07075041/3-1024x681.jpg" alt="events"></img>
                </div>
              </div>

              <div className="items-center bg-white rounded-lg flex justify-between overflow-x-hidden overflow-y-hidden dark:bg-gray-600">
                <div className="p-4">
                  <h3 className="text-md">Spartan Race</h3>
                  <h3 className="text-gray-400">Alviera</h3>
                </div>
                <div className="">
                  <img className="w-32 h-full " src="http://www.smartshanghai.com/uploads/articles/2019/smsh1554869744.jpg" alt="events"></img>
                </div>
              </div>
            </div>
            <Link to="/goals">
              <p className="text-xs text-right mt-1 hover:text-orange-500">See more...</p></Link>

          </div>
        </div>
      </div>


    );
  }
}




{/* {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Firstname:</strong>{" "}
          {currentUser.firstname}
        </p>
        <p>
          <strong>Lastname:</strong>{" "}
          {currentUser.lastname}
        </p>
        <p>
          <strong>Country:</strong>{" "}
          {currentUser.country}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null} */}