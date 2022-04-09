import { h, ref, getCurrentInstance, nextTick} from '../../lib/guide-mini-vue.esm.js';
import NextTicker from "./NextTicker.js";

export default {
  name: "App",
  setup() {
    const count  = ref(1);
    const instance = getCurrentInstance()
    function onClick(){
      for(let i = 0; i<100; i++){
        console.log('update');
        count.value = i;
      }

      // count.value有修改之后，通过queueJobs()异步的进行视图更新。
      // 将视图更新变成异步的，那么怎么获取到异步更新之后的元素呢？ vue3暴露出来了nextTick Api供咱们调用
      console.log(instance);
      nextTick(()=>{
        console.log(instance);
      })
      // await nextTick()
      // console.log(instance);
    }

    return {onClick, count}
  },

  render() {
    const button = h("button", {onClick: this.onClick}, "update");
    const p = h("p", {}, "count:" + this.count);
    return h("div", { tId: 1 }, [button,p]);
    // return h("div", { tId: 1 }, [h("p", {}, "主页"), h(NextTicker)]);
  },
};
