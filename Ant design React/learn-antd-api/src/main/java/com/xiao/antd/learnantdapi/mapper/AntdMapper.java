package com.xiao.antd.learnantdapi.mapper;

import com.xiao.antd.learnantdapi.pojo.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface AntdMapper {
    public List<Todo> getAllAntd();

    void addTodo(Todo todo);

    void delete(Long id);

    Long getCount();

    List<Todo> getCurrentTodos(@Param("start") Long start, @Param("pageSize") Long pageSize);

    void deleteByIds(List<Long> ids);
}
