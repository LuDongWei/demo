/* 官网商品显示移动功能
 *
 */
define(function(require, exports, module) {
  var $ = require("jquery")
  var handlebars = require('handlebars');

  //参数
  var defaultLists = 4; //列数  
  var itemWidth = 114; //li宽度
  var sortSize = 174; //图片尺寸
  var isOffSale = true; //是否完全显示
  var itemSku = null; //填入sku
  var removeSku = []; //删除sku

  //开始获取数据
  $("#state_button").on("click", function() {
    var itemSku_ = judgeSku($("#item_sku").val())
    if (itemSku_.a) {
      itemSku = itemSku_.b
    } else {
      alert(itemSku_.b)
      return
    }

    var defaultLists_ = judgeLists($("#item_lists").val())
    if (defaultLists_.a) {
      var row = parseInt(defaultLists_.b, 10);
      defaultLists = row
    } else {
      alert(defaultLists_.b)
      return
    }
    isOffSale = $('#item_state').val()

    //console.log(itemSku+","+defaultLists+","+isOffSale)
    ajaxSku(itemSku, isOffSale)
    return false;
  })

  //ajax数据
  var ajaxSku = function(skus, isOffSale) {
    var isOffSale_ = isOffSale.split("|")[0];

    $.ajax({
      "url": "http://www.mbaobao.com/ajax/sku",
      "type": "GET",
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "skus": skus,
        "size": sortSize,
        "all": isOffSale_
      },
      "success": function(json) {
        if (isOffSale_) {
          var bb = isOffSale.split("|")[1];
        }

        newgoods(json,bb)
      }
    });
  }

  //重新封装商品信息集合
  var newgoods = function(data,bb_) {
    var newDatal = []; //全部商品
    var useGoods = {}; //单个商品
    var len = data.length;
    
  
    for (var i = 0; i < len; i++) {
      var cssTag = "";
      //是否下架
      if (!data[i].stock_qty > 0) {
        cssTag = "nosale";
        
        if(bb_&&bb_==2){
          continue
        }
      }
      //是否预售
      if (data[i].is_presell) {
        cssTag = "presale";

        if(bb_&&bb_==1){
           continue 
        }
      }
      useGoods = {
        sku_id: data[i].sku_id,
        prom_title: data[i].prom_title,
        price_title: data[i].price_title,
        promotion_price: data[i].promotion_price,
        sale_price: data[i].sale_price,
        market_price: data[i].market_price,
        vip1_price: data[i].vip1_price,
        vip2_price: data[i].vip2_price,
        vip3_price: data[i].vip3_price,
        vip4_price: data[i].vip4_price,
        vip5_price: data[i].vip5_price,
        is_custom_vip: data[i].is_custom_vip,
        brand_id: data[i].brand_id,
        brand_name: data[i].brand_name,
        c_id: data[i].c_id,
        md: data[i].md,
        is_onsale: data[i].is_onsale,
        is_force: data[i].is_force,
        is_presell: data[i].is_presell,
        is_restock: data[i].is_restock,
        is_closed: data[i].is_closed,
        created: data[i].created,
        stock_qty: data[i].stock_qty,
        _name: data[i]._name,
        _brand_name: data[i]._brand_name,
        _category_name: data[i]._category_name,
        _price: data[i]._price,
        _prom_title: data[i]._prom_title,
        _price_title: data[i]._price_title,
        _image: data[i]._image,
        _tag_pic: data[i]._tag_pic,
        cssTag: cssTag
      };
      newDatal.push(useGoods);
    }
    var data = {
      useGood_list: newDatal
    }
    showGoods(data)
  }

  //商品排序显示和控制
  var showGoods = function(data) {
    var template = handlebars.compile($('#goods-lists').html());
    var width = defaultLists * itemWidth
    $('.sort_goods ul').css("width", width);
    $('.sort_goods ul').html(template(data));

    sortable();

    chuangSku();
  }

  //删除商品
  $("body").find('.sort_goods ul').on("click", ".remove", function() {
    var this_ = $(this).parent();
    removeSku.push(this_.data("sku"));
    this_.hide();
  })


  //选中状态
  function chuangSku() {
    $('.sort_goods ul').find("li").find(".choose").on("click", function() {

      var this_ = $(this).parent();

      if (this_.hasClass("Selected")) {
        this_.removeClass("Selected");
      } else {
        this_.addClass("Selected");
      }

      if (isChuang()) {
        $(".add-goods").show();
      } else {
        $(".add-goods").hide();
      }
    })

    addMove();
  }


  //判断是否有选中的
  var isChuang = function() {
    var ic = false;
    $('.sort_goods ul').find("li").each(function() {
      if ($(this).hasClass("Selected")) {
        ic = true;
      }
    })
    return ic
  }

  //移动
  var addMove = function() {
    $('.sort_goods ul').find("li").find(".add-left").click(function() {
      move($(this).parent(), 'left');
    })

    $('.sort_goods ul').find("li").find(".add-right").click(function() {
      move($(this).parent(), 'right');
    })
  }


  function move(this_, lr) {
    var data = [];
    var index = $('.sort_goods ul').find("li").index(this_);

    $('.sort_goods ul').find("li").each(function() {
      if ($(this).hasClass("Selected")) {
        $(this).removeClass("Selected");

        data.push($(this));

        $(this).remove();
      }
    })

    //删除本来绑定的事件
    $('.sort_goods ul').find("li").each(function() {
      $(this).find(".choose").unbind("click");
      $(this).find(".add-left").unbind("click");
      $(this).find(".add-right").unbind("click");
    })

    var ii = data.length - 1;

    if (lr == "left") {
      for (var m = 0; m <= ii; m++) {
        this_.before(data[m])
      };
    } else {
      for (var i = 0; i <= ii; i++) {
        this_.after(data[ii - i])
      };
    }

    data = [];

    chuangSku();
    addMove();

    $(".add-goods").hide();
  }

  //结束
  $("#sku_button").click(function() {
    var skus = [];
    $('.sort_goods ul').find("li").each(function() {
      skus.push($(this).data("sku"));
    })

    for (var i = 0; i < skus.length; i++) {
      for (var n = 0; n < removeSku.length; n++) {
        if (skus[i] == removeSku[n]) {
          skus.remove(i);
          --i;
        }
      };
    };

    $('#new_sku').val(skus.join(","));
    return false
  })

  //判断sku
  var judgeSku = function(sku) {
    var return_ = {
      a: true,
      b: sku
    }
    if (sku == null || sku == "") {
      return_ = {
        a: false,
        b: "sku还没输入"
      }
      return return_
    }

    if (sku.search(/[a-zA-Z]+/) != -1) {
      return_ = {
        a: false,
        b: "sku包含英文"
      }
      return return_
    }

    if (sku.indexOf("，") >= 0) {
      sku = sku.replace(/，/g, ",")
      return_ = {
        a: true,
        b: sku
      }
    }

    if (sku.indexOf("\n") >= 0) {
      sku = sku.replace(/\n/g, ",")
      return_ = {
        a: true,
        b: sku
      }
    }

    if (sku.indexOf("\s") >= 0) {
      sku = sku.replace(/\s/g, "")
      return_ = {
        a: true,
        b: sku
      }
    }

    return return_
  }

  //判断列数
  var judgeLists = function(lists) {
    var return_ = {
      a: true,
      b: lists
    }

    if (lists == "") {
      return_ = {
        a: true,
        b: defaultLists
      }
      return return_
    }

    if (lists.search(/[a-zA-Z]+/) != -1) {
      return_ = {
        a: false,
        b: "列数包含英文"
      }
      return return_
    }

    if (lists.indexOf(" ") >= 0) {
      lists = lists.replace(/\n/g, ",")
      return_ = {
        a: true,
        b: lists
      }
    }

    var row = parseInt(lists, 10);

    if (row < 1 || row > 12) {
      return_ = {
        a: false,
        b: "列数不小于1不大于12"
      }
      return return_
    }

    return return_
  }

  Array.prototype.remove = function(dx)　 {　　
    if (isNaN(dx) || dx > this.length) {
      return false;
    }　　
    for (var i = 0, n = 0; i < this.length; i++)　　 {　　　　
      if (this[i] != this[dx])　　　　 {　　　　　　
        this[n++] = this[i]　　　　
      }　　
    }　　
    this.length -= 1
  }

})