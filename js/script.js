////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////
const otherTitle = document.getElementById("other-title");
const selectATheme = document.querySelector("option[value='select a theme']");
const colorMenu = document.getElementById("color");
const selectTShirtTheme = document.querySelector(
  "option[value='please select a t-shirt theme']"
);
const designMenu = document.getElementById("design");
const activityMenu = document.querySelector(".activities");
const activityOptions = document.querySelectorAll(".activities input");
const activityMenu2 = document.querySelector(".activities");
const costHtml = document.querySelector(".cost");

////////////////////////////////////////////////////////////////
// Job Role Section
////////////////////////////////////////////////////////////////

// Hide Other Job Role Field initially
otherTitle.style.display = "none";

////////////////////////////////////////////////////////////////
// T-Shirt Info Section
////////////////////////////////////////////////////////////////

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
