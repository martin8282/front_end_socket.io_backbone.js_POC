define([
	
	'text!../../templates/default.tpl'
	, 'models/player'

],function (defaultViewTemplate, Player) {

	var DefaultView = Backbone.View.extend({
		id: 'default',
		tagName: 'div',
		$container: $('#body'),
		game: null,
		events: {
			'click #join': 'addUser'
		},
		init: function(game){
			_.bindAll(this,'render','addUser');
			this.game = game;
			this.game.bind('add', this.render);
			this.game.bind('reset', this.render);
			this.$container.empty().append(this.$el);
			this.render();
		},

		render: function () {

			
			// Clears the container DOM and 
			// Shows the default view inside the container
			
			var users = this.game.length;

			// Clears the content and render new content
			var out = Handlebars.compile(defaultViewTemplate);
			this.$el.empty().html(out({title: 'HELLO Nitrotype!',numberOfUsers: users}));

			// END TODO
		},
		addUser: function() {
			// We don't want ioBind events to occur as there is no id.
		    // We extend Todo#Model pattern, toggling our flag, then create
		    // a new todo from that.
		    var player = Player.extend({ noIoBind: true });
		    var counter = this.game.length + 1;
		    var attrs = {
		      username: 'Winner' + counter,
		      progress: 0
		    };
		    
		    
		    var _player = new Player(attrs);
		    _player.save();
		},

	});

	var defaultView = new DefaultView;

	return defaultView;
});