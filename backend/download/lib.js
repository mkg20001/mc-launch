const arch=process.arch == "x64" ? "64" : "32";
const plat=require("os").platform();

function lib(list,data,path) {
  var dd=data.downloads;
  if (dd.artifact) {
    var ddd=dd.artifact;
    ddd.url="https://libraries.minecraft.net/"+ddd.path;
    ddd.path=path+"/"+ddd.path;
    list.a(ddd,null,function(err) {
      if (err) {
        console.log(ddd.url+" : "+err);
      }
    });
  } else {
    var dd=dd.classifiers;
    if (data.natives[plat]) {
      var ddd=dd[data.natives[plat].replace("${arch}",arch)];
      if (ddd) {
        ddd.url="https://libraries.minecraft.net/"+ddd.path;
        ddd.path=path+"/"+ddd.path;
        list.a(ddd,null,function(err) {
          if (err) {
            console.log(ddd.url+" : "+err);
          }
        });
      } else {
        console.log("[LIBJ] "+data.name+" not supported for "+plat);
      }
    } else {
      console.log("[LIBJ] "+data.name+" not supported for "+plat);
    }
  }
}
module.exports=lib;
