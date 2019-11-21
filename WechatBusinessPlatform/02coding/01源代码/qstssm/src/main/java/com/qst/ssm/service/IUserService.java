package com.qst.ssm.service;

import com.qst.ssm.entity.User;

import java.util.List;

/***
 * 用户业务层接口
 */
public interface IUserService {
    /**
     * 查询所有用户
     *
     * @return
     */
    List<User> queryUser();

    /**
     * 根据用户ID加载用户信息
     * @param userId
     * @return
     */
    User getUser(int userId);
    /**
     * 添加用户
     *
     * @param user
     * @return
     */
    int insertUser(User user);

    /**
     * 根据用户ID删除用户记录
     *
     * @param userId
     * @return
     */
    int deleteUser(int userId);

    /**修改用户
     * @param user
     * @return
     */
    int updateUser(User user);

    /**修改用户密码
     * @param userId
     * @return
     */
    int updatepassword(int userId);
}
