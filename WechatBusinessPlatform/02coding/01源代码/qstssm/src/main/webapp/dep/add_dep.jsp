<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2019/9/25
  Time: 11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>添加部门</title>

</head>
<body>
<form action="/dep/add" method="post">
    <ul style="list-style: none">
        <li><h3>添加部门</h3></li>
        <li>部门编号:<input type="text" name="depNo" required></li>
        <li>部门名称:<input type="text" name="depNname" required></li>
        <input type="submit" value="添加部门">&nbsp;&nbsp;
        <input type="reset" value="重新填写">
    </ul>

</form>


</body>
</html>
