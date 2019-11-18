package com.qst.ssm.dao;

import com.qst.ssm.entity.Admin;

import java.util.List;

public interface IAdminDao {
    /**
     * 查询所有管理员
     *
     * @return
     */
    List<Admin> queryAdmin();

    /**
     * 根据ID加载管理员信息
     *
     * @param adminId
     * @return
     */
    Admin getAdmin(int adminId);

    /**
     * 添加管理员
     *
     * @param admin
     * @return
     */
    int insertAdmin(Admin admin);

    /**
     * 根据管理员ID删除管理员
     * @param adminId
     * @return
     */
    int deleteAdmin(int adminId);

    /**修改管理员
     * @param admin
     * @return
     */
    int updateAdmin(Admin admin);
}
