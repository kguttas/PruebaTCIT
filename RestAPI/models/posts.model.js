module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define("posts", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return model;
  };