var $ = require("jquery");
var formUtil = require("./form-utils");
var cookie = require("./cookies");
require("./location-input");
require("./autocomplete");
var cookieName = "fan-map-2015-sent";

/*
Form user-flow:
- click to open form
- fill out form, click submit
- if any required items are missing, flag them
- show the "sending info" banner
- on error, remove banner. on success, change to "thanks" message
- optionally show new pin?
- set cookie to prevent new submission by unsavvy users
*/

var panel = $(".form-panel");
var endpoint = "https://script.google.com/macros/s/AKfycbwsjAjGU5bFDPxGC6RxuPEK3R_IPG1zGig869XZQq-KI6pdIg/exec";

var message = panel.find(".message");
var form = panel.find(".form");

//stupid Firefox form memory
form.find(".submit").attr("disabled", null);

//do not show form if it has been submitted before
if (cookie.read(cookieName)) {
  panel.addClass("sent");
}

//character count
var count = form.find(".note-length .count");
form.find(`[name="note"]`).on("keyup change", function() {
  count.html(this.value.length);
  count.toggleClass("over", this.value.length > 500);
});

form.on("click", ".submit", function(e) {

  e.preventDefault();

  if (this.disabled) return;

  //handle form elements correctly
  var packet = formUtil.package(form);
  var valid = formUtil.validate(packet, {
    name: true,
    location: { or: "gps" },
    note: { length: 500 }
  });

  if (valid !== true) {
    panel.addClass("invalid");
    return;
  }
  
  this.disabled = true;

  var submission = $.ajax({
    url: endpoint,
    data: packet,
    dataType: "jsonp"
  });

  panel.addClass("sending");
  message.html("Submitting your information...");

  submission.done(data => {
    panel.addClass("sent");
    message.html("Thanks!");
    cookie.write(cookieName, true);
  });

  submission.fail(() => {
    panel.removeClass("sending");
    this.disabled = false;
  });

});

$(document.body).on("click", ".show-form", () => panel.toggleClass("show"));

form.on("focus", "input,textarea", () => panel.removeClass("invalid"));

window.clearSent = () => cookie.clear(cookieName);