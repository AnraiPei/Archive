//var BOSH_SERVICE = 'http://127.0.0.1:7070/http-bind/';
var BOSH_SERVICE = 'http://'+xmppServerIp+':7070/http-bind/';
var connection = null;
var i= 0;
function onMessage(msg) {	
   var from = msg.getAttribute('from');
   var type = msg.getAttribute('type');
   var ps = msg.getElementsByTagName('properties');
   var contentType = "";
   $(ps).each(function(){
	   $(this.getElementsByTagName('property')).each(function(){
		   var type = $(this.getElementsByTagName('name')[0]).text();
		   if("contentType" == type){
			   contentType = $(this.getElementsByTagName('value')[0]).text();
		   }
	   });
   });
   var elems = msg.getElementsByTagName('body');
   
   if(elems.length > 0){
	   var xmlMsg = Strophe.getText(elems[0]);
	   if("application" == contentType){
		   var msgdom = xml2Dom($(elems[0]).text());
		   var c = msgdom.getElementsByTagName('ApplicationMessage')[0];
		   var amtype = c.getAttribute('type');
		   if('taskAssigned' == amtype){
			  // document.frames("mainframe").document.frames("mySchedule").location.reload();
			   if(getMyTaskList instanceof Function){
				   getMyTaskList();
			   }
			   showMessage("【"+c.getAttribute('taskSender')+ "】给您推送了一个任务：" +c.getAttribute('taskName'));
		   }
	   }else{
		   var str = from.substring(0,from.indexOf("@"));
		   showMessage('<font color="blue">'+str +'  '+new Date().toLocaleTimeString() + '</font><br/>' + xmlMsg);
	   }
   }
   
   return true;
}

function showMessage(str){
//	$.messager.lays(300, 200);
//	$.messager.show('系统消息', str,0);
	art.dialog({
	    title: '系统消息公告',
	    content: '<div style="width:320px;height:240px;margin:0;padding:0;text-align:left;">'+str+'</div>',
	    left: '100%',
	    top: '100%',
	    fixed: true,
	    drag: false,
	    resize: false
	})
}

/*var Messager = function(){
	this.messager = $.messager;	
};*/

function onConnect(status)
{//alert(status);
   if (status == Strophe.Status.CONNECTED) {
//	   alert("即时消息客户端连接成功！");
		connection.addHandler(onMessage, null, 'message', null, null,  null);
		connection.send($pres().tree());
   }
}

function xmppLogin(jid,pass){
//	alert(jid+pass);
	connection = new Strophe.Connection(BOSH_SERVICE);
    connection.connect(jid,pass,onConnect);
}

function exit(){
	connection.disconnect();
}

function xml2Dom(xmlstr){
	var doc = null;
    if (window['DOMParser']) {
        var parser = new DOMParser();
        doc = parser.parseFromString(xmlstr, 'text/xml');
    } else if (window['ActiveXObject']) {
        var doc = new ActiveXObject("MSXML2.DOMDocument");
        doc.async = false;
        doc.loadXML(xmlstr);
    } else {
        throw {
            type: 'StropeIM ERROR',
            message: 'No DOMParser object found.'
        };
    }
    return doc;
}
