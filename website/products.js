// 熱門商品頁面動態切換與數據展示邏輯 (6/12 專案報告專用)
// Seasonal Hot Products Page Dynamic Volatility and Timeline Switcher

document.addEventListener("DOMContentLoaded", () => {
  const el = (id) => document.getElementById(id);

  // 1. 三大關鍵促銷波段大數據資料庫
  const periodDatabase = {
    mothersday: {
      badge: "MOTHER'S DAY",
      title: "母親節美妝大牌感恩慶_Mother's Day Mega Skincare Peak",
      chartLabels: ["頂級專櫃精華", "逆齡抗老眼霜", "奢華皮件禮盒", "高純燕窩飲", "法式絲絨蛋糕"],
      chartData: [210, 190, 145, 130, 100],
      volatilityList: [
        { rank: 1, title: "經典大牌修護明星特潤組", tag: "momo直營補貼", tagType: "momo", value: "96.4%" },
        { rank: 2, title: "極致抗老緊緻眼霜奢華禮盒", tag: "momo直營補貼", tagType: "momo", value: "89.1%" },
        { rank: 3, title: "真皮專門名牌防刮鏈帶包", tag: "蝦皮限時特惠", tagType: "shopee", value: "82.5%" }
      ],
      decodedText: "大牌美妝 (如雅詩蘭黛、蘭蔻) 在此時完美精算「正貨細綁等量小樣」的定價陷阱，消費者「寵愛母親與極致自我」的情感溢價拉抬至全年度基期的2.1倍。AI防禦提醒：切勿在正檔當天搶購單件正貨，請緊盯VIP預購期發放的跨店滿萬折千神券，其毫升單價折算後才是全年最低綠燈窗口。",
      hotSellers: [
        {
          name: "專櫃小棕瓶美妝明星囤貨組",
          desc: "買一送一等量航空版囤貨狂歡，全年度美妝最強檔期。",
          price: "3,980",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80",
          keyword: "小棕瓶"
        },
        {
          name: "貴婦級奢華黃金修護眼霜禮盒",
          desc: "逆齡肌齡專職滋潤緊緻最高指名款，附贈震動按摩眼棒。",
          price: "5,200",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=500&auto=format&fit=crop&q=80",
          keyword: "眼霜禮盒"
        },
        {
          name: "精品專櫃真皮防刮鏈帶包",
          desc: "經典老花送禮自用不敗社交款式，真皮雙鏈帶多功能背法。",
          price: "12,800",
          tag: "Shopee 限時爆款",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80",
          keyword: "真皮鏈帶包"
        },
        {
          name: "頂級高純度燕窩養生飲禮盒",
          desc: "燕窩固形物含量達 60% 奢華保養裝，附贈高檔湯匙組。",
          price: "2,680",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=80",
          keyword: "燕窩禮盒"
        },
        {
          name: "應景客製化康乃馨法式絲絨蛋糕",
          desc: "香草乳酪與覆盆子酸甜法式手作，母親節感恩節慶專屬。",
          price: "1,180",
          tag: "Shopee 限時爆款",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80",
          keyword: "絲絨蛋糕"
        }
      ]
    },
    worldcup: {
      badge: "WORLD CUP",
      title: "世界盃運動狂歡季_World Cup Sports Frenzy",
      chartLabels: ["運動機能球衣", "超大螢幕投影", "精釀生啤桶裝", "勁辣炸雞分享包", "隨身加油應援組"],
      chartData: [240, 180, 220, 195, 120],
      volatilityList: [
        { rank: 1, title: "4K高畫質巨幕投影機旗艦組", tag: "momo直營補貼", tagType: "momo", value: "94.2%" },
        { rank: 2, title: "國家代表隊指定機能排汗球衣", tag: "蝦皮限時特惠", tagType: "shopee", value: "91.5%" },
        { rank: 3, title: "精釀金黃生啤酒整箱歡樂組", tag: "momo直營補貼", tagType: "momo", value: "88.0%" }
      ],
      decodedText: "世界盃期間，大螢幕投影機與機能運動服飾受到強烈剛性需求拉動，商家會結合「夜間看球即時閃購」進行動態溢價。AI防禦提醒：啤酒與炸雞零食可利用午夜快閃免運券入手，但投影機等3C大件切忌在賽事當天衝動購買，建議在開賽前一週的暖身期搭配「運動生活節」大券預先置辦。",
      hotSellers: [
        {
          name: "國家隊款防汗透氣機能球衣",
          desc: "官方版科技吸濕排汗材質，極致彈力貼身看球應援首選。",
          price: "2,480",
          tag: "Shopee 限時特惠",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1578269174936-2709b5a5e06e?w=500&auto=format&fit=crop&q=80",
          keyword: "國家隊球衣"
        },
        {
          name: "4K高解析無線微型投影機",
          desc: "內建 Android 系統百吋巨幕投影，看球賽立體環繞音效。",
          price: "18,900",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop&q=80",
          keyword: "微型投影機"
        },
        {
          name: "頂級大容量精釀啤酒家庭裝",
          desc: "經典小麥精釀口感順口，看球賽冰鎮桶裝狂歡派對組。",
          price: "1,250",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1567696911600-ca0793302114?w=500&auto=format&fit=crop&q=80",
          keyword: "精釀啤酒"
        },
        {
          name: "美式勁辣炸雞三人狂歡分享餐",
          desc: "外酥內多汁勁辣雞腿排6入加脆薯，深夜看球卡路里充值。",
          price: "699",
          tag: "Shopee 限時爆款",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80",
          keyword: "炸雞分享餐"
        },
        {
          name: "世界盃限定發光應援加油棒",
          desc: "多段式LED炫彩閃爍，看球歡呼必備互動應援加油套組。",
          price: "199",
          tag: "Shopee 限時特惠",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=80",
          keyword: "加油棒"
        }
      ]
    },
    midyear618: {
      badge: "618 MEGA SALE",
      title: "618年中狂歡大促_618 Mid-Year Mega Sale",
      chartLabels: ["一級變頻冷氣", "掃拖全能機器人", "降噪無線耳機", "智慧氣炸烤箱", "多合一洗碗機"],
      chartData: [280, 210, 160, 130, 240],
      volatilityList: [
        { rank: 1, title: "一級變頻分離式冷暖空調", tag: "momo直營補貼", tagType: "momo", value: "98.2%" },
        { rank: 2, title: "旗艦款全自動掃拖機器人", tag: "momo直營補貼", tagType: "momo", value: "92.5%" },
        { rank: 3, title: "高效能多合一洗滌洗碗機", tag: "蝦皮限時特惠", tagType: "shopee", value: "89.0%" }
      ],
      decodedText: "618年中慶為運營商夏季家電與3C清庫存的核心激戰區。商家多配合平台釋出高額「滿萬折千」或「品牌現折神券」。AI防禦提醒：空調等需安裝之家電，切忌在正檔當天（6/18）下單以避開安裝大塞車，應提前於5月底開門紅暖身期下訂，方能享受最速安裝服務與最殺破價。",
      hotSellers: [
        {
          name: "一級能效變頻冷暖空調",
          desc: "APF一級變頻省電節能，極速冷暖氣房，免基本安裝費。",
          price: "28,900",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
          keyword: "變頻冷氣"
        },
        {
          name: "旗艦級智能雙效掃拖機器人",
          desc: "全自動洗拖布集塵，雷達避障AI視覺導航，解放雙手。",
          price: "15,800",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1618171120251-50e5015b6d51?w=500&auto=format&fit=crop&q=80",
          keyword: "掃拖機器人"
        },
        {
          name: "主動降噪頭戴式藍牙耳機",
          desc: "降噪深度達40dB，Hi-Res音質，618限量破價搶購大禮。",
          price: "5,500",
          tag: "momo 直營補貼",
          tagClass: "momo",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
          keyword: "降噪耳機"
        },
        {
          name: "日式多功能智慧氣炸烤箱",
          desc: "12L大容量微電腦溫控，免油健康氣炸，快速清庫存讓利。",
          price: "3,600",
          tag: "Shopee 限時爆款",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1547049082-1a12c3bf2366?w=500&auto=format&fit=crop&q=80",
          keyword: "氣炸烤箱"
        },
        {
          name: "高壓旋風噴淋嵌入式洗碗機",
          desc: "72度高溫烘乾除菌，大容量13人份，618全站免運免安裝費。",
          price: "24,000",
          tag: "Shopee 限時爆款",
          tagClass: "shopee",
          image: "https://images.unsplash.com/photo-1585837575652-267c030d97f8?w=500&auto=format&fit=crop&q=80",
          keyword: "洗碗機"
        }
      ]
    }
  };

  let categoryChartInstance = null;

  // 2. 渲染特定時段的頁面數據
  const renderPeriod = (periodKey) => {
    const data = periodDatabase[periodKey];
    if (!data) return;

    // A. 更新文字與徽章
    el("period-badge").innerText = data.badge;
    el("period-title").innerText = data.title;
    el("decoded-text").innerText = data.decodedText;

    // B. 渲染 Top 3 Volatility
    const volatilityContainer = el("volatility-list");
    volatilityContainer.innerHTML = data.volatilityList.map(item => `
      <div class="volatility-item">
        <div class="volatility-rank-title">
          <div class="volatility-rank">${item.rank}</div>
          <span class="volatility-title">${item.title}</span>
        </div>
        <div class="volatility-subsidy">
          <span class="volatility-tag ${item.tagType}">${item.tag}</span>
          <span class="volatility-value">${item.value}</span>
        </div>
      </div>
    `).join("");

    // C. 渲染 5 大熱賣單品卡片
    const hotSellersContainer = el("hot-sellers-grid");
    hotSellersContainer.innerHTML = data.hotSellers.map(item => {
      const encodeKeyword = encodeURIComponent(item.keyword);
      return `
        <div class="hot-seller-card">
          <div class="hot-seller-img-container">
            <img src="${item.image}" alt="${item.name}">
            <span class="hot-seller-img-tag ${item.tagClass}">${item.tag}</span>
          </div>
          <div class="hot-seller-content">
            <h4 class="hot-seller-name">${item.name}</h4>
            <p class="hot-seller-desc">${item.desc}</p>
            <div class="hot-seller-price-row">
              <span class="hot-seller-price-label">Live Price</span>
              <span class="hot-seller-price">$${item.price}</span>
            </div>
            <a href="https://www.momoshop.com.tw/search/searchShop.jsp?keyword=${encodeKeyword}" target="_blank" class="hot-seller-btn">
              <i class="fa-solid fa-cart-shopping"></i> 前往平台看看最熱賣
            </a>
          </div>
        </div>
      `;
    }).join("");

    // D. 重繪 Chart.js 折線圖
    renderChart(data.chartLabels, data.chartData, data.badge);
  };

  // 3. Chart.js 畫布渲染邏輯
  const renderChart = (labels, values, labelName) => {
    const canvas = el("category-chart");
    if (!canvas) return;

    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    
    // 建立漸層色背景 (活力橘到透明)
    const gradientGarnet = ctx.createLinearGradient(0, 0, 0, 260);
    gradientGarnet.addColorStop(0, "rgba(255, 107, 74, 0.3)");
    gradientGarnet.addColorStop(1, "rgba(255, 107, 74, 0.0)");

    categoryChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: `${labelName} 平均客單價指數`,
          data: values,
          borderColor: "#FF6B4A", // 活力陽光橘
          borderWidth: 4,
          pointBackgroundColor: "#FFA000", // 璀璨沙灘金
          pointBorderColor: "#FF6B4A",
          pointRadius: 6,
          pointHoverRadius: 9,
          tension: 0.35,
          fill: true,
          backgroundColor: gradientGarnet
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#082F49",
            titleFont: { size: 13, weight: "bold" },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
            callbacks: {
              label: function(context) {
                return ` 平均客單價係數: ${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 300,
            grid: { color: "rgba(229, 231, 235, 0.5)" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  };

  // 4. 綁定時間軸按鈕點擊事件
  const initTimeline = () => {
    const buttons = document.querySelectorAll(".timeline-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        // 取得當前點擊的按鈕（處理可能點擊到內層 icon 的問題）
        const targetBtn = e.target.closest(".timeline-btn");
        if (!targetBtn || targetBtn.classList.contains("active")) return;

        buttons.forEach(b => b.classList.remove("active"));
        targetBtn.classList.add("active");

        const periodKey = targetBtn.getAttribute("data-period");
        renderPeriod(periodKey);
      });
    });
  };

  // 初始化載入 (預設載入母親節)
  initTimeline();
  renderPeriod("mothersday");
});
