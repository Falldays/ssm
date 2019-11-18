package com.qst.ssm.mapper;

import com.qst.ssm.entity.Admin;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 管理员表增、删、改、查Mapper接口
 */
public interface AdminMapper {
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
    Admin getAdmin(@Param("admin_id") int adminId);

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
    int deleteAdmin(@Param("admin_id") int adminId);

    /**
     * 修改管理员
     *
     * @param admin
     * @return
     */
    int updateAdmin(Admin admin);

}
