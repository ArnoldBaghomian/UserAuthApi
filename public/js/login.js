'use strict';

var $email, $password;

$(function() {
  $email = $('#email');
  $password = $('#password');
  $('form').on('submit', loginUser);
});

function loginUser(e) {
  e.preventDefault();
  var email = $email.val();
  var password = $password.val();

  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    console.log(data);
    alert("Welcome back to Portfolio.")

    location.href = '/';
  })
  .fail(function(err) {
    alert('Error: login failed');
    console.log('err:', err);
  });
}
