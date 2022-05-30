module.exports = (sequelize, Sequelize) => {
    const Grade = sequelize.define("grade", {
        discipline_name: {
            type: Sequelize.STRING
        },
        student_id: {
            type: Sequelize.INTEGER
        },
        optional: {
            type: Sequelize.BOOLEAN
        },
        value: {
            type: Sequelize.INTEGER
        }
    });

    return Grade;
};
