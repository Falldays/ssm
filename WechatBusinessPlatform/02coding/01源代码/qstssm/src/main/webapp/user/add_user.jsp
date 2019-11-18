<%--
  Created by IntelliJ IDEA.
  User: FanLiMing
  Date: 2019/11/17
  Time: 16:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>添加用户</title>
</head>
<body>
<form action="/user/add" method="post">
    <ul style="list-style: none">
        <li><h3>添加用户</h3></li>
        <li>用户编号:<input type="text" name="userNo" required></li>
        <li>用户姓名:<input type="text" name="userName" required></li>
        <li>用户昵称:<input type="text" name="userNc" required></li>
        <li>用户性别:
            <label><input type="radio" name="sex" value="1" required>男</label>
            <label><input type="radio" name="sex" value="2" required>女</label>
        </li>
        <li>手机号码:<input type="tel" name="tel" required></li>
        <li>出生日期:<input type="date" name="birthday" required></li>
        <li>
                <input type="submit" value="添加用户">&nbsp;&nbsp;
                <input type="reset" value="重新填写">
        </li>
    </ul>

</form>

</body>
</html>
