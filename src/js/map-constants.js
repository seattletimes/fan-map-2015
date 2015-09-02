/* global players */
var playerMap = {};
for (var i = 0; i < players.length; i++) {
  var p = players[i];
  playerMap[p.id] = `#${p.number} - ${p.first} ${p.last}`;
}

module.exports = {
  playerMap,
  views: {
    seattle: [
      [47.72, -122.45],
      [47.53, -122.14]
    ],
    wa: [
      [49.01, -124.90],
      [45.54, -116.84]
    ],
    us: [
      [49.27, -125.56],
      [23.97, -65.65]
    ]
  }
};