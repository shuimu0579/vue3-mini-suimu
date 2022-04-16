import { NodeTypes } from "./ast";

const enum TagType {
  Start,
  End
}

export function baseParse(content:string){
  const context = createParserContext(content);
  return createRoot(parseChildren(context, []))
}

function parseChildren(context, ancestors){
  const nodes:any = [];

  while(!isEnd(context, ancestors)){
    let s = context.source;
    let node;
    if(s.startsWith("{{")){
      node = parseInterpolation(context)
    }else if(s[0] === "<"){
      if(/[a-z]/i.test(s[1])){
        node = parseElement(context, ancestors);
      }
    }
  
    if(!node){
      node = parseText(context);
    }
  
    nodes.push(node);
  }
  
  return nodes
}

function isEnd(context, ancestors){
  // 1.source 有值的时候
  // 2.当遇到结束标签的时候
  let s = context.source
  if(s.startsWith("</")){
    for(let i = ancestors.length - 1; i >= 0; i--){
      const tag = ancestors[i].tag;
      if(startsWithEndTagOpen(s, tag)){
        return true;
      }
    }
  }
  // if(parentTag && s.startsWith(`</${parentTag}>`)){
  //   return true
  // }
  return !s
}

function parseInterpolation(context){
  // {{message}}
  // 将变化点几种在一起，保证的代码的可复用性
  const openDelimiter = "{{";
  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(closeDelimiter, openDelimiter.length);
  // console.log('closeIndex', closeIndex);
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

function parseElement(context: any, ancestors) {
  // 1.解析tag
  const element: any = parseTag(context, TagType.Start);
  ancestors.push(element);
  element.children = parseChildren(context, ancestors);
  ancestors.pop();

  // console.log(element.tag);
  // console.log(context.source);
  if(startsWithEndTagOpen(context.source, element.tag)){
    parseTag(context, TagType.End)
  }else{
    throw new Error(`缺少结束标签：${element.tag}`)
  }
  
  // console.log('------',context.source)
  return element;
}

function startsWithEndTagOpen(source, tag){
  return source.startsWith('</') && source.slice(2, 2+tag.length).toLowerCase() === tag.toLowerCase()
}

function parseTag(context:any, type:TagType){
  const match:any = /^<\/?([a-z]*)/i.exec(context.source);
  // console.log(match);
  const tag = match[1]
  // 2.删除处理完成的代码
  advanceBy(context, match[0].length);
  // console.log('parseTag',context.source)
  advanceBy(context, 1);

  if(type === TagType.End) return;
  return {
    type:NodeTypes.ELEMENT,
    tag
  }
}

function parseText(context: any): any {
  let endIndex = context.source.length;
  let endTokens = ["<","{{"];
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i]);
    if(index !== -1 && endIndex > index){
      endIndex = index;
    }
  }

  const content = parseTextData(context, endIndex);
  // console.log(context.source.length);
  // console.log("content----", content);
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
  // console.log('parseText',context.source)
  return content
}
