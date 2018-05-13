// Import MySQL connection.c
const connection = require('../config/connection.js');

/**
 * Helper function for SQL syntax. 
 * Generates a comma-separated list of '?' ('??' if double) characters of num-length
 * @param {Number} num 
 * @param {boolean} double
 */
function printQuestionMarks(num, double = false) {
  return new Array(num).fill(double ? '??' : '?').toString();
}

/**
 * Helper function for handling MySQL responses
 * @param {object} err 
 * @param {object} result 
 * @param {function} callback 
 */
function handleResults(err, result, callback) {
  if (err) throw err

  callback(result)
}

// Object for all our SQL statement functions.
const orm = {
  selectAll: function (table, callback) {
    connection.query('SELECT * FROM ??',
      table, (err, result) => handleResults(err, result, callback))
  },
  insertOne: function (table, cols, vals, callback) {
    connection.query('INSERT INTO ?? (' + printQuestionMarks(cols.length, true) + ') VALUES (' + printQuestionMarks(vals.length) + ')',
      [table].concat(cols, vals), (err, result) => handleResults(err, result, callback))
  },
  updateOne: function (table, objColVals, condition, callback) {
    connection.query('UPDATE ?? SET ? WHERE ' + condition,
      [table, objColVals], (err, result) => handleResults(err, result, callback))
  }
};

// Export the orm object for the model (item.js).
module.exports = orm;
