<template>
    <div class="standartable1">
        <div class="dbtopbox">
            <div class="bbtype">
                请选择报表类型
            </div>
            <div class="ribaotab">
                <div class="pull-left ribao1" :class="ribao==1?'ribao4':'ribao1'" @click="tabclick(1)">
                    日报
                </div>
                <div class="pull-left ribao2" :class="ribao==2?'ribao4':'ribao2'" @click="tabclick(2)">
                    周报
                </div>
                <div class="pull-left ribao3" :class="ribao==3?'ribao4':'ribao3'" @click="tabclick(3)">
                    月报
                </div>
            </div>
        </div>
        <div class="standardtable1sx">
            <div class="filtrateinp">
                <span><img id="baogaoimg" :src="baogaoimgdata"></span>
                <span>按日期</span>
                <el-date-picker v-if="ribao!=3" v-model="ajaxdata.date" align="right" type="date" size="small" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions1">
                </el-date-picker>
                <el-date-picker v-else v-model="ajaxdata.date" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div class="filtrateinp">
                <span><img id="baogaoimg" src="../../img/dabiao (7).png"></span>
                <span>负责人</span>
                <el-input size="small" placeholder="名称搜索" v-model="ajaxdata.principal" clearable>
                </el-input>
                <span class='filtrateinpspan'><img id="baogaoimg" src="../../img/dabiao (1).png"></span>
                <span> 门店 </span>
                <el-input style="margin-left: 28px;" size="small" placeholder="门店搜索" v-model="ajaxdata.name" clearable>
                </el-input>
                <el-button @click="clear()" size="small" round>清空条件</el-button>
            </div>
            <div class="filtrateinp">
                <span><img id="baogaoimg" src="../../img/dabiao (3).png"></span>
                <span>达标率</span>
                <template>
                    <el-select @change='options3change1(selectval3)' size="small" v-model="selectval3" clearable placeholder="请选择">
                        <el-option v-for="item in options3" :key="item.id" :label="item.val" :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                <span class='filtrateinpspan'><img id="baogaoimg" src="../../img/dabiao (5).png"></span>
                <span> 城市筛选</span>
                <span class="cityselect">
                    <el-select @change='selectvalclk(ajaxdata.provinceId)' size="small" v-model="ajaxdata.provinceId" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select @change="selectval1clk(ajaxdata.cityId)" size="small" v-model="ajaxdata.cityId" clearable placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="ajaxdata.areaId" clearable placeholder="请选择">
                        <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </span>

                <el-button @click=" table()" class="duoxuansaic" size="small" round>多选筛查</el-button>
            </div>
        </div>
        <div class="standardtablebox">
            <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column type="index" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="shopId" label="门店id">
                </el-table-column>
                <el-table-column prop="account" label="用户">
                </el-table-column>
                <el-table-column prop="shopName" label="门店名称">
                </el-table-column>
                <el-table-column prop="enterTime" label="入驻时间">
                    <template slot-scope="scope">
                        <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="bindCardNumber" label="已绑台卡">
                </el-table-column>
                <el-table-column prop="principalName" label="联系人">
                </el-table-column>
                <el-table-column prop="phone" label="联系人手机">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column prop="principalName" label="负责人">
                </el-table-column>
                <el-table-column prop="reachNumber" label="达标数">
                </el-table-column>
                <el-table-column prop="unreachNumber" label="开机未达标">
                </el-table-column>
                <el-table-column prop="unopenedNumber" label="未开机">
                </el-table-column>
                <el-table-column prop="thisMonthReachRate" label="平均达标率">
                    <template slot-scope="scope">
                        <div>
                            <span class="caozuo">{{scope.row.reachRate*100|toFixed2}}%</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <div style="margin-bottom:10px">
                            <el-button @click="historyurl(scope.row.shopId)" class="xlyzbut" size="small" round>历史记录</el-button>
                        </div>
                        <el-button @click="uporder(scope.row.shopName,scope.row.principalName,scope.row.shopId)" class="xlyzbut" size="small" round>发送工单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" style="margin-top: 30px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNumbercs" :page-sizes="pageSizesList" :page-size="ajaxdata.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
                </el-pagination>
            </div>
        </div>
        <el-dialog class="upyunweibox" title="发送运维工单" :visible.sync="dialogVisible" width="600px" top="200px" :before-close="handleClose">
            <div class="">
                <div class="recordzheztop">
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <img src="../../img/shopcion (2).png" alt="">
                                门店
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple-light">
                                {{upordershopname}}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <img src="../../img/shopcion (1).png" alt="">
                                负责人
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple-light">
                                <template>
                                    <el-select size="small" v-model="fuzrenvalue" placeholder="请选择">
                                        <el-option v-for="item in fuzren" :key="item.id" :label="item.option" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </template>
                                <div class="fuzerentext">
                                    当前门店负责人：{{upordername}}
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <img src="../../img/shopcion (3).png" alt="">
                                维护日期
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple-light">
                                <el-date-picker size="small" v-model="weihutime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <img src="../../img/shopcion (4).png" alt="">
                                事项说明
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div class="grid-content bg-purple-light">
                                <el-input type="textarea" :autosize="{ minRows: 3, maxRows:8}" placeholder="请输入内容" v-model="textarea3">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="uporderajax">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
  standardtable1,
  province,
  cityid,
  areaset,
  userfuzeren,
  uporderajaxapi
} from "@/api/api";
let moment = require("moment");
export default {
  data() {
    return {
      baogaoimgdata: "../../src/img/ribao1.png", //图片日月周切换
      ribao: 1, //头部日月周tab切换
      textarea3: "", //备注留言数据
      weihutime: "", //维护日期
      fuzrenvalue: "", //负责人下拉数据
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
        type: "DAY",
        date: "",
        name: undefined, //门店名称
        principal: undefined, //负责人名称搜索
        beginReachRate: undefined,
        endReachRate: undefined,
        provinceId: undefined,
        cityId: undefined,
        areaId: undefined
      },
      tableData3: [], //存放table数据的地方
      searchinput: undefined, //名字查询
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      dialogVisible: false, //发送工单隐藏
      upordershopname: "", //发送工单门店名称数据
      shopidss: "", //发送工单接口商户ID
      upordername: "", //发送工单负责人数据
      timevalue2: "", //时间选择器切换
      selectval: "", //下拉数据省,
      selectval1: "", //下拉数据市,
      selectval2: "", //下拉数据区,
      selectval3: "", //达标率选择,
      fuzren: [], //负责人下拉
      options: [], //下拉数据省
      options1: [], //下拉数据市
      options2: [], //下拉数据区
      options3: [
        {
          id: "0.99-1",
          val: "99%-100%"
        },
        {
          id: "0.8-0.89",
          val: "80%-89%"
        },
        {
          id: "0.7-0.79",
          val: "70%-79%"
        },
        {
          id: "0.6-0.69",
          val: "60%-69%"
        },
        {
          id: "0.5-0.59",
          val: "50%-59%"
        },
        {
          id: "0.4-0.49",
          val: "40%-49%"
        },
        {
          id: "0.3-0.39",
          val: "30%-39%"
        },
        {
          id: "0.2-0.29",
          val: "20%-29%"
        },
        {
          id: "0.1-0.19",
          val: "10%-19%"
        },
        {
          id: "0-0.1",
          val: "0%-10%"
        }
      ] //下拉数据达标率
    };
  },
  methods: {
    //方法
    handleClose(done) {
      //   弹窗关闭函数;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    tabclick(id) {
      // 日月周切换tab
      if (id == 1) {
        this.ribao = 1;
        this.baogaoimgdata = "../../src/img/ribao1.png";
        this.ajaxdata.type = "DAY";
        this.ajaxdata.date = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
      } else if (id == 2) {
        this.ribao = 2;
        this.baogaoimgdata = "../../src/img/ribao2.png";
        this.ajaxdata.type = "WEEK";
        this.ajaxdata.date = moment()
          .subtract(1, "weeks")
          .format("YYYY-MM-DD");
      } else if (id == 3) {
        this.ribao = 3;
        this.baogaoimgdata = "../../src/img/ribao3.png";
        this.ajaxdata.type = "MONTH";
        this.ajaxdata.date = moment()
          .subtract(1, "months")
          .format("YYYY-MM-DD");
      }
    },
    clear() {
      //清除搜索条件

      this.ajaxdata.principal = ""; //关键词搜索
      this.ajaxdata.name = ""; //门店搜索
      this.ajaxdata.provinceId = ""; //下拉数据省,
      this.ajaxdata.cityId = ""; //下拉数据市,
      this.ajaxdata.areaId = ""; //下拉数据区,
      this.selectval3 = ""; //达标率选择,
      this.ajaxdata.beginReachRate = ""; //达标率起始值
      this.ajaxdata.endReachRate = ""; //达标率结束值
      if (this.ribao == 3) {
        this.ajaxdata.date = moment()
          .subtract(1, "months")
          .format("YYYY-MM-DD"); //时间选择器切换
      } else if (this.ribao == 1) {
        this.ajaxdata.date = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");
      } else if (this.ribao == 2) {
        this.ajaxdata.date = moment()
          .subtract(1, "weeks")
          .format("YYYY-MM-DD");
      }
    },
    selectvalclk(val) {
      //省选中事件
      this.cityset(val);
      this.ajaxdata.cityId = ""; //下拉数据市,
      this.ajaxdata.areaId = ""; //下拉数据区,
    },
    selectval1clk(val) {
      //省选中事件
      this.area(val);
      this.ajaxdata.areaId = ""; //下拉数据区,
    },
    urlgo() {
      console.log("跳转页面");
    },
    historyurl(id) {
      //历史记录
      this.$router.push("/card/standard/history?id=" + id);
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
      standardtable1(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    options3change1(val) {
      //获取达标率数据
      let arr = val.split("-");
      this.ajaxdata.beginReachRate = arr[0];
      this.ajaxdata.endReachRate = arr[1];
    },
    provinceset() {
      //获取省份
      province()
        .then(r => {
          console.log(r);
          this.options = r.data.data;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    cityset(val) {
      //获取市
      cityid(val)
        .then(r => {
          console.log(r);
          this.options1 = r.data.data;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    area(val) {
      //获取区
      areaset(val)
        .then(r => {
          console.log(r);
          let data = r.data.data;
          if (data[0].name == "市辖区" && data.length > 1) {
            let m = data.slice(0);
            m.shift();
            this.options2 = m;
          } else {
            this.options2 = data;
          }
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    uporder(shopname, name, shopids) {
      //发送工单
      this.fuzren = "";
      this.fuzrenvalue = "";
      this.upordershopname = shopname;
      this.upordername = name;
      this.shopidss = shopids;
      let data = {
        proxyId: this.ajaxdata.proxyId,
        shopId: shopids
      };
      console.log(data);

      userfuzeren(data)
        .then(r => {
          this.fuzren = r.data.rows;
          this.fuzrenvalue = r.data.rows[0].id;
          this.dialogVisible = true;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    uporderajax() {
      if (this.textarea3 == "") {
        this.$message.error("请填写事项说明");
      } else if (this.weihutime == "") {
        this.$message.error("请选择维护日期");
      } else {
        let data = {
          proxyId: this.ajaxdata.proxyId,
          userId: this.$store.state.user.userId,
          dispatchUserId: this.fuzrenvalue,
          shopId: this.shopidss,
          startDate: this.weihutime[0],
          endDate: this.weihutime[1],
          note: this.textarea3
        };
        uporderajaxapi(data)
          .then(r => {
            console.log(r);
            if (r.data.success == true) {
              this.$notify({
                title: "成功",
                message: "发送运维工单成功",
                type: "success"
              });
              this.dialogVisible = false;
            } else {
              this.$notify.error({
                title: "失败",
                message: r.data.message.description,
                type: "success"
              });
            }
          })
          .catch(r => {
            this.$message.error("服务器出错");
          });
      }
    }
  },
  mounted: function() {
    //挂载结束状态
    this.table(); //表格初始化
    this.provinceset(); //获取省份
    this.$root.$emit("message", 1);
    let currentdate = moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD"); //获取昨天当前时间
    this.ajaxdata.date = currentdate;

    // console.log(this.$route.path);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.standartable1 .dbtopbox {
  height: 100px;
  min-height: 100px;
  line-height: 100px;
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
.bbtype {
  height: 30px;
  line-height: 30px;
  padding-top: 10px;
  color: #fff;
  font-size: 16px;
}
.ribaotab .ribao1 {
  color: #fff;
  background-color: #93ff8d;
}
.ribaotab .ribao2 {
  color: #fff;
  background-color: #3c98ff;
}
.ribaotab .ribao3 {
  color: #fff;
  background-color: #fed403;
}
.cdlbox .ribaotab .ribao4 {
  background-color: #fff;
  color: #00cccb;
  box-shadow: 0px 0px 5px #888888;
}
.ribaotab .pull-left {
  height: 50px;
  line-height: 50px;
  width: 80px;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  margin-right: 50px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 500ms;
  display: inline-block;
}
.standardtable1sx {
  margin-bottom: 10px;
  height: 165px;
  background: #fff;
  padding-left: 60px;
  padding-top: 20px;
}
.filtrateinp {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: #676a6c;
}
.filtrateinp span {
  margin-right: 15px;
}
.filtrateinp .el-input {
  width: 180px;
  input {
    // border-radius: 20px;
  }
  span {
    margin-right: 0px;
  }
}
.filtrateinp img {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.filtrateinpspan {
  margin-left: 30px;
}
.filtrateinp button {
  float: right;
  margin-right: 50px;
  margin-top: 5px;
  span {
    margin-right: 0px;
  }
}
.duoxuansaic {
  background-color: #00cccb;
  color: #ffffff;
}
.cityselect .el-input {
  width: 120px;
}
.xlyzbut {
  background: #00cccb;
  color: #ffffff;
}
.upyunweibox {
  .el-dialog__header {
    text-align: center;
    background: #a6e0d6;
    font-size: 16px;
  }
  .recordzheztop {
    padding-top: 20px;
    width: 80%;
    margin: auto;
    img {
      width: 15px;
      vertical-align: bottom;
      margin-right: 5px;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .fuzerentext {
      font-size: 12px;
      margin-top: 15px;
    }
    .el-date-editor {
      width: 300px;
    }
  }
}
</style>

