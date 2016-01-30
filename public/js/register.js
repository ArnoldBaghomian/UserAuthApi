'use strict';

var $email, $password, $password2;



$(function() {
  $email = $('#email');
  $password = $('#password');
  $password2 = $('#password2');
  $('form').on('submit', registerUser);

});


function  registerUser(e) {
  e.preventDefault();
  alert('register user');
  var email = $('#email').val();
  var password = $('#password').val();
  var password2 = $('#password2').val();

  if(password == '') {
    $('.password').val('');
    return alert('Password cannot be empty.');
  }

  if(password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  alert("email: "+email+", password: "+password);
  $.post('/users/register', {email: email, password: password})
  .success(function() {
    console.log('worked');
    location.href = '/login';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    alert('failed, err: '+err);
    debugger;
    console.log('err:', err);
    console.log('failed');
    location.href= '/';
  });
}
