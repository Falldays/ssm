package com.qst.ssm.dao;

import com.qst.ssm.entity.User;

import java.util.List;

public interface IUserDao {
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
}
