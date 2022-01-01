<template>
  <div style="width:200px;">
    <el-input v-model="username" placeholder="请输入账号" />
    <el-input v-model="password" placeholder="请输入密码" />
    <el-button @click="login" type="primary">登录</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  mounted() {
  },
  methods: {
    login() {
      axios.post('http://localhost:8000/api/user/login', {
        username: this.username,
        password: this.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(json => {
        return json.data
      }).then(res => {
        console.log('res', res)
      })
    }
  }
}
</script>
