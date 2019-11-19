<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2019/10/9
  Time: 16:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>员工查询</title>
</head>
<body>
<div>
    <table width="600" border="1" cellspacing="0">
        <tr>
            <th>员工编号</th>
            <th>员工姓名</th>
            <th>手机号码</th>
            <th>性别</th>
            <th>出生日期</th>
            <th>籍贯</th>
            <th>操作1</th>
        </tr>
        <c:choose>
            <c:when test="${ empty requestScope.empList}">
                <tr>
                    <td colspan="7" align="center"><span style="color: #0000FF">未查询到数据</span></td>
                </tr>
            </c:when>
            <c:otherwise>
                <c:forEach items="${requestScope.empList}" var="emp">
                    <tr>
                        <td>${emp.empNo}</td>
                        <td>${emp.empName}</td>
                        <td>${emp.mobile}</td>
                        <td>${1==emp.sex?'男':'女'}</td>
                        <!-- 利用格式化标签输出出生日期-->
                        <td><fmt:formatDate value="${emp.birthday}" pattern="yyyy-MM-dd"/></td>
                        <td>${emp.homeplace}</td>
                        <td>
                            <a href="#" onclick="deleteEmp(${emp.empId},'${emp.empName}')">删除</a>
                            <a href="/emp/update_emp.jsp?emp_id=${emp.empId}" target="_blank">修改</a>
                            <a href="/emp/info?emp_id=${emp.empId}" target="_blank">详情</a>
                        </td>
                    </tr>
                </c:forEach>
            </c:otherwise>
        </c:choose>
        <script>
            /**
             * 根据员工ID删除员工信息
             * @param empId
             * @param empName
             */
            function deleteEmp(empId, empName) {
                if (window.confirm('确定要删除【' + empName + '】吗?')) {
                    window.location.href = '/emp/delete?emp_id=' + empId;
                }
            }

        </script>
    </table>
    共查询到:<span style="color: #1f33ff">${fn:length(requestScope.empList)}</span>条记录
</div>
</body>
</html>