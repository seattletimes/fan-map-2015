var rgba = function(r, g, b, a) { return `rgba(${r}, ${g}, ${b}, ${a || 1})` };
var hsl = function(h, s, l) {
  l /= 100;
  s /= 100;
  var chroma = (1 - Math.abs(2 * l - 1)) * s;
  var hPrime = h / 60;
  var x = chroma * (1 - Math.abs(hPrime % 2 - 1));
  var r = 0, g = 0, b = 0;
  if (hPrime) {
    if (hPrime < 1) {
      r = chroma;
      g = x;
    } else if (hPrime < 2) {
      r = x;
      g = chroma;
    } else if (hPrime < 3) {
      g = chroma;
      b = x;
    } else if (hPrime < 4) {
      g = x;
      b = chroma;
    } else if (hPrime < 5) {
      r = x;
      b = chroma;
    } else if (hPrime < 6) {
      r = chroma;
      b = x;
    }
  }
  var m = l - chroma * .5;
  r += m;
  g += m;
  b += m;
  return rgba(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
};

module.exports = { rgba, hsl };