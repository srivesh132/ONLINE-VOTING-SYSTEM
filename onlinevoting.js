document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav a');
    const submitVoteButton = document.getElementById('submitVote');
    const registerButton = document.getElementById('registerUser');
    const loginButton = document.getElementById('loginUser');
    const registrationMessage = document.getElementById('registrationMessage');
    const votingMessage = document.getElementById('votingMessage');
    const loginMessage = document.getElementById('loginMessage');
    const resultsContent = document.getElementById('resultsContent');
    const votingForm = document.getElementById('votingForm');
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    let users = [];
    let loggedInUser = null;
    let hasVoted = false;
    let votes = {
        "Option 1": 0,
        "Option 2": 0,
        "Option 3": 0,
        "Option 4": 0
    };

    // Function to show a specific page
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
                page.classList.remove('d-none');
            } else {
                page.classList.remove('active');
                page.classList.add('d-none');
            }
        });
    }

    // Navigation click event
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = event.target.id.replace('nav-', '');
            showPage(pageId);
        });
    });

    // Register button click event
    registerButton.addEventListener('click', () => {
        const formData = new FormData(registrationForm);
        const username = formData.get('username');
        const age = parseInt(formData.get('age'), 10);
        const email = formData.get('email');

        if (username && age && email) {
            if (age >= 18) {
                users.push({
                    username,
                    age,
                    email
                });
                registrationMessage.textContent = `Registration successful. You can now login.`;
                registrationMessage.classList.add('text-success');
                registrationMessage.classList.remove('text-danger');
                showPage('login');
            } else {
                registrationMessage.textContent = `You must be at least 18 years old to register.`;
                registrationMessage.classList.add('text-danger');
                registrationMessage.classList.remove('text-success');
            }
        } else {
            registrationMessage.textContent = `Please fill out all fields correctly.`;
            registrationMessage.classList.add('text-danger');
        }
    });

    // Login button click event
    loginButton.addEventListener('click', () => {
        const formData = new FormData(loginForm);
        const username = formData.get('username');

        const user = users.find(user => user.username === username);

        if (user) {
            loggedInUser = username;
            loginMessage.textContent = `Login successful. You can now vote.`;
            loginMessage.classList.add('text-success');
            loginMessage.classList.remove('text-danger');
            showPage('vote');
        } else {
            loginMessage.textContent = `Username not found. Please register first.`;
            loginMessage.classList.add('text-danger');
            loginMessage.classList.remove('text-success');
        }
    });

    // Submit vote button click event
    submitVoteButton.addEventListener('click', () => {
        if (!loggedInUser) {
            votingMessage.textContent = `You must log in to vote.`;
            votingMessage.classList.add('text-danger');
            return;
        }

        if (hasVoted) {
            votingMessage.textContent = `You have already voted.`;
            votingMessage.classList.add('text-danger');
            return;
        }

        const formData = new FormData(votingForm);
        const selectedOption = formData.get('option');

        if (selectedOption) {
            votes[selectedOption]++;
            const results = Object.keys(votes)
                .map(option => `${option}: ${votes[option]} vote(s)`)
                .join('<br>');
            resultsContent.innerHTML = results;
            votingMessage.textContent = `Vote submitted successfully.`;
            votingMessage.classList.add('text-success');
            votingMessage.classList.remove('text-danger');
            showPage('results');
            hasVoted = true;
        } else {
            votingMessage.textContent = `Please select an option before submitting.`;
            votingMessage.classList.add('text-danger');
        }
    });

    // Show home page initially
    showPage('home');
});