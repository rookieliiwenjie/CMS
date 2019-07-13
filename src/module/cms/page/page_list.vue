<template>
  <div style="width: 100%">
    <el-button type="primary" v-on:click="query">查询</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="button" label="按钮">
        <el-button type="danger">危险按钮</el-button>
      </el-table-column>

    </el-table>
    <el-pagination

      background
      v-on:current-change="change"
      layout="prev, pager, next"
      :total="total"
      :current-page="this.param.page"
      :page-size="this.param.size"

      style="float:right"
    >
    </el-pagination>

  </div>

</template>

<script>

  import * as cmsapi from "../api/cms";

  export default {
    data() {
      return {
        tableData: [],
        "total": this.total,
        "param": {
          "page": 1,//頁碼
          "size": 10//頁碼size
        }
      }
    },
    methods: {
      query: function () {
        cmsapi.page_list(this.param.page, this.param.size, this.param).then((res) => {
          //將res賦值給數據模型對象

          this.tableData = res.queryResult.list;

          this.total = res.queryResult.total;
        })
      },
      change: function (val) {
        this.param.page = val;
        this.query();
        /* alert(val)
         cmsapi.page_list(val,this.param.size,this.param).then((result)=>{
           this.tableData=result.queryResult.list;
         })*/
      }
      //当dom元素渲染完毕调用query方法钩子

    },
    mounted(){
      this.query();
    }
  }
</script>

<style>

</style>
