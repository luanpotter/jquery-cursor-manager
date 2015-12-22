define(function () {
  "use strict";

  var getCursorPosition = function (el) {
    var pos = 0;
    if ("selectionStart" in el) {
      pos = el.selectionStart;
    } else if ("selection" in document) {
      el.focus();
      var sel = document.selection.createRange();
      var selLength = document.selection.createRange().text.length;
      sel.moveStart("character", -el.value.length);
      pos = sel.text.length - selLength;
    }
    return pos;
  };

  var getCursorEnd = function (el) {
    return el.selectionEnd;
  };

  var setCursorPosition = function (el, pos, endPos) {
    endPos = endPos || pos;
    if (el.setSelectionRange) {
      el.setSelectionRange(pos, endPos);
    } else if (el.createTextRange) {
      var range = el.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", endPos);
      range.select();
    }
  };

  return function (el) {
    return {
      get: function () {
        getCursorPosition(el);
      },
      getEnd: function () {
        getCursorEnd(el);
      },
      set: function (pos, endPos) {
        setCursorPosition(el, pos, endPos);
      },
      stripOut: function (pos) {
        var a = getCursorPosition(el);
        el.value = el.value.substring(0, pos) + el.value.substring(pos + 1);
        setCursorPosition(el, a - 1);
      }
    };
  };

});
