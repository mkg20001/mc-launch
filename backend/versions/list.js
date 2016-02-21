//https://launchermeta.mojang.com/mc/game/version_manifest.json
const j=require("../JSON");
const version=require("./version");
function vlist(b) {
  const vv=b.versions;
  var v={};
  vv.map(function(i) {
    v[i.id]=i;
  });
  function get(ver) {
    return v[ver];
  }
  function more(ver,c) {
    if (v[ver]) {
      return new version(v[ver],c);
    }
  }
  function latest(type) {
    return b.latest[type];
  }
  return {g:get,m:more,l:latest};
}
function versions(types,c) {
  j("https://launchermeta.mojang.com/mc/game/version_manifest.json", function(e,b) {
    if (e) throw e;
    c(new vlist(b));
  });
}
module.exports=versions;
