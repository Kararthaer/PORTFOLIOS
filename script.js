document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const modalOverlay = document.getElementById("modalOverlay");
  const openModalBtn = document.getElementById("openModal");
  const closeBtn = document.querySelector(".close-btn");

  // Form elements
  const signUpBtn = document.getElementById("sign-up");
  const logInBtn = document.getElementById("log-in");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const formLogin = document.getElementById("form-login");
  const formSignup = document.getElementById("form-signup");

  // API endpoint
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "http://velatradenexus.com/api";

  // Initial setup - hide both forms
  formSignup.style.display = "none";
  formLogin.style.display = "none";
  formSignup.style.opacity = "0";
  formLogin.style.opacity = "0";
  signUpBtn.style.display = "block";
  logInBtn.style.display = "block";

  // Add transition styles
  formSignup.style.transition = "opacity 0.5s ease-in-out";
  formLogin.style.transition = "opacity 0.5s ease-in-out";
  signUpBtn.style.transition = "opacity 0.5s ease-in-out";
  logInBtn.style.transition = "opacity 0.5s ease-in-out";

  // Modal functions
  function openModal() {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    // Show both buttons, hide both forms
    signUpBtn.style.display = "block";
    logInBtn.style.display = "block";
    signUpBtn.style.opacity = "1";
    logInBtn.style.opacity = "1";
    formSignup.style.display = "none";
    formLogin.style.display = "none";
    formSignup.style.opacity = "0";
    formLogin.style.opacity = "0";
  }

  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Event listeners for modal
  openModalBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Form switching function with smooth transition
  function showFormHideButton(
    formToShow,
    formToHide,
    buttonToHide,
    buttonToShow
  ) {
    // First, hide the current form if it's visible
    if (formToHide.style.display === "block") {
      formToHide.style.opacity = "0";
      setTimeout(() => {
        formToHide.style.display = "none";
      }, 500);
    }

    // Hide the clicked button
    buttonToHide.style.opacity = "0";
    setTimeout(() => {
      buttonToHide.style.display = "none";

      // Show the form
      formToShow.style.display = "block";
      // Force a reflow
      formToShow.offsetHeight;
      formToShow.style.opacity = "1";

      // Show the other button
      buttonToShow.style.display = "block";
      buttonToShow.style.opacity = "1";
    }, 500);
  }

  // Form switching event listeners
  signUpBtn.addEventListener("click", () => {
    showFormHideButton(formSignup, formLogin, signUpBtn, logInBtn);
  });

  logInBtn.addEventListener("click", () => {
    showFormHideButton(formLogin, formSignup, logInBtn, signUpBtn);
  });

  // Form submissions
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("current-password").value;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        closeModal();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Login error:", error);
    }
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    const firstName = document.getElementById("given-name").value;
    const lastName = document.getElementById("family-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const dateOfBirth = document.getElementById("DOB").value;

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Sign up successful!");
        closeModal();
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error("Signup error:", error);
    }
  });
});

// Password validation function
function validatePassword() {
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const errorElement = document.getElementById("password-error");

  if (password !== confirmPassword) {
    errorElement.style.display = "block";
    return false;
  } else {
    errorElement.style.display = "none";
    return true;
  }
}

// Google Sign-In handler
async function handleGoogleSignIn(response) {
  try {
    const res = await fetch(`${API_URL}/google-signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Google sign-in successful!");
      document.getElementById("modalOverlay").style.display = "none";
      document.body.style.overflow = "auto";
    } else {
      alert(data.message || "Google sign-in failed");
    }
  } catch (error) {
    alert("Error connecting to server");
    console.error("Google sign-in error:", error);
  }
}
