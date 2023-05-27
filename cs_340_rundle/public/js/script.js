document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('nav ul li:last-child a').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('login-popup').style.display = 'block';
    });
  
    document.querySelector('.popup .close').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('login-popup').style.display = 'none';
    });
  });