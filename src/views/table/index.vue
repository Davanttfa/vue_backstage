<template>
  <div class="app-container">
    123
  </div>
</template>

<script>
import { getList } from '@/api/table'
import store from '../../store'

console.log(store.getters.proxyId)
console.log(store.getters.token)


export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
