<template>
    <div class="reachbox cdlbox">
        <div class='reachtop'>
            <el-row :gutter="50">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <div class="reachtopshopname">
                            门店名称 : {{shopajax.shopName}}
                        </div>
                        <el-row>
                            <el-col :span="10">
                                <div class="reachtopsjbox">
                                    联系人:{{shopajax.owner}}
                                </div>
                                <div class="reachtopsjbox">
                                    联系电话：{{shopajax.phone}}
                                </div>
                                <div class="reachtopsjbox">
                                    邀请人：{{shopajax.operateUserName}}
                                </div>
                            </el-col>
                            <el-col :span="14">
                                <div class="reachtopsjbox">
                                    已绑定台卡：{{shopajax.cardCount}}
                                </div>
                                <div class="reachtopsjbox">
                                    联系地址：{{shopajax.address}}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                        <div class="reachtopshopname">
                            展示达标率
                            <span class="reachtopshopnameright">{{shopajax.motime}}</span>
                        </div>
                        <div class="mainbox">
                            <div id="main">

                            </div>
                        </div>

                    </div>
                </el-col>
            </el-row>

        </div>
        <div class="reachtablebox">
            <div class="ADOrdDet_head"><i class="el-icon-date"></i>
                邀请列表
                <div class="zglht1-but lyzg2-btn" style="float: right;">
                    <el-date-picker @change="timechang(monthval)" size="small" clearable v-model="monthval" type="month" placeholder="选择月" value-format="yyyy-MM">
                    </el-date-picker>
                </div>
            </div>
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column type="index" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="cardId" label="台卡ID">
                </el-table-column>
                <el-table-column prop="macAddress" label="MAC地址">
                </el-table-column>
                <el-table-column prop="baiduTotalNum" label="播放次数">
                </el-table-column>
                <el-table-column :formatter="renderStatus" width="40px" :label='item.id.toString()' v-for="item in fortr" :key="item.id">

                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 30px;text-align: right;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { standardtable2, reachxqsj, reachxqtb, reachxqtable } from "@/api/api";
var echarts = require("echarts");
let moment = require("moment");
export default {
  data() {
    return {
      monthval: "", //月选择
      echartsajax: "", //圆形图表数据
      shopidurl: "", //URLSHIPID
      shopajax: {
        shopName: "", //门店名称
        address: "", //地址
        cardCount: "", //台卡数量
        owner: "", //联系人
        phone: "",
        operateUserName: "", //邀请人
        motime: "" //当前月
      }, //门店数据
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        shopId: "",
        pageNumber: 0,
        date: ""
      },
      tableData3: [], //存放table数据的地方
      searchinput: undefined, //名字查询
      fortr: [] //表格循环数组
    };
  },
  methods: {
    //方法
    timechang(val) {
      console.log(val);
      this.ajaxdata.date = val;
      this.table();
    },
    renderStatus(row, column, cellValue, index) {
      var html = <i class="el-icon-close" />;
      if (row.cardDayReachResponseModelList.length > 0) {
        for (let i = 0; i < row.cardDayReachResponseModelList.length; i++) {
          if (row.cardDayReachResponseModelList[i].date == column.label) {
            if (row.cardDayReachResponseModelList[i].reach == "YES") {
              html = <i class="el-icon-check" />;
              return html;
            } else {
              html = <i class="el-icon-close" />;
              return html;
            }
          } else {
            html = <i class="el-icon-close" />;
          }
        }
      } else {
        html = <i class="el-icon-close" />;
      }

      //   row.cardDayReachResponseModelList.forEach(function(e) {
      //     var time = parseInt(e.date);
      //     if (time == indexx) {
      //       if (e.reach == "YES") {
      //         html = '<i class="el-icon-check" />;';
      //       }
      //     }
      //   });
      return html;
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
    table() {
      //表格数据接口
      reachxqtable(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    reachxqtbs() {
      let data = {
        date: this.shopajax.motime,
        proxyId: this.ajaxdata.proxyId,
        shopId: this.shopidurl
      };
      reachxqtb(data)
        .then(response => {
          console.log(response);
          let tbsj = response.data.data;
          tbsj = tbsj * 100;
          tbsj = tbsj.toFixed(2);
          this.echartsajax = tbsj;
          let e = this.echartsajax;
          var Chart4 = echarts.init(document.getElementById("main")); //获取ID
          var option = {
            title: {
              show: true,
              text: e + "%",
              x: "center",
              y: "center",
              textStyle: {
                fontSize: "22",
                color: "#00cccb",
                fontWeight: "normal"
              }
            },
            series: {
              name: "",
              type: "pie",
              radius: ["65%", "85%"],
              color: ["#00cccb", "#e8f2f3"],
              avoidLabelOverlap: true,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                  color: "#00cccb"
                },
                emphasis: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{ value: e, name: "" }, { value: 100 - e, name: "" }]
            }
          };
          Chart4.setOption(option);
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    }
  },
  mounted: function() {
    //挂载结束状态
    this.$root.$emit("message", 4);
    this.shopajax.motime = moment().format("YYYY-MM"); // 十一月 14日 2018, 10:41:46 上午
    this.ajaxdata.date = moment().format("YYYY-MM");
    this.monthval = moment().format("YYYY-MM");
    this.ajaxdata.shopId = this.$route.query.id;

    for (let i = 1; i < 32; i++) {
      this.fortr.push({
        id: i,
        val: "NO"
      });
    }

    this.table();
    this.shopidurl = this.$route.query.id; //获取url shopid
    this.reachxqtbs(); //初始化图表数据
    reachxqsj(this.shopidurl)
      .then(response => {
        console.log(response);
        let data = response.data.data;
        this.shopajax.address = data.address;
        this.shopajax.owner = data.owner;
        this.shopajax.phone = data.phone;
        this.shopajax.cardCount = data.cardCount;
        this.shopajax.operateUserName = data.operateUserName;
        this.shopajax.shopName = data.shopName;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.reachbox {
  .ADOrdDet_head {
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
  }
  .el-date-editor {
    width: 150px;
  }
  .mainbox {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  #main {
    width: 100%;
    height: 80%;
  }
  .reachtablebox {
    padding: 20px;
    background: #fff;
  }
  .reachtop {
    .reachtopsjbox {
      height: 50px;
      font-size: 14px;
      color: #676a6c;
    }
    .grid-content {
      background: #fff;
      height: 250px;
      padding: 25px;
    }
    margin-bottom: 20px;
    .reachtopshopname {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .reachtopshopnameright {
      display: inline-block;
      float: right;
    }
  }
}
</style>
