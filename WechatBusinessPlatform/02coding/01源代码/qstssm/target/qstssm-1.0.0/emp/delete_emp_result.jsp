<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2019/10/10
  Time: 9:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>删除结果页面</title>
</head>
<body>
<c:choose>
    <c:when test="${1==param.rows}">
        <span style="color:rgb(0,0,255)">删除成功</span>
    </c:when>
    <c:when test="${0==param.rows}">
        <span style="color:rgb(5,27,63)">员工不存在或已被删除</span>
    </c:when>
    <c:when test="${-1==param.rows}">
        <span style="color:rgb(255,0,0)">服务器异常</span>
    </c:when>
    <c:otherwise>
        <span style="color:rgb(193,193,193)">服务器返回未知状态</span>
    </c:otherwise>
</c:choose>
<a href="/emp/query">返回查询页面</a>
</body>
</html>
