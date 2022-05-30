const db = require("../models");
const Discipline = db.disciplines;
const Op = db.Sequelize.Op;

// Create and Save a new Discipline
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Discipline
    const discipline = {
        name: req.body.name,
        optional: req.body.optional ? req.body.optional : false
    };

    // Save Discipline in the database
    Discipline.create(discipline)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Discipline."
            });
        });
};

// Retrieve all Disciplines from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Discipline.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving disciplines."
            });
        });
};

// Find a single Discipline with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Discipline.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Discipline with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Discipline with id=" + id
            });
        });
};

// Update a Discipline by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Discipline.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Discipline was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Discipline with id=${id}. Maybe Discipline was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Discipline with id=" + id
            });
        });
};

// Delete a Discipline with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Discipline.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Discipline was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Discipline with id=${id}. Maybe Discipline was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Discipline with id=" + id
            });
        });
};

// Delete all Disciplines from the database.
exports.deleteAll = (req, res) => {
    Discipline.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Disciplines were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all disciplines."
            });
        });
};

// find all optional Disciplines
exports.findAllOptionals = (req, res) => {
    Discipline.findAll({ where: { optional: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving disciplines."
            });
        });
};
