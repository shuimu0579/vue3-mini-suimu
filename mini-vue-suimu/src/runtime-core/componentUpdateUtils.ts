
export function shouldUpdateComponent(preVNode,nextVNode){
  const {props: prevProp} = preVNode;
  const {props: nextProp} = nextVNode;

  for (const key in nextProp) {
    if(nextProp[key] !== prevProp[key]){
      return true
    }
    return false;
  }

}
