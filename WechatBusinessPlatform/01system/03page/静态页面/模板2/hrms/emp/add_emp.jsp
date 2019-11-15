<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2018/10/23
  Time: 21:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>员工管理-添加员工</title>
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../res/bootstrap/datetimepicker/css/bootstrap-datetimepicker.min.css" type="text/css" />
    <link rel="stylesheet" href="../res/My97DatePicker/skin/WdatePicker.css" />
    <script type="text/javascript" src="../res/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/datetimepicker/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script type="text/javascript" src="../res/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript">
        $(function(){
            //异步加载部门数据
            $.ajax({
                url:"${pageContext.request.contextPath}/emp/load_dep_data",//ajax请求的路径
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
        /**
         * 加载某部门所有职位
         * @param depId
         */
        function loadDepJobs(depId)
        {
            $("#job_select").empty();
            $("#job_select").append(" <option value='0'>---选择岗位---</option>");
            if(0==depId)
            {
                return;
            }
            $.ajax({
                url:"${pageContext.request.contextPath}/emp/load_job_data",//ajax请求的路径
                type:"post",//请求提交方式
                data:"dep_id="+depId,
                dataType:"json",//设置服务器返回的数据类型
                success:function(jsonData)
                {
                    var length=jsonData.length;
                    if(0==length)
                    {
                        alert("未加载到任何职位信息!");
                        return;
                    }
                    for(var index=0;index<length;index++)
                    {
                        var job=jsonData[index];//获取一个职位JSON数据对象
                        var jobName=job.job_name;//职位名称
                        var jobId=job.job_id;//职位ID
                        var optionHTML="<option value='"+jobId+"'>"+jobName+"</option>";
                        $("#job_select").append(optionHTML);
                    }

                },//访问成功
                error:function()
                {
                    alert("加载部门数据失败!");
                }//访问失败

            });
        }
    </script>
</head>

<body>
<ol class="breadcrumb">
    <li>当前位置:添加员工</li>
</ol>
<div id="alertMessage">
</div>
<div id="scrollContent" style="width: 99%">
    <form action="${pageContext.request.contextPath}/emp/add_emp" method="post">
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">员工姓名</label>
                <div class="col-sm-3">
                    <input id="empName" class="form-control" type="text" name="name" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">员工编号</label>
                <div class="col-sm-3">
                    <input id="empNo" class="form-control" type="text" name="emp_no" />
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
                    <select name="dep_id" class="form-control" id="dep_select" onchange="loadDepJobs(this.value)">
                        <option value="0">---选择部门---</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">岗位</label>
                <div class="col-sm-3">
                    <select name="job_id"  id="job_select" class="form-control" >
                        <option value="0">---选择岗位---</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">性别</label>
                <div class="col-sm-3">
                    <label><input   type="radio"  name="sex" value="1"  checked="checked"/>男</label>&nbsp;&nbsp;
                    <label><input   type="radio"  name="sex" value="2"  />女</label>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">手机号码</label>
                <div class="col-sm-3">
                    <input id="mobile" class="form-control" type="text" name="mobile" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">电子邮件</label>
                <div class="col-sm-3">
                    <input id="email" class="form-control" type="text" name="email" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">身份证号码</label>
                <div class="col-sm-3">
                    <input id="idcard" class="form-control" type="text" name="idcard" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">出生日期</label>
                <!--<div class="col-md-3 input-group date form_datetime">
                    <input class="form-control col-sm-2" name="birthday" size="10" type="text" value="" readonly>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>-->
                <div class="col-sm-3">
                    <input id="birthday" class="Wdate form-control" style="height:32px" type="text" name="birthday" readonly="" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">岗位角色</label>
                <div class="col-sm-3">
                    <select name="role" class="form-control">
                        <option  value="0">---选择岗位角色---</option>
                        <option  value="1">高层领导</option>
                        <option  value="2">部门经理</option>
                        <option  value="3">普通员工</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">在职状态</label>
                <div class="col-sm-3">
                    <select name="emp_type" class="form-control">
                        <option value="0">---选择在职状态---</option>
                        <option value="1">已转正</option>
                        <option value="2">试用期</option>
                        <option value="3">已离职</option>
                        <option value="4">实习期</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">入职日期</label>
                <div class="col-sm-3">
                    <input class="Wdate form-control" type="text" style="height:32px" readonly="" onclick="WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd'})" name="hiredate" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">薪水</label>
                <div class="col-sm-3">
                    <input id="salary" class="form-control" type="text" name="salary" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">籍贯</label>
                <div class="col-sm-3">
                    <input id="homeplace" class="form-control" type="text" name="homeplace" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <label class="control-label col-md-2" style="text-align: right;">地址</label>
                <div class="col-sm-6">
                    <input id="address" class="form-control" type="text" name="address" />
                </div>
                <div class="col-sm-1">
                    <span style="color:rgb(255,0,0)">*</span>
                </div>
            </div>
        </div>
    </form>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submit_button" onclick="$('form').first().submit()"><span>添加员工</span></button>
    </div>
</div>

</body>

</html>
