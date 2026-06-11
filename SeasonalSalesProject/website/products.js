// 熱門商品頁面互動邏輯 - 處理 Pareto 圖表渲染與商品探索網格動態搜尋篩選
// Top Products Page Logic - Handles Pareto Chart rendering and product explorer search/filter

document.addEventListener("DOMContentLoaded", async () => {

  const el = (id) => document.getElementById(id);

  // 1. 商品大數據資料庫 (結合 M5 數據與擬真台灣電商名稱)
  const itemsDatabase = [
    // Foods (生鮮美食 - 來自真實 data.json 排行)
    { id: "FOODS_3_090", name: "名店熟成紅燒牛肉麵 (泡麵箱裝)", category: "foods", sales: 1002529, price: 120, timing: "中元普渡 / 年末跨年夜", recommendation: "🟢 中元箱裝量販大促，日常囤貨首選", icon: "🍜", ranking: 1 },
    { id: "FOODS_3_586", name: "真空低溫熟成黑豬肉火腿", category: "foods", sales: 920242, price: 250, timing: "春節年年菜大促", recommendation: "🟢 年前21天提早預購，避開春節物流熔斷", icon: "🥓", ranking: 2 },
    { id: "FOODS_3_252", name: "高纖有機堅果燕麥脆片包", category: "foods", sales: 565299, price: 180, timing: "夏末開學季 / 99購物節", recommendation: "🟢 99購物節全站免運時段，大宗囤貨最省", icon: "🌾", ranking: 3 },
    { id: "FOODS_3_555", name: "頂級低溫烘焙原味綜合堅果", category: "foods", sales: 491287, price: 350, timing: "春節年貨大街 / 尾牙禮盒", recommendation: "🟡 配合年貨大街早鳥組合券入手", icon: "🥜", ranking: 4 },
    { id: "FOODS_3_714", name: "冷藏直輸紐西蘭熟成沙朗牛排", category: "foods", sales: 396172, price: 590, timing: "中秋烤肉節 / 情人節", recommendation: "🔴 節前5天食材需求極度飽和溢價，建議提早14天預訂", icon: "🥩", ranking: 5 },
    { id: "FOODS_3_587", name: "法式手作流心千層蛋糕禮盒", category: "foods", sales: 396119, price: 880, timing: "母親節感恩慶 / 女神節", recommendation: "🟡 搶購各大百貨/電商首波預購85折神券", icon: "🍰", ranking: 6 },
    { id: "FOODS_3_694", name: "義大利原裝特級冷壓初榨橄欖油", category: "foods", sales: 390001, price: 450, timing: "全年度常態基期", recommendation: "🟢 常態高剛需日用品，搭配平台雙軸折抵券", icon: "🫒", ranking: 7 },
    { id: "FOODS_3_226", name: "比利時高純度手工黑巧克力片", category: "foods", sales: 363082, price: 150, timing: "西洋情人節 / 聖誕送禮", recommendation: "🟡 情人節過後當晚『節後清倉』降溫撿便宜", icon: "🍫", ranking: 8 },
    { id: "FOODS_3_202", name: "手擀冷凍高麗菜黑豬肉水餃", category: "foods", sales: 295689, price: 220, timing: "颱風備災期 / 年末宅家", recommendation: "🟢 電商冷凍免運專區或生鮮閃購折抵購入", icon: "🥟", ranking: 9 },
    { id: "FOODS_3_723", name: "精品極致炭燒掛耳咖啡禮盒", category: "foods", sales: 284333, price: 320, timing: "開工開學季 / 99購物節", recommendation: "🟢 開學3C節慶生活搭售，實質優惠高", icon: "☕", ranking: 10 },

    // Hobbies (休閒娛樂 - 擬真長尾結構)
    { id: "HOBBIES_1_120", name: "大師收藏級街景微縮積木模型", category: "hobbies", sales: 245310, price: 1500, timing: "兒童節大促 / 雙11終極戰", recommendation: "🟢 雙11全站破價百億補貼時，折抵額度極高", icon: "🧩", ranking: 11 },
    { id: "HOBBIES_1_045", name: "4K極致防手震降噪運動相機", category: "hobbies", sales: 189400, price: 12000, timing: "228連假 / 暑假前夕", recommendation: "🟡 暑假前夕商家發放滿額旅遊券時段購入", icon: "📷", ranking: 12 },
    { id: "HOBBIES_2_284", name: "環保防滑高彈力加厚瑜珈墊", category: "hobbies", sales: 154200, price: 680, timing: "38女王節 / 新年減重潮", recommendation: "🟢 女神節女性美體專櫃大促享免運現折", icon: "🧘", ranking: 13 },
    { id: "HOBBIES_1_352", name: "真雙震動Steam無線遊戲控制器", category: "hobbies", sales: 121000, price: 1890, timing: "黑五海淘直郵 / 雙12", recommendation: "🟢 配合亞馬遜黑五免運直送，比代理商划算", icon: "🎮", ranking: 14 },
    { id: "HOBBIES_2_090", name: "野外露營秒開全防曬黑膠帳篷", category: "hobbies", sales: 98000, price: 3200, timing: "228連假出遊 / 春季野營", recommendation: "🟢 連假前一週趁戶外生活節神券發放購入", icon: "⛺", ranking: 15 },
    { id: "HOBBIES_1_211", name: "真無線主動降噪防水防汗耳機", category: "hobbies", sales: 85400, price: 4200, timing: "99超級購物節 / 雙11", recommendation: "🟢 下半年首波大降價或跨店滿減時入手", icon: "🎧", ranking: 16 },

    // Household (居家生活 - 擬真長尾結構)
    { id: "HOUSEHOLD_1_220", name: "一級能效智慧變頻節能除濕機", category: "household", sales: 215400, price: 8900, timing: "雙12大出清 / 冬季梅雨季", recommendation: "🟢 雙12年終舊款大出清，實質讓利毛利最低", icon: "🌬️", ranking: 17 },
    { id: "HOUSEHOLD_1_080", name: "高壓旋風噴淋三合一洗碗機", category: "household", sales: 176500, price: 24000, timing: "雙11大促 / 年終尾牙季", recommendation: "🟢 雙11配合全站折價與滿額免郵時購入", icon: "🥣", ranking: 18 },
    { id: "HOUSEHOLD_2_105", name: "負離子速乾水光智慧吹風機", category: "household", sales: 142100, price: 5500, timing: "百貨週年慶 / 母親節大促", recommendation: "🟡 週年慶首四日搭配滿千送百禮券回饋最高", icon: "💨", ranking: 19 },
    { id: "HOUSEHOLD_1_518", name: "雷達航向全自動掃拖機器人", category: "household", sales: 125000, price: 15800, timing: "618年中狂歡 / 雙11終極", recommendation: "🟢 618年中補貼大戰，品牌現折大券時入手", icon: "🧹", ranking: 20 },
    { id: "HOUSEHOLD_2_312", name: "日式微電腦家用多功能烤箱", category: "household", sales: 95400, price: 3600, timing: "中秋烤肉大促 / 尾牙抽獎", recommendation: "🟢 年底尾牙福委會流出品或出清撿便宜", icon: "🏮", ranking: 21 },
    { id: "HOUSEHOLD_1_012", name: "一級能效變頻分離式冷暖空調", category: "household", sales: 88900, price: 28000, timing: "618年中狂歡大促前夕", recommendation: "🟡 5月正檔前暖身購買，避開盛夏安裝塞車", icon: "❄️", ranking: 22 }
  ];

  // 2. 獲取真實 data.json 數據 (若有的話，無縫更新銷量排行)
  try {
    const res = await fetch("data.json");
    if (res.ok) {
      const d = await res.json();
      if (d.top_products && d.top_products.labels) {
        d.top_products.labels.forEach((label, i) => {
          const item = itemsDatabase.find(x => x.id === label);
          if (item && d.top_products.values[i]) {
            item.sales = d.top_products.values[i];
          }
        });
        // 重新依銷量降序排序
        itemsDatabase.sort((a, b) => b.sales - a.sales);
        itemsDatabase.forEach((x, i) => x.ranking = i + 1);
      }
    }
  } catch (err) {
    console.log("ℹ️ Fetch data.json fallback in products.html - 使用預載入擬真數據庫");
  }

  // 3. 繪製 Pareto 曲線雙軸圖表 (Chart.js)
  const drawParetoChart = () => {
    const canvas = el("pareto-chart");
    if (!canvas) return;

    // 將所有商品按銷量從大到小排序
    const sortedData = [...itemsDatabase].sort((a, b) => b.sales - a.sales);
    
    // 取前 15 個商品用於圖表展示，確保排版與可讀性
    const displayData = sortedData.slice(0, 15);
    
    const labels = displayData.map(x => `${x.icon} ${x.id}`);
    const salesValues = displayData.map(x => x.sales);
    
    // 計算累計百分比
    const totalSalesSum = sortedData.reduce((acc, x) => acc + x.sales, 0);
    let cumulativeSum = 0;
    const cumulativePercentValues = displayData.map(x => {
      cumulativeSum += x.sales;
      return parseFloat(((cumulativeSum / totalSalesSum) * 100).toFixed(2));
    });

    const ctx = canvas.getContext("2d");
    
    // 巴薩紅 (銷量長條)
    const gradientGarnet = ctx.createLinearGradient(0, 0, 0, 350);
    gradientGarnet.addColorStop(0, "#A50044");
    gradientGarnet.addColorStop(1, "#5E0027");

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "單品總銷量 (Sales Volume)",
            data: salesValues,
            backgroundColor: gradientGarnet,
            borderColor: "#A50044",
            borderWidth: 1,
            borderRadius: 3,
            yAxisID: "y-sales",
            barPercentage: 0.55
          },
          {
            label: "累計銷售佔比 (Cumulative Share %)",
            data: cumulativePercentValues,
            type: "line",
            borderColor: "#EDBB00", // 巴薩金
            borderWidth: 3,
            backgroundColor: "transparent",
            pointBackgroundColor: "#004D98", // 巴薩藍
            pointBorderColor: "#EDBB00",
            pointRadius: 5,
            pointHoverRadius: 8,
            tension: 0.3,
            fill: false,
            yAxisID: "y-percent"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: { weight: "700", family: "'Poppins', 'Noto Sans TC', sans-serif" }
            }
          },
          tooltip: {
            backgroundColor: "#0A192F",
            padding: 12,
            cornerRadius: 4,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            callbacks: {
              label: function (context) {
                const item = displayData[context.dataIndex];
                if (context.datasetIndex === 0) {
                  return ` 銷量: ${context.raw.toLocaleString()} 件 (${item.name})`;
                } else {
                  return ` 累計貢獻度: ${context.raw}%`;
                }
              }
            }
          }
        },
        scales: {
          "y-sales": {
            type: "linear",
            position: "left",
            beginAtZero: true,
            title: {
              display: true,
              text: "商品銷售件數",
              font: { weight: "700" }
            },
            grid: {
              color: "rgba(229, 231, 235, 0.4)"
            }
          },
          "y-percent": {
            type: "linear",
            position: "right",
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "累積貢獻百分比 (%)",
              font: { weight: "700" }
            },
            grid: {
              drawOnChartArea: false // 避免右側刻度網格干擾左側
            },
            ticks: {
              callback: function (value) {
                return value + "%";
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: { weight: "700" }
            }
          }
        }
      }
    });
  };

  // 4. 動態生成並更新商品探索網格
  const renderProductGrid = (categoryFilter = "all", searchQuery = "") => {
    const grid = el("product-grid");
    const noResults = el("no-results");
    if (!grid) return;

    // 過濾邏輯
    let filtered = itemsDatabase;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(x => x.category === categoryFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(x => 
        x.name.toLowerCase().includes(q) || 
        x.id.toLowerCase().includes(q) || 
        x.category.toLowerCase().includes(q)
      );
    }

    // 判斷有無搜尋結果
    if (filtered.length === 0) {
      grid.style.display = "none";
      if (noResults) noResults.style.display = "block";
      return;
    } else {
      grid.style.display = "grid";
      if (noResults) noResults.style.display = "none";
    }

    // 計算總銷量佔比
    const totalSalesSum = itemsDatabase.reduce((acc, x) => acc + x.sales, 0);

    grid.innerHTML = filtered.map((item, index) => {
      const shareVal = ((item.sales / totalSalesSum) * 100).toFixed(2);
      // 分類標籤中文映射
      const categoryMap = { foods: "生鮮美食", hobbies: "休閒娛樂", household: "居家生活" };
      return `
        <div class="insight-card" style="display: flex; flex-direction: column;">
          <div class="card-edge" style="background: ${item.category === 'foods' ? '#A50044' : item.category === 'hobbies' ? '#EDBB00' : '#004D98'};"></div>
          <div class="card-content" style="padding: 28px; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span class="product-badge" style="margin: 0; background: ${item.category === 'foods' ? '#FEE2E2' : item.category === 'hobbies' ? '#FEF3C7' : '#DBEAFE'}; color: ${item.category === 'foods' ? '#EF4444' : item.category === 'hobbies' ? '#D97706' : '#2563EB'};">
                ${categoryMap[item.category]}
              </span>
              <span style="font-size: 13px; font-weight: 700; color: #9CA3AF;">Rank #${item.ranking}</span>
            </div>
            <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 8px; color: var(--dark-navy);">
              ${item.icon} ${item.name}
            </h3>
            <span style="font-family: monospace; font-size: 13px; color: #6B7280; display: block; margin-bottom: 16px;">
              ID: ${item.id}
            </span>
            
            <p style="font-size: 13px; color: #4B5563; line-height: 1.5; margin-bottom: 20px;">
              推薦時機：<strong style="color: var(--dark-navy);">${item.timing}</strong>
            </p>

            <div class="product-stats">
              <span>銷量: <strong>${item.sales.toLocaleString()} 件</strong></span>
              <span>銷量佔比: <strong>${shareVal}%</strong></span>
            </div>

            <div style="margin-top: 20px; padding: 12px; background: var(--light-bg); border-radius: 4px; font-size: 12px; font-weight: 700; color: #1F2937; flex-grow: 1;">
              💡 決策建議：${item.recommendation}
            </div>

            <a href="https://www.momoshop.com.tw/search/searchGoods.jsp?keyword=${encodeURIComponent(item.name)}" target="_blank" class="card-more" style="text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 100%; margin-top: 16px; padding: 10px; background-color: var(--light-bg); border-radius: 4px; font-weight: 700; color: var(--fcb-blue); transition: all 0.2s;">
              <i class="fa-solid fa-cart-shopping" style="color: var(--fcb-garnet); font-size: 14px;"></i> 前往 MOMO 購物網比價 <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 10px; color: var(--text-secondary);"></i>
            </a>
          </div>
        </div>
      `;
    }).join("");
  };

  // 5. 綁定篩選器事件
  const initFilters = () => {
    const buttons = document.querySelectorAll(".filter-btn");
    const searchInput = el("search-input");

    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        // 切換 active 樣式
        buttons.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.getAttribute("data-category");
        const query = searchInput ? searchInput.value : "";
        renderProductGrid(category, query);
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const activeBtn = document.querySelector(".filter-btn.active");
        const category = activeBtn ? activeBtn.getAttribute("data-category") : "all";
        renderProductGrid(category, e.target.value);
      });
    }
  };

  // 初始化
  drawParetoChart();
  renderProductGrid("all", "");
  initFilters();
});
