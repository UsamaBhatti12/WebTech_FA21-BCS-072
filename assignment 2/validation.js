$(document).ready(function() {
    $('#contactForm').submit(function(event) {
        var nameInput = $('#name');
        var emailInput = $('#email');
        var messageInput = $('#message');
        
        if (!nameInput.val() || !emailInput.val() || !messageInput.val()) {
            alert('Please fill all the required fields.');
            event.preventDefault();
            return;
        }
        
        // Reseting form fields
        nameInput.val('');
        emailInput.val('');
        messageInput.val('');
        
        // Showing success message
        $('#successMessage').css('display', 'block');
        
        event.preventDefault();
    });
});
