const download=require("./download");

function list(name) {
  if (!name) name="Download";
  var running=false;
  var qu=[];
  var drain=false;
  var doing=false;
  var cb=[];
  function ddr() {
    while(cb.length>0) {
      try {
        cb.pop()();
      } catch(e) {
        console.log("[LIST] callback error: "+e);
      }
    }
  }
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
          ddr();
        }
      }
    });
  }
  function start() {
    doing=true;
    if (!running && doing) {
      running=true;
      process.nextTick(function() {
        que();
      });
    }
    return true;
  }
  function attach(data,path,c) {
    if (drain) {
      return false;
    }
    qu.push({data:data,path:path,c:c});
    if (!running && doing) {
      running=true;
      process.nextTick(function() {
        que();
      });
    }
    return true;
  }
  function draining(cal) {
    drain=true;
    if (typeof cal=="function") {
      cb.push(cal);
    }
    if (!running && doing) {
      ddr();
    }
  }
  return {a:attach,s:start,d:draining};
}
module.exports=list;
