<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 19:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>管理员信息查询</title>
</head>
<body>
<div>
    <table width="600" border="1" cellspacing="0">
        <tr>
            <th>管理员编号</th>
            <th>管理员姓名</th>
            <th>手机号码</th>
            <th>性别</th>
            <th>操作1</th>
        </tr>
        <c:choose>
            <c:when test="${ empty requestScope.adminList}">
                <tr>
                    <td colspan="7" align="center"><span style="color: #0000FF">未查询到数据</span></td>
                </tr>
            </c:when>
            <c:otherwise>
                <c:forEach items="${requestScope.adminList}" var="admin">
                    <tr>
                        <td>${admin.adminNo}</td>
                        <td>${admin.adminName}</td>
                        <td>${admin.mobile}</td>
                        <td>${1==admin.sex?'男':'女'}</td>
                        <td>
                            <a href="#" onclick="deleteAdmin(${admin.adminId},'${admin.adminName}')">删除</a>
                            <a href="/admin/update_admin.jsp?admin_id=${admin.adminId}" target="_blank">修改</a>
                            <a href="/admin/info?admin_id=${admin.adminId}" target="_blank">详情</a>
                        </td>
                    </tr>
                </c:forEach>
            </c:otherwise>
        </c:choose>
        <script>
            /**
             * 根据管理员ID删除管理员信息
             * @param adminId
             * @param adminName
             */
            function deleteAdmin(adminId, adminName) {
                if (window.confirm('确定要删除【' + adminName + '】吗?')) {
                    window.location.href = '/admin/delete?admin_id=' + adminId;
                }
            }

        </script>
    </table>
    共查询到:<span style="color: #1f33ff">${fn:length(requestScope.adminList)}</span>条记录
</div>
</body>
</html>
