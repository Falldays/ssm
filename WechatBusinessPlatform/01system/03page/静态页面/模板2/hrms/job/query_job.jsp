<%--
  Created by IntelliJ IDEA.
  User: luliujun
  Date: 2018/10/23
  Time: 9:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>职位管理-职位查询</title>
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../res/bootstrap/css/bootstrap-theme.min.css" type="text/css" />
    <script type="text/javascript" src="../res/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript" src="../res/bootstrap/js/bootstrap.min.js"></script>
</head>

<body>
<ol class="breadcrumb">
    <li>当前位置:职位查询</li>
</ol>
<div class="container-fluid" style="padding-left: 0px;">
    <div class="well">
        <form action="${pageContext.request.contextPath}/job/query_job" method="post">
            <div class="form-group" style="width: 100%">
                <div class="row">
                    <div class="col-sm-1" style="text-align:left;line-height: 32px;">
                        <span>关键字:</span>
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
                <span>职位名称</span>
            </th>
            <th>
                <span>职位编号</span>
            </th>
            <th>
                <span>所属部门</span>
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
            <c:when test="${null==jobMaps}">
                <tr>
                    <td colspan="5" align="center" style="color:#FF0000">您未执行查询</td>
                </tr>
            </c:when>
            <c:when test="${empty jobMaps}">
                <tr>
                    <td colspan="5" align="center" style="color:#FF0000">未查询到任何职位数据</td>
                </tr>
            </c:when>
             <c:otherwise>
                 <c:forEach  items="${jobMaps}" var="jobMap">
                     <tr>
                         <td>${jobMap.job_name}</td>
                         <td>${jobMap.job_no}</td>
                         <td>${jobMap.dep_name}</td>
                         <td>${1==jobMap.use_state?"使用中":"已停用"}</td>
                         <td>
                             <a>停用</a>
                             <a href="${pageContext.request.contextPath}/job/delete_job?job_id=${jobMap.job_id}">删除</a>
                             <a href="${pageContext.request.contextPath}/job/update_job.jsp?job_id=${jobMap.job_id}">修改</a>
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
