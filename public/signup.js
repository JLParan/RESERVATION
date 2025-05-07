const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignupBtn = document.getElementById('show-signup-btn');
    const showLoginBtn = document.getElementById('show-login-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const signupPasswordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const loginStudentNumberInput = document.getElementById('login-student-number');
    const signupStudentNumberInput = document.getElementById('signup-student-number');
    const loginStudentNumberError = document.getElementById('login-student-number-error');
    const signupStudentNumberError = document.getElementById('signup-student-number-error');
    const signupEmailInput = document.getElementById('signup-email');
    const signupEmailError = document.getElementById('signup-email-error');
    const signupContactInput = document.getElementById('signup-contact');
    const signupContactError = document.getElementById('signup-contact-error');
    const seePasswordButtons = document.querySelectorAll('.see-password-btn');

    showSignupBtn.addEventListener('click', () => {
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', () => {
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    signupForm.addEventListener('submit', function(event) {
        let isValid = true;

        if (signupPasswordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        if (!/^\d{2}-\d{4}$/.test(signupStudentNumberInput.value)) {
            signupStudentNumberError.textContent = "Invalid student number format (00-0000).";
            isValid = false;
        } else {
            signupStudentNumberError.textContent = "";
        }

        if (signupEmailInput.value.trim() === "") {
            signupEmailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmailInput.value)) {
            signupEmailError.textContent = "Invalid email format.";
            isValid = false;
        } else {
            signupEmailError.textContent = "";
        }

        if (signupContactInput.value.trim() === "") {
            signupContactError.textContent = "Please enter your contact number.";
            isValid = false;
        } else if (!/^[0-9]{10,11}$/.test(signupContactInput.value)) {
            signupContactError.textContent = "Invalid contact number format (10-11 digits).";
            isValid = false;
        } else {
            signupContactError.textContent = "";
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if there are errors
        } else {
            // In a real application, you would send the signup data to a server here.
            alert(`Signing up with Student Number: ${signupStudentNumberInput.value}, Email: ${signupEmailInput.value}, Contact: ${signupContactInput.value} and Password: ${signupPasswordInput.value}`);
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        if (!/^\d{2}-\d{4}$/.test(loginStudentNumberInput.value)) {
            loginStudentNumberError.textContent = "Invalid student number format (00-0000).";
            return;
        } else {
            loginStudentNumberError.textContent = "";
        }

        // In a real application, you would authenticate the user with the server here.
        alert(`Logging in with Student Number: ${loginStudentNumberInput.value} and Password: ${loginPassword.value}`);
        // After successful login, you would typically redirect the user.
    });

    seePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            button.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
