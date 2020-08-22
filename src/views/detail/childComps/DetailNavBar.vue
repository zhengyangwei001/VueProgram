<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" :class="{active: itemIndex === currentIndex}" 
        v-for="(item,itemIndex) in titles" :key="itemIndex" @click="itemClick(itemIndex)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    };
  },
  components: {
    NavBar,
  },
  mounted () {},
  methods: {
    itemClick(itemIndex){
      this.currentIndex = itemIndex
      this.$emit('titleClick',itemIndex)
    },
    backClick(){
      this.$router.back()
    },
   
  }
}
</script>

<style  scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text)
}
.back img{
  margin-top: 10px;
}
</style>