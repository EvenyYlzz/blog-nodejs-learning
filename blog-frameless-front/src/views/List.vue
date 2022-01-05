<template>
  <div>
    <div v-for="(data, index) in blogList" :key="index">
      <p>标题：{{data.title}}</p>
      <p>内容：{{data.content}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {  ref } from 'vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    // const blogList = reactive([])
    const blogList = ref([])

    const store = useStore()

    onMounted(() => {
      if (store.state.username) {
        let query = {
          author: store.state.username,
        }
        axios.get(`http://localhost:8000/api/blog/list?author=${query.author}`).then(json => {
          return json.data
        }).then(res => {
          if (res.errno === 0) {
            blogList.value = res.data
          }
        })
      }
    });

    return {
      blogList,
    }
  }
}
</script>

<style>

</style>