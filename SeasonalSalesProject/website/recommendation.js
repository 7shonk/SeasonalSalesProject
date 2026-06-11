// 購買建議頁面互動邏輯 - 處理消費決策計算器表單與 AI 決策結果動態渲染
// Buying Recommendation Page Logic - Handles calculator form submissions and AI report rendering

document.addEventListener("DOMContentLoaded", () => {
  const el = (id) => document.getElementById(id);

  const calcForm = el("calc-form");
  const resultInitial = el("result-initial");
  const resultOutput = el("result-output");
  const submitBtn = el("submit-btn");

  if (!calcForm) return;

  calcForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. 讀取輸入數值
    const category = el("prod-cat").value;
    const name = el("prod-name").value.trim();
    const price = parseFloat(el("prod-price").value);
    const msrp = parseFloat(el("prod-msrp").value);
    const month = parseInt(el("buy-month").value);

    // 2. 基本防錯處理 (Validation)
    if (price > msrp * 1.5) {
      alert("⚠️ 目前市售價顯著高於原價 1.5 倍以上，請確認售價與原價是否填反！");
      return;
    }

    // 顯示 Loading 按鈕動畫
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI 模擬退火分析中...`;

    setTimeout(() => {
      // 恢復按鈕
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-brain"></i> 啟動 AI 決策分析`;

      // 隱藏初始引導，顯示結果面板
      if (resultInitial) resultInitial.style.style = "display: none;"; // fallback
      resultInitial.style.display = "none";
      resultOutput.style.display = "block";

      // 3. 🎯 核心決策演算法 (AI Timing & Pricing Logic)
      const discountRatio = msrp > price ? (msrp - price) / msrp : 0;
      const discountPct = Math.round(discountRatio * 100);
      const savingVal = msrp > price ? Math.round(msrp - price) : 0;

      let timingScore = 50;
      let sourcingRisk = 30;
      let explanation = "";
      let signalColor = "yellow"; // green, yellow, red
      let signalText = "";

      // 依類別與月份進行決策矩陣計算
      if (category === "3c") {
        // 3C 科技產品
        if (month === 11) {
          // 雙11/黑五
          timingScore = 95;
          sourcingRisk = 50; // 物流略卡，但性價比極高
          explanation = `💡 商業分析：此時為雙11與黑色星期五全球購物狂歡。大數據指出，3C類別在此月份的『平台折抵與原廠補貼』交疊效益達到全年最高峰。
          
          雖然物流配送因包裹量大可能延遲 2~3 天，但此時購入「${name}」是全年度最省錢的綠燈絕對入手點。建議在跨夜第一小時搶下大額全站券直接清空購物車！`;
          signalColor = "green";
        } else if (month === 6 || month === 12) {
          // 618, 雙12
          timingScore = 80;
          sourcingRisk = 40;
          explanation = `💡 商業分析：您選擇的 ${month}月 正逢 ${month === 6 ? '618年中促銷' : '雙12年終出清'} 檔期。各大通路會針對3C硬體提供中高額度的現折神券。
          
          目前您獲得約 ${discountPct}% 的折扣，性價比處於良好水平。若急需使用，此月份是相當穩健的採購綠燈窗口，實質折扣誠意十足。`;
          signalColor = "green";
        } else if (month === 8 || month === 9) {
          // 開學季 / Apple Launch
          timingScore = 70;
          sourcingRisk = 45;
          if (name.toLowerCase().includes("apple") || name.toLowerCase().includes("iphone") || name.toLowerCase().includes("ipad")) {
            timingScore = 60;
            sourcingRisk = 75; // 缺貨與溢價高
            explanation = `💡 商業分析：8至9月正逢秋季新品發佈潮，尤其是 Apple 生態系。
            
            若您要買的是最新一代旗艦，此時價格極硬且官網缺貨排單嚴重（溢價風險高）。若是學生或教職員，可利用官網 BTS 教育專案獲取贈品；一般消費者若非急用，建議持幣觀望，等11月大促再撿便宜。`;
            signalColor = "yellow";
          } else {
            explanation = `💡 商業分析：夏末開學季促銷期間，文具與學習筆電有剛性折扣。目前「${name}」的折價幅度約 ${discountPct}%，處於平穩水準。此時購入風險一般，可以按需入手。`;
            signalColor = "yellow";
          }
        } else {
          // 平穩淡季
          timingScore = 40;
          sourcingRisk = 20;
          explanation = `💡 商業分析：${month}月份為3C科技產品的常態銷售淡季，市場上缺乏大型行銷節慶補貼。
          
          除非商品折價幅度極大（大於 20%），否則目前購入性價比一般。建議您將「${name}」列入購物車觀察名單，等待年中 618 或年底雙 11 大促時再行結帳。`;
          signalColor = "yellow";
        }
      } else if (category === "appliance") {
        // 家用電器
        if (month === 6 || month === 12) {
          // 618 變頻空調/ 雙12年終清倉
          timingScore = 90;
          sourcingRisk = 40;
          explanation = `💡 商業分析：${month}月份是大型家電的黃金促銷期。${month === 6 ? '618正值盛夏前夕，各大變頻冷氣、除濕機廠商家發放高額大券' : '雙12年終檔期，廠商為了美化年底財報進行倉庫清倉拋售'}。
          
          目前您試算的折扣率為 ${discountPct}%，AI 計算其性價比極高，屬於推薦入手的綠燈特惠區間！`;
          signalColor = "green";
        } else if (month === 11) {
          // 雙11
          timingScore = 92;
          sourcingRisk = 60; // 缺貨/安裝卡關
          explanation = `💡 商業分析：雙11是全年度家電折扣力度最大的檔期之一。但請特別注意「安裝型家電（如冷氣、熱水器）」在11月的安裝排單非常擁塞。
          
          如果「${name}」需要師傅到府安裝，建議在 10 月底暖身期提前下單以避開安裝高峰。整體而言，價格非常優越，為綠燈推薦購買點。`;
          signalColor = "green";
        } else if (month === 7 || month === 8) {
          // 盛夏高峰
          timingScore = 30;
          sourcingRisk = 85; // 師傅爆單、現貨吃緊
          explanation = `💡 商業分析：7至8月為盛夏酷暑，是空調、風扇等消暑家電的剛性爆發高峰。
          
          此時廠商「幾乎不降價」甚至可能因現貨吃緊而溢價；此外，冷氣安裝師傅的排單通常要等待 2 週以上。除非您家冷氣壞掉急需更換，否則此時購買「${name}」極易踩入高價黑洞，屬於紅燈避開高峰期。`;
          signalColor = "red";
        } else if (month === 2 || month === 3) {
          // 過年後淡季
          timingScore = 75;
          sourcingRisk = 25;
          explanation = `💡 商業分析：二至三月為年後開工淡季，大型家電廠商為了消化年前未售完的庫存，常會進行年終機種的「清庫存降價」。
          
          此時市場需求度低，議價空間高，且安裝師傅排單迅速。目前 ${discountPct}% 的折讓力度不錯，是反向套利的黃金綠燈採購點！`;
          signalColor = "green";
        } else {
          timingScore = 50;
          sourcingRisk = 30;
          explanation = `💡 商業分析：此時家電市場供需穩定。目前折讓約 ${discountPct}%，處於中規中矩的常態定價。建議多加對比線上線下通路，若有急需可隨時入手，否則可靜待大促。`;
          signalColor = "yellow";
        }
      } else if (category === "beauty") {
        // 專櫃美妝保養
        if (month === 5 || month === 10) {
          // 5月母親節、10月百貨週年慶
          timingScore = 98;
          sourcingRisk = 35;
          explanation = `💡 商業分析：您選擇的 ${month}月 是全台美妝界的最高殿堂促銷期（${month === 5 ? '母親節感恩慶' : '百貨週年慶預購會'}）。
          
          此時美妝大牌會釋出全年僅此兩檔的「買一送一」或「正貨加贈等量小樣」超狂特惠組。實質折返率（ROI）極高！目前您能省下 $${savingVal} 元，強烈推薦立刻在 VIP 預購會或首四日進場搶購，屬於絕佳綠燈！`;
          signalColor = "green";
        } else if (month === 3 || month === 11) {
          // 38女神節, 雙11
          timingScore = 85;
          sourcingRisk = 45;
          explanation = `💡 商業分析：3月女神節與11月雙11是線上美妝平台的兵家必爭之地。相較於實體百貨，電商在此時會發放大量「直接現折大券」，非常適合囤貨日常消耗品「${name}」。
          
          性價比高，折價幅度 ${discountPct}% 相當有誠意，為推薦入手的綠燈時機！`;
          signalColor = "green";
        } else {
          // 美妝淡季
          timingScore = 35;
          sourcingRisk = 20;
          explanation = `💡 商業分析：${month}月份為美妝保養的促銷淡季。各大名牌保養品多以常態原價銷售，實質贈品也較少。
          
          除非目前折扣非常誘人（大於 15%），否則在此時單買正貨極不划算。建議耐心等待 5 月或 10 月大促，此時屬於黃金觀望期。`;
          signalColor = "yellow";
        }
      } else if (category === "gourmet") {
        // 生鮮美食
        if (month === 1 || month === 9) {
          // 春節年前、中秋節前
          timingScore = 20;
          sourcingRisk = 90; // 極高物流停運/黃牛溢價
          explanation = `💡 商業分析：${month}月份正逢台灣最重要的節慶前夕（${month === 1 ? '除夕春圍爐年菜' : '中秋名店烤肉生鮮與月餅'}）。
          
          此時全台生鮮海鮮、名店年菜禮盒面臨「極端供需失衡」，物流包裹面臨熔斷停運風險，商品溢價甚至高達 200%。若您在此時才要搶購「${name}」現貨，不僅價格極貴且極易買到次等品。屬於紅燈避開高峰，建議提早 30 天早鳥預購！`;
          signalColor = "red";
        } else if (month === 7) {
          // 中元普渡
          timingScore = 85;
          sourcingRisk = 30;
          explanation = `💡 商業分析：7月（農曆七月）是量販通路中元節普渡大促。各大平台與超市會將箱裝即飲品、餅乾零食的毛利壓到接近零以進行引流。
          
          若您的商品「${name}」屬於耐久存的乾貨零食，此時大箱裝批發價是全年最低。屬於綠燈推薦購買時機！`;
          signalColor = "green";
        } else {
          timingScore = 55;
          sourcingRisk = 25;
          explanation = `💡 商業分析：生鮮美食在非節慶月份供需平衡。目前折讓幅度約 ${discountPct}%。建議多加利用平日生鮮免運日購入即可，無特殊避坑風險。`;
          signalColor = "yellow";
        }
      } else if (category === "seasonal") {
        // 派對節慶道具
        if ((month === 10 && name.includes("萬聖")) || (month === 12 && name.includes("聖誕")) || (month === 1 && name.includes("春聯"))) {
          timingScore = 15;
          sourcingRisk = 95;
          explanation = `💡 商業分析：節慶道具具有極端短效的「泡沫需求」特質，在節日前夕溢價最為瘋狂，且過節後價值立刻歸零。
          
          目前您在 ${month}月 節日當週購買「${name}」，商家會大幅提高基價並收取情感溢價。AI 建議：若非急用，此時購買性價比極低，屬於紅燈避開高峰。最佳綠燈入手時機其實是節日過後「當天晚上」的出清清倉，通常下殺 2~5 折，可買下為明年準備！`;
          signalColor = "red";
        } else {
          timingScore = 60;
          sourcingRisk = 30;
          explanation = `💡 商業分析：此月份該節慶商品需求處於平穩常態，折讓約 ${discountPct}%。若需提前為未來的節日部署，此時入手價格較為理性，可以視需求適量採購。`;
          signalColor = "yellow";
        }
      }

      // 如果折扣率極高，給予加分
      let discountScore = Math.min(100, Math.round(discountRatio * 300));
      if (discountRatio === 0) discountScore = 20;

      // 綜合評估分數
      const finalScore = Math.round((timingScore * 0.6) + (discountScore * 0.4));
      
      // 依綜合分數與分類邏輯判定進行最終燈號決定
      if (signalColor === "green" || (finalScore >= 70 && signalColor !== "red")) {
        signalColor = "green";
        signalText = `🟢 推薦購買 (AI Decision: Green Light)`;
      } else if (signalColor === "red") {
        signalColor = "red";
        signalText = `🔴 避開高峰 (AI Decision: Red Danger)`;
      } else {
        signalColor = "yellow";
        signalText = `🟡 雙向觀望 (AI Decision: Yellow Watch)`;
      }

      // 4. 更新 UI 渲染
      const signalBox = el("result-signal-box");
      const lightBulb = el("result-light");
      const signalTextEl = el("result-signal-text");
      const explanationEl = el("result-explanation");
      
      const discountVal = el("metric-discount-val");
      const discountBar = el("metric-discount-bar");
      const timingVal = el("metric-timing-val");
      const timingBar = el("metric-timing-bar");
      const riskVal = el("metric-risk-val");
      const riskBar = el("metric-risk-bar");
      
      const savingAmount = el("saving-amount");
      const savingPercent = el("saving-percent");

      // 替換 class 渲染不同燈號樣式
      signalBox.className = `signal-box ${signalColor}`;
      lightBulb.className = `signal-light-bulb pulse-${signalColor}`;
      signalTextEl.innerText = signalText;
      signalTextEl.style.color = signalColor === "green" ? "#10B981" : signalColor === "yellow" ? "#EDBB00" : "#EF4444";
      
      explanationEl.innerText = explanation;

      // 更新進度條
      discountVal.innerText = `${discountScore}%`;
      discountBar.className = `progress-fill ${signalColor}`;
      discountBar.style.width = `${discountScore}%`;

      timingVal.innerText = `${timingScore}%`;
      timingBar.className = `progress-fill ${signalColor}`;
      timingBar.style.width = `${timingScore}%`;

      riskVal.innerText = `${sourcingRisk}%`;
      // 險度越高，進度條顏色可以反向處理
      riskBar.className = `progress-fill ${sourcingRisk > 70 ? 'red' : sourcingRisk > 45 ? 'yellow' : 'green'}`;
      riskBar.style.width = `${sourcingRisk}%`;

      // 更新節省金額
      savingAmount.innerText = savingVal.toLocaleString();
      savingPercent.innerText = discountPct;

    }, 800);
  });
});
