package com.qst.ssm.service.impl;

import com.qst.ssm.dao.IEmpDao;
import com.qst.ssm.entity.Emp;
import com.qst.ssm.service.IEmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("empService")
public class EmpServiceImpl implements IEmpService {
    @Autowired
    @Qualifier("empDao")
    private IEmpDao empDao;

    @Override
    @Transactional(propagation = Propagation.NEVER)
    public List<Emp> queryEmp() {
        return empDao.queryEmp();
    }

    @Override
    @Transactional(propagation = Propagation.NEVER)
    public Emp getEmp(int empId) {
        return empDao.getEmp(empId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int insertEmp(Emp emp) {
        return empDao.insertEmp(emp);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int deleteEmp(int empId) {
        return empDao.deleteEmp(empId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,rollbackFor = Exception.class)
    public int updateEmp(Emp emp) {
        return empDao.updateEmp(emp);
    }
}
