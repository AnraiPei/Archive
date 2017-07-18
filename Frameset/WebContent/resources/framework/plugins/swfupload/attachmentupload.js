var attachments = [];// 页面新增的附件
var attachmentsOld = [];// 后台返回前台的附件
var attachmentOne = [];// 页面新增的单个文件
var attachmentOnePic=[];//单图片附件
var removeAttachmentIds = [];// 删除的附件
var swfulOne;
var swful;
var swfpic;
//多附件初始化swfupload
function uploadAttachmentsInit(pararm){
	var settings = {
			session_str : ";jsessionid="+_SESSIONID,
			uploadFileCount: pararm.fileCount,//新增的时候值为0，编辑的时候值为已上传附件的个数
			file_upload_limit:pararm.limitNum || 5,//最大上传多少个附件
			file_size_limit: pararm.file_size_limit || "50MB",//上传附件的大小
			file_types_description:"所有文件",//附件类型描述
			button_placeholder_id : pararm.buttonId,//触发附件上传的按钮id
			progressTarget :  pararm.progressId,//附件上传的进度条
			uploadCallBack: pararm.functionName//回调函数
		};
		swful = initSWFUpload(settings);
}

//单图片附件初始化swfupload
function uploadOnePicInit(pararm){
	 var settingspic = {
				session_str : ";jsessionid="+_SESSIONID,
				uploadFileCount: pararm.fileCount,
				file_upload_limit: 1,
				file_size_limit: "50MB",
				file_types: pararm.fileTypes,
				file_types_description:"图片文件",
				button_placeholder_id : pararm.buttonId,
				progressTarget : pararm.progressId,
				uploadCallBack: pararm.functionName
			};
		swfpic = initSWFUpload(settingspic);
}

//单附件swf上传组件初始化
function uploadAttachmentOneInit(pararm){
	var settings = {
			session_str : ";jsessionid="+_SESSIONID,
			uploadFileCount: pararm.fileCount,
			file_upload_limit: 1,
			file_size_limit: "50MB",
			file_types_description:"所有文件",
			button_placeholder_id : pararm.buttonId,
			progressTarget : pararm.progressId,
			uploadCallBack: pararm.functionName
	};
	swfulOne = initSWFUpload(settings);
	
}
//多附件回调函数
function upload_completeMore(result, pararm) {
	var temp = {
		tid : result.fileid,
		name : result.fileoldname,
		serverPath : result.tempabspath + result.filenewname,
		legacy : false,
		filesize:result.filesize
	};
	attachments.push(temp);
	if (attachmentsOld == [] || attachmentsOld == "") {
		$("#" + pararm.filelistContext).html(file2Href(_CTXPATH, attachments));
	} else {
		$("#" + pararm.filelistContext).html(attachment2HrefAll(_CTXPATH, attachmentsOld,attachments));
	}
}

//单附件回调函数
function upload_complete_oneMore(result, pararm) {
	var temp = {
		tid : result.fileid,
		name : result.fileoldname,
		serverPath : result.tempabspath + result.filenewname,
		legacy : false,
		filesize:result.filesize
	};
	var filename = temp.name;
	var serverPath = temp.serverPath;
	attachmentOne.push(temp);
	$("#" + pararm.documentName).val(filename);
	$("#" + pararm.documentUrl).val(serverPath);
	$("#" + pararm.fileContext).html(oneFile2Href(_CTXPATH, attachmentOne));
}

//单附件图片回调函数
function upload_complete_onePic(result, pararm) {
	var temp = {
		tid : result.fileid,
		name : result.fileoldname,
		serverPath : result.tempabspath + result.filenewname,
		legacy : false,
		filesize:result.filesize
	};
	var filename = temp.name;
	var serverPath = temp.serverPath;
	attachmentOnePic.push(temp);
	$("#" + pararm.documentName).val(filename);
	$("#" + pararm.documentUrl).val(serverPath);
	$("#" + pararm.fileContext).html(pic2Href(_CTXPATH, attachmentOnePic));
}

//多附件删除
function delAttachments(tid){
	var a = [];
	var b = [];
	for ( var i = 0; i < attachmentsOld.length; i++) {
		if (attachmentsOld[i].tid == tid || attachmentsOld[i].id == tid) {
			removeAttachmentIds.push(attachmentsOld[i].id);
			$("#span_" + tid).remove();
			uploadUpdateSuccessUploads(swful, 1);
		} else {
			b.push(attachmentsOld[i]);
		}
	}
	for ( var i = 0; i < attachments.length; i++) {
		if (attachments[i].tid == tid) {
			$("#span_" + tid).remove();
			uploadUpdateSuccessUploads(swful, 1);
		} else {
			a.push(attachments[i]);
		}
	}
	attachmentsOld = b;
	attachments = a;
} 

//单附件删除
function delAttachmentOne(tid){
	 var a=[];
	 $("#span_"+tid).remove();
	 removeAttachmentIds.push(tid);
	 uploadUpdateSuccessUploads(swfulOne,1);
	 attachmentOne=a;
}

