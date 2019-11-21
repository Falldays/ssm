<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 20:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>修改管理员信息</title>
    <script src="/js/jquery.min.js"></script>
    <script>
        $(function () {
            //利用jQuery AJAX加载管理员数据和当前管理员数据
            $.ajax({
                url: '/admin/load_one',//请求URL
                data: {admin_id: '${param.admin_id}'},//请求参数
                type: 'POST',//请求方式
                dataType: 'json', //将从服务器获取的数据处理成JSON格式
                success: function (data) {
                    //请求成功,data表示从服务获取的数据
                    console.info(data)
                    //获取管理员数据
                    var admin=data.admin;
                    if($.isEmptyObject(admin)){
                        alert("该管理员不存在或已被删除");
                        $('input,select').attr('disabled',true);
                        return;
                    }
                    //设置管理员数据
                    $('input[name="adminNo"]').val(admin.adminNo);
                    $('input[name="adminName"]').val(admin.adminName);
                    $('input[name="sex"]').val(admin.adminNo);
                    $('input[name="mobile"]').val(admin.mobile);
                    //选中性别单选框
                    $(':radio[name="sex"][value="'+admin.sex+'"]').attr('checked',true);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // 请求失败
                    console.error(errorThrown);
                }
            });
        });
    </script>
</head>
<body>
<form action="/admin/update" method="post">
    <ul style="list-style: none">
        <li><h3>修改管理员</h3></li>
        <li>管理员编号:<input type="text" name="adminNo" required></li>
        <li>管理员姓名:<input type="text" name="adminName" required></li>
        <li>管理员性别:
            <label><input type="radio" name="sex" value="1"  ${1==admin.sex?"cheked":""} required>男</label>
            <label><input type="radio" name="sex" value="2" required>女</label>
        </li>
        <li>手机号码:<input type="tel" name="mobile" required></li>
        <li>
        <!-- 在页面隐藏员工ID-->
            <input type="hidden" name="adminId" value="${param.admin_id}">
            <input type="submit" value="修改管理员">&nbsp;&nbsp;
            <input type="reset" value="重新填写">
        </li>
    </ul>

</form>
</body>
</html>
