
// NAv bar scroll
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('black-bg');
    } else {
        navbar.classList.remove('black-bg');
    }
});

// contact form validation

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
      var form = event.target;
      var nameInput = form.querySelector('#name');
      var emailInput = form.querySelector('#email');
      var messageInput = form.querySelector('#message');
  
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill all the required fields.');
        event.preventDefault();
        return;
      }
  
      // Reset form fields
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
  
      // Show success message
      var successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block';
  
      event.preventDefault();
    });
  });
  