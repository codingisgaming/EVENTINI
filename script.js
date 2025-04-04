document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const switchToLogin = document.getElementById('switch-to-login');
    const switchToSignup = document.getElementById('switch-to-signup');
    const signupForm = document.querySelector('.signup-form');
    const loginForm = document.querySelector('.login-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Toggle Password Visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const input = this.closest('.password-group').querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Switch Between Forms
    function switchForms(showForm, hideForm) {
        hideForm.classList.remove('active');
        setTimeout(() => {
            showForm.classList.add('active');
        }, 300);
    }

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(loginForm, signupForm);
    });

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        switchForms(signupForm, loginForm);
    });

    // Form Submission with Confetti
    document.querySelector('.btn-signup').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate terms
        const termsCheckbox = document.querySelector('#terms');
        if (!termsCheckbox.checked) {
            alert('Please agree to the terms and conditions');
            return;
        }
        
        // Show confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#1065ab', '#ff5900', '#a5e83b']
        });
        
        // Simulate submission
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Signing Up...';
        
        setTimeout(() => {
            alert('Account created successfully!');
            this.disabled = false;
            this.innerHTML = 'Sign Up';
        }, 1500);
    });

    // Login Form Submission
    document.querySelector('.btn-login').addEventListener('click', function(e) {
        e.preventDefault();
        
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Logging In...';
        
        setTimeout(() => {
            alert('Login successful!');
            this.disabled = false;
            this.innerHTML = 'Login';
        }, 1500);
    });

    // Initialize with signup form active
    signupForm.classList.add('active');

    // Prevent form submission on Enter key
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        });
    });

    // Make icons orange when focused
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            const icon = this.closest('.form-group').querySelector('.input-icon');
            const toggle = this.closest('.form-group').querySelector('.toggle-password');
            if (icon) icon.style.color = '#ff5900';
            if (toggle) toggle.style.color = '#ff5900';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const icon = this.closest('.form-group').querySelector('.input-icon');
                const toggle = this.closest('.form-group').querySelector('.toggle-password');
                if (icon) icon.style.color = '#1065ab';
                if (toggle) toggle.style.color = '#1065ab';
            }
        });
    });
});