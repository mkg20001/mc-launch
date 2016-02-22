const util=require("util");
require("./versions/list")(null,function(list) {
  list.m("1.8.8", function(v) {
    //console.log(v.v,v.d);
//    delete v.d.libraries;
    console.log(util.inspect(v.d,{colors:true,depth:null}));
    /*v.d.libraries.map(function(l) {
      console.log(util.inspect(l,{colors:true,depth:null}),"[LIB]");
    });*/
  });
});
