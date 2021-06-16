 <template>
    <div class="cdlbox shopxq">
        <template>
            <el-tabs v-model="activeName2" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="first">

                    <div class="shopuditxqbox">
                        <div class="gglhtindex-top">
                            用户信息
                            <span v-if="compilebut==true" class="newqyzjxxrig" @click="compile">编辑</span>
                            <span v-else>
                                <span class="newqyzjxxrig" @click="compilebutqx">取消</span>
                                <span class="newqyzjxxrig" @click="compilebutbc">保存</span>
                            </span>
                        </div>
                        <div class="shopuditxqbom">
                            <el-row :gutter="60">
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form ref="form" label-width="100px">
                                            <el-form-item label="广告机类型:">
                                                <el-input size="small" style="width:99%" :disabled="true" v-model="form.cardtype">
                                                </el-input>
                                            </el-form-item>
                                            <!-- <el-form-item label="门店类型:">
                                                <el-input size="small" :disabled="true" v-model="form.shoptype">
                                                </el-input>
                                            </el-form-item> -->
                                            <el-form-item label="地址:">
                                                <el-input class="compilezt" style="width:99%" size="small" :disabled="compilezt" v-model="form.address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="所属行业:">
                                                <el-select @change="industryNamefun(form.industryName)" size="small" style="width:45%" v-model="form.industryName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in industryName" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                                <span class="spangang">-</span>
                                                <el-select @change="industryBusinessNamefun(form.industryBusinessName)" size="small" style="width:45%" v-model="form.industryBusinessName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in industryBusinessName" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="所属区域:">
                                                <el-select @change="provinceclk(form.provinceName)" size="small" style="width:26%" v-model="form.provinceName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in provinceName" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                                                    </el-option>
                                                </el-select>
                                                <!-- <el-input class="compilezt" style="width:26%" size="small" :disabled="compilezt" v-model="form.provinceName"></el-input> -->
                                                <span class="spangang">-</span>
                                                <el-select @change="cityNameclk(form.cityName)" size="small" style="width:27%" v-model="form.cityName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in cityName" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                                                    </el-option>
                                                </el-select>
                                                <!-- <el-input class="compilezt" style="width:27%" size="small" :disabled="compilezt" v-model="form.cityName"></el-input> -->
                                                <span class="spangang">-</span>
                                                <el-select @change="areaNameclk(form.areaName)" size="small" style="width:28%" v-model="form.areaName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in areaName" :key="item.id" :label="item.name" :value="item.id">
                                                    </el-option>
                                                </el-select>
                                                <!-- <el-input class="compilezt" style="width:28%" size="small" :disabled="compilezt" v-model="form.areaName"></el-input> -->
                                            </el-form-item>
                                            <el-form-item label="商圈:">
                                                <el-select @change="businessNamefun(form.businessName)" size="small" style="width:99%" v-model="form.businessName" :disabled="compilezt" placeholder="请选择">
                                                    <el-option v-for="item in businessName" :key="item.value" :label="item.text" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <!-- <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.businessName"></el-input> -->
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form ref="form" label-width="100px">
                                            <el-form-item label="门店名称:">
                                                <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.name"></el-input>
                                            </el-form-item>
                                            <el-form-item label="台卡数量:">
                                                <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.cardNumber"></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系人:">
                                                <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.owner"></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系号码:">
                                                <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.phone">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="经纬度坐标:">
                                                <el-input class="compilezt" style="width:48%" size="small" :disabled="compilezt" v-model="form.longitude"></el-input>
                                                <el-input class="compilezt" style="width:50%" size="small" :disabled="compilezt" v-model="form.latitude"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="shopuditxqbox" style="margin-top: 40px;">
                        <div class="gglhtindex-top">
                            证件信息 <span class="newqyzjxx">{{form.shopKind}}</span>
                        </div>
                        <div class="shopuditxqbom">
                            <div class="fengexbox">
                                <el-row>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            营业执照
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-light fengex"></div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="imgzlbox">
                                <el-row :gutter="60">
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <div class="sfsfzbox">
                                                <div class="sfsfzbox2">
                                                    <img preview="0" :src="form.businessLicenceUrl" alt="">
                                                    <!-- <img preview="0" src="../../img/banner2.jpg" alt=""> -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                            <el-form ref="form" label-width="110px">
                                                <el-form-item label="营业执照名称:">
                                                    <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.shopKindName"></el-input>
                                                </el-form-item>
                                                <el-form-item label="注册号:">
                                                    <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.registrationMark"></el-input>
                                                </el-form-item>

                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="fengexbox">
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            身份证信息
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-light fengex"></div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="imgzlbox">
                                <el-row :gutter="60">
                                    <el-col :span="15">
                                        <div class="grid-content bg-purple">
                                            <el-row>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple">
                                                        <div class="scsfznewmd">
                                                            <img preview="0" :src="form.idCardAUrl" alt="">
                                                        </div>
                                                        <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div class="grid-content bg-purple-light">
                                                        <div class="scsfznewmd">
                                                            <img preview="0" :src="form.idCardBUrl" alt="">
                                                        </div>
                                                        <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="9">
                                        <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                            <el-form ref="form" label-width="80px">
                                                <el-form-item label="姓名:">
                                                    <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.idCardName"></el-input>
                                                </el-form-item>
                                                <el-form-item label="证件号码:">
                                                    <el-input class="compilezt" size="small" :disabled="compilezt" v-model="form.idCard"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="fengexbox">
                                <el-row>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            门店图片
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-light fengex"></div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="imgzlbox">
                                <div class="scsfznewmd2">
                                    <img preview="0" :src="form.listShopPhoto" alt="">
                                </div>
                                <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>

                            </div>
                            <div class="fengexbox">
                                <el-row>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            银行卡信息
                                        </div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="grid-content bg-purple-light fengex"></div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="imgzlbox">
                                <el-row :gutter="60">
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <div class="sfsfzbox">
                                                <div class="sfsfzbox2">
                                                    <img preview="0" :src="form.cardPhotoUrl" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="lookimg"> <i class="el-icon-zoom-in"></i> 点击图片放大</div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light" style="padding-top: 50px">
                                            <el-form ref="form" label-width="110px">
                                                <el-form-item label="姓名:">
                                                    <el-input size="small" :disabled="true" v-model="form.cardName"></el-input>
                                                </el-form-item>
                                                <el-form-item label="银行卡号:">
                                                    <el-input size="small" :disabled="true" v-model="form.bankCardNumber"></el-input>
                                                </el-form-item>
                                                <el-form-item label="所属银行:">
                                                    <el-input size="small" :disabled="true" v-model="form.cardOpenBank"></el-input>
                                                </el-form-item>
                                                <el-form-item label="银行开户行:">
                                                    <el-input size="small" :disabled="true" v-model="form.cardSubBank"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="台卡信息" name="second">
                    <div class="topcss">
                        <div class="topcss-top">
                            <i class="el-icon-search"></i> 筛选查询
                        </div>
                        <div class="topcss-cen">
                            输入搜索 :
                            <el-input class="topinputcss" placeholder="输入门店关键词" size="medium" prefix-icon="el-icon-search" v-model="searchinput" clearable>
                            </el-input>
                            台卡状态 :
                            <div class="toptimecss">
                                <el-select clearable style="width:120px" @change="optionsetdj(setval)" size="medium" v-model="setval" placeholder="请选择">
                                    <el-option v-for="item in optionset" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
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
                                    <el-table-column prop="cardId" label="台卡ID">
                                    </el-table-column>
                                    <el-table-column prop="shopName" label="所属门店">
                                    </el-table-column>
                                    <el-table-column prop="cardNumber" label="所属桌台">
                                        <template slot-scope="scope">
                                            <div class="">{{scope.row.cardNumber}}</div>
                                            <el-button class="buttonxl" size="mini" @click="redact(scope.row.cardId)">编辑</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="bindTime" label="绑定时间">
                                        <template slot-scope="scope">
                                            <div :data-id=scope.row.bindTime>{{ scope.row.bindTime| dateformat('YYYY-MM-DD') }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="macAddress" label="MAC地址">
                                    </el-table-column>
                                    <el-table-column prop="cardStatus" label="台卡状态">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.cardStatus=='ON'">开机</div>
                                            <div v-else> 关机</div>
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

                </el-tab-pane>
                <el-tab-pane label="收入明细" name="third">
                    <div class="topcss">
                        <div class="topcss-top">
                            <i class="el-icon-search"></i> 筛选查询
                        </div>
                        <div class="topcss-cen">
                            输入搜索 :
                            <el-date-picker class="topinputcss" size="medium" value-format="yyyy-MM-dd" v-model="searchinput2" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                            </el-date-picker>
                            <el-button class="searchbut" size="medium" type="" icon="el-icon-search" @click="search2()">搜索</el-button>

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
                                <el-table ref="multipleTable" border :data="tableData4" tooltip-effect="dark" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                                    <el-table-column type="index" label="序号" width="50px">
                                    </el-table-column>
                                    <el-table-column prop="date" label="日期">
                                        <template slot-scope="scope">
                                            <div :data-id=scope.row.date>{{ scope.row.date| dateformat('YYYY-MM-DD') }}</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="incomeType" label="收支类型">
                                        <template slot-scope="scope">
                                            <div v-if="scope.row.incomeType=='ADVERT'">
                                                广告收入
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="shopName" label="门店名称">
                                    </el-table-column>

                                    <el-table-column prop="amount" label="金额">
                                    </el-table-column>

                                </el-table>
                                <div class="block" style="margin-top: 30px;">
                                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="pageNumbercs2" :page-sizes="pageSizesList2" :page-size="ajaxdata2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber2">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>

                </el-tab-pane>
            </el-tabs>
        </template>
        <el-dialog title="编辑" :visible.sync="dialogVisible" top="250px" width="450px" :before-close="handleClose">
            <div>
                <div class="selectleft">负责人:</div>
                <el-input size="medium" class="selectright" placeholder="请输入内容" v-model="selectvalue" clearable>
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectchange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
 
 <script>
import {
  proxylowershopId,
  shopput,
  province, //以下省市区行业分类接口
  cityid,
  areaset,
  shopbusinessajax,
  shopindustry,
  shopindustrybusiness,
  shopincome, //收入明细
  shopcard, //台卡明细
  cardnumber //台卡桌号设置
} from "@/api/api";

export default {
  data() {
    return {
      selectvalue: "",
      dialogVisible: false, //设置负责人弹窗显示隐藏
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
      optionset: [
        {
          value: "ON",
          label: "在线"
        },
        {
          value: "OFF",
          label: "离线"
        }
      ],
      setval: "",
      pageNumbercs: 0, //初始页码
      pageSize: 10, //初始分页数量
      pageSizesList: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber: 0, //总数据
      ajaxdata: {
        // 请求数据的申请
        proxyId: this.$store.state.user.proxyId,
        pageSize: 10,
        pageNumber: 0,
        operateUserOderRule: undefined, //下拉赛选
        name: undefined,
        shopId: "",
        cardStatus: undefined
      },
      setval2: "",
      pageNumbercs2: 0, //初始页码
      pageSize2: 10, //初始分页数量
      pageSizesList2: [10, 15, 20, 30, 50], //一页多少数据
      totalDataNumber2: 0, //总数据
      ajaxdata2: {
        // 请求数据的申请
        pageSize: 10,
        pageNumber: 0,
        beginDate: undefined, //开始时间搜索
        endDate: undefined,
        shopId: ""
      },
      tableData3: [], //存放table数据的地方
      tableData4: [], //存放table数据的地方
      searchinput: undefined, //名字查询
      searchinput2: undefined, //tab3的时间查询
      compilebut: true, //编辑but开关
      compilezt: true, //控制编辑状态开关
      activeName2: "first",
      shopids: "", //商户ID
      form: {
        name: "",
        shopKind: "", //商户类型
        cardtype: "智能桌面广告机",
        shopname: "", //商户名称
        address: "", //地址
        phone: "", //手机号码
        owner: "", //联系人
        cardNumber: "", //台卡数量
        industryName: "", //所属行业
        industryBusinessName: "", //所属行业
        businessName: "", //商圈,
        coordinate: "", //经纬度
        longitude: "", //经度
        latitude: "", //纬度
        provinceName: "", //省
        cityName: "", //市
        areaName: "", //区
        businessLicenceUrl: "", //营业执照图
        registrationMark: "", //营业执照号码
        shopKindName: "", //营业执照名字
        idCardName: "", //身份证名字
        idCard: "", //身份证卡号
        idCardBUrl: "", //身份证背面
        idCardAUrl: "",
        listShopPhoto: "", //门店图片
        cardPhotoUrl: "", //银行卡图片
        cardName: "", //银行卡名字
        bankCardNumber: "", //银行卡卡号
        cardOpenBank: "", //银行开户行
        cardSubBank: "", //银行开户行
        shoptype: "" //门店类别
      },
      industryBusinessName: [], //行业子分类
      industryName: [], //行业分类
      businessName: [], //商圈
      provinceName: [], //省
      cityName: [], //市
      areaName: [], //区
      industryBusinessId: "", //行业子分类ID
      industryId: "", //行业分类ID
      businessId: "", //商圈ID
      provinceId: "", //省ID
      cityId: "", //市ID
      areaId: "", //区ID
      cardIdL: "" //台卡ID
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    selectchange() {
      //编辑负责人
      let json = {
        cardId: this.cardId,
        cardNumber: this.selectvalue
      };
      cardnumber(json)
        .then(r => {
          console.log(r);
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "编辑成功",
              type: "success"
            });
            this.table();
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
    redact(id) {
      //编辑显示负责人
      this.dialogVisible = true;
      this.cardId = id;
      this.selectvalue = "";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    compile() {
      //编辑
      this.compilezt = false;
      this.compilebut = false;
    },
    compilebutqx() {
      //取消编辑
      this.compilezt = true;
      this.compilebut = true;
    },
    compilebutbc() {
      //保存编辑
      this.compilezt = true;
      this.compilebut = true;
      let data = {
        longitude: this.form.longitude,
        latitude: this.form.latitude,
        cardNumber: this.form.cardNumber,
        id: this.shopids,
        industryId: this.industryId, //行业ID
        industryBusinessId: this.industryBusinessId, //子行业Id,
        provinceId: this.provinceId, //省
        cityId: this.cityId, //市Id,
        areaId: this.areaId, //区Id,
        owner: this.form.owner, //联系人,
        phone: this.form.phone, //电话,
        address: this.form.address, //地址,
        businessId: this.businessId, //商圈Id,
        shopKindName: this.form.shopKindName, //营业执照名称,
        registrationMark: this.form.registrationMark, //营业执照注册号,
        idCardName: this.form.idCardName, //身份证姓名,
        idCard: this.form.idCard, //身份证号
        name: this.form.name
      };
      shopput(data)
        .then(r => {
          console.log(r);
          if (r.data.success == true) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            });
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
    },
    businesset() {
      //行业获取
      shopindustry()
        .then(r => {
          console.log(r);
          this.industryName = r.data.rows;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    provinceset() {
      //省获取
      province()
        .then(r => {
          console.log(r);
          this.provinceName = r.data.data;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    provinceclk(id) {
      //市
      this.form.cityName = ""; //市
      this.form.areaName = ""; //区
      this.form.businessName = ""; //商圈
      this.provinceId = id;
      cityid(id)
        .then(r => {
          console.log(r);
          this.cityName = r.data.data;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    cityNameclk(id) {
      //区
      this.form.areaName = ""; //区
      this.form.businessName = ""; //商圈
      this.cityId = id;
      areaset(id)
        .then(r => {
          console.log(r);
          let data = r.data.data;
          if (data[0].name == "市辖区" && data.length > 1) {
            let m = data.slice(0);
            m.shift();
            this.areaName = m;
          } else {
            this.areaName = data;
          }
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    areaNameclk(id) {
      this.form.businessName = ""; //商圈
      this.areaId = id;
      shopbusinessajax(id)
        .then(r => {
          console.log(r);
          this.businessName = r.data;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    industryNamefun(id) {
      //子行业获取
      this.form.industryBusinessName = "";
      this.industryId = id;
      shopindustrybusiness(id)
        .then(r => {
          console.log(r);
          this.industryBusinessName = r.data.rows;
        })
        .catch(r => {
          this.$message.error("服务器出错");
        });
    },
    industryBusinessNamefun(id) {
      //子分类获取
      this.industryBusinessId = id;
    },
    businessNamefun(id) {
      this.businessId = id;
    },
    optionsetdj(setval) {
      //赛选状态查询
      if (setval == "ALL") {
        this.ajaxdata.cardStatus = undefined;
        this.table();
      } else {
        this.ajaxdata.cardStatus = setval;
        this.table();
      }
    },
    search() {
      //搜索
      if (this.searchinput != "" && this.searchinput != undefined) {
        this.ajaxdata.name = this.searchinput;
      } else {
        this.ajaxdata.name = undefined;
      }
      this.table();
    },
    search2() {
      //搜索
      if (this.searchinput2 != "" && this.searchinput2 != undefined) {
        this.ajaxdata2.beginDate = this.searchinput2[0];
        this.ajaxdata2.endDate = this.searchinput2[1];
      } else {
        this.ajaxdata2.beginDate = undefined;
        this.ajaxdata2.endDate = undefined;
      }
      this.table2();
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
      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
      this.ajaxdata.pageSize2 = val;
      this.table2();
    },
    handleCurrentChange2(val) {
      //表格页面点击
      console.log(`当前页: ${val}`);
      this.pageNumbercs2 = val;
      this.ajaxdata2.pageNumber = (val - 1) * this.pageSize2;
      this.tabl2e();
    },
    table() {
      //表格数据接口
      shopcard(this.ajaxdata)
        .then(response => {
          this.tableData3 = response.data.rows;
          this.totalDataNumber = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    },
    table2() {
      //表格数据接口
      shopincome(this.ajaxdata2)
        .then(response => {
          console.log(response);
          this.tableData4 = response.data.rows;
          this.totalDataNumber2 = response.data.total;
        })
        .catch(response => {
          console.log(response);
        });
    }
  },
  mounted: function() {
    //挂载结束状态
    this.provinceset(); //省获取
    this.businesset(); //行业
    this.shopids = this.$route.query.id;
    this.ajaxdata.shopId = this.$route.query.id;
    this.ajaxdata2.shopId = this.$route.query.id;

    this.table();
    this.table2();
    proxylowershopId(this.shopids)
      .then(r => {
        console.log(r);
        let data = r.data.data;
        if (data.shopKind == "COMPANY") {
          this.form.shopKind = "企业";
        } else if (data.shopKind == "PERSONAL") {
          this.form.shopKind = "个体商户";
        }
        this.form.name = data.name; //门店名称
        this.form.address = data.address; //地址
        this.form.provinceName = data.provinceName; //
        this.form.cityName = data.cityName; //
        this.form.businessName = data.businessName; //
        this.form.owner = data.owner; //
        this.form.phone = data.phone; //
        this.form.cardNumber = data.cardNumber; //台卡数量
        this.form.industryName = data.industryName; //
        this.form.areaName = data.areaName; //
        this.form.industryBusinessName = data.industryBusinessName; //
        this.form.coordinate = data.latitude + " - " + data.longitude; //
        this.form.businessLicenceUrl = data.businessLicenceUrl; //
        this.form.shopKindName = data.shopKindName; //
        this.form.registrationMark = data.registrationMark; //
        this.form.idCardName = data.idCardName; //
        this.form.idCard = data.idCard; //
        this.form.listShopPhoto = data.protocolUrl;
        this.form.idCardAUrl = data.idCardAUrl;
        this.form.idCardBUrl = data.idCardBUrl;
        this.form.cardPhotoUrl = data.cardPhotoUrl;
        this.form.cardName = data.cardName; //银行卡名字
        this.form.bankCardNumber = data.bankCardNumber; //银行卡卡号
        this.form.cardOpenBank = data.cardOpenBank; //银行开户行
        this.form.cardSubBank = data.cardSubBank; //银行开户行
        this.form.latitude = data.latitude;
        this.form.longitude = data.longitude;
        this.industryBusinessId = data.industryBusinessId; //行业子分类ID
        this.industryId = data.industryId; //行业分类ID
        this.businessId = data.businessId; //商圈ID
        this.provinceId = data.provinceId; //省ID
        this.cityId = data.cityId; //市ID
        this.areaId = data.areaId; //区ID
      })
      .catch(r => {
        this.$message.error("服务器出错");
      });
  }
};
</script>
 
 <style rel="stylesheet/scss" lang="scss">
.shopxq {
  .topcss-top {
    margin-top: 30px;
  }
  .compilezt input,
  .el-select input {
    border: 1px solid rgb(0, 204, 203);
  }
  .el-tabs__item {
    font-size: 16px;
    font-weight: bold;
  }
  .el-tabs__item.is-active {
    color: #00cccb;
  }
  .el-tabs__item:hover {
    color: #00cccb;
  }
  .el-tabs__item.is-active {
    color: #00cccb;
  }
  .el-tabs__active-bar {
    background: #00cccb;
  }
  .newqyzjxxrig {
    float: right;
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    margin-top: 5px;
    border-radius: 6px;
    background-color: #00cccb;
    color: #fff;
    margin-right: 20px;
    cursor: pointer;
  }
  .shopuditxqbox {
    width: 90%;
    margin: auto;
    min-width: 950px;
    background: #fff;
    .newqyzjxx {
      padding-left: 8px;
      padding-right: 8px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      margin-left: 20px;
      margin-top: 5px;
      border-radius: 6px;
      background-color: #00cccb;
      color: #fff;
    }
    .fengex {
      border-bottom: 1px solid #e1e6ef;
      height: 8px;
    }
    .imgzlbox {
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .sfsfzbox {
      width: 350px;
      //   height: 300px;
      border: 1px dashed #999999;
      padding: 25px;
      margin: auto;
    }
    .sfsfzbox2 {
      width: 100%;
      height: 100%;
      border: 1px solid #5e5e5e;
      text-align: center;
      /* line-height: 380px; */
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .fengexbox {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .lookimg {
      font-size: 14px;
      color: #676a6c;
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
    }
    .scsfznewmd {
      width: 200px;
      //   height: 150px;
      border: 1px solid #999999;
      padding: 20px;
      margin: auto;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .scsfznewmd2 {
      width: 65%;
      border: 1px solid #999999;
      padding: 20px;
      margin: auto;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
  .gglhtindex-top {
    margin-top: 30px;
    height: 40px;
    background-color: #f6fafd;
    border-bottom: 1px solid #e1e6ef;
    padding: 0px 0px 0px 30px;
    color: #7d858c;
    line-height: 40px;
    font-size: 14px;
  }
  .shopuditxqbom {
    background: #fff;
    padding: 30px;
  }
  .el-input.is-disabled .el-input__inner {
    background: #fff;
    color: #606266;
  }
  .spangang {
    display: inline-block;
    width: 7%;
    text-align: center;
  }
  .shenhebut {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    button {
      width: 80%;
      background: #00cccb;
      color: #fff;
      border: 1px solid #00cccb;
    }
  }
}
</style>
 