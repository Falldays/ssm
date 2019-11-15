/**
 * 塔吊js方法
 */
$(function() {
	initTruct_crane();
	setInterval(function(){initTruct_crane();},10000);
	
});
function initTruct_crane() {
	var id = $('#id').val();
	var myDate = new Date();
	var month = myDate.getMonth() + 1, day = myDate.getDate(), hour = myDate.getHours(), minutes = myDate.getMinutes(), seconds = myDate.getSeconds();
	$.ajax({type: 'post', url: siteName+'/getJsonUrlAjax.action', data: 'id=' + id, success: function(result) {
		if (result.success) {
			var row = '', data = JSON.parse(result.message);
			row += '<div class="row-fluid">' +
	  					'<div class="span5 relative">' +
	  						'<div id="ta" style="height: 400px;"></div>' +
	  						'<span class="unit2">' + myDate.getFullYear() + '-' + 
		  						(month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day +
		  						'&nbsp;' + (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds +
	  						'</span>' +
	  						'<span class="unit5">回转</span>' +
	  						'<span class="unit6">' + getNullValue(data.角度) + '<sup>&deg;</sup></span>' +
	  					'</div>' +
	  					'<div class="span5 bordered">' +
	  						'<h2><i class="fa fa-anchor width-50 color-green"></i>设备编号<span class="blank"></span>' + getNullValue(data.设备编号) + '</h2>' +
	  						'<img src="'+siteName+'/images/truck.png" style="height: 317px; margin-left: 20px;">' +
	  						'<h2><i class="fa fa-creative-commons width-50 color-green"></i>备案编号<span class="blank"></span>' + getNullValue(data.备案编号) + '</h2>' +
	  					'</div>' +
	  					'<div class="span2" style="margin-left: 25px;">' +
	  						'<div class="row-fluid">' +
	  							'<div class="span12 bordered relative">' +
	  								'<h2 class="margin-0 text-center">' + getNullValue(data.倍率) + '</h2>' +
	  								'<span class="unit2">倍率</span>' +
	  								'<span class="unit3"><i class="fa fa-cogs"></i></span>' +
	  								'<span class="unit4">倍</span>' +
	  							'</div>' +
	  						'</div>' +
	  						'<div class="row-fluid margin-top-15">' +
	  							'<div class="span12 bordered relative">' +
	  								'<h2 class="margin-0 text-center">' + getNullValue(data.高度) + '</h2>' +
	  								'<span class="unit2">高度</span>' +
	  								'<span class="unit3"><i class="fa fa-thumb-tack"></i></span>' +
	  								'<span class="unit4">m</span>' +
	  							'</div>' +
	  						'</div>' +
	  						'<div class="row-fluid margin-top-15">' +
	  							'<div class="span12 bordered relative">' +
	  								'<h2 class="margin-0 text-center">2</h2>' +
	  								'<span class="unit2">矩角</span>' +
	  								'<span class="unit3"><i class="fa fa-italic"></i></span>' +
	  								'<span class="unit4">&deg;</span>' +
	  							'</div>' +
	  						'</div>' +
	  						'<div class="row-fluid margin-top-15">' +
	  							'<div class="span12 bordered relative">' +
	  								'<h2 class="margin-0 text-center">' + getNullValue(data.安全起重量) + '</h2>' +
	  								'<span class="unit2">安全起重量</span>' +
	  								'<span class="unit3"><i class="fa fa-chain"></i></span>' +
	  								'<span class="unit4">t</span>' +
	  							'</div>' +
	  						'</div>' +
	  						'<div class="row-fluid margin-top-15">' +
	  							'<div class="span12 bordered relative">' +
	  								'<h2 class="margin-0 text-center">' + getNullValue(data.安全力矩) + '</h2>' +
	  								'<span class="unit2">安全力矩</span>' +
	  								'<span class="unit3"><i class="fa fa-arrows-h"></i></span>' +
	  								'<span class="unit4">m</span>' +
	  							'</div>' +
	  						'</div>' +
	  					'</div>' +
	  				'</div>' +
	  				'<div class="row-fluid margin-top-15">' +
	  					'<div class="span2-5 bordered min-bottom">' +
	  						'<h2>力矩百分比</h2>' +
	  						'<h2 class="color-yellow text-center">' + getNullValue(data.力矩百分比) + '</h2>' +
	  						'<div class="height-blank"></div>' +
	  						'<div class="progress progress-success">' +
								'<div style="width: ' + data.力矩百分比 + ';" class="bar"></div>' +
							'</div>' +
	  					'</div>' +
	  					'<div class="span2-5 bordered min-bottom">' +
	  						'<h2>' +
	  							'<i class="fa fa-cogs width-50 color-green"></i>风级<span class="blank-20"></span>' + getNullValue(data.风级) +
 	  							'<span class="blank-20"></span><span class="color-green">级</span>' +
	  						'</h2>' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<span class="blank-20"></span>' +
	  							'<span class="blank-20"></span>' +
	  							'风速<span class="blank-20"></span>' + getNullValue(data.风速) +
	  							'<span class="blank-20"></span>' +
	  							'<span class="color-green">m/s</span>' +
	  						'</h2>' +
	  						'<div class="height-blank"></div>' +
	  			 			'<div class="progress progress-success">' +
								'<div style="width: ' + data.风速 + '%;" class="bar"></div>' +
							'</div>' +
	  					'</div>' +
	  					'<div class="span2-5 bordered min-bottom relative">' +
	  						'<h2 class="margin-5">幅度</h2>' +
	  						'<div class="height-blank"></div>' +
	  						'<h1 class="color-yellow text-center" style="font-size: 75px;">' + getNullValue(data.幅度) + '</h1>' +
	  						'<span class="unit" style="color: #73fb11; font-size: 30px;">m</span>' +
	  					'</div>' +	
	  					'<div class="span2-5 bordered min-bottom relative">' +
	  						'<h2 class="margin-5">重量</h2>' +
	  						'<div class="height-blank"></div>' +
	  						'<h1 class="color-yellow text-center margin-5" style="font-size: 75px;">' + getNullValue(data.重量) + '</h1>' +
	  						'<span class="unit" style="color: #73fb11; font-size: 30px;">t</span>' +
	  					'</div>' +
	  					'<div class="span2-5 bordered min-bottom relative">' +
	  						'<h2 class="margin-5">多X防碰撞报警<span class="blank-20"></span><i class="fa fa-circle width-50 ' + (data.多机防碰撞报警 == 'T' ? 'color-green' : 'color-red') + '"></i></h2>' +
	  						'<h2 class="margin-5"><i class="fa fa-circle width-50 ' + (data.前进 == 'T' ? 'color-green' : 'color-red') + '"></i>前进<span class="blank-20"></span><i class="fa fa-circle width-50 ' + (data.后退 == 'T' ? 'color-green' : 'color-red') + '"></i>后退</h2>' +
	  						'<h2 class="margin-5"><i class="fa fa-circle width-50 ' + (data.左转 == 'T' ? 'color-green' : 'color-red') + '"></i>左转<span class="blank-20"></span><i class="fa fa-circle width-50 ' + (data.右转 == 'T' ? 'color-green' : 'color-red') + '"></i>右转</h2>' +
	  					'</div>' +
	  				'</div>' +
	  				'<div class="row-fluid margin-top-15">' +
	  					'<div class="span2 bordered padding-10">' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.风速 == 'T' ? 'color-green' : 'color-red') + '"></i>风速' +
	  							'<i class="fa fa-circle ' + (data.吊重 == 'T' ? 'color-green' : 'color-red') + '"></i>吊重' +
	  						'</h2>' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.力矩 == 'T' ? 'color-green' : 'color-red') + '"></i>力矩' +
	  							'<i class="fa fa-circle ' + (data.倾斜 == 'T' ? 'color-green' : 'color-red') + '"></i>倾斜' +
	  						'</h2>' +
	  					'</div>' +
	  					'<div class="span2 bordered padding-10">' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.小车内眼位 == 'T' ? 'color-green' : 'color-red') + '"></i>小车内眼位' +
	  						'</h2>' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.小车外眼位 == 'T' ? 'color-green' : 'color-red') + '"></i>小车外眼位' +
	  						'</h2>' +
	  					'</div>' +
	  					'<div class="span2 bordered padding-10">' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.上升限位 == 'T' ? 'color-green' : 'color-red') + '"></i>上升限位' +
	  						'</h2>' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.下降限位 == 'T' ? 'color-green' : 'color-red') + '"></i>下降限位' +
	  						'</h2>' +
	  					'</div>' +
	  					'<div class="span2 bordered padding-10 ">' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.左转限位 == 'T' ? 'color-green' : 'color-red') + '"></i>左转限位' +
	  						'</h2>' +
	  						'<h2 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.右转限位 == 'T' ? 'color-green' : 'color-red') + '"></i>右转限位' +
	  						'</h2>' +
	  					'</div>' +
	  					'<div class="span2 bordered padding-10">' +
	  						'<h3 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.前进进入禁止区域 == 'T' ? 'color-green' : 'color-red') + '"></i>前进进入禁止区域' +
	  						'</h3>' +
	  						'<h3 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.后退进入禁止区域 == 'T' ? 'color-green' : 'color-red') + '"></i>后退进入禁止区域' +
	  						'</h3>' +
	  					'</div>' +
	  					'<div class="span2 bordered padding-10">' +
	  						'<h3 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.左转进入禁止区域 == 'T' ? 'color-green' : 'color-red') + '"></i>左转进入禁止区域' +
	  						'</h3>' +
	  						'<h3 style="margin-left: 10px;">' +
	  							'<i class="fa fa-circle ' + (data.右转进入禁止区域 == 'T' ? 'color-green' : 'color-red') + '"></i>右转进入禁止区域' +
	  						'</h3>' +
	  					'</div>' +
	  				'</div>';
			$('#drawContent').html(row);
			var myChart = echarts.init(document.getElementById('ta'));
		  	myChart.setOption( {
		  	    tooltip : {
		  	        formatter: "{a} <br/>{b} : {c}%"
		  	    },
		  	    toolbox: {
		  	        show : false,
		  	        feature : {
		  	            mark : {show: true},
		  	            restore : {show: true},
		  	            saveAsImage : {show: true}
		  	        }
		  	    },
		  	    series : [
		  	        {
		  	            name:'角度',
		  	            type:'gauge',
		  	            startAngle: 180,
		  	            endAngle: -180,
		  	            min: 0,
		  	            max: 360,
		  	            splitNumber: 10,
		  	            detail : {formatter:'{value}'},
		  	            data:[{value: getNullValue(data.角度), name: ''}]
		  	        }
		  	    ]
		  	});
		}
	}});
}
function getNullValue(str) {
	if (str == '')
		return '暂无数据';
	else if (str == null)
		return '暂无数据';
	else if (typeof str == 'undefined')
		return '暂无数据';
	else if (str == 'undefined')
		return '暂无数据';
	else 
		return str;
}