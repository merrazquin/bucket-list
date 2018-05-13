// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $('.accomplish-item').on('click', function (event) {
    var id = $(this).data('id')

    // Send the PUT request.
    $.ajax('/api/items/' + id, {
      type: 'PUT',
      data: { accomplished: 1 }
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload()
      }
    )
  })

  $('.create-form').on('submit', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault()

    var newItem = {
      item: $('#item').val().trim(),
      accomplished: 0
    }

    // Send the POST request.
    $.ajax('/api/items', {
      type: 'POST',
      data: newItem
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload()
      }
    )
  })
})
