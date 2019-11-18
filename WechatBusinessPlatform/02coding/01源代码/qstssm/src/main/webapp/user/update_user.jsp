<%--
  Created by IntelliJ IDEA.
  User: kiss
  Date: 2019/11/18
  Time: 20:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>修改用户信息</title>
    <script src="/js/jquery.min.js"></script>
    <script>
        $(function () {
            //利用jQuery AJAX加载用户数据和当用户数据
            $.ajax({
                url: '/user/load_one',//请求URL
                data: {user_id: '${param.user_id}'},//请求参数
                type: 'POST',//请求方式
                dataType: 'json', //将从服务器获取的数据处理成JSON格式
                success: function (data) {
                    //请求成功,data表示从服务获取的数据
                    console.info(data)
                    //获取员工数据
                    var user=data.user;
                    if($.isEmptyObject(user)){
                        alert("该用户不存在或已被删除");
                        $('input,select').attr('disabled',true);
                        return;
                    }
                    //设置员工数据
                    $('input[name="userNo"]').val(user.userNo);
                    $('input[name="userName"]').val(user.userName);
                    $('input[name="userNc"]').val(user.userNc);
                    $('input[name="sex"]').val(user.sex);
                    $('input[name="tel"]').val(user.tel);
                    $('input[name="birthday"]').val(user.birthday);
                    //选中性别单选框
                    $(':radio[name="sex"][value="'+user.sex+'"]').attr('checked',true);
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
<form action="/emp/update" method="post">
    <ul style="list-style: none">
        <li><h3>修改用户</h3></li>
        <li>用户编号:<input type="text" name="userNo" required></li>
        <li>用户姓名:<input type="text" name="userName" required></li>
        <li>用户昵称:<input type="text" name="userNc" required></li>
        <li>用户性别:
            <label><input type="radio" name="sex" value="1"  ${1==user.sex?"cheked":""}    required>男</label>
            <label><input type="radio" name="sex" value="2" required>女</label>
        </li>
        <li>手机号码:<input type="tel" name="tel" required></li>
        <li>出生日期:<input type="date" name="birthday" required></li>
            <!-- 在页面隐藏员工ID-->
            <input type="hidden" name="empId" value="${param.user_id}">
            <input type="submit" value="修改员工">&nbsp;&nbsp;
            <input type="reset" value="重新填写">
        </li>
    </ul>

</form>
</body>
</html>
