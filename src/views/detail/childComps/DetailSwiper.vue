<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,itemIndex) in  topImages" :key="itemIndex">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: '',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      
    };
  },
  components: {
    Swiper,SwiperItem
  },
  mounted () {},
  methods: {}
}
</script>

<style  scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>