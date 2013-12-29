define(['models/player'], function(PlayerModel){
        
  var Game = Backbone.Collection.extend({
        
      model: PlayerModel,
      url: 'game',
      socket:window.socket,
      initialize: function () {
        _.bindAll(this, 'serverCreate', 'collectionCleanup');
        this.ioBind('create', this.serverCreate, this);
        this.ioBind('empty', this.collectionCleanup,this);
      },
      serverCreate: function (data) {
        // make sure no duplicates, just in case
        var exists = this.get(data.id);
        if (!exists) {
          this.add(data);
        } else {
          data.fromServer = true;
          exists.set(data);
        }
      },
      collectionCleanup: function (callback) {
        //this.ioUnbindAll();
        this.each(function (model) {
          model.modelCleanup();
        });
        this.reset();
        return this;
      }

});

   return Game;
});
