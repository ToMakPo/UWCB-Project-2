$(document).ready(() => {
  // Getting references to our form and inputs
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const loginButton = $("#login-button");

  // When the form is submitted, we validate there's an email and password entered
  loginButton.on("click", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/profile");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
