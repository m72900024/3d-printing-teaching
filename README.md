# 3D 列印入門教室

給初學者使用的 FDM 3D 列印教學網站，內容依照「第一次成功 → 理解與調整 → 獨立完成」循序安排。

公開網站：[https://m72900024.github.io/3d-printing-teaching/](https://m72900024.github.io/3d-printing-teaching/)

## 課程設計

- 12 個獨立課程頁面，不把全部內容擠在同一頁
- 每課包含學習目標、重點說明、實作任務與離開前確認
- 上一課／下一課導覽與完整課程選單
- 完成進度保存在目前使用的瀏覽器
- 支援電腦與手機版面

## 本機預覽

先產生包含靜態課程正文與資源版本的發布目錄：

```bash
node scripts/build-site.js
```

再啟動靜態網站伺服器：

```bash
python -m http.server 4173 --directory _site
```

網站位置為 `http://localhost:4173`。

## 驗證

```bash
node --test tests/*.test.js
```

## 發布

Pull request 會先執行語法檢查、測試與靜態網站建置。推送到 `main` 分支後，GitHub Actions 才會把 `_site` 自動部署到 GitHub Pages。

## 授權

網站程式碼採 MIT License；原創教材與原創／AI 輔助製作的教學插圖採 CC BY 4.0。第三方素材維持各自的原始授權，詳見 [LICENSE.md](LICENSE.md)。
