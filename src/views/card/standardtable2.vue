<template>
    <div class="">
        <div class="dbtopbox">
            <div class="jiluchaxun">
                <span>输入搜索</span>
                <el-input size="medium" placeholder="输入门店关键词" v-model="searchinput" clearable>
                </el-input>
                <i class="el-icon-search" @click="search()"></i>
            </div>
        </div>
        <div class="standardtablebox">
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column type="index" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="shopId" label="门店id">
                </el-table-column>
                <el-table-column prop="shopName" label="门店名称">
                </el-table-column>
                <el-table-column prop="createdTime" label="创建时间">
                    <template slot-scope="scope">
                        <div :data-id=scope.row.createdTime>{{ scope.row.createdTime| dateformat('YYYY-MM-DD') }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cardCount" label="已绑台卡">
                </el-table-column>
                <el-table-column prop="owner" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系人手机">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="proxyName" label="邀请人">
                </el-table-column>
                <el-table-column prop="thisMonthReach" label="本月达标次数">
                </el-table-column>
                <el-table-column prop="thisMonthUnReach" label="本月未达标次数">
                </el-table-column>
                <el-table-column prop="thisMonthBaiduTotalNum" label="本月播放次数">
                </el-table-column>
                <el-table-column prop="thisMonthReachRate" label="平均达标率">
                    <template slot-scope="scope">
                        <div>
                            <span class="caozuo">{{scope.row.thisMonthReach*100|toFixed2}}%</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <span class="caozuo" @click="urlgo(scope.row.shopId)">查看达标记录</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 30px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { standardtable2 } from "@/api/api";
export default {
  data() {
    return {
      inputss: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        shopName: undefined,
        reviewStatus: "PASS" //查询状态
      },
      tableData3: [], //存放table数据的地方
      searchinput: undefined //名字查询
    };
  },
  methods: {
    //方法
    urlgo(id) {
      this.$router.push("/card/standard/reachxq?id=" + id);
    },
    handleSizeChange(val) {
      //表格 条数选择
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.table();
    },
    handleCurrentChange(val) {
      //表格页面点击
      console.log(`当前页: ${val}`);
      this.pageNumbercs = val;
      this.ajaxdata.pageNumber = (val - 1) * this.pageSize;
      this.table();
    },
    search() {
      //搜索
      if (this.searchinput != "" && this.searchinput != undefined) {
        this.ajaxdata.shopName = this.searchinput;
      } else {
        this.ajaxdata.shopName = undefined;
      }
      this.table();
    },
    table() {
      //表格数据接口
      standardtable2(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    }
  },
  mounted: function() {
    //挂载结束状态
    this.table();
    this.$root.$emit("message", 2);

    // console.log(this.$route.path);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.dbtopbox {
  height: 80px;
  min-height: 80px;
  line-height: 80px;
  border-radius: 10px 10px 0px 0px;
  background-image: url(../../img/bb1.png);
  background-size: 100% 100%;
  padding-left: 60px;
  overflow: hidden;
  font-size: 14px;
  font-weight: bold;
}
.jiluchaxun {
  color: #fff;
  span {
    font-size: 16px;
  }
  .el-input {
    width: 200px;
    margin-left: 20px;
    input {
      border-radius: 20px;
    }
  }
  i {
    margin-left: 5px;
    font-size: 25px;
    font-weight: bold;
    vertical-align: middle;
    cursor: pointer;
  }
}
.standardtablebox {
  background: #fff;
  min-height: 300px;
  padding: 20px 20px 20px 20px;
}
</style>
