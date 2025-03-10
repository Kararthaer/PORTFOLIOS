"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a, .nav a");
  navLinks.forEach((Link) => {
    Link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default jump
      const targetId = this.getAttribute("href").substring(1); // Get target ID without #
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, //adjust scroll position
          behavior: "smooth", //enable smooth scrolling
        });
      }
    });
  });
});
