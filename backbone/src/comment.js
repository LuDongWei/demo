//通讯录
var $ = window.jQuery = window.$ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore");        

var CommentCollection = require("./commentCollection.js"),
  CommentModel = require("./commentModel.js"),
  CommentView = require("./commentView.js"),
  EmptyView = require("./emptyView.js"),
  AddView = require("./addView.js"),
  UpdateView = require("./updateView.js");

var commentModel = new CommentModel();  
var commentCollection = new CommentCollection();

var utils = require("./utils.js");

var appComment = Backbone.Router.extend({
  routes: {
    '': 'index',
    'add': 'add',
    'delete/:id': 'delete',  //-- http://localhost:8000/phone.html#delete/123 
    'update/:id': 'update'   //-- http://localhost:8000/phone.html#update/123
  },
  initialize: function() {
    var self = this;

    self.container = $("#comment-page");

  },
  index: function() {
    var self = this;
    
    commentCollection.getPhoneList(function(phoneList) {
      if (phoneList.length) {
        //有电话
        havePhoneList();
      } else {
        //为空
        nonePhoneList();
      };
    })

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

      commentView.on('updatePhone',function(id){
        self.navigate('update/'+id,{
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
    var self = this;

    commentCollection.getPhoneList( function(phoneList) {
        var model = phoneList.get(id);

        if(model){
          model.destroy({
            success: function(model, response) {
              if (response.return) {
                utils.success('删除成功', function() {
                  self.navigate('', {
                    trigger: true,
                    replace: false
                  })
                });
              } else {
                utils.error('未能成功删除出现故障');
              }
            }
          })         
        }else{
          utils.error('请输入正确请求的id'); 
        }
    })
  },
  update: function(id) {
     var self = this;
     
     var id_ = $(".list-group").find(".active").data("id");

     var updateView = new UpdateView({
         id : id_,
         model : commentCollection
     });

     self.container.empty().append(updateView.el);

     updateView.on('update', function() {
      self.navigate('', {
        trigger: true,
        replace: false
      })
    })
      
  }
})


var commentRouter = new appComment();
Backbone.history.start();