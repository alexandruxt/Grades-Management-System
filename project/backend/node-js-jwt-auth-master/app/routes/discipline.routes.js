module.exports = app => {
    const disciplines = require("../controllers/discipline.controller.js");

    var router = require("express").Router();

    // Create a new Discipline
    router.post("/", disciplines.create);

    // Retrieve all Disciplines
    router.get("/", disciplines.findAll);

    // Retrieve all optional Disciplines
    router.get("/optional", disciplines.findAllOptionals);

    // Retrieve a single Discipline with id
    router.get("/:id", disciplines.findOne);

    // Update a Discipline with id
    router.put("/:id", disciplines.update);

    // Delete a Discipline with id
    router.delete("/:id", disciplines.delete);

    // Delete all Disciplines
    router.delete("/", disciplines.deleteAll);

    app.use('/api/disciplines', router);
};
