<template>
  <div>
    <p>
      <span>账号：</span>
      <el-input style="width: 200px;" v-model="username" placeholder="请输入账号" />
    </p>
    <p>
      <span>密码：</span>
      <el-input style="width: 200px;" v-model="password" placeholder="请输入密码" />
    </p>
    <el-button @click="login" type="primary">登录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

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
      if (!this.username || !this.password) {
        ElMessage({
          message: '请将用户名或密码输入完成后再点击登录!',
          type: 'warning',
        })
        return
      }
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
        this.loginResult(res)
      })
    },
    loginResult(resObj) {
      ElMessageBox.alert(`登录${resObj.errno === -1 ? '失败' : '成功'}`, '登录结果', {
        confirmButtonText: '确定',
        type: resObj.errno === -1 ? 'error' : 'success',
      })
    }
  }
}
</script>
