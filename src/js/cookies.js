module.exports = {
  read: function(key) {
    var cookie = document.cookie
      .split(";")
      .map(pair => pair.trim().split("="))
      .reduce((c, pair) => {
        c[pair[0]] = pair[1];
        return c;
      }, {});
    if (key) {
      return cookie[key];
    }
    return cookie;
  },
  write: function(key, value) {
    document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  },
  clear: function(key) {
    document.cookie = `${key}=deleted; expires=Thu, 1 Jan 1970 23:59:59 GMT; path=/`;
  }
};