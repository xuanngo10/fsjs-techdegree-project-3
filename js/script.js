////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////
const otherTitle = document.getElementById("other-title");
const selectATheme = document.querySelector("option[value='select a theme']");
const colorMenu = document.getElementById("color");
const selectTShirtTheme = document.querySelector(
  "option[value='please select a t-shirt theme']"
);

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
