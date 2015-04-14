(function ($) {
  "use strict";

  var getCursorPosition = function(jthis) {
    var el = $(jthis).get(0);
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

  var getCursorEnd = function(jthis) {
    var el = $(jthis).get(0);
    return el.selectionEnd;
  };

  var setCursorPosition = function(jthis, pos, endPos) {
    endPos = endPos || pos;
    $(jthis).each(function(index, elem) {
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, endPos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", endPos);
        range.select();
      }
    });
    return jthis;
  };

  $.fn.cursor = function() {
    var jthis = this;
    return {
      get : function() {
        return getCursorPosition(jthis);
      },
      getEnd : function() {
        return getCursorEnd(jthis);
      },
      set : function(pos, endPos) {
        return setCursorPosition(jthis, pos, endPos);
      }
    };
  };

  $.fn.stripOut = function(pos) {
    var a = this.cursor().get();
    this.val(this.val().substring(0, pos) + this.val().substring(pos + 1));
    this.cursor().set(a - 1);

    return this;
  };
}(jQuery));
