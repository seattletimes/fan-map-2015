var $ = require("jquery");
var cookie = require("./cookies");
var cName = "fan-map-2015";

var overlay = $(".overlay");

// Apparently this is ad fraud or something.
// if (!cookie.read(cName)) {
//   overlay.addClass("show visible");
//   cookie.write(cName, "true");
// }

var closeOverlay = function(e) {
  var $target = $(e.target);
  //poor man's delegation
  if ($target.is(".overlay") || $target.closest(".close").length) {
    overlay.removeClass("visible");
    setTimeout(function() {
      overlay.removeClass("show");
    }, 500);
  }
};

overlay.on("click", closeOverlay);

$(document.body).on("click", ".show-dialog", function() {
  overlay.addClass("show");
  setTimeout(function() {
    overlay.addClass("visible");
  }, 100);
});

window.clearModal = () => cookie.clear(cName)