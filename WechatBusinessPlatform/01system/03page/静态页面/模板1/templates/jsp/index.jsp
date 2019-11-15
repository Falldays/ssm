<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <jsp:include page="${pageContext.request.contextPath}/templates/include/top.jsp"/>
  <style>
  	.bordered {
  	  padding: 30px 10px;
  	}
  </style>
  <body style="background: #fff !important;">
  	<div class="container-fluid">
  		<div class="row-fluid">
  			<div class="span12" style="padding: 10px;"><img src="/templates/media/image/elevator.png" style="width: 59px; margin: 0 20px 20px 20px;">
  				<h1 style="display: inline-block;">电梯</h1></div>
  			<div class="drawContent" style="padding: 50px 0px; margin-top: 120px;">
  				<div class="row-fluid">
  					<div class="span6 bordered">
	  					<h2 style="display: inline-block;"><i class="fa fa-clock-o"></i>2016-10-08&nbsp;15:26:59</h2>
	  				</div>
	  				<div class="span6 bordered">
	  					<h2 style="display: inline-block;">设备编号<span class="blank"></span>LA00009</h2>
	  				</div>
  				</div>
  				<div class="row-fluid margin-top-30">
  					<div class="span6 bordered">
	  					<div class="span6 padding-left-40 relative" style="border-right: 2px solid #eee;">
		  					<h2 style="display: inline-block;">重量<span class="blank"></span>0.050</h2>
		  					<span class="unit">kg</span>
		  				</div>
		  				<div class="span6 padding-left-40 relative">
		  					<h2 style="display: inline-block;">人数<span class="blank"></span>0</h2>
		  					<span class="unit">/人</span>
		  				</div>
	  				</div>
	  				<div class="span6 bordered relative">
	  					<h2 style="display: inline-block;">当前楼层<span class="blank"></span>0</h2>
	  					<span class="unit">/人</span>
	  				</div>
  				</div>
  				<div class="row-fluid margin-top-30">
	  				<div class="span6 bordered relative">
	  					<h2 style="display: inline-block;"><i class="fa fa-anchor"></i>高度<span class="blank"></span><span class="blank"></span>0.00</h2>
	  					<span class="unit">米</span>
	  				</div>
	  				<div class="span6 bordered relative">
	  					<h2><i class="fa fa-thumb-tack"></i>速度<span class="blank"></span><span class="blank"></span>0.00</h2>
	  					<span class="unit">m/s</span>
	  				</div>
  				</div>
  				<div class="row-fluid margin-top-30">
	  				<div class="span12 bordered" style="width: 98.5%;">
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span12 height-blank"></div>
	  					<div class="span3 padding-left-40" style="margin-left: 0px;">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  					<div class="span3 padding-left-40">
	  						<h2><i class="fa fa-circle"></i>超重报警</h2>
	  					</div>
	  				</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </body>
  <jsp:include page="${pageContext.request.contextPath}/templates/include/bottom.jsp"/>
</html>
