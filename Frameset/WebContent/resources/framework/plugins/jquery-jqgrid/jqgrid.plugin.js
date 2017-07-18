(function($) {
        // -- 公共方法 --//
        // 调用方式：$.jqGrid.plugin.
        $.jqGrid = {
			plugin : {
				autoResize : function(options){
					var $gridContainer = $(options.dataGrid +"_container");
					var dltHeight = 0;
					if (options.hasPager)
					{
						dltHeight += 20;
					}
					if (options.hasTitle)
					{
						dltHeight += 20;
					}

					var size = getWidthAndHeight();

					if ($.isFunction(options.callback)) {
						options.callback(options.dataGrid, size);
						setTimeout(resizeJGContainer, 500);
					}
					
					if($.browser.msie){
						$gridContainer.bind("resize", function (event, ui) {
								setTimeout(resizeJGContainer, 500);
						});
					}else{
						$(window).resize(function(){
							setTimeout(resizeJGContainer, 500);
						});
					}
					

					function resizeJGContainer(){
						var size = getWidthAndHeight();
						if(options.resizeWidth){
							$(options.dataGrid).jqGrid('setGridWidth', size.width);
						}else{
							$(options.dataGrid).jqGrid('setGridHeight', size.height).jqGrid('setGridWidth', size.width);
						}
					}

					
					function getWidthAndHeight(){
						var dHeight = $gridContainer.height();
						var dWidth = $gridContainer.width();
						dHeight = dHeight - dltHeight - 35;
						
						return {width: dWidth, height: dHeight};
					}
				},
				
				autoRows: function(defValue){
					if(window.screen.height < 800){
						return defValue;
					}else{
						return 50;
					}
				}
			}
		}

})(jQuery);