import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddDiscipline from "./components/add-discipline.component";
import Discipline from "./components/discipline.component";
import DisciplinesList from "./components/disciplines-list.component";
import AddGrade from "./components/add-grade.component";
import Grade from "./components/grade.component";
import GradesList from "./components/grades-list.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showTeacher: false,
      showStudent: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
        this.setState({
            currentUser: user,
          showTeacher: user.roles.includes("ROLE_MODERATOR"),
          showStudent: user.roles.includes("ROLE_ADMIN"),
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
        showTeacher: false,
        showStudent: false,
        currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showTeacher, showStudent } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
                {showTeacher && (
                    <Link to={"/disciplines"} className="navbar-brand">
                        Manage Disciplines
                    </Link>
                )}
                {showTeacher && (
                    <Link to={"/grades"} className="navbar-brand">
                        Manage Grades
                    </Link>
                )}
                {showStudent && (
                    <Link to={"/grades"} className="navbar-brand">
                        Your Grades
                    </Link>
                )}
                {showTeacher && (
                    <div className="navbar-nav mr-auto">
                        {/*<li className="nav-item">*/}
                        {/*  <Link to={"/disciplines"} className="nav-link">*/}
                        {/*    Disciplines*/}
                        {/*  </Link>*/}
                        {/*  <Link to={"/grades"} className="nav-link">*/}
                        {/*    Grades*/}
                        {/*  </Link>*/}
                        {/*</li>*/}
                        <Link to={"/addDiscipline"} className="nav-link">
                            Add Discipline
                        </Link>
                        <Link to={"/addGrade"} className="nav-link">
                            Add Grade
                        </Link>
                    </div>
                )}

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                                LogOut
                            </a>
                        </li>
                        </div>
                        ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path={["/", "/disciplines"]} component={DisciplinesList} />
            <Route exact path="/addDiscipline" component={AddDiscipline} />
            <Route path="/disciplines/:id" component={Discipline} />
            <Route exact path={["/", "/grades"]} component={GradesList} />
            <Route exact path="/addGrade" component={AddGrade} />
            <Route path="/grades/:id" component={Grade} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
