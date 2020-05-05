package com.xiao.antd.learnantdapi.service.impl;

import com.xiao.antd.learnantdapi.mapper.AntdMapper;
import com.xiao.antd.learnantdapi.pojo.Todo;
import com.xiao.antd.learnantdapi.pojo.base.Pagination;
import com.xiao.antd.learnantdapi.pojo.base.RemovePage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AntServiceImpl implements com.xiao.antd.learnantdapi.service.AntService {

    @Autowired
    private AntdMapper antdMapper;

    @Override
    public List<Todo> getAllTodo() {
        return antdMapper.getAllAntd();
    }

    @Override
    public List<Todo> addTodo(Todo todo) {
        antdMapper.addTodo(todo);
        List<Todo> todos = initData(todo.getCurrent());
        return todos;
    }

    @Override
    public List<Todo> delete(Todo todo) {
        antdMapper.delete(todo.getId());
        //获取总条数
        Long total = antdMapper.getCount();
        List<Todo> todos = null;
        if (total % 10 == 0 && todo.getCurrent() > 1) {
            todos = initData(todo.getCurrent() - 1);
        } else {
            todos = initData(todo.getCurrent());
        }
        return todos;
    }

    @Override
    public List<Todo> initData(Long current) {
        Pagination pagination = new Pagination();
        //获取总条数
        Long total = antdMapper.getCount();
        //计算总页数
        Long pageSize = (long) pagination.getPageSize();
        Long totalPages = (total / pageSize) + 1;

        //计算起始值
        Long start = (current - 1) * pageSize;
        //获取当前页的数据
        List<Todo> todos = antdMapper.getCurrentTodos(start, pageSize);
        //判断是否为空,为空时不往下执行
        if (todos.isEmpty()) {
            return todos;
        }
        todos.get(0).setCurrent(current);
        todos.get(0).setTotalPage(totalPages);
        todos.get(0).setTotal(total);
        return todos;
    }

    @Override
    public List<Todo> deleteByIds(RemovePage removePage) {
        //        删除选中的数据
        antdMapper.deleteByIds(removePage.getSelectedRowKeys());
        List<Todo> todos = null;
        //获取总条数
        Long total = antdMapper.getCount();
        if (total % 10 == 0 && total > 0) {
            todos = initData(removePage.getCurrent() - 1);
        } else {
            todos = initData(removePage.getCurrent());
        }


        //
        return todos;
    }
}
