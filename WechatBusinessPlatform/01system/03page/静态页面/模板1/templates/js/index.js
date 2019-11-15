$(function() {
	initElevator();
	setInterval(function(){initElevator();},10000);
	
});
function initElevator() {
	var id = $('#id').val();
	var myDate = new Date();
	var month = myDate.getMonth() + 1, day = myDate.getDate(), hour = myDate.getHours(), minutes = myDate.getMinutes(), seconds = myDate.getSeconds();
	$.ajax({type: 'post', url: siteName+'/getElevatorJsonUrl.ajax', data: 'id=' + id, success: function(result) {
		if (result.success) {
			var row = '', data = JSON.parse(result.message);
			row += '<div class="row-fluid">' +
	  					'<div class="span6 bordered">' +
		  					'<h2 style="display: inline-block;"><i class="fa fa-clock-o"></i>' + myDate.getFullYear() + '-' + 
		  						(month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day +
		  						'&nbsp;' + (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '</h2>' +
		  				'</div>' +
		  				'<div class="span6 bordered">' +
		  					'<h2 style="display: inline-block;">设备编号<span class="blank"></span>' + getNullValue(data.设备编号) + '</h2>' +
		  				'</div>' +
	  				'</div>' +
	  				'<div class="row-fluid margin-top-30">' +
	  					'<div class="span6 bordered">' +
		  					'<div class="span6 padding-left-40 relative" style="border-right: 2px solid #eee;">' +
			  					'<h2 style="display: inline-block;">重量<span class="blank"></span>' + getNullValue(data.重量) + '</h2>' +
			  					'<span class="unit">kg</span>' +
			  				'</div>' +
			  				'<div class="span6 padding-left-40 relative">' +
			  					'<h2 style="display: inline-block;">人数<span class="blank"></span>' +  getNullValue(data.人数) + '</h2>' +
			  					'<span class="unit">/人</span>' +
			  				'</div>' +
		  				'</div>' +
		  				'<div class="span6 bordered relative">' +
		  					'<h2 style="display: inline-block;">当前楼层<span class="blank"></span>' + getNullValue(data.当前楼层) + '</h2>' +
		  					'<span class="unit">/层</span>' +
		  				'</div>' +
	  				'</div>' +
	  				'<div class="row-fluid margin-top-30">' +
		  				'<div class="span6 bordered relative">' +
		  					'<h2 style="display: inline-block;"><i class="fa fa-anchor"></i>高度<span class="blank"></span><span class="blank"></span>' + getNullValue(data.高度) + '</h2>' +
		  					'<span class="unit">米</span>' +
		  				'</div>' +
		  				'<div class="span6 bordered relative">' +
		  					'<h2><i class="fa fa-thumb-tack"></i>速度<span class="blank"></span><span class="blank"></span>' + getNullValue(data.速度) + '</h2>' +
		  					'<span class="unit">m/s</span>' +
		  				'</div>' +
	  				'</div>' +
	  				'<div class="row-fluid margin-top-30">' +
		  				'<div class="span12 bordered" style="width: 98.5%;">' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.超载报警) == 'T' ? 'color-green' : 'color-red') + '"></i>超载报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.顶层报警) == 'T' ? 'color-green' : 'color-red') + '"></i>顶层报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.超员报警) == 'T' ? 'color-green' : 'color-red') + '"></i>超员报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.前门报警) == 'T' ? 'color-green' : 'color-red') + '"></i>前门报警</h2>' +
		  					'</div>' +
		  					'<div class="span12 height-blank"></div>' +
		  					'<div class="span3 padding-left-40" style="margin-left: 0px;">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.风速报警) == 'T' ? 'color-green' : 'color-red') + '"></i>风速报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.蹲底报警) == 'T' ? 'color-green' : 'color-red') + '"></i>蹲底报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.天窗报警) == 'T' ? 'color-green' : 'color-red') + '"></i>天窗报警</h2>' +
		  					'</div>' +
		  					'<div class="span3 padding-left-40">' +
		  						'<h2><i class="fa fa-circle ' + (getNullValue(data.后面报警) == 'T' ? 'color-green' : 'color-red') + '"></i>后面报警</h2>' +
		  					'</div>' +
		  				'</div>' +
	  				'</div>';
			$('#drawContent').html(row);
		}
	}});
}
function getNullValue(str) {
	if (str == '')
		return '';
	else if (str == null)
		return '暂无数据';
	else if (typeof str == 'undefined')
		return '暂无数据';
	else if (str == 'undefined')
		return '暂无数据';
	else 
		return str;
}