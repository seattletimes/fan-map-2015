var map = require("./map");
require("./form");
require("./overlay");
require("./lib/social");
require("./lib/ads");
var track = require("./lib/tracking");
var $ = require("jquery");

map.instance.on("click", () => $(".form-panel").removeClass("show"));