
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	//document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function preLoad() {
	if (!this.support.loading) {
		alert("You need the Flash Player 9.028 or above to use SWFUpload.");
		return false;
	}
}
function loadFailed() {
	alert("Something went wrong while loading SWFUpload. If this were a real application we'd clean up and then give you an alternative");
}

function loadSuccess(){
	/* I don't need to do anything here */
	var uploads = this.customSettings.uploadFileCount;
	var stats = this.getStats();
	stats.successful_uploads = uploads;
	this.setStats(stats);
}

function fileDialogStart() {
	
}
function fileQueued(file) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("待上传...");
		progress.toggleCancel(true, this);

	} catch (ex) {
		this.debug(ex);
	}

}

function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			//alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
			art.dialog.alert("您试图上传太多文件.\n" + (message === "0" ? "您上传文件已经达到了限制." : "您最多可上传" + message + "个文件."));
			return;
		}else if(errorCode === SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT){
			art.dialog.alert("你上传的文件【<span style='color:red;'>"+file.name+"</span>】大小超过了限制" + swfuinit.file_size_limit);
			return;
		}

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			//progress.setStatus("File is too big.");
			progress.setStatus("文件大小不能超过" + swfu.settings.file_size_limit);
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("Cannot upload Zero Byte files.");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			//progress.setStatus("Invalid File Type.");
			progress.setStatus("文件类型不对，支持" + swfu.settings.file_types_description);
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			alert("You have selected too many files.  " +  (message > 1 ? "You may only add " +  message + " more files" : "You cannot add any more files."));
			break;
		default:
			if (file !== null) {
				progress.setStatus("Unhandled Error");
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (this.getStats().files_queued > 0) {
			//document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		
		/* I want auto start and I can do that here */
		this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("上传中...");
		progress.toggleCancel(true, this);
	}
	catch (ex) {
	}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {

	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
		progress.setStatus("上传中...");
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setComplete();
		progress.setStatus("完成.");
		progress.toggleCancel(false);
		
		//eval(serverData);
		//this.customSettings.uploadFileArray.push(result);
		if($.isFunction(this.customSettings.uploadCallBack)){
			eval(serverData);
			this.customSettings.uploadCallBack(result);
		}
		
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			//document.getElementById(this.customSettings.cancelButtonId).disabled = true;
		} else {	
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}

}

function uploadError(file, errorCode, message) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("Upload Error: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
			progress.setStatus("Configuration Error");
			this.debug("Error Code: No backend file, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("Upload Failed.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("Server (IO) Error");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("Security Error");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
			progress.setStatus("File not found.");
			this.debug("Error Code: The file was not found, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			if (this.getStats().files_queued === 0) {
				//document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("取消");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("停止");
			break;
		default:
			progress.setStatus("Unhandled Error: " + error_code);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

/**
* uploads: 文件上传数
*/
function uploadUpdateSuccessUploads(swfObject, uploads){
	var stats = swfObject.getStats();
	stats.successful_uploads=stats.successful_uploads - uploads;
	swfObject.setStats(stats);
}
var swfuinit;
function initSWFUpload(settings){
	swfuinit= settings;
	var flashSettings = {
		// Backend Settings
		upload_url: settings.upload_url || _CTXPATH + "/upload/save.do" + (settings.session_str  || ""),
		post_params: settings.post_params || {},

		// File Upload Settings
		file_size_limit : settings.file_size_limit || "2GB",	// 100MB
		file_types :  settings.file_types || "*.*",
		file_types_description : settings.file_types_description || "All Files",
		file_upload_limit : settings.file_upload_limit || 0,
		file_queue_limit : 0,

		// Event Handler Settings (all my handlers are in the Handler.js file)
		swfupload_preload_handler :  preLoad,
		swfupload_load_failed_handler : loadFailed,
		swfupload_loaded_handler : loadSuccess,
		file_dialog_start_handler : settings.fileDialogStart || fileDialogStart,
		file_queued_handler : settings.fileQueued || fileQueued,
		file_queue_error_handler : settings.fileQueueError || fileQueueError,
		file_dialog_complete_handler : settings.fileDialogComplete || fileDialogComplete,
		upload_start_handler : settings.uploadStart || uploadStart,
		upload_progress_handler : settings.uploadProgress || uploadProgress,
		upload_error_handler : settings.uploadError || uploadError,
		upload_success_handler : settings.uploadSuccess || uploadSuccess,
		upload_complete_handler : settings.uploadComplete || uploadComplete,

		// Button Settings
		button_image_url : settings.button_image_url || _CTXPATH + "/lib/images/swfupload/upload_file.png",
		button_window_mode:"transparent",
		button_placeholder_id : settings.button_placeholder_id || "spanButtonPlaceholder",
		button_width: settings.button_width || 101,
		button_height: settings.button_height || 22,
		
		// Flash Settings
		flash_url : _CTXPATH + "/lib/plugins/swfupload/swfupload.swf",
		flash9_url : _CTXPATH + "/lib/plugins/swfupload/swfupload.swf",
	

		custom_settings : {
			progressTarget :  settings.progressTarget || "fsUploadProgress",
			//cancelButtonId : settings.cancelButtonId || "btnCancel",
			uploadFileCount : settings.uploadFileCount || 0, 
			uploadCallBack : settings.uploadCallBack || ""
		},
		
		// Debug Settings
		debug: false
	};
	return new SWFUpload(flashSettings);
}