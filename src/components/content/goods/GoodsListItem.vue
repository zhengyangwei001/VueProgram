<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }

  },
  data () {
    return {
      
    };
  },
  components: {},
  mounted () {},
  methods: {
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push("/detail/"+this.goodsItem.iid)
    }
  }
}
</script>

<style  scoped>

.goods-list-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 30px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
