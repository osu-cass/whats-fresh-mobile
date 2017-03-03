Ext.define('OregonsCatch.util.Back', {

  singleton: true,

  requires: ['OregonsCatch.util.CrossFilter'],

  history: [],

  push: function (ctlr, record) {
    var util = this;
    var CF = OregonsCatch.util.CrossFilter;
    util.history.push({
      view: Ext.Viewport.getActiveItem(),
      params: Ext.Object.merge({}, CF.parameters),
      ctlr: ctlr,
      record: record
    });
  },

  pop: function () {
    var util = this;
    var CF = OregonsCatch.util.CrossFilter;
    var last = util.history.pop();
    CF.parameters = last.params;
    CF.refilter();
    if (last.ctlr) { last.ctlr.load(last.record); }
    var transition = {
      type: 'slide',
      direction: 'right'
    };
    Ext.Viewport.animateActiveItem(last.view, transition);
  },

  clear: function () {
    var util = this;
    var CF = OregonsCatch.util.CrossFilter;
    if (util.history.length) {
      var last = util.history[0];
      CF.parameters = last.params;
      CF.refilter();
      var transition = {
        type: 'slide',
        direction: 'right'
      };
      Ext.Viewport.animateActiveItem(last.view, transition);
      util.history = [];
    }
  }

});
