package com.qst.ssm.mapper;

import com.qst.ssm.entity.Emp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 员工表增、删、改、查Mapper接口
 */
public interface EmpMapper {
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
    Emp getEmp(@Param("emp_id") int empId);

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
    int deleteEmp(@Param("emp_id") int empId);

    /**
     * 修改部门
     *
     * @param emp
     * @return
     */
    int updateEmp(Emp emp);


}
