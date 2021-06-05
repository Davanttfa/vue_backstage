<template>
    <div class="historybox">
        <div class="dbtopbox" style="    line-height: 50px; 
    color: #fff;font-size: 18px;">
            历史记录
        </div>
        <div class="jiluchaxun">
            <div class="historytopleft">
                <img class="historytopleftimg" src="../../img/dabiao (1).png" alt="">
                <span class="historymendian">门店:{{shopName}}</span>

            </div>
            <div class="historytopleft">
                <img style="width: 15px;margin-right: 15px;
    vertical-align: middle;" src="../../img/shopcion (1).png">
                门店负责人：{{principalName}}
            </div>
            <div class="historytopleft">
                <img style="width: 15px;margin-right: 15px;
    vertical-align: middle;" src="../../img/shopcion (1).png">
                邀请人 ：{{operateUserName}}
            </div>
            <div class="historytoprightbox">
            </div>
            <div class="historytopright">
                <span>
                    按日期 :
                </span>
                <el-date-picker @change="picker(time2)" clearable value-format="yyyy-MM-dd" size="small" v-model="time2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <i @click="search()" class="el-icon-search"></i>
            </div>
        </div>
        <div class="standardtablebox" style="margin-top: 15px;">
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column type="index" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="date" label="日期">
                    <template slot-scope="scope">
                        <div :data-id=scope.row.date>{{ scope.row.date| dateformat('YYYY-MM-DD') }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="principalName" label="负责人">
                </el-table-column>
                <el-table-column prop="bindCardNumber" label="已绑台卡">
                </el-table-column>
                <el-table-column prop="reachNumber" label="达标数">
                </el-table-column>
                <el-table-column prop="unreachNumber" label="开机未达标">
                </el-table-column>
                <el-table-column prop="unopenedNumber" label="未开机">
                </el-table-column>
                <el-table-column prop="reachRate" label="达标率">
                    <template slot-scope="scope">
                        <div>
                            <span class="caozuo">{{scope.row.reachRate*100|toFixed2}}%</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="maintainLogNumber" label="维护日志">
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <span @click="lookrz(scope.row.date)" class="caozuo">查看日志</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 30px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="查看日志" :visible.sync="dialogVisible" width="800px" top="200px" :before-close="handleClose">
            <div class="">
                <el-table ref="multipleTable" border :data="tableData2" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column prop="date" label="日期" width="120px">
                        <template slot-scope="scope">
                            <div :data-id=scope.row.date>{{ scope.row.date| dateformat('YYYY-MM-DD') }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operateUserName" label="汇报人" width="180px">
                    </el-table-column>
                    <el-table-column prop="content" label="维护内容">
                    </el-table-column>
                </el-table>
                <div class="block" style="margin-top: 30px;">
                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="pageNumbercs2" :page-sizes="pageSizesList2" :page-size="ajaxdata2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber2">
                    </el-pagination>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { historytable, historyapixx, historytable2 } from "@/api/api";
export default {
  data() {
    return {
      dialogVisible: false,
      time2: "", //日期选择
      shopName: "", //门店名称
      principalName: "", //门店负责人
      operateUserName: "", //邀请人
      shopidurl: "", //传参的urlshopid
      inputss: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      pageNumbercs2: 0, //初始页码
      pageSize2: 5, //初始分页数量
      pageSizesList2: [5, 10, 20, 30, 50], //一页多少数据
      totalDataNumber2: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        pageSize: 10,
        pageNumber: 0,
        beginDate: undefined,
        endDate: undefined,
        shopId: ""
      },
      ajaxdata2: {
        // 请求数据的申请
        pageSize: 5,
        pageNumber: 0,
        shopId: "",
        date: ""
      },
      tableData3: [], //存放table数据的地方
      tableData2: [], //存放table数据的地方
      searchinput: undefined //名字查询
    };
  },
  methods: {
    //方法
    handleClose(done) {
      //关闭弹窗
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
    handleSizeChange2(val) {
      //表格 条数选择
      // this.$message('这是一条消息提示');
      console.log(this.pageNumbercs2);

      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
      this.ajaxdata2.pageSize = val;
      this.table2();
    },
    handleCurrentChange2(val) {
      //表格页面点击
      console.log(`当前页: ${val}`);
      this.pageNumbercs2 = val;
      this.ajaxdata2.pageNumber = (val - 1) * this.pageSize2;
      this.table2();
    },
    search() {
      //搜索
      //   console.log(this.ajaxdata.beginDate);

      if (this.ajaxdata.beginDate == "undefined") {
        this.ajaxdata.beginDate = undefined;
      }
      if (this.ajaxdata.endDate == "undefined") {
        this.ajaxdata.endDate = undefined;
      }

      this.table();
    },
    picker(time2) {
      //日期选择
      if (time2 == "undefined" || time2 == null) {
        this.ajaxdata.beginDate = undefined;
        this.ajaxdata.endDate = undefined;
      }
      if (time2 != undefined) {
        this.ajaxdata.beginDate = time2[0];
        this.ajaxdata.endDate = time2[1];
      }
    },
    table() {
      //表格数据接口
      historytable(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    table2() {
      //表格数据接口
      historytable2(this.ajaxdata2)
        .then(response => {
          this.tableData2 = response.data.rows;
          this.totalDataNumber2 = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    lookrz(time) {
      console.log(time);
      this.dialogVisible = true;
      function getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime = oYear + "-" + getzf(oMonth) + "-" + getzf(oDay); //最后拼接时间
        return oTime;
      }
      //补0操作
      function getzf(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      }
      this.ajaxdata2.date = getMyDate(time);
      this.table2();
    }
  },
  mounted: function() {
    //挂载结束状态
    this.$root.$emit("message", 3);
    this.shopidurl = this.$route.query.id;
    this.ajaxdata.shopId = this.$route.query.id;
    this.ajaxdata2.shopId = this.$route.query.id;

    this.table();

    historyapixx(this.shopidurl)
      .then(r => {
        console.log(r);
        this.shopName = r.data.data.shopName;
        this.principalName = r.data.data.principalName;
        this.operateUserName = r.data.data.operateUserName;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
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
.historybox .standardtablebox {
  background: #fff;
  min-height: 300px;
  padding: 20px 20px 20px 20px;
}
.dbtabtopbox .dbtabtop {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}
.historybox .dbtopbox {
  height: 50px;
  min-height: 50px;
}
.historybox .jiluchaxun {
  height: 100px;
  background: #fff;
  padding-left: 55px;
  line-height: 80px;
  color: #676a6c;
}
.historybox .historytopleft {
  float: left;
  margin-right: 30px;
  font-size: 16px;
  color: #676a6c;
}
.historybox .historytopleftimg {
  width: 45px;
  margin-right: 15px;
  vertical-align: middle;
}
.historybox .jiluchaxun .historymendian {
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
.historybox .dbtabtopbox {
  margin-bottom: 10px;
}
.historybox .historytoprightbox {
  clear: both;
}
.historybox .historytopright {
  float: right;
  margin-top: -50px;
  margin-right: 15px;
  .el-date-editor {
    width: 280px;
    margin-right: 5px;
  }
}
.historybox .el-dialog__header {
  text-align: center;
  background: #a6e0d6;
  font-size: 16px;
}
.jiluchaxun i:hover {
  color: #00cccb;
}
</style>
