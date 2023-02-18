/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    return (
      <div>

        <main className="relative items-center justify-center w-screen h-screen overflow-hidden hidden lg:block">
          <video className="w-screen h-auto max-w-fit xl:min-w-0 xl:min-h-0" autoPlay muted loop>
            <source className="w-screen h-auto" src={window.location.origin + '/images/homevid.mp4'} type="video/mp4" />
          </video>
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity z-10"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed z-10">
            <div className="flex justify-center items-center h-full">
              <div className="text-white text-center px-10 px-md-0">
                <h2 className="text-3xl font-semibold mb-4">Dictionary meaning:</h2>
                <h2 className="text-2xl font-semibold mb-4">σθένος • (sthénos) n (genitive σθένεος or σθένους); third declension </h2>
                <h5 className="text-lg font-semibold mb-6 text-red-600"> Strength • Might • Power</h5>
                <div className="md:space-x-2">

                  <Link to={"/login"} className="bg-orange-400 inline-block px-6 py-2 mb-2 md:mb-0 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-orange-500 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Login</Link>

                  <Link to={"/register"} className="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Register</Link>

                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile */}
        <main className="lg:hidden bg-[url('https://images.pexels.com/photos/3068266/pexels-photo-3068266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-no-repeat h-screen w-screen">

        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>

          <div className="relative pt-12 lg:px-8 px-4">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-6xl">Dictionary meaning:</h1>
                <p className="mt-6 text-lg leading-8 text-gray-50">σθένος • (sthénos) n (genitive σθένεος or σθένους); <br></br> third declension </p>
                <p className="text-lg font-semibold mb-6 text-red-600">Strength • Might • Power</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to={"/login"} className="rounded-md bg-orange-400 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Login</Link>
                <Link to={"/register"} className="text-base font-semibold leading-7 text-white rounded-md border border-white px-3.5 py-1.5">Register <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    );
  }
}
