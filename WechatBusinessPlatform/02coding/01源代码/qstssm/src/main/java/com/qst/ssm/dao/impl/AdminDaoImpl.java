package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IAdminDao;
import com.qst.ssm.entity.Admin;
import com.qst.ssm.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("adminDao")
public class AdminDaoImpl implements IAdminDao {
    @Autowired
    @Qualifier("adminMapper")
    private AdminMapper adminMapper;

    @Override
    public List<Admin> queryAdmin() {
        return adminMapper.queryAdmin();
    }

    @Override
    public Admin getAdmin(int adminId) {
        return adminMapper.getAdmin(adminId);
    }

    @Override
    public int insertAdmin(Admin admin) {
        return adminMapper.insertAdmin(admin);
    }

    @Override
    public int deleteAdmin(int adminId) {
        return adminMapper.deleteAdmin(adminId);
    }

    @Override
    public int updateAdmin(Admin admin) {
        return adminMapper.updateAdmin(admin);
    }
}
