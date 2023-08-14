$(document).ready(function() {
    // Check if user is logged in from local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        redirectToOrders();
    }
    
    // Handle login form submission
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        
        if (username === password) {
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            redirectToOrders();
        } else {
            // Invalid credentials
            alert('Please enter valid credentials!');
        }
    });
});

function redirectToOrders() {
    window.location.href = 'pages/nav.html';
}
