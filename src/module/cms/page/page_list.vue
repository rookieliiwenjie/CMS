<template>

  <div style="width: 100%">
    <el-form v-model="param">
      <el-select v-model="param.siteId" filterable placeholder="请选择">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="param.pageAliase" style="width: 50%"></el-input>
      <el-button type="primary" icon="el-icon-search" v-on:click="query" size="small">查询</el-button>
      <!-- <router-link :to="{path:'/cms/page/add'}">
       <el-button type="primary" icon="el-icon-plus" v-on:click="open" style="float: right;">添加</el-button>
       </router-link>-->

      <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>

    </el-form>


    <el-dialog
      title="添加页面"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form  :model="pageForm" label-width="90px" size="mini">
        <el-form-item label="所属站点" prop="siteId">
          <el-select v-model="pageForm.siteId" placeholder="请选择站点">
            <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择模版" prop="templateId">
          <el-select v-model="pageForm.templateId" placeholder="请选择">
            <el-option v-for="item in templateList" :key="item.templateId" :label="item.templateName"
                       :value="item.templateId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面名称" prop="pageName">
          <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="pageAliase">
          <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问路径" prop="pageWebPath">
          <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="物理路径" prop="pagePhysicalPath">
          <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="pageForm.pageType">
            <el-radio class="radio" label="0">静态</el-radio>
            <el-radio class="radio" label="1">动态</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      <el-table-column prop="pageCreateTime" label="创建时间" format="yyyy-MM-dd" width="180"></el-table-column>
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
        pageForm: {
          pageAliase: "",
          pageCreateTime: new Date(),
          pageHtml: "",
          pageId: "",
          pageName: "",
          pageParameter: "",
          pageParams: [],
          pagePhysicalPath: "",
          pageStatus: "",
          pageTemplate: "",
          pageType: "",
          pageWebPath: "",
          siteId: "",
          templateId: "",



        },
        templateList:[],
        dialogVisible: true,
        tableData: [],
        siteList: [],
        total: this.total,
        param: {
          page: 1,//頁碼
          size: 10, //頁碼size
          siteId: '',
          pageAliase: ''

        },
        dialogVisible: false
      }
    },
    methods: {
      //弹框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      open: function () {
      },
      //模板获取
      cmsTem:function(){
        cmsapi.templet_list().then((result1)=>{
          this.templateList = result1.queryResult.list;
        })
      },
      //站点获取
      cmsSite: function () {
        cmsapi.site_list().then((result) => {
          this.siteList = result.queryResult.list;
        })
      },
      //页面获取
      query: function () {
        cmsapi.page_list(this.param).then((res) => {
          //將res賦值給數據模型對象

          this.tableData = res.queryResult.list;

          this.total = res.queryResult.total;
        })
      },
      //查询页面详情根据站点id和名字
      change: function (val) {
        this.param.page = val;
        this.query();
        /* alert(val)
         cmsapi.page_list(val,this.param.size,this.param).then((result)=>{
           this.tableData=result.queryResult.list;
         })*/
      },
      //添加用户提交
      onSubmit() {
        this.$confirm('确认提交？')
          .then(_ => {

          })
          .catch(_ => {
          });
        // cmsapi.add_page().
      }
      //当dom元素渲染完毕调用query方法钩子

    },
    //钩子页面加载自动查询
    mounted() {
      this.query();
      this.cmsSite();
      this.cmsTem();
      //this.loading.close();
    }
  }
</script>

<style>

</style>
