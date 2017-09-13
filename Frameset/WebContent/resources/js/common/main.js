var tab = null;
var accordion = null;
var tree = null;
var tabItems = [];
$(function() {
	//布局
	$("#main_layout").ligerLayout({
		leftWidth : 190,
		height : '100%',
		heightDiff : -34,
		space : 4,
		onHeightChanged : f_heightChanged
	});
	var height = $(".l-layout-center").height();
	
	//面板
	accordion = $("#menu_accordion").ligerAccordion({
		height : height - 24,
		speed : null
	});
	
	//树
	tree = $("#_tree_menu_one").ligerTree({
		data : indexdata,
		checkbox : false,
		slide : false,
		nodeWidth : 120,
		attribute : [ 'nodename', 'url' ],
		render : function(a) {
			if (!a.isnew)
				return a.text;
			return '<a href="' + a.url + '" target="_blank">' + a.text + '</a>';
		},
		onSelect : function(node) {
			if (!node.data.url)
				return;
			if (node.data.isnew) {
				return;
			}
			var tabid = $(node.target).attr("tabid");
			if (!tabid) {
				tabid = new Date().getTime();
				$(node.target).attr("tabid", tabid)
			}
			f_addTab(tabid, node.data.text, node.data.url);
		}
	});
	
	//Tab
	tab = $("#framecenter").ligerTab({
		height : height,
		showSwitchInTab : true,
		showSwitch : true,
		onAfterAddTabItem : function(tabdata) {
			tabItems.push(tabdata);
			saveTabStatus();
		},
		onAfterRemoveTabItem : function(tabid) {
			for (var i = 0; i < tabItems.length; i++) {
				var o = tabItems[i];
				if (o.tabid == tabid) {
					tabItems.splice(i, 1);
					saveTabStatus();
					break;
				}
			}
		},
		onReload : function(tabdata) {
			var tabid = tabdata.tabid;
			addFrameSkinLink(tabid);
		}
	});
	
	$("#pageloading").hide();
	css_init();
	pages_init();
});

//刷新高度
function f_heightChanged(options) {
	if (tab)
		tab.addHeight(options.diff);
	if (accordion && options.middleHeight - 24 > 0)
		accordion.setHeight(options.middleHeight - 24);
}

function saveTabStatus() {
	$.cookie('liger-home-tab', JSON2.stringify(tabItems));
}

function pages_init() {
	var tabJson = $.cookie('liger-home-tab');
	if (tabJson) {
		var tabitems = JSON2.parse(tabJson);
		for (var i = 0; tabitems && tabitems[i]; i++) {
			f_addTab(tabitems[i].tabid, tabitems[i].text, tabitems[i].url);
		}
	}
}

function css_init() {
	var css = $("#mylink").get(0), skin = getQueryString("skin");
	$("#skinSelect").val(skin);
	$("#skinSelect").change(function() {
		if (this.value) {
			location.href = "demo.html?skin=" + this.value;
		} else {
			location.href = "demo.html";
		}
	});

	if (!css || !skin)
		return;
	skin = skin.toLowerCase();
	$('body').addClass("body-" + skin);
	$(css).attr("href", skin_links[skin]);
}

function f_addTab(tabid, text, url) {
	tab.addTabItem({
		tabid : tabid,
		text : text,
		url : url,
		callback : function() {
			addFrameSkinLink(tabid);
		}
	});
}

var skin_links = {
	"aqua" : "lib/ligerUI/skins/Aqua/css/ligerui-all.css",
	"gray" : "lib/ligerUI/skins/Gray/css/all.css",
	"silvery" : "lib/ligerUI/skins/Silvery/css/style.css",
	"gray2014" : "lib/ligerUI/skins/gray2014/css/all.css"
};

function addFrameSkinLink(tabid) {
	var prevHref = getLinkPrevHref(tabid) || "";
	var skin = getQueryString("skin");
	if (!skin)
		return;
	skin = skin.toLowerCase();
	attachLinkToFrame(tabid, prevHref + skin_links[skin]);
}

function getQueryString(name) {
	var now_url = document.location.search.slice(1), q_array = now_url
			.split('&');
	for (var i = 0; i < q_array.length; i++) {
		var v_array = q_array[i].split('=');
		if (v_array[0] == name) {
			return v_array[1];
		}
	}
	return false;
}

function getLinkPrevHref(iframeId) {
	if (!window.frames[iframeId])
		return;
	var head = window.frames[iframeId].document.getElementsByTagName('head')
			.item(0);
	var links = $("link:first", head);
	for (var i = 0; links[i]; i++) {
		var href = $(links[i]).attr("href");
		if (href && href.toLowerCase().indexOf("ligerui") > 0) {
			return href.substring(0, href.toLowerCase().indexOf("lib"));
		}
	}
}

function attachLinkToFrame(iframeId, filename) {
	if (!window.frames[iframeId])
		return;
	var head = window.frames[iframeId].document.getElementsByTagName('head')
			.item(0);
	var fileref = window.frames[iframeId].document.createElement("link");
	if (!fileref)
		return;
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	head.appendChild(fileref);
}