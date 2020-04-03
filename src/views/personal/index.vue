<template>
  <div class="personal noPadding">
    <div class="personal_h">
      <div class="perh_d1">
        <div class="perh_info">
          <p class="perh_p0">{{ userName }}</p>
          <div class="chatBox">
            <a href="javascript:;"><i class="iconfont el-icon-weixin"></i></a>
            <a href="javascript:;"><i class="iconfont el-icon-twitter"></i></a>
            <a href="javascript:;"><i class="iconfont el-icon-weibo"></i></a>
          </div>
          <p>{{ introduce }}</p>
        </div>
        <img src="../../assets/personal/user01.jpg" />
        <div class="rightIcon">
          <span style="margin-right: 20px;"
            ><i class="el-icon-star-on"></i>Collection</span
          >
          <span><i class="el-icon-chat-dot-round"></i>Message</span>
        </div>
      </div>
    </div>
    <el-tabs>
      <el-tab-pane label="文件操作记录">
        <!-- <el-button type="primary" slot="label">Timeline</el-button> -->
        <el-timeline :data="userLoadHistory">
          <el-timeline-item v-for="(load, index) in fileHistory" :key="index" :timestamp="load.createTime" placement="top">
            <el-card>
              <h4> {{load.operateType == 'upload' ? '上传' : '下载'}}了 {{load.fileName}}</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="试题操作记录">
        <el-timeline :data="userLoadHistory">
          <el-timeline-item v-for="(load, index) in paperHistory" :key="index" :timestamp="load.createTime" placement="top">
            <el-card>
              <h4> 生成了 {{load.paperName}}</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'

export default {
  data() {
    return {
      fileHistory: [],
      paperHistory: []
    }
  },
  computed: {
    ...mapGetters(['userName', 'introduce'])
  },
  mounted() {
    this.getUserLoadData()
  },
  methods: {
    async getUserLoadData() {
      let response = await API.user.getUserLoad()
      if (response.status === 200) {
        this.fileHistory = response.data.fileVoList
        this.paperHistory = response.data.paperVoList
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.personal_h {
  width: 100%;
  height: 230px;
  background: url(../../assets/personal/personBg.jpg) no-repeat center center;
  background-size: cover;
  .perh_d1 {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    color: #58666e;
    & > img {
      position: absolute;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      top: 60px;
      left: 50px;
    }
    .perh_info {
      padding: 59px 0 0 172px;
      .perh_p0 {
        font-size: 20px;
        margin-bottom: 6px;
      }
    }
    .chatBox {
      .iconfont {
        vertical-align: middle;
      }
      a {
        width: 30px;
        height: 30px;
        display: inline-block;
        background-color: #edf1f2;
        color: #58666e !important;
        border: 1px solid #e4e4e4;
        box-shadow: 0 1px 1px rgba(90, 90, 90, 0.1);
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        margin-bottom: 12px;
        &:hover {
          background-color: #e4e4e4;
        }
      }
    }
    .rightIcon {
      position: absolute;
      top: 94px;
      right: 50px;
      color: #333;
      span {
        font-size: 20px;
        i {
          font-size: 18px;
          margin-right: 5px;
          color: #333;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.personal {
  .el-tabs__header {
    padding: 15px 0;
    background: #fff;
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px;
  }
  .el-tabs__nav-wrap {
    padding-left: 20px;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__content {
    padding: 0 20px;
  }
}
</style>
