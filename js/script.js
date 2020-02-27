////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////
const title = document.getElementById("title");
const otherTitle = document.getElementById("other-title");
const selectATheme = document.querySelector("option[value='select a theme']");
const colorMenu = document.getElementById("color");
const selectTShirtTheme = document.querySelector(
  "option[value='please select a t-shirt theme']"
);
const designMenu = document.getElementById("design");
const activityMenu = document.querySelector(".activities");
const activityOptions = document.querySelectorAll(".activities input");
const paymentMenu = document.getElementById("payment");
const selectPaymentOption = document.querySelector(
  "option[value='select method']"
);
const colorDiv = document.getElementById("colors-js-puns");

////////////////////////////////////////////////////////////////
// Job Role Section
////////////////////////////////////////////////////////////////

// Hide Other Job Role Field initially
otherTitle.style.display = "none";
const other = document.querySelector("option[value='other']");

// if user chooses other, display input field
title.addEventListener("change", e => {
  const click = e.target.value;

  if (other.selected === true) {
    otherTitle.style.display = "block";
  } else {
    otherTitle.style.display = "none";
  }
});

////////////////////////////////////////////////////////////////
// T-Shirt Info Section
////////////////////////////////////////////////////////////////

// hide color div until a theme is chosen
const hideColor = () => {
  if (selectATheme.selected === true) {
    colorDiv.style.display = "none";
  } else {
    colorDiv.style.display = "block";
  }
};

hideColor();

// hide select theme option
selectATheme.hidden = "true";

// hide color options initially
for (let i = 0; i < colorMenu.length; i++) {
  colorMenu[i].hidden = "true";
}

// append select a t-shirt theme option to html
const selectColorHtml = `
  <option value="please select a t-shirt theme">Please select a T-shirt theme</option>
`;
colorMenu.innerHTML += selectColorHtml;

// select the "please select a t-shirt theme" option
colorMenu[6].selected = "true";

// listen for design theme option
designMenu.addEventListener("change", event => {
  const target = event.target.value;
  colorMenu[6].selected = "false";
  hideColor();
  // show colors associated with theme chosen
  for (let i = 0; i < colorMenu.length; i++) {
    const color = colorMenu[i].innerHTML;
    if (color.indexOf(target) > -1) {
      colorMenu[i].removeAttribute("hidden");
      colorMenu[i].selected = "true";
    } else {
      colorMenu[i].hidden = "true";
    }
  }
});

////////////////////////////////////////////////////////////////
// Register for Activities Section
////////////////////////////////////////////////////////////////

// Keep track of total cost
let totalCost = 0;

// append total cost to html
let totalHtml = "";

activityMenu.insertAdjacentHTML("beforeend", "<h3 class='cost'></h3>");

// listen for activity option clicked
activityMenu.addEventListener("change", event => {
  const clicked = event.target;
  const clickedTime = clicked.getAttribute("data-day-and-time");
  const clickedCost = parseInt(clicked.getAttribute("data-cost"));
  const costHtml = document.querySelector(".cost");
  // add or subtract cost & display it
  if (clicked.checked) {
    totalCost += clickedCost;
    totalHtml = `Total: ${totalCost}`;
    costHtml.textContent = totalHtml;
  } else {
    totalCost -= clickedCost;
    totalHtml = `Total: ${totalCost}`;
    costHtml.textContent = totalHtml;
  }
  // disable conflicting time options
  for (let i = 0; i < activityOptions.length; i++) {
    const activityTime = activityOptions[i].getAttribute("data-day-and-time");

    if (clickedTime === activityTime && clicked !== activityOptions[i]) {
      if (clicked.checked) {
        activityOptions[i].disabled = true;
      } else {
        activityOptions[i].disabled = false;
      }
    }
  }
});

////////////////////////////////////////////////////////////////
// Payment Info Section
////////////////////////////////////////////////////////////////

// hide select payment method in dropdown
selectPaymentOption.hidden = "true";

// show only credit card form by default and hide the rest
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

paypal.style.display = "none";
bitcoin.style.display = "none";

// listen for payment option and display accordingly
const paymentOptions = document.querySelectorAll("#payment option");
paymentMenu.addEventListener("change", event => {
  const clicked = event.target.value;

  for (let i = 0; i < paymentOptions.length; i++) {
    if (clicked === "credit card") {
      creditCard.style.display = "block";
      paypal.style.display = "none";
      bitcoin.style.display = "none";
    } else if (clicked === "paypal") {
      creditCard.style.display = "none";
      paypal.style.display = "block";
      bitcoin.style.display = "none";
    } else if (clicked === "bitcoin") {
      creditCard.style.display = "none";
      paypal.style.display = "none";
      bitcoin.style.display = "block";
    }
  }
});

////////////////////////////////////////////////////////////////
// Form Validation
////////////////////////////////////////////////////////////////
const name = document.getElementById("name");
const email = document.getElementById("mail");
const form = document.querySelector("form");

// Validate name field
const nameValidator = () => {
  const nameValue = name.value;

  if (nameValue.length > 0) {
    name.style.border = "1px solid white";
    return true;
  } else {
    name.style.border = "1px solid red";
    return false;
  }
};

