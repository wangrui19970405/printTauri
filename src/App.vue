<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import {
  Edit
} from '@element-plus/icons-vue'
const drawer = ref(false)
const formData = ref({
  title: "小龙坎",
  Date: "",
  number: "13",
  money: "10221",
  print_date: ""
})

const get_time = () => {
  let date = new Date()
  
}


// 打印小票 windows.print()方式
const handlePrintWithWindows = () =>{
  var iframe=document.getElementById("print-iframe");
  if(!iframe){
            var el = document.getElementsByClassName("paper-box");
            iframe = document.createElement('IFRAME');
            var doc = null;
            iframe.setAttribute("id", "print-iframe");
            iframe.setAttribute('style', 'width:100%;font-family: FangSong_GB2312;');
            document.body.appendChild(iframe);
            doc = iframe.contentWindow.document;
            //这里可以自定义样式
            doc.write('<style media="print">@page {size: auto;margin: auto;}</style>'); //解决出现页眉页脚和路径的问题
            doc.write('<div>' + el.innerHTML + '</div>');
            doc.close();
            iframe.contentWindow.focus();
    }
  setTimeout(function(){ iframe.contentWindow.print();},50)  //解决第一次样式不生效的问题
  if (navigator.userAgent.indexOf("MSIE") > 0){
      document.body.removeChild(iframe);
  }
}

// 提交销售
const pull_date = () => {
  ElMessageBox.confirm('确认提交？').then(() => {
    handlePrintWithWindows()
    drawer.value = false
  }).catch((e) => {
    console.log(e);
  })
}

// 下拉抽屉关闭之前
const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭吗？').then(() => {
    done()
  }).catch((e) => {
    console.log(e);
  })
}
</script>

<template>
  <div class="main_box">
    <el-drawer title="销售填报" v-model="drawer" size="100%" direction="ttb" :show-close="false" :before-close="handleClose">
      <el-form :inline="true" v-model="formData">
        <el-form-item label="经营店铺">
          <el-input v-model="formData.title" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="售出单数">
          <el-input v-model="formData.number" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="销售日期">
          <el-date-picker v-model="formData.Date" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="销售总额">
          <el-input v-model="formData.money" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" style="float: right;margin-top: 20%;margin-left: 250%;"
            @click="pull_date">提交并打印</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!--startprint-->
    <div id="print1" class="paper-box">
      <h2 class="title">销售日结单</h2>
      <div class="d_line">====================================</div>
      <div class="conti"><span>店铺:</span> <span style="float: right;margin-top: 1.5%">{{ formData.title }}</span></div>
      <div class="d_line">====================================</div>
      <div class="conti"><span>单据数量:</span> <span style="float: right;margin-top: 1.5%">{{ formData.number }}单</span></div>
      <div class="d_line">====================================</div>
      <div class="conti"><span>销售金额:</span> <span style="float: right;margin-top: 1.5%">{{ formData.money }}</span></div>
      <div class="d_line">====================================</div>
      <div class="conti"><span>日结金额:</span> <span style="float: right;margin-top: 1.5%">{{ formData.money }}</span></div>
      <div class="d_line">====================================</div>
      <div class="conti"><span>经营日期:</span> <span style="float: right;margin-top: 1.5%">{{ formData.Date }}</span></div>
    </div>
    <!--endprint-->
    <div class="item-box" style="margin-bottom: 15%;margin-top: 5%;">
      <el-button class="sub-button" type="primary" style="float: right;" @click="drawer = true" :icon="Edit" round>填报销售</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media print {
  .item-box {
    display: none;
    .sub-button {
      display: none;
    }
  }
}
:root {
  overflow-x: hidden;
  width: 100%;

  .main_box {
    overflow-x: hidden; //禁止左右滑动
    -webkit-touch-callout:none; /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none; 
    .paper-box {
      h2 {
        margin-top: 7%;
        margin-bottom: 7%;
      }

      .title {
        width: 100%;
        margin-left: 35%;
      }

      .d_line {
        margin-left: 8%;
      }

      .conti {
        width: 300px;
        margin-top: 0.5%;
        margin-left: 10%;
        margin-bottom: 0.5%;
      }
    }
  }
}
</style>
