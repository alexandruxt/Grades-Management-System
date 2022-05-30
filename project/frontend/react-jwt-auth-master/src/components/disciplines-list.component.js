import React, { Component } from "react";
import DisciplineDataService from "../services/discipline.service";
import { Link } from "react-router-dom";

export default class DisciplinesList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveDisciplines = this.retrieveDisciplines.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveDiscipline = this.setActiveDiscipline.bind(this);
        this.removeAllDisciplines = this.removeAllDisciplines.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            disciplines: [],
            currentDiscipline: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveDisciplines();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveDisciplines() {
        DisciplineDataService.getAll()
            .then(response => {
                this.setState({
                    disciplines: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveDisciplines();
        this.setState({
            currentDiscipline: null,
            currentIndex: -1
        });
    }

    setActiveDiscipline(discipline, index) {
        this.setState({
            currentDiscipline: discipline,
            currentIndex: index
        });
    }

    removeAllDisciplines() {
        DisciplineDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchName() {
        this.setState({
            currentDiscipline: null,
            currentIndex: -1
        });

        DisciplineDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    disciplines: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, disciplines, currentDiscipline, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Disciplines List</h4>

                    <ul className="list-group">
                        {disciplines &&
                            disciplines.map((discipline, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveDiscipline(discipline, index)}
                                    key={index}
                                >
                                    {discipline.name}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllDisciplines}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentDiscipline ? (
                        <div>
                            <h4>Discipline</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentDiscipline.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Optional:</strong>
                                </label>{" "}
                                {currentDiscipline.optional ? "Optional" : "No"}
                            </div>

                            <Link
                                to={"/disciplines/" + currentDiscipline.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Discipline...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
