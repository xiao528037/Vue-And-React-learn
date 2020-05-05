package com.xiao.antd.learnantdapi.pojo.base;

import lombok.Data;

import java.util.List;

@Data
public class RemovePage {
    private List<Long> selectedRowKeys;
    private Long current;
}
