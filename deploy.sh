npm i && npm run build
git clone git@github.com:vijaypatidar/vijaypatidar.github.io.git 
cd vijaypatidar.github.io
rm -rf ./*           
cd ../build
ll
cp -r . ../vijaypatidar.github.io
cd ../vijaypatidar.github.io
git add .
git commit -m "Updated portfolio"
git push
cd ..
sudo rm -r vijaypatidar.github.io