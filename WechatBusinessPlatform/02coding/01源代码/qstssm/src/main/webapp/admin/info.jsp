<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 19:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<<<<<<< HEAD
    <title>Title</title>
</head>
<body>

=======
    <title>管理员详细信息</title>
</head>
<body>
<c:choose>
    <c:when test="${empty requestScope.admin}">
        <span style="color: #FF0000">该管理员不存在</span>
    </c:when>
    <c:otherwise>
        <ul style="list-style: none">
            <li><b>管理员姓名:</b>${requestScope.admin.adminName}</li>
            <li><b>管理员编号:</b>${requestScope.admin.adminNo}</li>
            <li><b>管理员性别:</b>${1==requestScope.admin.sex?'男':'女'}</li>
            <li><b>手机号码:</b>${requestScope.admin.mobile}</li>
        </ul>
    </c:otherwise>
</c:choose>
>>>>>>> bf47d06188e5c4bc869d5e7207a28d2b5417ed75
</body>
</html>
