package com.xiao.antd.learnantdapi.service;

import com.xiao.antd.learnantdapi.pojo.Todo;
import com.xiao.antd.learnantdapi.pojo.base.Pagination;
import com.xiao.antd.learnantdapi.pojo.base.RemovePage;

import java.util.List;

public interface AntService {
    public List<Todo> getAllTodo();

    public List<Todo> addTodo(Todo todo);

    List<Todo> delete(Todo todo);

    List<Todo> initData(Long current);

    List<Todo> deleteByIds(RemovePage removePage);
}
