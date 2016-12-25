const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

module.exports = {
  escapeHtml: function(html) {
    return String(html).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }
};
