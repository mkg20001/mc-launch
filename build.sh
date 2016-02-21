cd polymer
gulp
cd ..
mv node_modules mod
mv production_modules node_modules
mkdir -p node_modules
npm i --production
node build.js
mv node_modules production_modules
mv mod node_modules
du -h -s build/mc-launch/*
#./build/mc-launch/linux64/mc-launch
