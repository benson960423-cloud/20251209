步驟：在本機使用 Universal LPC Spritesheet Generator 匯出並整合到專案

說明
- 我已在 `sketch.js` 中加入可替換角色的配置（`CHARACTER1_CONFIG`、`CHARACTER2_CONFIG`），並提供 `useProceduralCharacters` 選項。
- 這份說明與腳本幫助你使用 LPC（Liberated Pixel Cup）產生器匯出角色精靈表（spritesheet），然後把匯出的 PNG 放到專案中，最後執行匯入腳本將檔案移到對應資料夾。

推薦操作流程
1. 開啟 Universal LPC Spritesheet Generator：
   https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/

2. 設計兩個你想要的角色外觀（角色1、角色2）。
   - 建議角色1為男性/戰士風格（對應原本動作：stop, walk, jump, push, tool）
   - 建議角色2為女性/互動者風格（對應原本動作：stop, smile, fall_down）

3. 在產生器中輸出（Export）你需要的 spritesheet：
   - 輸出格式建議：PNG 橫向精靈表（single-row horizontal spritesheet），每個動作一張 PNG。
   - 為每個動作匯出一張 PNG（例如：stop.png、walk.png、jump.png、push.png、tool.png），或匯出一組再裁切分割。

4. 把匯出的檔案放到本專案的暫存資料夾，例如放到 `LPC_exports/`。

5. 執行匯入腳本（PowerShell）：
   - 在 PowerShell 中執行：

```powershell
cd "C:\Users\L110\Desktop\20251125-main"
.\import_lpc_sprites.ps1
```

   - 腳本會詢問你角色1/角色2 的檔名與動作對應，並把檔案複製到正確位置（`1/`、`2/` 的子資料夾）。

6. 接著你需要在 `sketch.js` 中更新 `CHARACTER1_CONFIG` 和 `CHARACTER2_CONFIG` 的 `width`、`height`、`frames`，這些資訊可以用影像檢視器或檔案屬性查到（或在腳本中手動輸入）。

7. 在 `sketch.js` 把 `useProceduralCharacters = false`，重新載入 `index.html`，即可看到真實 sprites 的呈現。

備註
- 若你希望我代為修改 `CHARACTER*_CONFIG`（我可根據你執行匯入後提供的檔案名稱自動解析圖片尺寸並更新），請在執行匯入腳本後回覆，我會自動解析並修改 `sketch.js`。
- 如果你想我嘗試直接從 OpenGameArt 下載現成 LPC 包，請回覆允許，我會再試一次自動抓取具體下載連結（但有可能需要你手動點選或登入）。

