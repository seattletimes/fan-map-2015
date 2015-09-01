var map = require("./map");
require("./form");
require("./overlay");
require("./lib/social");
var $ = require("jquery");

map.instance.on("click", () => $(".form-panel").removeClass("show"));