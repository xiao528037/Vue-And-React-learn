package com.xiao.antd.learnantdapi.pojo.base;

import lombok.Data;

@Data
public class Pagination {
    private Boolean showTitle = false;
    private Boolean showSizeChanger = false;
    private Long total;
    private Long totalPage;
    private Long current = 1L;
    private Long pageSize = 10L;
    private boolean showQuickJumper = true;
}
