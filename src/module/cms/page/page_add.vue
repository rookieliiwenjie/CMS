<template>
 <div>

 </div>

</template>

<script>

  import * as cmsapi from "../api/cms";

  export default {
    data() {
      return {


      }
    },
    methods: {
      cmsSite: function () {
        cmsapi.site_list().then((result) => {
          this.siteList = result.queryResult.list;
        })
      },

      //当dom元素渲染完毕调用query方法钩子

    },
    mounted() {

      this.cmsSite();
    }
  }
</script>

<style>

</style>
