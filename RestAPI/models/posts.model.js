module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define("posts", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
    });
    return model;
  };