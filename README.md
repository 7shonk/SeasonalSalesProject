# 季節性銷售：大數據分析與購買最佳時機預測系統
### Seasonal Sales: Big Data Analysis and Consumer Buying Timing Engine

本系統專為學術與電商數據分析設計，結合 Walmart M5 大數據集與零售商市場供需波動規律，分析主力商品的市佔率集中度、歷史價格波動，並提供一個動態互動的「AI 消費決策時機預報與計算系統」。

---

## 🌟 核心功能特色

1. **80/20 Pareto 市場集中度分析**：
   - 整合 Chart.js 繪製雙軸 Pareto 分佈圖，展示 20% 的黃金核心爆款如何主導 80% 的成交量（GMV）。
   - 提供動態商品篩選器（食品、娛樂、家居）與搜尋欄，便於檢索商品的累積銷量與銷售佔比。

2. **20 大台灣電商樣態行銷節慶分析**：
   - 動態追蹤並解鎖包含「春節年貨大促」、「618 年中慶」、「中元普渡」、「雙 11 全球破價戰」、「黑色星期五海淘」、「尾牙家電採購」等 20 個關鍵電商行銷節點的流量與銷售走勢。
   - 動態更換不同圖表樣式與決策 AI 矩陣，並展示季節熱銷 Top 5 爆款。

3. **AI 消費決策計算器 (Timing Calculator)**：
   - 互動式輸入商品價格與計劃購買月份，系統會透過 AI 演算法即時運算「折扣率」、「季節需求熱度」與「物流缺貨/溢價風險」。
   - 提供視覺化 **紅/黃/綠 決策信號燈**（🟢 推薦購買、🟡 雙向觀望、🔴 避開高峰）與深度商業分析建議。

4. **前往 MOMO 購物網比價一鍵跳轉**：
   - 所有陳列出來的熱銷爆款商品均內置「前往 MOMO 購物網比價」按鈕，點擊後會自動帶入商品關鍵字並打開新分頁實時檢索比價，極具商業實用價值。

---

## 📁 專案目錄結構

```text
├── analysis.py                # 大數據預處理 Python 腳本（讀取 M5 資料集 csv 檔）
├── data/                      # 數據源目錄 (包含 calendar.csv, sales_train_validation.csv 等)
└── website/                   # 網頁展示系統主目錄
    ├── index.html             # 首頁 (市場分析與三大核心洞察)
    ├── seasonality.html       # 季節趨勢大曆 (20大行銷節點數據展示)
    ├── products.html          # 熱門商品 Pareto 分析與探索中心
    ├── recommendation.html    # AI 購買決策建議頁面與互動計算器
    ├── data.json              # 由 analysis.py 導出的聚合分析數據
    ├── style.css              # 主視覺樣式表 (經典 FC Barcelona 紅白藍金配色)
    ├── app.js                 # 季節趨勢頁面與首頁互動邏輯
    ├── products.js            # 熱門商品頁面動態渲染與搜尋邏輯
    └── recommendation.js      # 購買建議頁面計算器邏輯
```

---

## 🚀 如何在本機運行網頁系統

由於網頁內含非同步獲取資料機制（`fetch("data.json")`），為避免瀏覽器的 CORS 跨網域安全性限制，請使用伺服器環境開啟：

1. **使用 Python 內建伺服器** (推薦)：
   在終端機進入 `website/` 目錄，執行以下指令：
   ```bash
   python -m http.server 8000
   ```
   然後在瀏覽器打開 [http://localhost:8000](http://localhost:8000) 即可完整體驗。

2. **使用 VS Code Live Server 插件**：
   在 VS Code 中右鍵點選 `website/index.html` 並選擇 "Open with Live Server" 即可。
