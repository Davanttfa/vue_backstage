<template>
    <div class="cdlbox Divideendindex">
        <div class="cardindexcon">
            <el-row :gutter="20">
                <el-col :span="16" style="padding-left:0px">
                    <div class="grid-content bg-purple">
                        <div class="cardindextopsj">
                            <el-col :span="12" v-for="item in Dividendindextopdata" :key="item.index">
                                <div class="grid-content bg-purple cardindextopfb">
                                    <div class="shujutopboxtext">
                                        <div class="shujutopboxtext1">
                                            {{ item.title}}
                                        </div>
                                        <div class="shujutopboxtext2">
                                            上月
                                        </div>
                                    </div>
                                    <div class="text-center dabiaotaikacs ">
                                        <count-to :startVal='0' :endVal="item.data" :duration=4000></count-to>
                                    </div>
                                </div>
                            </el-col>

                        </div>
                    </div>

                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">

                        <el-col :span="24">
                            <div class="dabaosjright">
                                <div class="shujutopboxtext">
                                    <div class="shujutopboxtext1">
                                        总收入(RMB)
                                    </div>
                                    <div class="shujutopboxtext2">
                                        上月
                                    </div>
                                </div>
                                <div id="main">

                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="cradindexecharts" style="margin-top:20px">
            <el-row :gutter="40">
                <el-col :span="24">
                    <div class="grid-content bg-purple cradindexechartsbox">
                        <div class="cradindexechartsinput">
                            <el-date-picker value-format="yyyy" @change="timexz()" v-model="myChartdatas1.inYear" type="year" placeholder="选择年">
                            </el-date-picker>
                        </div>
                        <div id="chatr1">

                        </div>
                    </div>
                </el-col>

            </el-row>
        </div>
        <div class="dividendindextable">
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column type="index" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="createdTime" label="结算日期">
                    <template slot-scope="scope">
                        <div :data-id=scope.row.createdTime>{{ scope.row.createdTime| dateformat('YYYY-MM-DD') }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="reachCount" label="达标次数">
                </el-table-column>
                <el-table-column prop="unReachCount" label="未达标次数">
                </el-table-column>
                <el-table-column prop="baiduTotalNum" label="广告播放次数">
                </el-table-column>
                <el-table-column prop="thousandTimesPrice" label="每千次费用">
                </el-table-column>
                <el-table-column prop="fixAmount" label="广告分成">
                </el-table-column>
                <el-table-column prop="fixAmount" label="总收入">
                </el-table-column>
                <el-table-column prop="cardNumber" label="收款账号">
                </el-table-column>
                <el-table-column prop="hasTransfer" label="到账详情">
                    <template slot-scope="scope">
                        <div v-if="scope.row.hasTransfer=='YES'">
                            到账
                        </div>
                        <div class="">
                            未到账
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
var echarts = require("echarts");
let moment = require("moment");
// import echarts from "echarts";

import {
  DividendindexmyChart,
  Dividendindextop,
  Dividendindextable
} from "@/api/api";
import countTo from "vue-count-to";

export default {
  data() {
    return {
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0
      },
      tableData3: [],
      Dividendindextopdata: [
        //top4块数据json
        {
          title: "福利社分成收入",
          data: 0
        },
        {
          title: "台卡达标次数",
          data: 0
        },
        {
          title: "推广分成收入",
          data: 0
        },
        {
          title: "广告播放次数",
          data: 0
        }
      ],

      cardindexdata: {
        allNumber: 0, //台卡总数
        bindNumber: 0, //绑定台卡
        monthReachCount: 0, //月达标
        unbindNumber: 0, //未绑定
        weekReachCount: 0, //周达标
        oneHourOfflineCount: 0, //离线
        oneHourOnlineCount: 0 //在线
      },
      proxyId: this.$store.state.user.proxyId,
      myChartdatas1: {
        proxyId: this.$store.state.user.proxyId,
        inYear: ""
      },
      echartsinput: "", //日期选择val
      echartsinputn: "", //年选择器
      chatr1: {
        seriesdata: [], //第一个图标数据1
        xAxis: [] //第一个图标X轴数据
      }
    };
  },
  components: { countTo }, //数字滚动组件
  methods: {
    handleSizeChange(val) {
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.table();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.ajaxdata.pageNumber = (val - 1) * this.pageSize;
      this.table();
    },
    table() {
      Dividendindextable(this.ajaxdata)
        .then(response => {
          console.log(response);

          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    },
    timexz() {
      this.chatr1.xAxis = [];
      this.chatr1.seriesdata = [];
      this.chatr1.seriesdata2 = [];
      this.chatr1.seriesdata3 = [];
      this.chatrfun();
    },
    urlgo(id) {},
    chatrfun() {
      //第一个图标
      DividendindexmyChart(this.myChartdatas1)
        .then(response => {
          console.log(response);
          let datas = response.data.data;
          for (let x in datas) {
            this.chatr1.xAxis.push(datas[x].month + "月");
            this.chatr1.seriesdata.push(datas[x].amount);
          }
          let option = {
            title: {
              text: "收入趋势图"
            },
            tooltip: {},
            legend: {
              data: ["当月收入"]
            },
            xAxis: {
              data: this.chatr1.xAxis
            },
            yAxis: {},
            series: [
              {
                name: "当月收入",
                type: "line",
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
                data: this.chatr1.seriesdata,
                symbolSize: 10, //拐点圆的大小
                color: ["#00cccb"], //折线条的颜色
                smooth: true,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 5,
                      color: "#00cccb"
                    }
                  }
                }
              }
            ]
          };
          let myChart = echarts.init(document.getElementById("chatr1"));

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    }
  },
  mounted: function() {
    //挂载结束后
    this.chatrfun();
    this.table();
    // 绘制图表

    // 指定图表的配置项和数据;
    var carde = this.Dividendindextopdata[0].data;
    var Chart4 = echarts.init(document.getElementById("main")); //获取ID
    var option = {
      title: {
        show: true,
        text: carde + "/¥",
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
        color: "#00cccb ",
        avoidLabelOverlap: true,
        hoverAnimation: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: false
          }
        },
        data: [{ value: 100, name: "" }]
      }
    };
    Chart4.setOption(option);

    //挂载结束状态
    console.log(this.proxyId);
    Dividendindextop(this.proxyId) //获取top数据
      .then(r => {
        console.log(r);
        let data = r.data.data;
        this.Dividendindextopdata[0].data = data.fixAmount;
        this.Dividendindextopdata[1].data = data.reachCount;
        this.Dividendindextopdata[2].data = 0;
        this.Dividendindextopdata[3].data = data.baiduTotalNum;
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
    let year = moment().format("YYYY"); //获取当前时间

    this.myChartdatas1.inYear = year;
  }
};
</script>


<style rel="stylesheet/scss" lang="scss">
.Divideendindex {
  .dividendindextable {
    background: #ffffff;
    padding: 30px;
    margin-top: 20px;
  }
  .cardbut {
    button {
      background-color: #00cccb;
      color: #fff;
    }
  }
  .cardindexcon {
    margin-top: 20px;
  }
  .cardindextopsj {
    margin-bottom: 20px;
    height: 150px;
    .el-col-12 {
      margin-bottom: 20px;
    }
  }
  .cardindextopfb {
    background: #fff;
    height: 150px;
    border-radius: 10px;
  }
  .magbomcss {
    margin-bottom: 20px;
  }
  .dabaosjright {
    height: 320px;
    background: #fff;
    border-radius: 10px;
  }
  .shujutopboxtext {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #e8f2f3;
    font-size: 14px;
  }
  .shujutopboxtext1 {
    float: left;
  }
  .shujutopboxtext2 {
    float: right;
  }
  .dabiaotaikacs {
    font-size: 35px;
    font-weight: bold;
    line-height: 100px;
    color: #000;
    text-align: center;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
    input {
      text-align: center;
    }
  }
}
#main {
  width: 70%;
  height: 70%;
  margin: 25px auto;
}
.cradindexecharts {
  margin-top: 0px;
}
.cradindexechartsbox {
  height: 480px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
.cradindexechartsinput {
  height: 50px;
}
#chatr1 {
  height: 380px;
  margin-top: 20px;
}
#chatr2 {
  height: 380px;
  margin-top: 20px;
}
</style>

