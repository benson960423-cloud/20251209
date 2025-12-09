# import_lpc_sprites.ps1
# 使用方法：將匯出的 LPC sprites 放到專案根目錄下的 LPC_exports 資料夾，然後執行此腳本
# 此腳本會提示你輸入對應的檔名，並把檔案複製到專案的 1/ 和 2/ 子資料夾

Param()

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$exportDir = Join-Path $root 'LPC_exports'

if (-not (Test-Path $exportDir)) {
    Write-Host "找不到匯出資料夾：$exportDir"
    Write-Host "請把你從 LPC 產生器匯出的 PNG 放入此資料夾，然後再執行此腳本。"
    exit 1
}

Write-Host "匯入 LPC sprites 開始。匯出來源： $exportDir"

# 角色1 動作清單
$char1Actions = @('stop','walk','jump','push','tool')
$char2Actions = @('stop_2','smile_2','fall_down_2')

# 逐動作詢問檔名
$char1Files = @{}
foreach ($a in $char1Actions) {
    $name = Read-Host "請輸入角色1 的動作檔名（含副檔名），動作：$a，例如 stop.png。若該動作沒有檔案請直接按 Enter 跳過。"
    if ($name -and (Test-Path (Join-Path $exportDir $name))) {
        $char1Files[$a] = $name
    } elseif ($name) {
        Write-Host "找不到檔案： $name，請確認放在 $exportDir 下。" -ForegroundColor Yellow
    }
}

# 角色2
$char2Files = @{}
foreach ($a in $char2Actions) {
    $name = Read-Host "請輸入角色2 的動作檔名（含副檔名），動作：$a，例如 stop_2.png。若該動作沒有檔案請直接按 Enter 跳過。"
    if ($name -and (Test-Path (Join-Path $exportDir $name))) {
        $char2Files[$a] = $name
    } elseif ($name) {
        Write-Host "找不到檔案： $name，請確認放在 $exportDir 下。" -ForegroundColor Yellow
    }
}

# 複製到目標資料夾
foreach ($kv in $char1Files.GetEnumerator()) {
    $src = Join-Path $exportDir $kv.Value
    $destDir = Join-Path $root "1\$($kv.Key)"
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $src -Destination (Join-Path $destDir $kv.Value) -Force
    Write-Host "已匯入 角色1/$($kv.Key) : $($kv.Value)"
}

foreach ($kv in $char2Files.GetEnumerator()) {
    $src = Join-Path $exportDir $kv.Value
    $destDir = Join-Path $root "2\$($kv.Key)"
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $src -Destination (Join-Path $destDir $kv.Value) -Force
    Write-Host "已匯入 角色2/$($kv.Key) : $($kv.Value)"
}

Write-Host "匯入完成。若需要我自動解析圖片尺寸並更新 sketch.js 中的 CHARACTER*_CONFIG，請回覆『自動更新 config』。"
