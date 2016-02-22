const arch=process.arch == "x64" ? "64" : "32";
const plat=require("os").platform();
const unzip=require("unzip");

function lib(list,data,path) {
  var dd=data.downloads;
  var ddd;
  if (dd.artifact) {
    ddd=dd.artifact;
    ddd.url="https://libraries.minecraft.net/"+ddd.path;
    ddd.path=path+"/"+ddd.path;
    list.a(ddd,null,function(err) {
      if (err) {
        console.log(ddd.url+" : "+err);
      } else {
        if (dd.extract) {
          console.log("extracting to "+path.replace("/libraries","/natives"),ddd.path);
          fs.createReadStream(ddd.path).pipe(unzip.Extract({ path: path.replace("/libraries","/natives") }));
        }
      }
    });
    return ddd.path;
  } else {
    dd=dd.classifiers;
    if (data.natives[plat]) {
      ddd=dd[data.natives[plat].replace("${arch}",arch)];
      if (ddd) {
        ddd.url="https://libraries.minecraft.net/"+ddd.path;
        ddd.path=path+"/"+ddd.path;
        list.a(ddd,null,function(err) {
          if (err) {
            console.log(ddd.url+" : "+err);
          } else {
            if (dd.extract) {
              console.log("extracting to "+path.replace("/libraries","/natives"),ddd.path);
              fs.createReadStream(ddd.path).pipe(unzip.Extract({ path: path.replace("/libraries","/natives") }));
            }
          }
        });
        return ddd.path;
      } else {
        console.log("[LIBJ] "+data.name+" not supported for "+plat);
      }
    } else {
      console.log("[LIBJ] "+data.name+" not supported for "+plat);
    }
  }
}
module.exports=lib;
