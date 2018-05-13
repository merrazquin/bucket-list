// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js'),
  item = {
    all: function (callback) {
      orm.selectAll('items', callback)
    },
    // The variables cols and vals are arrays.
    create: function (cols, vals, callback) {
      orm.insertOne('items', cols, vals, callback)
    },
    update: function (objColVals, condition, callback) {
      orm.updateOne('items', objColVals, condition, callback)
    }
  }

// Export the database functions for the controller (itemsController.js).
module.exports = item
