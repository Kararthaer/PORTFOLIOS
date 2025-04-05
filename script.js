'use strict';
// Select the elements
const hero = document.querySelector('.hero');
const btns = document.querySelectorAll('.btn');
const btn1 = document.querySelector('.btn-1');
const btn2 = document.querySelector('.btn-2');

btns.forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.backgroundColor = '#dbb000';
    btn.style.color = 'black';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.backgroundColor = '#1924f7';
    btn.style.color = 'white';
  });
});

// email sent
document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_b8yfupq', 'template_o8e620e', this).then(
      () => {
        alert('Email sent!');
      },
      error => {
        console.log('FAILED...', error);
      }
    );
  });

btn1.addEventListener('click', () => {
  document
    .getElementById('contact-form')
    .scrollIntoView({ behavior: 'smooth' });
  // Scroll to the contact form smoothly
});
