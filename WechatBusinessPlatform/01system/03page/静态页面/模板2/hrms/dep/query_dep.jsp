<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2018/10/19
  Time: 19:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>部门管理-部门查询</title>
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap-theme.min.css" type="text/css" />
    <script type="text/javascript" src="../res/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/js/bootstrap.min.js"></script>
</head>

<body>
<ol class="breadcrumb">
    <li>当前位置:部门查询</li>
</ol>
<div class="container-fluid" style="padding-left: 0px;">
    <div class="well">
        <form action="${pageContext.request.contextPath}/query_dep" method="post">
            <div class="form-group" style="width: 100%">
                <div class="row">
                    <div class="col-sm-1 text-right" >
                        <span>关键字</span>
                    </div>
                    <div class="col-sm-2">
                        <input id="keyword" class="form-control" type="text" name="keyword" />
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" ><span>查询</span></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<div id="scrollContent" style="width: 99%">
    <table class="table table-hover table-striped table-bordered">
        <thead>
        <tr class="info">
            <th>
                <span>部门名称</span>
            </th>
            <th>
                <span>部门编号</span>
            </th>
            <th>
                <span>使用状态</span>
            </th>
            <th>
                <span>操作</span>
            </th>
        </tr>
        </thead>
        <tbody>
        <c:choose>
            <c:when test="${empty deps}" >
                <tr>
                    <td colspan="4" align="center">
                        <span>未查询到任何部门信息</span>
                    </td>
                </tr>
            </c:when>
            <c:otherwise>
                <c:forEach items="${deps}" var="dep">
                    <tr>
                        <td>${dep.depName}</td>
                        <td>${dep.depNo}</td>
                        <td>${1==dep.useState?"使用中":"已停用"}</td>
                        <td>
                            <a>停用</a>
                            <a href="${pageContext.request.contextPath}/delete_dep?depId=${dep.depId}">删除</a>
                            <a href="${pageContext.request.contextPath}/get_dep?depId=${dep.depId}">修改</a>
                        </td>
                    </tr>
                </c:forEach>
            </c:otherwise>
        </c:choose>
        </tbody>
    </table>
</div>

</body>

</html>
