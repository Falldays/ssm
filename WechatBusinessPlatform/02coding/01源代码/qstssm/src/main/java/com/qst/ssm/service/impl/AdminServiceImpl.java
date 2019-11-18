package com.qst.ssm.service.impl;


import com.qst.ssm.dao.IAdminDao;
import com.qst.ssm.entity.Admin;
import com.qst.ssm.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("adminService")
public class AdminServiceImpl implements IAdminService{
    @Autowired
    @Qualifier("adminDao")
    private IAdminDao adminDao;

    @Override
    @Transactional(propagation = Propagation.NEVER )
    public List<Admin> queryAdmin() {
        return adminDao.queryAdmin();
    }

    @Override
    @Transactional(propagation = Propagation.NEVER )
    public Admin getAdmin(int adminId) {
        return adminDao.getAdmin(adminId) ;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int insertAdmin(Admin admin) {
        return adminDao.insertAdmin(admin);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int deleteAdmin(int adminId) {
        return adminDao.deleteAdmin(adminId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int updateAdmin(Admin admin) {
        return adminDao.updateAdmin(admin);
    }
}
