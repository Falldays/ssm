package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IEmpDao;
import com.qst.ssm.entity.Emp;
import com.qst.ssm.mapper.EmpMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("empDao")
public class EmpDaoImpl implements IEmpDao {
    @Autowired
    @Qualifier("empMapper")
    private EmpMapper empMapper;

    @Override
    public List<Emp> queryEmp() {
        return empMapper.queryEmp();
    }

    @Override
    public int insertEmp(Emp emp) {
        return empMapper.insertEmp(emp);
    }

    @Override
    public int deleteEmp(int empId) {
        return empMapper.deleteEmp(empId);
    }

    @Override
    public int updateEmp(Emp emp) {
        return empMapper.updateEmp(emp);
    }

    @Override
    public Emp getEmp(int empId) {
        return empMapper.getEmp(empId);
    }
}
