package com.qst.ssm.dao.impl;

import com.qst.ssm.dao.IClassificationDao;
import com.qst.ssm.entity.Classification;
import com.qst.ssm.entity.Three;
import com.qst.ssm.entity.Two;
import com.qst.ssm.mapper.ClassificationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 商品分类Dao接口实现类
 * author：lbs
 */
@Repository("classificationDao")
public class ClassificationDaoImpl implements IClassificationDao {

    @Autowired
    @Qualifier("classificationMapper")
    private ClassificationMapper classificationMapper;

    /**
     * 查询所有的一级分类信息
     * @return
     */
    @Override
    public List<Classification> queryClassification() {
        return classificationMapper.queryClassification();
    }

    /**
     * 根据一级分类ID查询所有二级分类信息
     * @return
     */
    @Override
    public List<Two> queryClassificationByTwo(Integer oneId) {
        return classificationMapper.queryClassificationByTwo(oneId);
    }

    /**
     * 根据二级分类ID查询所有三级分类信息
     * @return
     */
    @Override
    public List<Three> queryClassificationByThree(Integer twoId) {
        return classificationMapper.queryClassificationByThree(twoId);
    }

    /**
     * 查询所有商品分类信息
     * @return
     */
    @Override
    public List<Map> getClassification() {
        return classificationMapper.getClassification();
    }

    @Override
    public List<Map> getClassificationByType(Map<String,Object> map) {
        return classificationMapper.getClassificationByType(map);
    }

    /**
     * 添加一级商品分类
     * @param classification    一级商品分类信息
     * @return  影响行数
     */
    @Override
    public Integer addClassificationByOne(Classification classification) {
        return classificationMapper.addClassificationByOne(classification);
    }

    /**
     * 添加二级商品分类
     * @param two    二级商品分类信息
     * @return  影响行数
     */
    @Override
    public Integer addClassificationByTwo(Two two) {
        return classificationMapper.addClassificationByTwo(two);
    }

    /**
     * 添加三级商品分类
     * @param three    三级商品分类信息
     * @return  影响行数
     */
    @Override
    public Integer addClassificationByThree(Three three) {
        return classificationMapper.addClassificationByThree(three);
    }

    /**
     * 根据一级分类id删除该一级分类
     * @param oneId 一级分类ID
     * @return 影响行数
     */
    @Override
    public Integer deleteClassificationByOne(Integer oneId) {
        return classificationMapper.deleteClassificationByOne(oneId);
    }

    /**
     * 根据二级分类id删除该二级分类
     * @param twoId 二级分类ID
     * @return 影响行数
     */
    @Override
    public Integer deleteClassificationByTwo(Integer twoId) {
        return classificationMapper.deleteClassificationByTwo(twoId);
    }

    /**
     * 根据三级分类id删除该三级分类
     * @param threeId 三级分类ID
     * @return 影响行数
     */
    @Override
    public Integer deleteClassificationByThree(Integer threeId) {
        return classificationMapper.deleteClassificationByThree(threeId);
    }


}
