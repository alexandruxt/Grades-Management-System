import React, { Component } from "react";
import DisciplineDataService from "../services/discipline.service";

export default class AddDiscipline extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveDiscipline = this.saveDiscipline.bind(this);
        this.newDiscipline = this.newDiscipline.bind(this);

        this.state = {
            id: null,
            name: "",
            optional: false,

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    saveDiscipline() {
        var data = {
            name: this.state.name,
        };

        DisciplineDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    optional: response.data.optional,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newDiscipline() {
        this.setState({
            id: null,
            name: "",
            optional: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newDiscipline}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <button onClick={this.saveDiscipline} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
