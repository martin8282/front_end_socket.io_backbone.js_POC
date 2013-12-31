// Fixed problem with Backbone put query string in URL routing parameter
(function(old) {
    Backbone.History.prototype.getFragment = function() {
        return old.apply(this, arguments).replace(/\?.*/, '');
    };
})(Backbone.History.prototype.getFragment);


define([

  'specsRunner'

// TODO: Includes other Javascript modules/dependencies
, 'views/default'
, 'collections/game'
// END TODO

], function (specsRunner, defaultView,GameCollection) {

	var AppRouter = Backbone.Router.extend({

		  routes: {

			// Specs running route
			  'dev/specs': 'runSpecs'
			, 'dev/specs/:reporter': 'runSpecs'

			// TODO: Sets up other routes
			// END TODO

			// Default route
			, '*path': 'defaultRoute'
		}

		, runSpecs: function (reporter) {
			specsRunner.execute(reporter);
		}

		// TODO: Sets other route methods
		// END TODO

		, defaultRoute: function () {
			// TODO: Defines a default route/action
			var game = new GameCollection();
			game.fetch();
			defaultView.init(game);
			// END TODO
		}


		, initialize: function () {
			// TODO: Comments out the following if wishing not to record the routes in browser's history
			window.socket = io.connect('http://localhost:1404');
			Backbone.history.start();
			// END TODO
		}

	});

	return new AppRouter; // Return AppRouter as a singleton object

});