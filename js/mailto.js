// mailto.js - JavaScript Method 2 (Module 5.2):
// read the form fields, build a mailto: link with a subject and neat message, and open it.

// 1. Store the email address in one place
const TO_ADDRESS = "hello@examplewebsite142.com";

// 2. Find the form and the message area
const form = document.querySelector("#contact-form");
const message = document.querySelector("#form-message");

// 3. Read each field and build the mailto link
function buildMailto() {
  const name = document.querySelector("#full-name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const topic = document.querySelector("#subject").value.trim();
  const text = document.querySelector("#message").value.trim();

  const subject = "Website message: " + topic;
  const body =
    "Name: " + name + "\r\n" +
    "Email: " + email + "\r\n\r\n" +
    text;

  return (
    "mailto:" + TO_ADDRESS +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body)
  );
}

// 4. Run when the Send button is pressed
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Accessible form feedback: show errors in text and move focus to the first problem
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    message.textContent = "Please fix the fields marked below, then press Send again.";
    form.querySelector(":invalid").focus();
    return;
  }

  window.location.href = buildMailto();

  message.textContent =
    "Opening your email app. Press Send there to finish. " +
    "If nothing opens, email us at " + TO_ADDRESS + ".";
});
