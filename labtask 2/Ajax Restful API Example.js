
$(document).ready(function() {
  // Making AJAX request to JSONPlaceholder API
  $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
   
    var output = '';
    // creating cards dynamically and
    // Loop to display returned data in these cards
    $.each(data, function(index, post) {
      output += '<div class="card mt-3">';
      output += '<div class="card-body">';
      output += '<h5 class="card-title">' + post.title + '</h5>';
      output += '<p class="card-text">' + post.body + '</p>';
      output += '</div>';
      output += '</div>';
    });
    // output
    $('#posts').html(output);
  });
});

