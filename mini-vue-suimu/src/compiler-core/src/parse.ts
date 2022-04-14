import { NodeTypes } from "./ast";

const enum TagType {
  Start,
  End
}

export function baseParse(content:string){
  const context = createParserContext(content);
  return createRoot(parseChildren(context))
}

function parseChildren(context){
  const nodes:any = [];
  
  let s = context.source;
  let node;
  if(s.startsWith("{{")){
    node = parseInterpolation(context)
  }else if(s[0] === "<"){
    if(/[a-z]/i.test(s[1])){
      node = parseElement(context);
    }
  }

  if(!node){
    node = parseText(context);
  }

  nodes.push(node);
  return nodes
}

function parseInterpolation(context){
  // {{message}}
  // 将变化点几种在一起，保证的代码的可复用性
  const openDelimiter = "{{";
  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);
  console.log('closeIndex', closeIndex);
  advanceBy(context, openDelimiter.length);
  const rawContentLength = closeIndex - openDelimiter.length; 
  const rawContent = parseTextData(context, rawContentLength);
  const content = rawContent.trim();
  advanceBy(context, closeDelimiter.length);
  return {
    type: NodeTypes.INTERPOLATION,
    content:{
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content
    }
  } 
}

// advanceBy指针不断前移,不断解析文本的过程
function advanceBy(context: any, length:number){
  context.source = context.source.slice(length)
}

function createRoot(children){
  return {
    children
  }
}
function createParserContext(content: string) {
  return {
    source:content
  }
}

function parseElement(context: any) {
  // 1.解析tag
  const element = parseTag(context, TagType.Start);
  parseTag(context, TagType.End)
  console.log('------',context.source)
  return element;
}

function parseTag(context:any, type:TagType){
  const match:any = /^<\/?([a-z]*)/i.exec(context.source);
  // console.log(match);
  const tag = match[1]
  // 2.删除处理完成的代码
  advanceBy(context, match[0].length);
  console.log('parseTag',context.source)
  advanceBy(context, 1);

  if(type === TagType.End) return;
  return {
    type:NodeTypes.ELEMENT,
    tag
  }
}

function parseText(context: any): any {
  const content = parseTextData(context, context.source.length);
  console.log(context.source.length);
  return {
    type: NodeTypes.TEXT,
    content
  }
}

function parseTextData(context, length){
  // 1.获取content
  const content = context.source.slice(0, length);
  // 2.advanceBy推进
  advanceBy(context,length);
  console.log('parseText',context.source)
  return content
}
