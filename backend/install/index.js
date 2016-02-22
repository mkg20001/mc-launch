const d=require("../download");
const mk=require("mkdirp");
const pt=require("path");
const game=require("./game");
function downloader(data,path,c) {
  const list=new d.list();
  var ps={};
  mk(path);
  ["natives","game","assets","libraries","client"].map(function(f) {
    mk(pt.normalize(path+"/"+f));
    ps[f]=pt.normalize(path+"/"+f);
  });
  d.assets(list,data.assetIndex,ps.assets,function() {
    var libs=data.libraries.map(function(l) {
      return d.lib(list,l,ps.libraries);
    });
    list.a(data.downloads.client,ps.client+"/minecraft.jar", function(err) {
      if (err) {
        console.log("[ERR] game can´t launch / DOWNLOAD ERROR: : "+err);
      }
    });
    list.d(function() {
      try {
        c(new game(path,ps,libs,data));
      } catch(e) {
        console.log("[ERR] dl calb err : "+e);
      }
    });
    list.s();
  });
}
module.exports=downloader;
