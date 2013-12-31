define([
	
	'text!../../templates/racingTrack.tpl'

],function (racingTrackTemplate) {

	var RacingTrackView = Backbone.View.extend({
		id: 'racingTrack',
		tagName: 'div',
		$container: $('#game'),
		game: null,
		gameid: null,
		counter:1,
		events: {
			'click #go': 'go'
		},
		initialize: function(game,gameid){

			_.bindAll(this,'render','go','countDown','updatePos', 'finish');
			this.game = game;
			this.gameid = gameid;
			this.game.bind('change', this.updatePos);
			this.game.bind('reset',this.finish);
			this.$container.empty().append(this.$el);
			this.render();
		},
		updatePos: function(){
			var view = this;
			for(var i=0; i < view.game.length; i++){
				var mod = view.game.at(i);
				var gid = mod.get('gameid');
				var prog = mod.get('progress');
				var marg = $("#"+gid).css('margin-left');
				var move = $(window).width()/27;
				$("#"+gid).css("margin-left",String(move*prog) + 'px');
			}				
		},

		render: function () {
			
			var out = Handlebars.compile(racingTrackTemplate);
			this.$el.empty().html(out());
			 $("#"+this.gameid).append('You');
		},
		go: function() {

			var gid = String(this.gameid);
			var mod = this.game.where({'gameid': gid});
			var model = mod[0];
			var prog = model.get('progress');
			prog++;
  			model.save({ progress: prog});

		},
		countDown: function(){
			
			var timer = setInterval(function(){
			$("#count_num").html(function(i,html){
			   if(parseInt(html)>0)
			   {
			   return parseInt(html)-1;
			   }
			   else
			   {
			   clearTimeout(timer);
			   $('#go').removeClass('hidden');
			   return "GO!!";
			   }
			 });

			},1000);

		},
		finish: function(){
			$('#racing-container').empty().append('<div id="finish">FINISH!!!</div>')
		}


	});

	return RacingTrackView;
});