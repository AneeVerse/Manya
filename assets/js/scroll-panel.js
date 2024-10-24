! function (l) {
    $(document).ready(function () {
        $(".locatonscrollpan").jScrollPane({
          showArrows: !0
       }).data("jsp"), l("#scroll-up").bind("click", function () {
          return api.scrollByY(-10), !1
       }), $("#scroll-down").bind("click", function () {
          return api.scrollByY(10), !1
       })

       $(".overviewpanel").jScrollPane({
         showArrows: !0
      }).data("jsp"), l("#scroll-up1").bind("click", function () {
         return api.scrollByY(-10), !1
      }), $("#scroll-down1").bind("click", function () {
         return api.scrollByY(10), !1
      })


    })
 }(jQuery);