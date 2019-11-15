<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2018/10/22
  Time: 18:43
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>职位管理-添加职位</title>
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap.min.css" type="text/css" />
    <script type="text/javascript" src="../res/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(function(){
            //异步加载部门数据
            $.ajax({
              url:"${pageContext.request.contextPath}/job/load_dep_data",//ajax请求的路径
              type:"post",//请求提交方式
              dataType:"json",//设置服务器返回的数据类型
              success:function(jsonData)
              {
                  var length=jsonData.length;
                  for(var index=0;index<length;index++)
                  {
                      var dep=jsonData[index];//获取一个部门JSON数据对象
                      var depName=dep.depName;//部门名称
                      var depId=dep.depId;//部门ID
                      var optionHTML="<option value='"+depId+"'>"+depName+"</option>";
                      $("#dep_select").append(optionHTML);
                  }

              },//访问成功
              error:function()
              {
                  alert("加载部门数据失败!");
              }//访问失败

            });


        });
    </script>
</head>

<body>
<ol class="breadcrumb">
    <li>当前位置:添加职位</li>
</ol>
<div id="alertMessage">
</div>
<div id="scrollContent" style="width: 99%">
    <form action="${pageContext.request.contextPath}/job/add_job" method="post">
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">职位名称</label>
                <div class="col-sm-3">
                    <input  class="form-control" type="text" name="job_name" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">所属部门</label>
                <div class="col-sm-3">
                   <select id="dep_select" name="dep_id" class="form-control">
                   </select>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">职位编号</label>
                <div class="col-sm-3">
                    <input  class="form-control" type="text" name="job_no" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">使用状态</label>
                <div class="col-sm-3">
                    <label><input   type="radio"  name="use_state" value="1"  checked="checked"/>使用</label>&nbsp;&nbsp;
                    <label><input   type="radio"  name="use_state" value="0"  />停用</label>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group" id="positionId">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">备注</label>
                <div class="col-sm-5">
                    <textarea name="remark" class="form-control" id="remark" rows="5" maxlength="2000"></textarea>
                </div>
                <div class="col-sm-1">
                </div>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submit_button" onclick="$('form').first().submit()"><span>添加职位</span></button>
    </div>
</div>
</body>

</html>
