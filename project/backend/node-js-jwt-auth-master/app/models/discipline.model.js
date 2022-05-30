module.exports = (sequelize, Sequelize) => {
    const Discipline = sequelize.define("discipline", {
        name: {
            type: Sequelize.STRING
        },
        optional: {
            type: Sequelize.BOOLEAN
        }
    });

    return Discipline;
};
