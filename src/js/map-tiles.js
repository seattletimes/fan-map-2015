var leaflet = require("leaflet");

module.exports = {

  lite: leaflet.tileLayer(
    "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    {
      subdomains: "abc",
      scheme: "xyz"
    }
  ),

  toner: leaflet.tileLayer(
    "http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png",
    {
      subdomains: "abcd".split(""),
      scheme: "xyz"
    }
  ),

  watercolor: leaflet.tileLayer(
    "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png",
    {
      subdomains: "abcd".split(""),
      scheme: "xyz",
      //opacity: .3
    }
  )
};
