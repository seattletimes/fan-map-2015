var $ = require("jquery");

module.exports = {
  package: function(form) {
    var packet = {};
    form.find("input[type!=checkbox][type!=radio]:not(.view),select,textarea,input:checked").each(function() {
      var $this = $(this);
      if (this.hasAttribute("required") && !$this.val()) {
        value = false;
      }
      var key = this.getAttribute("name");
      var value = $this.val();
      if (value == "on" && this.getAttribute("type") == "checkbox") {
        value = true;
      }
      packet[key] = value;
    });
    console.log(packet);
    return packet;
  },
  //returns true if pass, key name if fail
  validate: function(data, schema) {
    for (var key in schema) {
      var rule = schema[key];
      var value = data[key];
      if (rule instanceof RegExp && !rule.match(value)) {
          return key;
      } else if (rule === true && !value) {
        return key;
      } else {
        //complex validation
        //allow testing based on two properties
        if (rule.or) {
          var or = data[rule.or];
          if (!value && !or) {
            return key;
          }
        }
        if (rule.test) {
          if (!rule.test(value)) {
            return key;
          }
        }
        if (rule.length) {
          if (value.length > rule.length) {
            return key;
          }
        }
      }
    }
    return true;
  }
};