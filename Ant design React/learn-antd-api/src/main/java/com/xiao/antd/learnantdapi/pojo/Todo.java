package com.xiao.antd.learnantdapi.pojo;

import com.xiao.antd.learnantdapi.pojo.base.Pagination;
import lombok.Data;

@Data
public class Todo extends Pagination {
    private Long id;
    private String title;
}
