<template>
  <div class="home">
    <HelloWorld msg="欢迎来到2022博客系统～"/>
    <el-button type="primary" disabled style="margin-right: 10px">注册</el-button>
    <router-link to="/login">
      <el-button type="primary">登录</el-button>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    let query = {
      author: 'zhangsan',
    }
    axios.get(`http://localhost:8000/api/blog/list?query=${query.author}`).then(json => {
      return json.data
    }).then(res => {
      console.log('res', res)
    })
  }
}
</script>
