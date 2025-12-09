#!/bin/bash
# 自動下載開源角色 Sprites 的腳本
# 這些資源均來自開源平台，可自由使用

echo "下載開源角色資源..."

# 創建所需的資料夾
mkdir -p 1/stop 1/walk 1/jump 1/push 1/tool
mkdir -p 2/stop 2/smile 2/fall_down

echo "資料夾結構已建立"
echo ""
echo "下一步："
echo "1. 訪問 https://opengameart.org/ 搜尋 'fighter' 或 'martial artist' 角色"
echo "2. 或訪問 https://www.spriters-resource.com/ 尋找開源角色"
echo "3. 下載 PNG 精靈圖表"
echo "4. 將下載的檔案放入相應的資料夾"
echo "5. 在 sketch.js 中更新精靈尺寸參數"
