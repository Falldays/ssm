package com.qst.ssm.dao;

import com.qst.ssm.entity.Emp;

import java.util.List;

public interface IEmpDao {
    /**
     * 查询所有员工
     *
     * @return
     */
    List<Emp> queryEmp();

    /**
     * 根据员工ID加载员工信息
     * @param empId
     * @return
     */
    Emp getEmp(int empId);
    /**
     * 添加员工
     *
     * @param emp
     * @return
     */
    int insertEmp(Emp emp);

    /**
     * 根据员工ID删除员工记录
     *
     * @param empId
     * @return
     */
    int deleteEmp(int empId);

    /**修改部门
     * @param emp
     * @return
     */
    int updateEmp(Emp emp);

}
