/*

Filters and re-exports JSON for client-side usage.

*/

var chalk = require("chalk");

module.exports = function(grunt) {

  grunt.registerTask("export-json", "Export filtered JSON", function() {
    grunt.task.requires("json");

    var responses = grunt.data.json.FanMap2015_responses;

    //remove the unapproved and featured items
    var filtered = responses.filter(function(row) {
      //return row.approve && row.lat && !row.feature;
      return row.lat && !row.feature && !row.block;
    });

    var featured = responses.filter(function(row) {
      return row.lat && row.feature;
    });

    //remove 
    [filtered, featured].forEach(function(data) {
      data.forEach(function(row) {
        //remove metadata
        delete row.title;
        delete row.approve;
        delete row.block;
        delete row.contact;
        delete row.location;
        delete row.featured;
        row.timestamp *= 1;
        row.lat = Math.round(row.lat * 100) / 100;
        row.lng = Math.round(row.lng * 100) / 100;
        row.season = !!row.season;
      });
    });

    console.log("Exporting: " + chalk.cyan(filtered.length) + " users, " + chalk.cyan(featured.length) + " featured.");

    grunt.file.write("build/all.json", JSON.stringify(filtered, null, 2));
    grunt.file.write("build/featured.json", JSON.stringify(featured));

  });

}