// Validate email field
const emailValidator = () => {
  const emailValue = email.value;
  const indexAt = emailValue.indexOf("@");
  const indexPeriod = emailValue.lastIndexOf(".");

  if (indexAt > 1 && indexPeriod > indexAt + 1) {
    email.style.border = "1px solid white";
    return true;
  } else {
    email.style.border = "1px solid red";
    return false;
  }
};

// Validate other job field
const otherJobValidator = () => {
  const otherTitleVal = otherTitle.value;
  const other = document.querySelector("option[value='other']");

  if (other.selected === true) {
    if (otherTitleVal.length > 0) {
      otherTitle.style.border = "1px solid white";
      return true;
    } else {
      otherTitle.style.border = "1px solid red";
      return false;
    }
  } else {
    return true;
  }
};

// display activity error message
activityMenu.insertAdjacentHTML(
  "beforeend",
  "<p class='activityError'>Please choose at least one activity.</p>"
);
const activityError = document.querySelector(".activityError");
activityError.style.display = "none";
activityError.style.color = "red";

// Validate activity field
const activityValidator = () => {
  if (totalCost === 0) {
    activityError.style.display = "block";
    return false;
  } else if (totalCost > 0) {
    activityError.style.display = "none";
    return true;
  }
};

// Validate credit card payment field
const ccNumer = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const numRegex = /^\d+$/;

// display credit card error message
const cc = document.querySelector(".cc");
cc.insertAdjacentHTML(
  "beforeend",
  "<p class='ccError'>Please enter a card number betweeen 13 to 16 digits.</p>"
);
cc.insertAdjacentHTML(
  "beforeend",
  "<p class='ccError2'>Please enter a card number</p>"
);
const ccError = document.querySelector(".ccError");
const ccError2 = document.querySelector(".ccError2");
ccError.style.display = "none";
ccError.style.color = "red";
ccError2.style.display = "none";
ccError2.style.color = "red";

// credit card number function
const ccNumberValidator = () => {
  const ccNumberVal = ccNumer.value;

  if (ccNumberVal.length === 0) {
    ccNumer.style.border = "1px solid red";
    ccError2.style.display = "block";
    ccError.style.display = "none";
    return false;
  } else if (
    ccNumberVal.length >= 13 &&
    ccNumberVal.length <= 16 &&
    numRegex.test(ccNumberVal) === true
  ) {
    ccNumer.style.border = "1px solid white";
    ccError2.style.display = "none";
    ccError.style.display = "none";
    return true;
  } else {
    ccNumer.style.border = "1px solid red";
    ccError2.style.display = "none";
    ccError.style.display = "block";
    return false;
  }
};

// zip code number function
const zipCodeValidator = () => {
  const zipCodeVal = zipCode.value;

  if (zipCodeVal.length === 5 && numRegex.test(zipCodeVal) === true) {
    zipCode.style.border = "1px solid white";
    return true;
  } else {
    zipCode.style.border = "1px solid red";
    return false;
  }
};

// cvv number function

const cvvValidator = () => {
  const cvvVal = cvv.value;

  if (cvvVal.length === 3 && numRegex.test(cvvVal) === true) {
    cvv.style.border = "1px solid white";
    return true;
  } else {
    cvv.style.border = "1px solid red";
    return false;
  }
};

// if credit card is active, run all validation functions for credit card
creditCard.style.display = "block";

const paymentValidator = () => {
  const cc = document.querySelector("option[value='credit card']");
  cc.selected = true;
  const paypal = document.getElementById("paypal");
  const bitcoin = document.getElementById("bitcoin");
  ccNumberValidator();
  zipCodeValidator();
  cvvValidator();

  // has to do with cc option display style, create if statement on that
  if (creditCard.style.display === "block") {
    if (!ccNumberValidator()) {
      console.log("1");
      return false;
    } else if (!zipCodeValidator()) {
      console.log("2");
      return false;
    } else if (!cvvValidator()) {
      console.log("3");
      return false;
    } else {
      console.log("4");
      return true;
    }
  } else if (paypal.style.display === "block") {
    return true;
  } else if (bitcoin.style.display === "block") {
    return true;
  }
};

// real time validation
form.addEventListener("keyup", () => {
  nameValidator();
  emailValidator();
  activityValidator();
  paymentValidator();
  otherJobValidator();
});

form.addEventListener("mouseout", () => {
  activityValidator();
});

// validation on submit
const registerBtn = document.querySelector("button[type='submit']");

form.addEventListener("submit", e => {
  nameValidator();
  emailValidator();
  activityValidator();
  paymentValidator();
  otherJobValidator();

  if (!nameValidator()) {
    e.preventDefault();
  } else if (!emailValidator()) {
    e.preventDefault();
  } else if (!activityValidator()) {
    e.preventDefault();
  } else if (!paymentValidator()) {
    e.preventDefault();
  } else if (!otherJobValidator()) {
    e.preventDefault();
  } else {
    e.preventDefault();
    window.location.reload();
  }
});
