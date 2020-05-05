package com.xiao.antd.learnantdapi;

import com.xiao.antd.learnantdapi.pojo.Todo;
import com.xiao.antd.learnantdapi.service.AntService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
class LearnAntdApiApplicationTests {

    @Autowired
    private AntService service;

    @Test
    void contextLoads() {
        List<Todo> todos = service.initData(2l);
        System.out.println(todos);
    }

}
