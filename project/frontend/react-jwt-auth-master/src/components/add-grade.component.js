import React, { Component } from "react";
import GradeDataService from "../services/grade.service";

export default class AddGrade extends Component {
    constructor(props) {
        super(props);
        this.onChangeDiscipline_name = this.onChangeDiscipline_name.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.saveGrade = this.saveGrade.bind(this);
        this.newGrade = this.newGrade.bind(this);

        this.state = {
            id: null,
            discipline_name: "",
            value: "",
            optional: false,
            student_id: "",
            submitted: false
        };
    }

    onChangeDiscipline_name(e) {
        this.setState({
            discipline_name: e.target.value
        });
    }

    onChangeValue(e) {
        this.setState({
            value: e.target.value
        });
    }

    onChangeStudentId(e) {
        this.setState({
            student_id: e.target.value
        });
    }

    saveGrade() {
        var data = {
            discipline_name: this.state.discipline_name,
            value: this.state.value,
            student_id: this.state.student_id
        };

        GradeDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    discipline_name: response.data.discipline_name,
                    value: response.data.value,
                    optional: response.data.optional,
                    student_id: response.data.student_id,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newGrade() {
        this.setState({
            id: null,
            discipline_name: "",
            value: "",
            optional: false,
            student_id: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newGrade}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="discipline_name">Discipline name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="discipline_name"
                                required
                                value={this.state.discipline_name}
                                onChange={this.onChangeDiscipline_name}
                                name="discipline_name"
                            />
                            </div>

                            <div className="form-group">
                                <label htmlFor="student_id">Student Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="student_id"
                                    required
                                    value={this.state.student_id}
                                    onChange={this.onChangeStudentId}
                                    name="student_id"
                                />
                            </div>

                        <div className="form-group">
                            <label htmlFor="value">Value</label>
                            <input
                                type="text"
                                className="form-control"
                                id="value"
                                required
                                value={this.state.value}
                                onChange={this.onChangeValue}
                                name="value"
                            />
                        </div>

                        <button onClick={this.saveGrade} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
