import React, { Component } from "react";
import DisciplineDataService from "../services/discipline.service";

export default class Discipline extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.getDiscipline = this.getDiscipline.bind(this);
        this.updateOptional = this.updateOptional.bind(this);
        this.updateDiscipline = this.updateDiscipline.bind(this);
        this.deleteDiscipline = this.deleteDiscipline.bind(this);

        this.state = {
            currentDiscipline: {
                id: null,
                name: "",
                optional: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getDiscipline(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDiscipline: {
                    ...prevState.currentDiscipline,
                    name: name
                }
            };
        });
    }

    getDiscipline(id) {
        DisciplineDataService.get(id)
            .then(response => {
                this.setState({
                    currentDiscipline: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateOptional(status) {
        var data = {
            id: this.state.currentDiscipline.id,
            name: this.state.currentDiscipline.name,
            optional: status
        };

        DisciplineDataService.update(this.state.currentDiscipline.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentDiscipline: {
                        ...prevState.currentDiscipline,
                        optional: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateDiscipline() {
        DisciplineDataService.update(
            this.state.currentDiscipline.id,
            this.state.currentDiscipline
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The discipline was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteDiscipline() {
        DisciplineDataService.delete(this.state.currentDiscipline.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/disciplines')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentDiscipline } = this.state;

        return (
            <div>
                {currentDiscipline ? (
                    <div className="edit-form">
                        <h4>Discipline</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentDiscipline.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentDiscipline.optional ? "Optional" : "No"}
                            </div>
                        </form>

                        {currentDiscipline.optional ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateOptional(false)}
                            >
                                Make it mandatory
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateOptional(true)}
                            >
                                Make it optional
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteDiscipline}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateDiscipline}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Discipline...</p>
                    </div>
                )}
            </div>
        );
    }
}
