package com.qst.ssm.mapper;

import com.qst.ssm.entity.Dep;

import java.util.List;

/**
 * 部门mapper接口
 */
public interface DepMapper {
    /**
     * 查询所有部门
     *
     * @return
     */
    List<Dep> queryDep();

    /**
     * 根据ID加载部门信息
     *
     * @param depId
     * @return
     */
    Dep getDep(int depId);

    /**
     * 添加部门
     *
     * @param dep
     * @return
     */
    int insertDep(Dep dep);

    /**
     * 根据部门ID删除部门
     * @param depId
     * @return
     */
    int deleteDep(int depId);
}
