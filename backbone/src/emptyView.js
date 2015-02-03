//为空的时候
var  $ = require("jquery"),
     Backbone = require("backbone"),
     _ = require("underscore");

var emptyView = Backbone.View.extend({
	el : '#emptyList',
    template : _.template($('#nonePhoneList').html()),
	events : {

	},
	initialize : function(){
		console.log(2)
	}
})

module.exports = emptyView;