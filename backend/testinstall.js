const util=require("util");
require("./versions/list")(null,function(list) {
  list.m("1.8.8", function(v) {
    //console.log(util.inspect(v.d,{colors:true,depth:null}));
    v.install("/var/www/mc-launch/installtest");
  });
});
