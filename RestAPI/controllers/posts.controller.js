const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;
// Create and Save a new Posts
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Posts
  const posts = {
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save Posts in the database
  Posts.create(posts)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Posts."
      });
    });
};
// Retrieve all Postss from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  Posts.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving postss."
      });
    });
};
// Delete a Posts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Posts.findByPk(id)
    .then(data => {
      if (data) {
        Posts.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send(data);
            } else {
              res.send({
                message: `Cannot delete Posts with id=${id}. Maybe Posts was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Posts with id=" + id
            });
          });
      } else {
        res.status(404).send({
          message: `Cannot find Posts with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Posts with id=" + id
      });
    });


 
};
