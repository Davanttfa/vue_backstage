<template>
    <div class="cdlbox">
        <div class="ADOrdDet_head" style="background:none; " v-if="show==4">
            <span class="gongdangltopbut gongdangltopbutzt" style="margin-left:20px">
                <i class="el-icon-date" style="margin-right:10px"></i> 达标记录详情
            </span>
        </div>
        <div class="ADOrdDet_head" style="background:none; " v-else-if="show==3">
            <span class="gongdangltopbut gongdangltopbutzt" style="margin-left:20px">
                <i class="el-icon-time" style="margin-right:10px"></i> 历史记录
            </span>
        </div>
        <div class="ADOrdDet_head" style="background:none; " v-else>
            <router-link to="/card/standard/standardtable1">
                <span class="gongdangltopbut" :class="show==1?'gongdangltopbutzt':'gongdangltopbut'" @click="show=1">
                    <svg-icon icon-class="user" />按报表查看
                </span>
            </router-link>
            <router-link to="/card/standard/standardtable2">
                <span class="gongdangltopbut" :class="show==2?'gongdangltopbutzt':'gongdangltopbut'" @click="show=2">
                    <svg-icon icon-class="user" /> 按记录查看
                </span>
            </router-link>
        </div>
        <router-view>
            123
        </router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      gongdangltopbut: "gongdangltopbut",
      show: "1"
    };
  },
  methods: {
    //方法
  },
  mounted: function() {
    //挂载结束状态
    this.$root.$on("message", add => {
      console.log(add);

      if (add == 2) {
        this.show = 2;
      } else if (add == 1) {
        this.show = 1;
      } else if (add == 3) {
        this.show = 3;
      } else if (add == 4) {
        this.show = 4;
      }
    });
    console.log(this.$route.path);

    if (this.$route.path == "/card/standard/standardtable2") {
      this.show = 2;
    } else {
      this.show = 1;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.gongdangltopbut {
  font-size: 18px;
  font-weight: bold;
  font-family: "微软雅黑";
  color: #b7b7b7;
  display: inline-block;
  margin-left: 10px;
  margin-right: 50px;
  cursor: pointer;
  /* border-bottom: 2px solid #b7b7b7; */
}
.ADOrdDet_head {
  height: 60px;
  /* border-bottom: 1px solid #e8f2f3!important; */
  line-height: 50px;
  padding: 0px 0px 0px 0px;
  font-size: 16px;
  background: #fff;
}
.gongdangltopbutzt {
  font-size: 18px;
  font-weight: bold;
  font-family: "\5FAE\8F6F\96C5\9ED1";
  display: inline-block;
  margin-left: 10px;
  margin-right: 50px;
  cursor: pointer;
  color: #000;
}
</style>
