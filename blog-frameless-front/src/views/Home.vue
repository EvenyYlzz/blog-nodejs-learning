<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

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
