// 设置全局过滤器对应的函数
export function date(timestamp){
  let ts=parseInt(timestamp);
  let date=new Date(ts);
  let year=date.getFullYear();
  let month=date.getMonth()+1;
  let day=date.getDate();

  return `${year}-${month}-${day}`;
}

// 过滤器：补全服务器返回的html中的图片提示
export function fullImage(html){
  let baseURL="http://101.96.128.94:9999/mfresh/";
  return html.replace(/<img src="/g, '<img src="'+baseURL);
}