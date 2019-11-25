<template>
  <div class="recommend">
    <div v-for="(item,itemIndex) in recommends" :key="itemIndex" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: '',
  props:{
    recommends:{
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
  components: {},
  mounted () {},
  methods: {}
}
</script>

<style  scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommends-item{
  flex: 1;
}
.recommends-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 12px;
}
</style>