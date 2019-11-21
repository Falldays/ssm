package com.qst.ssm.service;

import com.qst.ssm.entity.Admin;

import java.util.List;

/***
 * 管理员业务层接口
 */
public interface IAdminService {
    /**
     * 查询所有管理员
     *
     * @return
     */
    List<Admin> queryAdmin();

    /**
     * 根据管理员ID加载管理员信息
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
     * 根据管理员ID删除管理员记录
     *
     * @param adminId
     * @return
     */
    int deleteAdmin(int adminId);

    /**修改管理员
     * @param admin
     * @return
     */
    int updateAdmin(Admin admin);

    /**修改管理员密码
     * @param adminId
     * @return
     */
    int updatepass(int adminId);
}
