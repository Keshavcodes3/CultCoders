// When page is loaded
window.onload = () => {
    includeHTML("navigation", "navigation.html");
    includeHTML("home_section", "home_section.html");
    includeHTML("Tutorials_section", "Tutorials_section.html");
    includeHTML("Projects_section", "Projects_section.html");
    includeHTML("About_us_section", "About_us_section.html");
    includeHTML("Join_us_section", "Join_us_section.html");
    includeHTML("Footer", "Footer.html");
    includeHTML("Scroll_to_button", "Scroll_to_button.html");
};

// Function to add HTML from file
function includeHTML(placeId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(placeId).innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}
