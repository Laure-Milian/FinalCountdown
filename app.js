"use strict";

(function(){

	var app = {

		time : null,
		intervalID: null,
		default: 6,
		timeMax: 6,

		init : function() {
			this.listeners();
			this.time = this.default;
			this.timeSeparation();
		},

		listeners : function() {
			$("#btnstart").on("click", this.start.bind(this));
			$("#btnstop").on("click", this.stop.bind(this));
			$("#btnpause").on("click", this.pause.bind(this));
			$("#btnreset").on("click", this.reset.bind(this));
			$("#inputUserMinutes, #inputUserSeconds").on("input", this.inputUser.bind(this));
		},

		inputUser : function() {
			var inputUserMinutes = parseInt($("#inputUserMinutes").val(), 10);
			var inputUserSeconds = parseInt($("#inputUserSeconds").val(), 10);

			if (inputUserSeconds && inputUserMinutes) {
				this.time = this.timeMax = inputUserMinutes * 60 + inputUserSeconds ;
			} else if (inputUserMinutes) {
				this.time = this.timeMax = inputUserMinutes * 60 ;
			} else if (inputUserSeconds) {
				this.time = this.timeMax = inputUserSeconds;
			}

			this.timeSeparation();
		},

		start : function() {

			if (this.intervalID === null) {
				var duration = moment.duration(6, 'seconds');
				var start = moment();
				console.log(start);	

				this.intervalID = setInterval(function() {
					var now = moment();
					console.log(now);
					var diff = now.diff(start);
					console.log(diff);
					var newDuration = duration.subtract(diff, 'milliseconds');
					console.log(newDuration);
					this.time = newDuration.get('seconds');

					if (this.time > 0) {
						this.timeSeparation();
					}
				}.bind(this), 1000);
			}
		},

		stop : function() {
			clearInterval(this.intervalID);
			this.intervalID = null;
		},

		timeSeparation : function() {
			var minutes = Math.floor(this.time / 60);
			var seconds = Math.floor(this.time % 60);
			this.timeDisplay(minutes, "#minutes");
			this.timeDisplay(seconds, "#seconds");
			this.displayProgressBar();
		},

		timeDisplay : function(timeElement, selector) {
			if (timeElement > 9) {
				$(selector).html(timeElement)
			} else {
				$(selector).html("0" + timeElement)
			}
		},

		displayProgressBar : function() {
			var progressPercent = Math.floor(100 - ((this.time / this.timeMax) * 100));
			$("#progress").css("width", progressPercent + "%");
		},

		pause : function() {
			if (this.intervalID !== null) {
				this.stop();
				$("#btnpause").html("Play ");		
			} else {
				this.start();
				$("#btnpause").html("Pause");
			}
		},

		reset : function() {
			this.inputUser();
			this.timeSeparation();
			this.stop();
		}

	}

	app.init();

})();