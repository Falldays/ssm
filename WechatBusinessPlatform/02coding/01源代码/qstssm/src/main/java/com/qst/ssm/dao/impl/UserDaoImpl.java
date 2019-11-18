package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IUserDao;
import com.qst.ssm.entity.User;
import com.qst.ssm.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userDao")
public class UserDaoImpl implements IUserDao {
    @Autowired
    @Qualifier("userMapper")
    private UserMapper userMapper;

    @Override
    public List<User> queryUser() {
        return userMapper.queryUser();
    }

    @Override
    public User getUser(int userId) {
        return userMapper.getUser(userId);
    }

    @Override
    public int insertUser(User user) {
        return userMapper.insertUser(user);
    }

    @Override
    public int deleteUser(int userId) {
        return userMapper.deleteUser(userId);
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateUser(user);
    }
}
