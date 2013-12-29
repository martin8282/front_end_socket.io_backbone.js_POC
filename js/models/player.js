define([], function() {

    var Player = Backbone.Model.extend({
    	
      urlRoot: 'player',
      noIoBind: false,
      socket:window.socket,
      initialize: function () {
    _.bindAll(this, 'serverChange', 'serverDelete', 'modelCleanup');
    
    /*!
     * if we are creating a new model to push to the server we don't want
     * to iobind as we only bind new models from the server. This is because
     * the server assigns the id.
     */
    if (!this.noIoBind) {
      this.ioBind('update', this.serverChange, this);
      this.ioBind('delete', this.serverDelete, this);
    }
  },
  serverChange: function (data) {
    // Useful to prevent loops when dealing with client-side updates (ie: forms).
    data.fromServer = true;
    this.set(data);
  },
  serverDelete: function (data) {
    if (this.collection) {
      this.collection.remove(this);
    } else {
      this.trigger('remove', this);
    }
    this.modelCleanup();
  },
  modelCleanup: function () {
    this.ioUnbindAll();
    return this;
  }
});
   
    return Player; 
});