//单图片删除
function delPicOne(tid){
	var a=[];
	 $("#span_"+tid).remove();
	 removeAttachmentIds.push(tid);
	 uploadUpdateSuccessUploads(swfpic,1);
	 attachmentOnePic=a;
}

//服务端返回附件列表组装html
function attachment2Href(path, attachments){
	var a='';
	for(var i=0;i<attachments.length;i++){
		a =a + '<li  class="upload " id="span_'+attachments[i].id+'">';
		var fname = attachments[i].name;
		var suffix = fname.substring(fname.lastIndexOf(".")+1);
		a += 	'<img class="delete" src="'+path+'/lib/images/swfupload/remove.png" alt="删除" onclick="deleteAttachments(\''+attachments[i].id+'\')"/>'+
			'<img class="filetype" src="'+path+'/lib/images/filetypes/'+getFileTypePic(suffix+'.gif')+'" />'+
			'<a class="fileurl" title='+fname+' href="'+path+'/downloadfile/hadoopfile.do?hadoopPath='+encodeURIComponent(attachments[i].hadoopPath)+'&filename='+encodeURIComponent(encodeURIComponent(fname))+'">'+fname+'</a>'+
			'</li>';
	}
	return a;
}

//服务端返回附件列表和新增附件列表组装html
function attachment2HrefAll(path,attachmentsOld, attachments){
	var a = attachment2Href(path,attachmentsOld) + file2Href(path,attachments);
	return a;
}

//多附件
function file2Href(path, attachments){
	var a='';
	for(var i=0;i<attachments.length;i++){
		a =a + '<li  class="upload " id="span_'+attachments[i].tid+'">';
		var fname = attachments[i].name;
		var suffix = fname.substring(fname.lastIndexOf(".")+1);
		a += 	'<img class="delete" src="'+path+'/lib/images/swfupload/remove.png" alt="删除" onclick="deleteAttachments(\''+attachments[i].tid+'\')"/>'+
			'<img class="filetype" src="'+path+'/lib/images/filetypes/'+getFileTypePic(suffix+'.gif')+'" />'+
			'<a class="fileurl" title='+fname+' href="'+path+'/downloadfile/downloadTempImg.do?path='+encodeURIComponent(attachments[i].serverPath)+'&filename='+encodeURIComponent(encodeURIComponent(fname))+'">'+fname+'</a>'+
			'</li>';
	}
	return a;
}

//单个图片
function pic2Href(path,attachmentOnePic){
	var b='';
	b = '<li  class="uploadOnePic" id="span_'+attachmentOnePic[0].tid+'">';
	var fname = attachmentOnePic[0].name;
	var suffix = fname.substring(fname.lastIndexOf(".")+1);
	b += '<img class="delete" src="'+path+'/lib/images/swfupload/remove.png" alt="删除" onclick="deletePicture(\''+attachmentOnePic[0].tid+'\')"/>'+
		'<img class="filetype" src="'+path+'/lib/images/filetypes/'+getFileTypePic(suffix+'.gif')+'" /> '+
		'<a href="'+path+'/downloadfile/downloadTempImg.do?path='+encodeURIComponent(attachmentOnePic[0].serverPath)+'&filename='+encodeURIComponent(encodeURIComponent(fname))+'">'+fname+'</a>'+
		'</li>';
	return b;
}

//单个附件
function oneFile2Href(path, attachmentOne){
	var a='';
		a='<li  class="uploadOne" id="span_'+attachmentOne[0].tid+'">';
		var fname = attachmentOne[0].name;
		var suffix = fname.substring(fname.lastIndexOf(".")+1);
		a += 	'<img class="delete" src="'+path+'/lib/images/swfupload/remove.png" alt="删除" onclick="deleteAttachment(\''+attachmentOne[0].tid+'\')"/>'+
			'<img class="filetype" src="'+path+'/lib/images/filetypes/'+getFileTypePic(suffix+'.gif')+'" /> '+
			'<a class="fileurl" href="'+path+'/downloadfile/downloadTempImg.do?path='+encodeURIComponent(attachmentOne[0].serverPath)+'&filename='+encodeURIComponent(encodeURIComponent(fname))+'">'+fname+'</a>'+
			'</li>';
	return a;
}

//多附件或者单附件获取类型图片
function getTypePic(attachments,id,path){
	for(var i=0;i<attachments.length;i++){
		var attName=attachments[i].name;
		var attSuffix=attName.substring(attName.lastIndexOf(".")+1);
		var attUrl=path+getFileTypePic(attSuffix+'.gif');
		var attId=attachments[i].id;
		if(attId==undefined){
			attId=Math.random().toString().substring(2);
		}
		$(id+attId).attr("src",attUrl);
	}
}

//单图片附件获取类型图片
function getOnePicType(picName,id,path){
	var picsuffix = picName.substring(picName.lastIndexOf(".")+1); 
	var picUrl=path+getFileTypePic(picsuffix+'.gif');
	$(id).attr("src",picUrl);
}

//附件下载
function downloadFile(hadoopPath, fileName) {
	window.location.href = _CTXPATH + "/downloadfile/hadoopfile.do?hadoopPath="
			+ hadoopPath + "&filename="
			+ encodeURIComponent(encodeURIComponent(fileName));
}