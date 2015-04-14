(function ($) {
  "use strict";

  QUnit.test("get", function(assert) {
    var input = $("<input>");
    assert.equal(input.cursor().get(), 0);

    input.val('111');
    assert.equal(input.cursor().get(), 3);

    input.val('11');
    assert.equal(input.cursor().get(), 2);
  });

  /* TODO can't test get not in the end and getEnd for multichar selection because of phatom.js */
  /* TODO can't test set because of phantom.js inconsistence */

  QUnit.test("stripOut", function(assert) {
    var input = $("<input>");

    input.val('my text');
    input.stripOut(2);

    assert.equal(input.val(), 'mytext');
  });
}(jQuery));
