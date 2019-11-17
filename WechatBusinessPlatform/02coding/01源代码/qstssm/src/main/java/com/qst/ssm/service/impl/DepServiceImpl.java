package com.qst.ssm.service.impl;

import com.qst.ssm.dao.IDepDao;
import com.qst.ssm.entity.Dep;
import com.qst.ssm.service.IDepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("depService")
public class DepServiceImpl implements IDepService {
    @Autowired
    @Qualifier("depDao")
    private IDepDao depDao;

    @Override
    @Transactional(propagation = Propagation.NEVER )
    public List<Dep> queryDep() {
        return depDao.queryDep();
    }

    @Override
    @Transactional(propagation = Propagation.NEVER )
    public Dep getDep(int depId) {
        return depDao.getDep(depId);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int insertDep(Dep dep) {
        return depDao.insertDep(dep);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int deleteDep(int depId) {
        return depDao.deleteDep(depId);
    }
}
