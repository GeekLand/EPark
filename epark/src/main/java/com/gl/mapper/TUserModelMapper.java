package com.gl.mapper;

import com.gl.model.TUserModel;
import com.gl.model.TUserModelExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TUserModelMapper {
    int countByExample(TUserModelExample example);

    int deleteByExample(TUserModelExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TUserModel record);

    int insertSelective(TUserModel record);

    List<TUserModel> selectByExample(TUserModelExample example);

    TUserModel selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TUserModel record, @Param("example") TUserModelExample example);

    int updateByExample(@Param("record") TUserModel record, @Param("example") TUserModelExample example);

    int updateByPrimaryKeySelective(TUserModel record);

    int updateByPrimaryKey(TUserModel record);
}