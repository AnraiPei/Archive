可以设置内嵌的swf的宽高
但是因为外部的swf的长宽比是固定的 所以显示会有问题
var swfWidth:String=(_root.swfWidth?_root.swfWidth:1280); 
var swfHeight:String=(_root.swfHeight?_root.swfHeight:800);
var swfURL:String=_root.url;
var showPrevNext:Boolean=(_root.showPrevNext=="0"?false:true);
var showPrint:Boolean=(_root.showPrint=="0"?false:true);
var showTool:Boolean=(_root.showTool=="0"?false:true);
var showZoom:Boolean=(_root.showZoom=="0"?false:true);
var showFind:Boolean=(_root.showFind=="0"?false:true);
var showPop:Boolean=(_root.showPop=="0"?false:true);
var showSidebar:Boolean=(_root.showSidebar=="0"?false:true);
var showPage:Boolean=(_root.showPage=="0"?false:true);
var showOverflow:Boolean=(_root.showOverflow=="0"?false:true);
var showZoomKeys:Boolean=(_root.showZoomKeys=="0"?false:true);
var showBrand:Boolean=(_root.showBrand=="0"?false:true);
var showClose:Boolean=(_root.showClose=="0"?false:true);