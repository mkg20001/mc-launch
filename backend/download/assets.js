const j=require("../JSON");
function assets(list,url,path,c) {
  j(url.url,function(e,b) {
    var o=b.objects;
    for (var p in o) {
      var pp=o[p];
      //pp.url=p;
      pp.url="https://resources.download.minecraft.net/"+pp.hash.substr(0,2)+"/"+pp.hash;
      pp.path=path+"/"+p;
      list.a(pp,null,function(err) {
        if (err) {
          console.log(pp.url+" : "+err);
        }
      });
    }
    try {
      c();
    } catch(e) {
      
    }
  });
}
module.exports=assets;
