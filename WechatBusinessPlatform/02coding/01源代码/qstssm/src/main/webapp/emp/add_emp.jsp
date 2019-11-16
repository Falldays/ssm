<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2019/9/25
  Time: 11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>添加员工</title>
   <script  src="/js/jquery.min.js"></script>
    <script>
        $(function(){
            //利用jQuery AJAX加载部门数据
            $.ajax({
                url:'/dep/load_data',//请求URL
                type:'POST',//请求方式
                dataType:'json', //将从服务器获取的数据处理成JSON格式
                success:function(data){
                    //请求成功,data表示从服务获取的数据
                    console.info(data)
                    var length=data.length;
                    if(0==length){
                      alert("未加载到部门数据");
                      return ;
                    }
                    var deps=data;
                    for(var index=0;index<length;index++){
                        var dep=deps[index];
                        var depId=dep.depId;//部门ID
                        var depName=dep.depName;//部门名称
                        var optionHTML='<option value="'+depId+'">'+depName+'</option>';
                        $("#dep-select").append(optionHTML);
                    }
                },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 请求失败
                   console.error(errorThrown);
                }
            });
        });
    </script>
</head>
<body>
<form action="/emp/add" method="post">
    <ul style="list-style: none">
        <li><h3>添加员工</h3></li>
        <li>员工编号:<input type="text" name="empNo" required></li>
        <li>员工姓名:<input type="text" name="empName" required></li>
        <li>员工性别:
            <label><input type="radio" name="sex" value="1" required>男</label>
            <label><input type="radio" name="sex" value="2" required>女</label>
        </li>
        <li>手机号码:<input type="tel" name="mobile" required></li>
        <li>出生日期:<input type="date" name="birthday" required></li>
        <li>薪水:<input type="number" name="salary" required></li>
        <li>籍贯:<input type="text" name="homeplace"></li>
        <li>所属部门:
            <select id="dep-select" name="depId" style="width: 120px"></select>
        <li>
            <c:if test="${ not empty requestScope.depList}">
                <input type="submit" value="添加员工">&nbsp;&nbsp;
                <input type="reset" value="重新填写">
            </c:if>
        </li>
    </ul>

</form>


</body>
</html>
