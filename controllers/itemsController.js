const express = require('express'),
  router = express.Router(),
  item = require('../models/item.js')

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
  item.all(function (data) {
    res.render('index', { items: data })
  })
})

router.post('/api/items', function (req, res) {
  item.create(['item', 'accomplished'], [req.body.item, req.body.accomplished], function (result) {
    res.json({ id: result.insertId })
  })
})

router.put('/api/items/:id', function (req, res) {
  let condition = 'id = ' + req.params.id

  item.update(
    {
      accomplished: req.body.accomplished
    },
    condition,
    function (result) {
      // If no rows were changed, then the ID must not exist, so 404
      res.status(result.changedRows === 0 ? 404 : 200).end()
    }
  )
})

// Export routes for server.js to use.
module.exports = router
