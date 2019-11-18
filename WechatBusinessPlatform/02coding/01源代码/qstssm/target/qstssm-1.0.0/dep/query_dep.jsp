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
<html>
<head>
    <title>员工查询</title>
</head>
<body>
<div>
    <h3>员工查询</h3>
    <form action="/emp/query_by_keword" method="post">
        关键字:<input type="text" name="keyword" value="${param.keyword}"><input type="submit" value="查询"/>
    </form>
</div>
<div>
    <c:if test="${requestScope.empList != null}">
        <table width="600" border="1" cellspacing="0">
            <tr>
                <th>员工编号</th>
                <th>员工姓名</th>
                <th>手机号码</th>
                <th>性别</th>
                <th>出生日期</th>
                <th>籍贯</th>
                <th>操作</th>
            </tr>
            <c:choose>
                <c:when test="${requestScope.empList=='exp'}">
                    <tr>
                        <td colspan="7" align="center"><span style="color: #FF0000">查询员工发生异常</span></td>
                    </tr>
                </c:when>
                <c:when test="${ empty requestScope.empList}">
                    <tr>
                        <td colspan="7" align="center"><span style="color: #0000FF">未查询到数据</span></td>
                    </tr>
                </c:when>
                <c:otherwise>
                    <c:forEach items="${requestScope.empList}" var="emp">
                        <c:choose>
                            <c:when test="${not empty param.keyword}">
                                <tr>
                                    <!--如果填写了关键字,给关键字加上红颜色背景-->
                                    <td>${fn:replace(emp.empNo,param.keyword ,'<span style="background: #FF0000">'+=param.keyword+='</span>' )}</td>
                                    <td>${fn:replace(emp.empName,param.keyword ,'<span style="background: #FF0000">'+=param.keyword+='</span>' )}</td>
                                    <td>${fn:replace(emp.mobile,param.keyword ,'<span style="background: #FF0000">'+=param.keyword+='</span>' )}</td>
                                    <td>${1==emp.sex?'男':'女'}</td>
                                    <td>${emp.birthday}</td>
                                    <td>${fn:replace(emp.homeplace,param.keyword ,'<span style="background: #FF0000">'+=param.keyword+='</span>' )}</td>
                                    <td>
                                            <%-- <a href="/emp/delete?emp_id=${emp.empId}">删除</a>--%>
                                        <a href="#" onclick="deleteEmp(${emp.empId},'${emp.empName}')">删除</a>
                                        <a href="/emp/update_init?emp_id=${emp.empId}">修改</a>
                                        <a href="/emp/info?emp_id=${emp.empId}" target="_blank">详情</a>
                                    </td>
                                </tr>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td>${emp.empNo}</td>
                                    <td>${emp.empName}</td>
                                    <td>${emp.mobile}</td>
                                    <td>${1==emp.sex?'男':'女'}</td>
                                    <td>${emp.birthday}</td>
                                    <td>${emp.homeplace}</td>
                                    <td>
                                        <a href="#" onclick="deleteEmp(${emp.empId},'${emp.empName}')">删除</a>
                                        <a href="/emp/update_init?emp_id=${emp.empId}">修改</a>
                                        <a href="/emp/info?emp_id=${emp.empId}" target="_blank">详情</a>
                                    </td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
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
                </c:otherwise>
            </c:choose>
        </table>
        共查询到:<span style="color: #1f33ff">${fn:length(requestScope.empList)}</span>条记录
    </c:if>
</div>
</body>
</html>
