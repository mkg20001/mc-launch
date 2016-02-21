const download=require("./download");

function list(name,c) {
  if (!name) name="Download";
  var running=false;
  var qu=[];
  var drain=false;
  function que() {
    running=true;
    var n=qu.pop();
    download(n.data,n.path,function(err,data) {
      n.c(err,data);
      if (qu.length>0) {
        que();
      } else {
        running=false;
        if (drain) {
          c();
        }
      }
    });
  }
  function attach(data,path,c) {
    qu.push({data:data,path:path,c:c});
    if (!running) {
      que();
    }
  }
  return {a:attach};
}
module.exports=list;
