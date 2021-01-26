

$(document).ready(() => {
  // Getting references to our form and input
  const signupForm = $("#sign-up-form");
  const emailInput = $("#email-input");
  const passwordInput = $("#password-input");
  const fnameInput = $("#first-name-input");
  const lnameInput = $("#last-name-input");
  const signupButton = $("#sign-up-button");

  // When the signup button is clicked, we validate the email and password are not blank
  signupForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.fname || !userData.lname) {
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.fname,
      userData.lname
    );
    emailInput.val("");
    passwordInput.val("");
    fnameInput.val("");
    lnameInput.val("");
  });


  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, firstName, lastName) {
    $.post("/api/signup", {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    })
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr() {
    $("#alert .msg").text("There is sthing wrong");
    $("#alert").fadeIn(500);
  }
});
