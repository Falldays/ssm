<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2019/11/16
  Time: 10:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>员工详细信息</title>
</head>
<body>
 <c:choose>
     <c:when test="${empty requestScope.emp}">
          <span style="color: #FF0000">该员工不存在</span>
     </c:when>
     <c:otherwise>
         <ul style="list-style: none">
             <li><b>员工姓名:</b>${requestScope.emp.empName}</li>
             <li><b>员工编号:</b>${requestScope.emp.empNo}</li>
             <li><b>员工性别:</b>${1==requestScope.emp.sex?'男':'女'}</li>
         </ul>
     </c:otherwise>
 </c:choose>
</body>
</html>
