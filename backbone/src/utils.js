//工具类
var $ = require("jquery"),
	_ = require("underscore");
    require("bootstrap");

var utils = {
	error: function(message) {

		$('.request-failed').find("#failedReason").html(message);
		$('.request-failed').modal();
		
	},
	success: function(message, callback) {

		$('.request-success').find("#successReason").html(message);

		$('.request-success').modal();

		$('.request-success').on('hidden.bs.modal', function() {
			callback();
		})

	}
}

module.exports = utils;