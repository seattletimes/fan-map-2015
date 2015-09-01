/*

Run the LESS compiler against seed.less and output to style.css.

*/
var resolve = require("resolve").sync;

var npmImporter = {
  install: function(less, pluginManager) {

    var FileManager = function() {};
    FileManager.prototype = new less.FileManager();
    FileManager.prototype.supports = function(file, dir) {
      return file.indexOf("npm://") == 0;
    };
    FileManager.prototype.supportsSync = FileManager.prototype.supports;
    FileManager.prototype.resolve = function(file) {
      file = file.replace("npm://", "");
      var resolved = resolve(file, {
        extensions: [".less", ".css"],
        packageFilter: function(package) { 
          if (package.style) package.main = package.style;
          return info;
        }
      });
      return resolved;
    };
    FileManager.prototype.loadFile = function(url, dir, options, env) {
      var filename = this.resolve(url);
      return less.FileManager.prototype.loadFile.call(this, filename, "", options, env);
    };
    FileManager.prototype.loadFileSync = function(url, dir, options, env) {
      var filename = this.resolve(url);
      return less.FileManager.prototype.loadFileSync.call(this, filename, "", options, env);
    };

    pluginManager.addFileManager(new FileManager());
  },
  minVersion: [2, 1, 1]
};

module.exports = function(grunt) {

  var less = require("less");
  
  var options = {
    paths: ["src/css"],
    filename: "seed.less",
    plugins: [npmImporter]
  };
  
  grunt.registerTask("less", function() {
    
    var c = this.async();
    
    var seed = grunt.file.read("src/css/seed.less");
    
    less.render(seed, options, function(err, result) {
      if (err) {
        grunt.fail.fatal(err.message + " - " + err.filename + ":" + err.line);
      } else {
        grunt.file.write("build/style.css", result.css);
      }
      c();
    });
    
  });

};