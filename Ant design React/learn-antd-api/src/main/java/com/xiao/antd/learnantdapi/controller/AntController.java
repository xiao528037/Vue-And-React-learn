package com.xiao.antd.learnantdapi.controller;

import com.xiao.antd.learnantdapi.pojo.Todo;
import com.xiao.antd.learnantdapi.pojo.base.Pagination;
import com.xiao.antd.learnantdapi.pojo.base.RemovePage;
import com.xiao.antd.learnantdapi.service.AntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class AntController {


    @Autowired
    private AntService service;

    @RequestMapping("/get")
    public List<Todo> getAllUser() {
        List<Todo> allTodo = service.getAllTodo();
        return allTodo;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public List<Todo> addTodo(@RequestBody Todo todo) {
        List<Todo> todos = null;
        try {
            todos = service.addTodo(todo);
        } catch (Exception e) {
            return todos;
        }
        return todos;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public List<Todo> deleteTodo(@RequestBody Todo todo) {
        List<Todo> todos = service.delete(todo);
        return todos;
    }

    @RequestMapping(value = "/pageTodos")
    public List<Todo> pageTodos(@RequestBody Todo todo) {
        System.out.println(todo);
        return null;
    }

    @RequestMapping(value = "/initData/{current}", method = RequestMethod.GET)
    public List<Todo> initData(@PathVariable(name = "current", required = false) Long current) {
        List<Todo> todos = service.initData(current);
        //判断数据是否为空,返回一个空的Todo
        if (todos.isEmpty()) {
            return null;
        }
        return todos;
    }

    @RequestMapping(value = "/deleteByIds", method = RequestMethod.POST)
    public List<Todo> deleteByIds(@RequestBody RemovePage removePage) {
        List<Todo> todos = service.deleteByIds((removePage));
        return todos;
    }
}
