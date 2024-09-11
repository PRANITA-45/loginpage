// Get the form and other elements
const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const apiResponse = document.getElementById('apiResponse');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';
    apiResponse.textContent = '';

    // Validate the fields
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // Username validation
    if (username === '') {
        usernameError.textContent = 'Username/email is required';
        isValid = false;
    } else if (!validateEmail(username)) {
        usernameError.textContent = 'Please enter a valid email';
        isValid = false;
    }

    // Password validation
    if (password === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        isValid = false;
    }

    // If the form is valid, proceed to submit the form
    if (isValid) {
        loadingSpinner.style.display = 'block'; // Show loading spinner

        // Prepare data for API call
        const data = {
            username: username,
            password: password
        };

        // Send the POST request to the API
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none'; // Hide loading spinner
            apiResponse.textContent = 'Login successful!';
            apiResponse.style.color = 'purple';
        })
        .catch(error => {
            loadingSpinner.style.display = 'none'; // Hide loading spinner
            apiResponse.textContent = 'Login failed. Please try again.';
            apiResponse.style.color = 'red';
        });
    }
});
// function getRandomRGBValue() {
//     return Math.floor(Math.random() * 256); // Random number between 0 and 255
// }

// function setRandomBodyBackground() {
//     const red = getRandomRGBValue();
//     const green = getRandomRGBValue();
//     const blue = getRandomRGBValue();
//     document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
// }

// // Call the function to change background every 5 seconds (for example)
// setInterval(setRandomBodyBackground, 5000);


// example usage:
// changeBackgroundColor(0, 255, 0, 0.7); // change background color to green with 70% opacity

// Function to validate email format using regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
