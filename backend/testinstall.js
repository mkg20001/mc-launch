const util=require("util");
const os=require("os");
const pt=require("path");
const fs=require("fs");
const uuid=require("node-uuid").v4;
require("./versions/list")(null,function(list) {
  list.m("1.8.8", function(v) {
    //console.log(util.inspect(v.d,{colors:true,depth:null}));
    v.install("/var/www/mc-launch/installtest", function(game) {
      console.log("game downloaded");
      var json;
      try {
        json=JSON.parse(fs.readFileSync(pt.normalize(os.homedir()+"/.local/share/mc-launch/config/token.config")).toString());
        if (!json.selectedProfile) throw "e";
      } catch(e) {
        console.log("using placeholder");
        json={accessToken:uuid(),selectedProfile:{name:uuid(),id:uuid()}};
      }
      game.launch(json);
    });
  });
});
