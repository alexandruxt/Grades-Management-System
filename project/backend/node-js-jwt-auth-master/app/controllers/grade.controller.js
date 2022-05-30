const db = require("../models");
const Grade = db.grades;
const Op = db.Sequelize.Op;

// Create and Save a new Grade
exports.create = (req, res) => {
    // Validate request
    if (!req.body.discipline_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Grade
    const grade = {
        discipline_name: req.body.discipline_name,
        student_id: req.body.student_id,
        optional: req.body.optional ? req.body.optional : false,
        value: parseInt(req.body.value)
    };

    // Save Grade in the database
    Grade.create(grade)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Grade."
            });
        });
};

// Retrieve all Grades from the database.
exports.findAll = (req, res) => {
    const discipline_name = req.query.discipline_name;
    var condition = discipline_name ? { discipline_name: { [Op.like]: `%${discipline_name}%` } } : null;

    Grade.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving grades."
            });
        });
};

// Find a single Grade with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Grade.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Grade with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Grade with id=" + id
            });
        });
};

// Update a Grade by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Grade.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Grade was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Grade with id=${id}. Maybe Grade was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Grade with id=" + id
            });
        });
};

// Delete a Grade with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Grade.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Grade was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Grade with id=${id}. Maybe Grade was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Grade with id=" + id
            });
        });
};

// Delete all Grades from the database.
exports.deleteAll = (req, res) => {
    Grade.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Grades were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all grades."
            });
        });
};

// find all grades for optionals
exports.findAllOptionals = (req, res) => {
    Grade.findAll({ where: { optional: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving grades."
            });
        });
};
