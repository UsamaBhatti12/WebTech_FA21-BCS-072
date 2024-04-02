
// this ready function makes sure that the code insaide it runs only when html doc  is fully loaded
$(document).ready(function() {
  // Making AJAX request to JSONPlaceholder API
  $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
    //  code inside this function will run when the get request is succesful
    //  when successfull the data which in this case is the arrays of posts is passsed as parameter 'data'

    // in the jsonplaceholder fake api we have a data array and post objects inside the data array
   
    var output = '';
    // creating cards dynamically and
    // Loop to display returned data in these cards
    $.each(data, function(index, post) {
      //  the data ( array of post objects) is returned and we will now iterate over each post object inside the data array
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

