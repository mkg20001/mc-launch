const d=require("../download");
const mk=require("mkdirp");
const pt=require("path");
function downloader(data,path) {
  const list=new d.list();
  var ps={};
  mk(path);
  ["assets","libraries","client"].map(function(f) {
    mk(pt.normalize(path+"/"+f));
    ps[f]=pt.normalize(path+"/"+f);
  });
  d.assets(list,data.assetIndex,ps.assets);
  data.libraries.map(function(l) {// TODO: Finish libraries download
    d.lib(list,l,ps.libraries);
  });
}
module.exports=downloader;
