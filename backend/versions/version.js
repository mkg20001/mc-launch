const j=require("../JSON");
const installer=require("../install");

function vvv(v,b) {
  function install(path) {
    return new installer(b,path);
  }
  return {v:v,d:b,install:install};
}

function version(data,c) {
  j(data.url,function(e,b) {
    if (e) throw e;
    c(new vvv(data,b));
  });
}

module.exports=version;
