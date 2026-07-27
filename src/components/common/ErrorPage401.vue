<!-- 401 无权限页面 -->
<script lang="ts">
export default {
  name: 'ErrorPage401',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  /** 返回首页路径 */
  homePath?: string
  /** 自定义 401 图片 */
  errImage?: string
}>(), {
  homePath: '/',
  errImage: '',
})

const emit = defineEmits<{
  (e: 'back'): void
}>()

const dialogVisible = ref(false)

function handleBack() {
  emit('back')
}
</script>

<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="handleBack">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <a :href="homePath"> 回首页 </a>
          </li>
          <li class="link-type">
            <a href="https://www.taobao.com/">随便看看</a>
          </li>
          <li>
            <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errImage || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 313 428%22%3E%3Crect width=%22313%22 height=%22428%22 fill=%22%23f0f0f0%22/%3E%3Ctext x=%22156.5%22 y=%22220%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2224%22%3E401%3C/text%3E%3C/svg%3E'"
          width="313"
          height="428"
          alt="401 Unauthorized"
        />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="随便看">
      <img
        src="https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646"
        class="pan-img"
      />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    color: #fff;
    background: #008489;
    border: none !important;
  }

  .pan-img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
