import React, { Component } from "react";
import GradeDataService from "../services/grade.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class GradesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchDiscipline_name = this.onChangeSearchDiscipline_name.bind(this);
        this.retrieveGrades = this.retrieveGrades.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveGrade = this.setActiveGrade.bind(this);
        this.removeAllGrades = this.removeAllGrades.bind(this);
        this.searchDiscipline_name = this.searchDiscipline_name.bind(this);

        this.state = {
            grades: [],
            currentGrade: null,
            currentIndex: -1,
            searchDiscipline_name: "",
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showTeacher: user.roles.includes("ROLE_MODERATOR"),
            });
        }
        this.retrieveGrades();
    }

    onChangeSearchDiscipline_name(e) {
        const searchDiscipline_name = e.target.value;

        this.setState({
            searchDiscipline_name: searchDiscipline_name
        });
    }

    retrieveGrades() {
        GradeDataService.getAll()
            .then(response => {
                this.setState({
                    grades: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveGrades();
        this.setState({
            currentGrade: null,
            currentIndex: -1
        });
    }

    setActiveGrade(grade, index) {
        this.setState({
            currentGrade: grade,
            currentIndex: index
        });
    }

    removeAllGrades() {
        GradeDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchDiscipline_name() {
        this.setState({
            currentGrade: null,
            currentIndex: -1
        });

        GradeDataService.findByDiscipline_name(this.state.searchDiscipline_name)
            .then(response => {
                this.setState({
                    grades: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { showTeacher, searchDiscipline_name, grades, currentGrade, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by discipline name"
                            value={searchDiscipline_name}
                            onChange={this.onChangeSearchDiscipline_name}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchDiscipline_name}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Grades List</h4>

                    <ul className="list-group">
                        {grades &&
                            grades.map((grade, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveGrade(grade, index)}
                                    key={index}
                                >
                                    {grade.discipline_name}
                                </li>
                            ))}
                    </ul>
                    {showTeacher && (
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={this.removeAllGrades}
                        >
                            Remove All
                        </button>
                    )}
                </div>
                <div className="col-md-6">
                    {currentGrade ? (
                        <div>
                            <h4>Grade</h4>
                            <div>
                                <label>
                                    <strong>Discipline name:</strong>
                                </label>{" "}
                                {currentGrade.discipline_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Optional:</strong>
                                </label>{" "}
                                {currentGrade.optional ? "Optional" : "No"}
                            </div>
                            <div>
                                <label>
                                    <strong>Student Id:</strong>
                                </label>{" "}
                                {currentGrade.student_id}
                            </div>
                            <div>
                                <label>
                                    <strong>Value:</strong>
                                </label>{" "}
                                {currentGrade.value}
                            </div>
                            {showTeacher && (
                                <Link
                                    to={"/grades/" + currentGrade.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>)}
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Grade...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
