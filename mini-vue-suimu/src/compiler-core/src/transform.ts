// transform就是对parse生成之后的AST进行增删改查

import { NodeTypes } from "./ast";
import { TO_DISPLAY_STRING } from "./runtimeHelpers";

// options机制，做到不变代码和可变代码的分离
export function transform(root, options = {}){
  const context = createTransformContext(root, options)
  // 1.遍历--深度优先搜索
  traverseNode(root, context);
  // 2.修改 text content

  // root.codegenNode
  createRootCodegen(root)

  root.helpers = [...context.helpers.keys()]
}

function createRootCodegen(root:any){
  const child = root.children[0];
  // console.log('child', child)
  if(child.type === NodeTypes.ELEMENT){
    root.codegenNode = child.codegenNode
  }else{
    root.codegenNode = root.children[0];
  }
}
function traverseNode(node: any, context) {
  console.log('traverseNode', node);
  // 1.element
  const nodeTransforms = context.nodeTransforms;
  const exitFns:any = [];
  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    const onExit = transform(node, context);
    if(onExit) exitFns.push(onExit);
  }
  console.log('node',node)

  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING)
      break;

    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverseChildren(node, context);
      break;
  
    default:
      break;
  }

  let i = exitFns.length;
  while(i--){
    exitFns[i]()
  }
}

function traverseChildren(node, context){
  let children = node.children
  for(let i = 0; i < children.length;i++){
    const node = children[i];
    traverseNode(node, context)
  }
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key){
      context.helpers.set(key, 1)
    }
  }

  return context;
}

