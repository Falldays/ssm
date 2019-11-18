<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 20:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>用户信息查询</title>
</head>
<body>
<div>
    <table width="600" border="1" cellspacing="0">
        <tr>
            <th>用户编号</th>
            <th>用户姓名</th>
            <th>用户昵称</th>
            <th>出生日期</th>
            <th>手机号码</th>
            <th>性别</th>
            <th>操作</th>
        </tr>
        <c:choose>
            <c:when test="${ empty requestScope.userList}">
                <tr>
                    <td colspan="7" align="center"><span style="color: #0000FF">未查询到数据</span></td>
                </tr>
            </c:when>
            <c:otherwise>
                <c:forEach items="${requestScope.userList}" var="user">
                    <tr>
                        <td>${user.userNo}</td>
                        <td>${user.userName}</td>
                        <td>${user.userNc}</td>
                        <!-- 利用格式化标签输出出生日期-->
                        <td><fmt:formatDate value="${user.birthday}" pattern="yyyy-MM-dd"/></td>
                        <td>${user.tel}</td>
                        <td>${1==user.sex?'男':'女'}</td>
                        <td>
                            <a href="#" onclick="deleteUser(${user.userId},'${user.userName}')">删除</a>
                            <a href="/user/update_user.jsp?user_id=${admin.adminId}" target="_blank">修改</a>
                            <a href="/user/info?admin_id=${user.userId}" target="_blank">详情</a>
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
            function deleteUser(userId, userName) {
                if (window.confirm('确定要删除【' + userName + '】吗?')) {
                    window.location.href = '/user/delete?user_id=' + userId;
                }
            }

        </script>
    </table>
    共查询到:<span style="color: #1f33ff">${fn:length(requestScope.adminList)}</span>条记录
</div>
</body>
</html>
