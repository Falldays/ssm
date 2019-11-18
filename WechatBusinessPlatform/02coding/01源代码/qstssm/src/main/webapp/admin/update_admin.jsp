<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 20:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>修改管理员信息</title>
</head>
<body>
<form action="/admin/update" method="post">
    <ul style="list-style: none">
        <li><h3>修改管理员</h3></li>
        <li>管理员编号:<input type="text" name="adminNo" required></li>
        <li>管理员姓名:<input type="text" name="adminName" required></li>
        <li>管理员性别:
            <label><input type="radio" name="sex" value="1"  ${1==admin.sex?"cheked":""} required>男</label>
            <label><input type="radio" name="sex" value="2" required>女</label>
        </li>
        <li>手机号码:<input type="tel" name="mobile" required></li>
        <li>
        <!-- 在页面隐藏员工ID-->
            <input type="hidden" name="empId" value="${param.admin_id}">
            <input type="submit" value="修改员工">&nbsp;&nbsp;
            <input type="reset" value="重新填写">
        </li>
    </ul>

</form>
</body>
</html>
