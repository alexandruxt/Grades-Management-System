import React, { Component } from "react";
import GradeDataService from "../services/grade.service";

export default class Grade extends Component {
    constructor(props) {
        super(props);
        this.onChangeDiscipline_name = this.onChangeDiscipline_name.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.getGrade = this.getGrade.bind(this);
        this.updateOptional = this.updateOptional.bind(this);
        this.updateGrade = this.updateGrade.bind(this);
        this.deleteGrade = this.deleteGrade.bind(this);

        this.state = {
            currentGrade: {
                id: null,
                discipline_name: "",
                value: "",
                student_id: "",
                optional: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getGrade(this.props.match.params.id);
    }

    onChangeDiscipline_name(e) {
        const discipline_name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentGrade: {
                    ...prevState.currentGrade,
                    discipline_name: discipline_name,
                }
            };
        });
    }

    onChangeValue(e) {
        const value = e.target.value;

        this.setState(prevState => ({
            currentGrade: {
                ...prevState.currentGrade,
                value: value
            }
        }));
    }

    onChangeStudentId(e) {
        const student_id = e.target.student_id;

        this.setState(prevState => ({
            currentGrade: {
                ...prevState.currentGrade,
                student_id: student_id,
            }
        }));
    }

    getGrade(id) {
        GradeDataService.get(id)
            .then(response => {
                this.setState({
                    currentGrade: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateOptional(status) {
        var data = {
            id: this.state.currentGrade.id,
            discipline_name: this.state.currentGrade.discipline_name,
            student_id: this.state.currentGrade.student_id,
            value: this.state.currentGrade.value,
            optional: status
        };

        GradeDataService.update(this.state.currentGrade.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentGrade: {
                        ...prevState.currentGrade,
                        optional: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateGrade() {
        GradeDataService.update(
            this.state.currentGrade.id,
            this.state.currentGrade
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The grade was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteGrade() {
        GradeDataService.delete(this.state.currentGrade.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/grades')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentGrade } = this.state;

        return (
            <div>
                {currentGrade ? (
                    <div className="edit-form">
                        <h4>Grade</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="discipline_name">Discipline name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="discipline_name"
                                    value={currentGrade.discipline_name}
                                    onChange={this.onChangediscipline_name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Value</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="value"
                                    value={currentGrade.value}
                                    onChange={this.onChangeValue}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="student_id">Student Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="student_id"
                                    value={currentGrade.student_id}
                                    onChange={this.onChangeStudentId}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Optional:</strong>
                                </label>
                                {currentGrade.optional ? "Optional" : "No"}
                            </div>
                        </form>

                        {currentGrade.optional ? (
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
                            onClick={this.deleteGrade}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateGrade}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Grade...</p>
                    </div>
                )}
            </div>
        );
    }
}
