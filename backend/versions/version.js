const j=require("../JSON");
const installer=require("../install");

function vvv(v,b) {
  function install(path,c) {
    return new installer(b,path,c);
  }
  function launch(path,user,c) {
    return new installer(b,path,function(game) {
      game.launch(user);
    });
  }
  return {v:v,d:b,install:install,launch:launch};
}

function version(data,c) {
  j(data.url,function(e,b) {
    if (e) throw e;
    c(new vvv(data,b));
  });
}

module.exports=version;
