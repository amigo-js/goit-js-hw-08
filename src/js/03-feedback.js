import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Function to update form state in local storage
const updateFormState = throttle(function () {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

// Loading a saved form state when the page loads
window.addEventListener('DOMContentLoaded', function () {
  const savedState = localStorage.getItem('feedback-form-state');

  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
});

// Listen for input event on form fields
form.addEventListener('input', updateFormState);

// Handling a form submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Create an object with form data
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Output the form data object to the console
  console.log(formData);

  // Cleaning the local storage
  localStorage.removeItem('feedback-form-state');

  // Cleaning form fields
  emailInput.value = '';
  messageInput.value = '';
});


// test@test.com