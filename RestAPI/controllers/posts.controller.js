const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;
// Create and Save a new Posts
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Posts
  const posts = {
    title: req.body.title,
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
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
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
// Find a single Posts with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Posts.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
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
// Update a Posts by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Posts.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Posts was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Posts with id=${id}. Maybe Posts was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Posts with id=" + id
      });
    });
};
// Delete a Posts with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Posts.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Posts was deleted successfully!"
        });
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
};
// Delete all Postss from the database.
exports.deleteAll = (req, res) => {
  Posts.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Postss were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all postss."
      });
    });
};
// Find all published Postss
exports.findAllPublished = (req, res) => {
  Posts.findAll({ where: { published: true } })
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