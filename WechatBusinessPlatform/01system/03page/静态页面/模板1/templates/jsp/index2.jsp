<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <jsp:include page="${pageContext.request.contextPath}/templates/include/top.jsp"/>
  <body style="background: #fff !important;">
  	<div class="container-fluid">
  		<div class="row-fluid">
  			<div class="span12" style="padding: 10px;"><img src="/templates/media/image/elevator.png" style="width: 59px; margin: 0 20px 20px 20px;">
  				<h1 style="display: inline-block;">塔吊</h1></div>
  			<div class="drawContent">
  				<div class="row-fluid">
  					<div class="span5 relative">
  						<div id="ta" style="height: 400px;"></div>
  						<span class="unit2">2016-11-02&nbsp;10:29:59</span>
  						<span class="unit5">回转</span>
  						<span class="unit6">360.00<sup>&deg;</sup></span>
  					</div>
  					<div class="span5 bordered">
  						<h2><i class="fa fa-anchor width-50 color-green"></i>设备编号<span class="blank"></span>LA00009</h2>
  						<img src="/templates/media/image/tower.png" style="height: 317px; margin-left: 20px;">
  						<h2><i class="fa fa-creative-commons width-50 color-green"></i>备案编号<span class="blank"></span>LA00009</h2>
  					</div>
  					<div class="span2" style="margin-left: 25px;">
  						<div class="row-fluid">
  							<div class="span12 bordered relative">
  								<h2 class="margin-0 text-center">2</h2>
  								<span class="unit2">倍率</span>
  								<span class="unit3"><i class="fa fa-cogs"></i></span>
  								<span class="unit4">倍</span>
  							</div>
  						</div>
  						<div class="row-fluid margin-top-15">
  							<div class="span12 bordered relative">
  								<h2 class="margin-0 text-center">2</h2>
  								<span class="unit2">高度</span>
  								<span class="unit3"><i class="fa fa-thumb-tack"></i></span>
  								<span class="unit4">m</span>
  							</div>
  						</div>
  						<div class="row-fluid margin-top-15">
  							<div class="span12 bordered relative">
  								<h2 class="margin-0 text-center">2</h2>
  								<span class="unit2">矩角</span>
  								<span class="unit3"><i class="fa fa-italic"></i></span>
  								<span class="unit4">&deg;</span>
  							</div>
  						</div>
  						<div class="row-fluid margin-top-15">
  							<div class="span12 bordered relative">
  								<h2 class="margin-0 text-center">2</h2>
  								<span class="unit2">安全起重量</span>
  								<span class="unit3"><i class="fa fa-chain"></i></span>
  								<span class="unit4">t</span>
  							</div>
  						</div>
  						<div class="row-fluid margin-top-15">
  							<div class="span12 bordered relative">
  								<h2 class="margin-0 text-center">2</h2>
  								<span class="unit2">安全力矩</span>
  								<span class="unit3"><i class="fa fa-arrows-h"></i></span>
  								<span class="unit4">m</span>
  							</div>
  						</div>
  					</div>
  				</div>
  				<div class="row-fluid margin-top-15">
  					<div class="span2-5 bordered min-bottom">
  						<h2>力矩百分比</h2>
  						<h2 class="color-yellow text-center">60.0%</h2>
  						<div class="height-blank"></div>
  						<div class="progress progress-success">
							<div style="width: 60%;" class="bar"></div>
						</div>
  					</div>
  					<div class="span2-5 bordered min-bottom">
  						<h2>
  							<i class="fa fa-cogs width-50 color-green"></i>风级<span class="blank-20"></span>0
  							<span class="blank-20"></span><span class="color-green">级</span>
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<span class="blank-20"></span>
  							<span class="blank-20"></span>
  							风速<span class="blank-20"></span>0.00
  							<span class="blank-20"></span>
  							<span class="color-green">m/s</span>
  						</h2>
  						<div class="height-blank"></div>
  			 			<div class="progress progress-success">
							<div style="width: 60%;" class="bar"></div>
						</div>
  					</div>
  					<div class="span2-5 bordered min-bottom relative">
  						<h2 class="margin-5">幅度</h2>
  						<div class="height-blank"></div>
  						<h1 class="color-yellow text-center" style="font-size: 75px;">21.10</h1>
  						<span class="unit" style="color: #73fb11; font-size: 30px;">m</span>
  					</div>	
  					<div class="span2-5 bordered min-bottom relative">
  						<h2 class="margin-5">重量</h2>
  						<div class="height-blank"></div>
  						<h1 class="color-yellow text-center margin-5" style="font-size: 75px;">0.00</h1>
  						<span class="unit" style="color: #73fb11; font-size: 30px;">t</span>
  					</div>
  					<div class="span2-5 bordered min-bottom relative">
  						<h2 class="margin-5">多X防碰撞报警<span class="blank-20"></span><i class="fa fa-circle width-50"></i></h2>
  						<h2 class="margin-5"><i class="fa fa-circle"></i>前进<span class="blank-20"></span><i class="fa fa-circle width-50"></i>后退</h2>
  						<h2 class="margin-5"><i class="fa fa-circle"></i>左转<span class="blank-20"></span><i class="fa fa-circle width-50"></i>右转</h2>
  					</div>
  				</div>
  				<div class="row-fluid margin-top-15">
  					<div class="span2 bordered padding-10">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  					<div class="span2 bordered padding-10">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  					<div class="span2 bordered padding-10">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  					<div class="span2 bordered padding-10 ">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  					<div class="span2 bordered padding-10">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  					<div class="span2 bordered padding-10">
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  						<h2 style="margin-left: 10px;">
  							<i class="fa fa-circle"></i>风速
  						</h2>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
  <jsp:include page="${pageContext.request.contextPath}/templates/include/bottom.jsp"/>
  <script>
  	var myChart = echarts.init(document.getElementById('ta'));
  	myChart.setOption({
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
  	            name:'业务指标',
  	            type:'gauge',
  	            detail : {formatter:'{value}%'},
  	            data:[{value: 50, name: '完成率'}]
  	        }
  	    ]
  	});
  	clearInterval(timeTicket);
  	timeTicket = setInterval(function (){
  	    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
  	    myChart.setOption(option, true);
  	},2000);
  </script>
</html>
