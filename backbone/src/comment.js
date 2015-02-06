//通讯录
var $ = window.jQuery = window.$ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore");        

var CommentCollection = require("./commentCollection.js"),
  CommentModel = require("./commentModel.js"),
  CommentView = require("./commentView.js"),
  EmptyView = require("./emptyView.js"),
  AddView = require("./addView.js");


var commentCollection = new CommentCollection();

var utils = require("./utils.js");

var appComment = Backbone.Router.extend({
  routes: {
    '': 'index',
    'add': 'add',
    'delete/:id': 'delete',
    'update/:id': 'update'
  },
  initialize: function() {
    var self = this;

    self.container = $("#comment-page");

    commentCollection.on("invalid", function(model, error) {
      utils.error(error);
    });

  },
  index: function() {
    var self = this;

    if (!commentCollection.isPhonelist) {
      commentCollection.getPhoneList(function(phoneList) {
        if (phoneList.length) {
          //有电话
          havePhoneList();
        } else {
          //为空
          nonePhoneList();
        };
      })
    } else {
      havePhoneList();
    }

    function havePhoneList() {
      var commentView = new CommentView({
        model: commentCollection
      });

      self.container.empty().append(commentView.el);

      commentView.on('addphone', function() {
        self.navigate('add', {
          trigger: true,
          replace: false
        })
      })

    }

    function nonePhoneList() {
      var emptyView = new EmptyView();

      self.container.empty().append(emptyView.el);

      emptyView.on('addphone', function() {
        setTimeout(function() {     //??为什么需要加setTimeout
          self.navigate('add', {
            trigger: true,
            replace: false
          })
        },0)
      })
    }

  },
  add: function() {

    var self = this;

    var addView = new AddView({
      model: commentCollection
    });

    self.container.empty().append(addView.el);

    addView.on('addphone', function() {
      self.navigate('', {
        trigger: true,
        replace: false
      })
    })
  },
  delete: function(id) {
    console.log(id)
  },
  update: function(id) {
    console.log(id)
  }
})


var commentRouter = new appComment();
Backbone.history.start();