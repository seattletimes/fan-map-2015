var leaflet = require("leaflet");
var template = require("./_popup.html");
var constants = require("./map-constants");
var ich = require("icanhaz");

var map = null;
var popup = leaflet.popup({
  className: "fan-popup",
  // minWidth: 240,
  maxHeight: 320
});

ich.addTemplate("popup", template);

var lives = {
  "1": "1 year or less",
  "2": "2 years",
  "3+": "3 - 5 years",
  "5+": "5 - 10 years",
  "10+": "10 - 20 years",
  "20+": "20 - 30 years",
  "30+": "30+ years"
};

var panel = document.querySelector(".response-panel");
var panelContent = document.querySelector(".response-panel .content");
var closeButton = document.querySelector(".response-panel .close");

closeButton.addEventListener("click", () => panel.classList.remove("show"));

module.exports = {
  instance: popup,
  open: function(marker) {
    if (!map || !marker) {
      console.error("Missing map or marker");
    }
    var data = [ marker.data ];
    if (marker.getAllChildMarkers) { //it's a cluster!
      data = marker.getAllChildMarkers().map(function(m) {
        return m.data;
      });
    }
    data = data.map(function(d) {
      var item = Object.create(d);
      item.lifespan = lives[d.lifespan];
      item.favorite = constants.playerMap[d.favorite];
      return item;
    });
    var content = ich.popup({
      fans: data
    }, true);
    popup.setContent(`${data.length} fan${data.length > 1 ? "s" : ""}`);
    popup.setLatLng(marker.getLatLng());
    popup.openOn(map);
    panelContent.innerHTML = content;
    panel.classList.add("show");
  },
  setMap: function(m) {
    map = m;
  }
};