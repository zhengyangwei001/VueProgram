<template>
  <div>
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem'

export default {
  name: '',
  data () {
    return {
      
    };
  },
  components: {
    CartListItem,
  },
  mounted () {},
  methods: {},
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style  scoped>
</style>