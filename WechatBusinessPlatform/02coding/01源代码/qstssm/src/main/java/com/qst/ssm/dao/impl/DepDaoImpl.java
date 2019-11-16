package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IDepDao;
import com.qst.ssm.entity.Dep;
import com.qst.ssm.mapper.DepMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("depDao")
public class DepDaoImpl implements IDepDao {
    @Autowired
    @Qualifier("depMapper")
    private DepMapper depMapper;

    @Override
    public List<Dep> queryDep() {
        return depMapper.queryDep();
    }

    @Override
    public Dep getDep(int depId) {
        return depMapper.getDep(depId);
    }

    @Override
    public int insertDep(Dep dep) {
        return depMapper.insertDep(dep);
    }

    @Override
    public int deleteDep(int depId) {
        return depMapper.deleteDep(depId);
    }
}
