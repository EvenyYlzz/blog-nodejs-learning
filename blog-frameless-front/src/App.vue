<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <p>
      {{store.state.username ? `登录用户: ${store.state.username}` : `未登录`}}
    </p>
    <!-- <router-link to="/about">About</router-link> -->
    <router-view/>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'

export default{
  setup() {
    const store = useStore()

    const loginCheck = () => {
      axios.get('http://localhost:8000/api/user/login-test').then(json => {
        return json.data
      }).then(res => {
        if (res.errno === 0) {
          console.log('res', res)
        }
      })
    }

    onMounted(() => {
      loginCheck()
    })

    return {
      store,
    }
  },
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
