/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import GoalsContent from "./components/goal.component";
import ContactForm from "./components/support.component";
import EventsPage from "./pages/EventsPage";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }


  render() {
    const { currentUser, showAdminBoard } = this.state;

    const Menus = [
      { title: "Dashboard", src: "Dashboard", link: "/profile" },
      { title: "Goal", src: "Goal", link: "/goals" },
      { title: "Events", src: "Events", link: "/events" },

      { title: "Support", src: "Support", gap: true, link: "/contact" },
      { title: "Setting ", src: "Setting"}
    ];

    return (

      <div>
        <div className="">

          <Routes>
            <Route path={"/*"} element={
              <div>
                <nav className="bg-white z-50 w-screen fixed flex items-center justify-between flex-wrap px-6 py-2 top-0">

                  <div className="flex items-center flex-shrink-0">
                    <ul className="flex">
                      <li className="ml-10">
                        <Link to={"/"}>
                          <img className="w-32 h-auto" src={window.location.origin + '/images/logo.png'} />
                        </Link>
                      </li>

                      {showAdminBoard && (
                        <li className="px-3">
                          <Link to={"/admin"} className="text-black hover:text-gray-400">
                            Admin Board
                          </Link>
                        </li>
                      )}

                      {currentUser && (
                        <li className="px-3">
                          <Link to={"/user"} className="text-black hover:text-gray-400 ">
                            User
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>

                  {currentUser ? (
                    <div className="flex items-center">
                      <ul className="flex">
                        <li className="px-3">
                          <Link to={"/profile"} className="text-black hover:text-gray-400 ">
                            {currentUser.username}
                          </Link>
                        </li>
                        <li className="px-3">
                          <a href="/login" className="text-black hover:text-gray-400" onClick={this.logOut}>
                            LogOut
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <ul className="flex">
                        <li className="px-3">
                          <Link to={"/login"} className="text-black hover:text-gray-400 text-2xl" title="Login">
                            <ion-icon name="log-in-outline"></ion-icon>
                          </Link>
                        </li>
                        <li className="px-3">
                          <Link to={"/register"} className="text-black hover:text-gray-400 text-2xl" title="Register">
                            <ion-icon name="arrow-up-circle-outline"></ion-icon>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </nav>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>

              </div>
            } />

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path={"/profile/*"} element={
              // desktop
              <div className="flex">
                <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen bg-slate-200  duration-300`}>
                  <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen md:h-full fixed bg-slate-200  duration-300`}>
                    <ArrowLeftCircleIcon className={`absolute hidden lg:block cursor-pointer rounded-full -right-3 top-9 w-7 border-orange border-2 ${!this.state.collapse && 'rotate-180'}`}
                      onClick={() => this.setState({ collapse: !this.state.collapse })}
                    />
                    <div className="flex gap-x-4 items-center">
                      <img
                        className={`h-auto w-screen cursor-pointer duration 500`}
                        alt="Your Company"
                        src={window.location.origin + '/images/logo.png'}
                      />
                    </div>

                    <ul className="pt-6">
                      {Menus.map((menu, index) => (
                        <Link key={index} to={`${menu.link}`}>
                          <li className={`flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 
                      ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                            } `} onClick={menu.onClick}>
                            <img className="w-4" src={window.location.origin + `/images/${menu.src}.png`} />
                            <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                              {menu.title}
                            </span>
                          </li>
                        </Link>
                      ))}

                      <li className="flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 mt-2">
                        <a href="/login" className="text-black flex gap-x-4" onClick={this.logOut}>
                          <img className="w-4" src={window.location.origin + `/images/Logout.png`} />
                          <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                            Logout
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>

                <Routes>
                  <Route path="/*" element={<Profile />} />
                </Routes>
              </div>
            } />

            <Route path={'/goals/*'} element={
              // desktop
              <div className="flex">
                <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen bg-slate-200  duration-300`}>
                  <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen md:h-full fixed bg-slate-200  duration-300`}>
                    <ArrowLeftCircleIcon className={`absolute hidden lg:block cursor-pointer rounded-full -right-3 top-9 w-7 border-orange border-2 ${!this.state.collapse && 'rotate-180'}`}
                      onClick={() => this.setState({ collapse: !this.state.collapse })}
                    />
                    <div className="flex gap-x-4 items-center">
                      <img
                        className={`h-auto w-screen cursor-pointer duration 500`}
                        alt="Your Company"
                        src={window.location.origin + '/images/logo.png'}
                      />
                    </div>

                    <ul className="pt-6">
                      {Menus.map((menu, index) => (
                        <Link key={index} to={`${menu.link}`}>
                          <li className={`flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 
                      ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                            } `} onClick={menu.onClick}>
                            <img className="w-4" src={window.location.origin + `/images/${menu.src}.png`} />
                            <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                              {menu.title}
                            </span>
                          </li>
                        </Link>
                      ))}

                      <li className="flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 mt-2">
                        <a href="/login" className="text-black flex gap-x-4" onClick={this.logOut}>
                          <img className="w-4" src={window.location.origin + `/images/Logout.png`} />
                          <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                            Logout
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>

                <Routes>
                  <Route path="/*" element={<GoalsContent />} />
                </Routes>
              </div>
            } />

            <Route path={'/events/*'} element={
              // desktop
              <div className="flex">
                <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen bg-slate-200  duration-300`}>
                  <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen md:h-full fixed bg-slate-200  duration-300`}>
                    <ArrowLeftCircleIcon className={`absolute hidden lg:block cursor-pointer rounded-full -right-3 top-9 w-7 border-orange border-2 ${!this.state.collapse && 'rotate-180'}`}
                      onClick={() => this.setState({ collapse: !this.state.collapse })}
                    />
                    <div className="flex gap-x-4 items-center">
                      <img
                        className={`h-auto w-screen cursor-pointer duration 500`}
                        alt="Your Company"
                        src={window.location.origin + '/images/logo.png'}
                      />
                    </div>

                    <ul className="pt-6">
                      {Menus.map((menu, index) => (
                        <Link key={index} to={`${menu.link}`}>
                          <li className={`flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 
                      ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                            } `} onClick={menu.onClick}>
                            <img className="w-4" src={window.location.origin + `/images/${menu.src}.png`} />
                            <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                              {menu.title}
                            </span>
                          </li>
                        </Link>
                      ))}

                      <li className="flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 mt-2">
                        <a href="/login" className="text-black flex gap-x-4" onClick={this.logOut}>
                          <img className="w-4" src={window.location.origin + `/images/Logout.png`} />
                          <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                            Logout
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>

                <Routes>
                  <Route path="/*" element={<EventsPage />} />
                </Routes>
              </div>
            } />


            <Route path={'/contact/*'} element={
              // desktop
              <div className="flex">
                <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen bg-slate-200  duration-300`}>
                  <div className={`${this.state.collapse ? "w-52" : "w-12"} w-52 h-screen md:h-full fixed bg-slate-200  duration-300`}>
                    <ArrowLeftCircleIcon className={`absolute hidden lg:block cursor-pointer rounded-full -right-3 top-9 w-7 border-orange border-2 ${!this.state.collapse && 'rotate-180'}`}
                      onClick={() => this.setState({ collapse: !this.state.collapse })}
                    />
                    <div className="flex gap-x-4 items-center">
                      <img
                        className={`h-auto w-screen cursor-pointer duration 500`}
                        alt="Your Company"
                        src={window.location.origin + '/images/logo.png'}
                      />
                    </div>

                    <ul className="pt-6">
                      {Menus.map((menu, index) => (
                        <Link key={index} to={`${menu.link}`}>
                          <li className={`flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 
                      ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                            } `} onClick={menu.onClick}>
                            <img className="w-4" src={window.location.origin + `/images/${menu.src}.png`} />
                            <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                              {menu.title}
                            </span>
                          </li>
                        </Link>
                      ))}

                      <li className="flex p-4 cursor-pointer hover:bg-slate-400 text-black text-sm items-center gap-x-4 mt-2">
                        <a href="/login" className="text-black flex gap-x-4" onClick={this.logOut}>
                          <img className="w-4" src={window.location.origin + `/images/Logout.png`} />
                          <span className={`${!this.state.collapse && "hidden"} origin-left duration-200 `}>
                            Logout
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                </div>

                <Routes>
                  <Route path="/*" element={<ContactForm />} />
                </Routes>
              </div>
            } />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>

        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
