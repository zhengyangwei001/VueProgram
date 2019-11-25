<template>
  <div class="tab-control">
    <div class="tab-control-item" 
    v-for="(item,itemIndex) in titles" :key="itemIndex"
    :class="{active:itemIndex === currentIndex}" @click="itemClick(itemIndex)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContol',
  props:{
     titles:{
        type:Array,
        default(){
          return []
        }
      }
  },
  data () {
    return {
     currentIndex:0,
    };
  },
  components: {},
  mounted () {},
  methods: {
    itemClick(itemIndex){
      this.currentIndex = itemIndex;
      this.$emit('tabClick',itemIndex);
    }
  }
}
</script>

<style  scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size:15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 9;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding:5px;
  }
  .active{
    color: var(--color-height-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>