<template>
    <div class="cdlbox shopmanage">
        <div class="topcss">
            <div class="topcss-top">
                <i class="el-icon-search"></i> 筛选查询
            </div>
            <div class="topcss-cen">
                输入搜索:
                <el-input class="topinputcss" placeholder="输入门店关键词" size="medium" prefix-icon="el-icon-search" v-model="searchinput" clearable>
                </el-input>
                入驻时间:
                <div class="toptimecss">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="timeinput" size="medium" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <el-button class="searchbut" size="medium" type="" icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>
        <div>
            <div class="listtablebox">
                <div class="ADOrdDet_head">
                    <i class="el-icon-date"></i>
                    邀请列表
                    <div class="zglht1-but lyzg2-btn" style="float: right;">
                    </div>
                </div>
                <div class="tableboxlistcss">
                    <el-table ref="multipleTable" border :data="tableData3" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                        <el-table-column type="index" label="序号" width="50px">
                        </el-table-column>
                        <el-table-column prop="name" label="用户">
                        </el-table-column>
                        <el-table-column prop="name" label="商户类型">
                        </el-table-column>
                        <el-table-column prop="shopName" label="门店名称">
                        </el-table-column>
                        <el-table-column prop="principalName" label="门店负责人">
                            <template slot-scope="scope">
                                <div class="">{{scope.row.principalName}}</div>
                                <el-button class="buttonxl" size="mini" @click="redact(scope.row.shopId)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="台卡数量">
                        </el-table-column>
                        <el-table-column prop="enterTime" label="入驻时间">
                            <template slot-scope="scope">
                                <div :data-id=scope.row.enterTime>{{ scope.row.enterTime| dateformat('YYYY-MM-DD') }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="门店地址">
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人">
                        </el-table-column>
                        <el-table-column prop="operateUserName" label="业务员">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系人手机">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <div>
                                    <span class="caozuo" @click="shopurlClick(scope.row.shopId,scope.row.name,scope.row.shopName)">绑定台卡</span>
                                    <span class="caozuo" @click="urlgo(scope.row.shopId)" style="margin-left: 5px;">查看</span>
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
        </div>
        <el-dialog title="编辑" :visible.sync="dialogVisible" top="250px" width="450px" :before-close="handleClose">
            <div>
                <div class="selectleft">负责人:</div>
                <el-select class="selectright" clearable v-model="selectvalue" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.id" :label="item.option" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectchange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="绑定台卡" :visible.sync="MACbinding" width="450px" :before-close="handleClose">
            <div class="MACbinding">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="用户名称:">
                        <el-input v-model="formLabelAlign.name" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="门店名称:">
                        <el-input v-model="formLabelAlign.shopname" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="可绑定:">
                        <el-input v-model="formLabelAlign.onbd" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="已经绑定:">
                        <el-input v-model="formLabelAlign.inbd" :disabled="true" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="台卡MAC:">
                        <el-input type="textarea" clearable autosize v-model="formLabelAlign.macbd" size="medium"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MACbinding = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="MACbindingbut" size="medium">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { shopindextable, userlist, userbj, cardbd, carbdck } from "@/api/api";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        shopname: "",
        onbd: "",
        inbd: "",
        macbd: ""
      },
      options: [],
      shopids: "",
      selectvalue: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        reviewStatus: "PASS",
        name: undefined,
        beginDate: undefined,
        endDate: undefined
      },
      tableData3: [], //存放table数据的地方
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchinput: undefined,
      timeinput: undefined,
      dialogVisible: false, //设置负责人弹窗显示隐藏
      MACbinding: false, //MAC绑定弹窗显示隐藏
      shopidmacbd: "" //绑定台卡shopid
    };
  },
  methods: {
    urlgo(shopid) {
      //查看详情页面跳转
    },
    selectchange() {
      //编辑负责人
      let json = {
        id: this.selectvalue
      };
      userbj(this.shopids, json)
        .then(r => {
          console.log(r);
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "编辑成功",
              type: "success"
            });
             this.table()
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
          console.log(r);
        });
    },
    MACbindingbut() {
      //提交台卡绑定
      let data = {
        shopId: this.shopidmacbd,
        macAddress: this.formLabelAlign.macbd,
        proxyId: this.$store.state.user.proxyId
      };
      if (this.formLabelAlign.macbd == "") {
        this.$notify.error({
          title: "出错",
          message: "MAC地址不能为空",
          type: "success"
        });
      } else {
        cardbd(data)
          .then(r => {
            console.log(r);
            if (r.data.success == true) {
              this.$notify({
                title: "成功",
                message: "绑定成功",
                type: "success"
              });
              this.MACbinding = flase;
            } else {
              this.$notify.error({
                title: "失败",
                message: r.data.message.description,
                type: "success"
              });
            }
          })
          .catch(r => {
            console.log(r);
          });
      }
    },
    shopurlClick(id, name, shopname) {
      //台卡绑定弹窗显示
      this.shopidmacbd = id;
      this.formLabelAlign.name = name;
      this.formLabelAlign.shopname = shopname;
      this.MACbinding = true;
      carbdck(id) //查看绑定数量请求
        .then(r => {
          console.log(r);
          if (r.data.success == true) {
              this.formLabelAlign.onbd=r.data.data.unbindNumber
              this.formLabelAlign.inbd=r.data.data.bindCount

          } else {
            this.$notify.error({
              title: "失败",
              message: r.data.message.description,
              type: "success"
            });
          }
        })
        .catch(r => {
          console.log(r);
        });
    },
    redact(id) {
      //编辑显示负责人
      this.dialogVisible = true;
      this.shopids = id;
    },
    handleClose(done) {
      //关闭窗口
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    search() {
      //搜索
      if (this.searchinput != "" && this.searchinput != undefined) {
        this.ajaxdata.name = this.searchinput;
      } else {
        this.ajaxdata.name = undefined;
      }
      if (this.timeinput != undefined && this.searchinput != "undefined") {
        this.ajaxdata.beginDate = this.timeinput[0];
        this.ajaxdata.endDate = this.timeinput[1];
      } else {
        this.ajaxdata.beginDate = undefined;
        this.ajaxdata.endDate = undefined;
      }
      this.table();
    },
    handleSizeChange(val) {
      //表格 条数选择
      // this.$message('这是一条消息提示');
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.ajaxdata.pageSize = val;
      this.ajaxdata.pageNumber = val * this.pageNumbercs;
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
      shopindextable(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    }
    //方法
  },
  mounted: function() {
    this.table();
    //挂载结束状态
    userlist() //获取负责人列表人员
      .then(response => {
        console.log(response.data.rows);
        this.options = response.data.rows;
      })
      .catch(response => {
        console.log(response);
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.shopmanage {
  color: #676a6c;
}
.MACbinding {
  padding: 10px;
}
</style>
