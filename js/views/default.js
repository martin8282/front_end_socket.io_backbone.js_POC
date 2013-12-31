define([
	
	'text!../../templates/default.tpl'
	, 'models/player'
	, 'views/racingTrack'

],function (defaultViewTemplate, Player,RacingTrackView) {

	var DefaultView = Backbone.View.extend({
		id: 'default',
		tagName: 'div',
		$container: $('#body'),
		game: null,
		hidden: false,
		racingTrack: null,
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

			
			var view = this;
			
			var users = this.game.length;

			// Clears the content and render new content
			var out = Handlebars.compile(defaultViewTemplate);
			this.$el.empty().html(out({title: 'Welcome to Nitrotype!',numberOfUsers: users}));
			if(this.hidden){
			    $('#join').addClass('hidden');
			}
			for(var i = 0 ; i < this.game.length; i++){
		    	$('#'+String(i+1)).removeClass('hidden');
		    }
		    if(this.game.length == 3){
		    	view.racingTrack.countDown();
		    }

			// END TODO
		},
		addUser: function() {
			// We don't want ioBind events to occur as there is no id.
		    // We extend Todo#Model pattern, toggling our flag, then create
		    // a new todo from that.
		    var player = Player.extend({ noIoBind: true });
		    var counter = this.game.length + 1;
		    var attrs = {
		      gameid: String(counter),
		      progress: 0
		    };    
		    
		    var _player = new Player(attrs);
		    _player.save();
		    this.racingTrack = new RacingTrackView(this.game,counter);
		    this.hidden = true;
		    
		},

	});

	var defaultView = new DefaultView;

	return defaultView;
});