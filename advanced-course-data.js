window.COURSES = [
  {
    id:"A01", slug:"01-filament-drying.html", stage:"材料管理", stageNo:"A", duration:"25 分鐘", type:"判讀＋實作",
    title:"線材乾燥與保存", subtitle:"先看懂受潮訊號，再用安全方法讓材料回到穩定狀態。",
    lead:"線材會從空氣吸收水氣，但拉絲或粗糙不一定只有受潮一個原因。本課從症狀、紀錄與小件測試開始，帶你決定何時需要乾燥、如何遵守設備限制，以及乾燥後怎麼密封保存。",
    goals:["分辨乾燥線材與受潮線材的常見外觀","解釋水氣如何造成氣泡、孔洞與強度下降","用紀錄、症狀與小件測試決定是否乾燥","選擇安全乾燥設備並遵守 A1／A1 mini 限制","建立冷卻、密封、乾燥劑與濕度紀錄流程"],
    goalArt:[
      {src:"../assets/advanced-a01/illustrations/dry-vs-damp.webp",alt:"乾燥線材平順列印與受潮線材拉絲粗糙的動漫對照圖"},
      {src:"../assets/advanced-a01/illustrations/moisture-risk.webp",alt:"水氣進入線材並在熱端形成氣泡與品質問題的剖面圖"},
      {src:"../assets/advanced-a01/illustrations/drying-decision.webp",alt:"查紀錄、看症狀、小件測試與再乾燥的四步驟流程"},
      {src:"../assets/advanced-a01/illustrations/drying-methods.webp",alt:"專用乾燥箱與 A1、A1 mini 禁止熱床乾燥的安全比較"},
      {src:"../assets/advanced-a01/illustrations/storage-workflow.webp",alt:"線材冷卻、密封、放入乾燥劑與濕度卡並做紀錄的保存流程"}
    ],
    sections:[
      {
        title:"先分辨：乾燥與受潮長什麼樣？",
        body:"受潮線材常伴隨拉絲、噴嘴滲料、表面粗糙、孔洞或層間強度下降；列印時也可能聽見細小爆裂聲。但相同症狀也可能來自溫度、速度、回抽或送料問題，所以這些是線索，不是單憑一項就能定案的結論。",
        manga:{src:"../assets/advanced-a01/illustrations/dry-vs-damp.webp",alt:"乾燥線材與受潮線材列印結果對照",label:"GPT 教學圖解",caption:"先比較出料是否連續、表面是否有孔洞與拉絲，再把症狀寫進紀錄。"},
        compareHeaders:["觀察位置","較穩定的線材","可能受潮的線材"],
        compare:[["噴嘴出料","連續、均勻","滲料、氣泡或細小爆裂聲"],["作品表面","線條規律且孔洞少","粗糙、孔洞或不規則顆粒"],["跨空移動","少量可控細絲","明顯拉絲或蜘蛛網"],["結構表現","層間結合穩定","層間強度可能下降"]],
        callout:"不要只憑一根拉絲就判定受潮。先固定模型、材料預設與環境，再比較同一個小型測試件。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜線材列印品質指南",url:"https://wiki.bambulab.com/en/filament-acc/filament/print-quality"}]
      },
      {
        title:"水氣為什麼會破壞列印？",
        body:"線材吸收水氣後進入高溫熱端，水氣會快速變成蒸氣並擾動熔融材料。出料因此可能出現微小氣泡、孔洞與不連續，表面變粗，嚴重時也會降低層間結合。不同材料吸濕速度不同，不能用同一個保存週期套用所有線材。",
        manga:{src:"../assets/advanced-a01/illustrations/moisture-risk.webp",alt:"線材吸濕後在熱端形成氣泡並造成拉絲孔洞與強度下降",label:"GPT 教學圖解",caption:"水氣不是留在作品裡不動；它在熱端變成蒸氣，讓原本穩定的熔融出料出現擾動。"},
        points:["尼龍、TPU 等材料通常比 PLA 更需要留意吸濕","剛拆封不等於永遠乾燥，包裝破損或保存環境也會影響狀態","乾燥只能處理水氣，不能修復已降解、污染或纏結的線材","比較前先確認噴嘴、送料路徑與材料預設沒有明顯錯誤"],
        sources:[{label:"內容參考：Bambu Lab Wiki｜乾燥線材",url:"https://wiki.bambulab.com/en/filament-acc/filament/dry-filament"}]
      },
      {
        title:"乾燥前先做四項判斷",
        body:"乾燥不是每次失敗的第一個按鈕。先查線材何時開封、如何保存，再觀察是否同時出現多個受潮線索；接著用固定設定列印小型測試件。只有證據一致時才進入乾燥，並保留乾燥前後的對照。",
        manga:{src:"../assets/advanced-a01/illustrations/drying-decision.webp",alt:"查紀錄、看症狀、小件測試與再乾燥流程",label:"GPT 教學圖解",caption:"先取得基準，乾燥後用同一個檔案重印；改善與否才有可比較的證據。"},
        steps:["查開封日期、材料種類與保存方式","記錄拉絲、爆裂聲、孔洞與出料穩定度","固定機型、噴嘴、材料預設與測試模型","依線材與設備官方說明乾燥，再重印同一小件"],
        callout:"單一變因原則：比較乾燥前後時，不要同時改溫度、速度、回抽與模型方向。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜乾燥前後的判斷與測試",url:"https://wiki.bambulab.com/en/filament-acc/filament/dry-filament"}]
      },
      {
        title:"選對乾燥設備，先守住安全邊界",
        body:"優先使用具備溫控、計時與線材用途說明的專用乾燥設備，並依線材原廠建議設定。A1／A1 mini 是開放式機型，不可使用機器熱床乾燥線材。不要以紙箱、布料或其他可燃物覆蓋機器，也不要用料理用家電處理線材。",
        manga:{src:"../assets/advanced-a01/illustrations/drying-methods.webp",alt:"專用乾燥箱與 A1、A1 mini 禁止使用熱床乾燥線材的圖解",label:"GPT 教學圖解",caption:"能加熱不代表適合乾燥。設備必須能安全控制溫度與時間，並符合機型官方限制。"},
        details:[{label:"設備",title:"專用線材乾燥箱",text:"確認溫控、計時、通風方式與可支援材料，再依材料製造商建議操作。"},{label:"機型限制",title:"A1／A1 mini",text:"開放式結構無法依官方熱床乾燥流程形成受控空間，因此不可使用機器熱床乾燥。"},{label:"停機原則",title:"異味、冒煙或異常升溫",text:"立即停止加熱，依場域規範處理並通知教師或管理者，不拆機嘗試修理。"}],
        callout:"本課不提供任何繞過 A1／A1 mini 限制的方法。若設備說明與線材建議不一致，先停止並向設備或材料原廠確認。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜機型熱床乾燥限制",url:"https://wiki.bambulab.com/en/filament-acc/filament/dry-filament"}]
      },
      {
        title:"乾燥完成後，立刻建立保存循環",
        body:"乾燥只把當下水氣降下來；若線材持續暴露在潮濕空氣，很快又會回到不穩定狀態。完成後先依設備說明安全冷卻，再放入密封袋或密封箱，加入狀態良好的乾燥劑與濕度指示，最後記錄材料、日期與處理條件。",
        manga:{src:"../assets/advanced-a01/illustrations/storage-workflow.webp",alt:"線材冷卻、密封、乾燥劑、濕度卡與紀錄流程",label:"GPT 教學圖解",caption:"乾燥與保存是一個循環：處理完成、冷卻、密封、監測、記錄，下次使用前才有可靠依據。"},
        steps:["依設備說明完成冷卻，不把高溫捲盤立刻密封","使用可完整關閉的袋子或密封箱","放入有效乾燥劑與濕度卡或濕度計","標記材料、顏色、乾燥日期與條件","下次使用前檢查濕度與外觀紀錄"],
        callout:"乾燥劑需要依其說明再生或更換；顏色指示失效、包裝破損或濕度持續偏高時，不要只補貼標籤。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜材料特性與保存",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      }
    ],
    task:{title:"建立一張線材履歷卡",text:"選一捲常用線材，記下材料、開封日期、保存方式與目前症狀；列印固定小件作為乾燥前基準。若證據支持乾燥，依設備與材料說明完成處理、密封與日期紀錄，再用同一檔案比較。"},
    checkpoint:"我能先用紀錄與小件測試判斷是否受潮，遵守 A1／A1 mini 不可用熱床乾燥的限制，並在乾燥後立即密封保存。"
  },
  {
    id:"A02", slug:"02-quality-diagnostics.html", stage:"系統診斷", stageNo:"A", duration:"35 分鐘", type:"症狀判讀＋實驗",
    title:"品質問題診斷", subtitle:"不猜參數，用證據把症狀一步步縮小成可測試的原因。",
    lead:"失敗作品常同時顯示多個症狀，但一次改很多設定只會失去線索。本課建立固定診斷循環，分別處理拉絲、堵塞、翹曲、橋接、接縫、層裂與熱蠕變／熱堆積，並比較開放式 A1 與封閉式 P1S 的散熱情境。",
    goals:["使用症狀、原因、檢查、單一變因測試循環","分辨拉絲、出料不足與堵塞的差異","診斷翹曲與層裂的附著和收縮因素","分析橋接、接縫與表面品質","辨認熱蠕變／熱堆積並比較 A1、P1S 案例"],
    goalArt:[
      {src:"../assets/advanced-a02/illustrations/diagnostic-loop.webp",alt:"看症狀、列原因、先檢查、只改一項與小件重測的診斷循環"},
      {src:"../assets/advanced-a02/illustrations/extrusion-symptoms.webp",alt:"拉絲、出料不足與堵塞三種擠出症狀對照"},
      {src:"../assets/advanced-a02/illustrations/warping-layer-cracks.webp",alt:"翹曲與層裂的附著、收縮與冷卻因素"},
      {src:"../assets/advanced-a02/illustrations/bridge-seam-surface.webp",alt:"橋接下垂、接縫凸點與表面粗糙對照"},
      {src:"../assets/advanced-a02/illustrations/a1-p1s-heat-creep.webp",alt:"A1 與 P1S 的熱蠕變、冷端散熱與送料受阻案例"}
    ],
    sections:[
      {
        title:"先建立可重複的診斷循環",
        body:"先把「不好看」改寫成可觀察的症狀：發生在哪個高度、哪個方向、是否只在跨空移動或長時間列印後出現。接著列出少數可能原因，先完成不用拆機的安全檢查，只改一項，再用相同小件重測並保存照片。",
        manga:{src:"../assets/advanced-a02/illustrations/diagnostic-loop.webp",alt:"五步驟品質診斷循環",label:"GPT 教學圖解",caption:"每次測試都要能回答一個問題；結果不論改善或惡化，都會幫你排除原因。"},
        steps:["拍照並描述症狀、位置與發生時間","列出最多三個有證據的可能原因","先查材料、平台、送料與切片預覽","只改一個安全且可回復的變因","用同一小件重測並比較紀錄"],
        callout:"若出現冒煙、焦味、電氣異常、無法控制的升溫或碰撞，立即停機並尋求支援，不進入參數測試。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜列印品質問題分類",url:"https://wiki.bambulab.com/en/filament-acc/filament/print-quality"}]
      },
      {
        title:"擠出症狀：拉絲、出料不足與堵塞",
        body:"拉絲多發生在噴嘴跨空移動時；出料不足會讓線條變細、斷續或留下孔隙；堵塞則可能從出料漸少發展為完全無料。先查線材是否受潮或纏結、送料阻力、材料與噴嘴溫度是否相符，再查看送料齒輪是否留下大量磨料。",
        manga:{src:"../assets/advanced-a02/illustrations/extrusion-symptoms.webp",alt:"拉絲、出料不足與堵塞的外觀及可能原因",label:"GPT 教學圖解",caption:"三者可能互相重疊，但觀察「何時開始、是否仍有出料、線材有沒有磨痕」能快速縮小範圍。"},
        compareHeaders:["症狀","先看哪裡","單一變因測試"],
        compare:[["拉絲","跨空路徑、受潮、溫度與回抽預設","先乾燥或只調一項材料預設"],["出料不足","送料阻力、齒輪磨料、噴嘴流量","排除纏結後以固定小件測試"],["堵塞","出料漸少、喀喀聲、線材被磨平","停止列印，冷卻後依官方流程檢查"]],
        callout:"不要在噴嘴高溫或機器運動時徒手拉線材。需要冷拉、拆熱端或處理異物時，依原廠程序並由具經驗者操作。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜避免噴嘴堵塞",url:"https://wiki.bambulab.com/en/knowledge-sharing/how_to_avoid_nozzle_clogs"}]
      },
      {
        title:"翹曲與層裂：先分清平台附著和層間結合",
        body:"翹曲通常從底部角落離開平台開始，是收縮、平台附著、模型尺寸與環境溫差共同作用；層裂則發生在成品較高位置，代表層間結合抵不過收縮或冷卻。兩者都可能受環境風影響，但檢查位置與改善方向不同。",
        manga:{src:"../assets/advanced-a02/illustrations/warping-layer-cracks.webp",alt:"平台上的翹曲與高塔模型層裂對照",label:"GPT 教學圖解",caption:"底部先抬起通常往平台與收縮查；高處沿層線裂開則往層間結合、冷卻與環境溫差查。"},
        points:["翹曲先確認平台乾淨、板材與材料預設正確、第一層穩定","大型平板可先改方向、分件或使用合適 Brim，再比較結果","層裂先確認材料溫度、風扇與環境是否造成過快冷卻","不要用手把列印中的翹角壓回熱床；先暫停並等待運動停止"],
        sources:[{label:"內容參考：Bambu Lab Wiki｜模型翹曲原因與改善",url:"https://wiki.bambulab.com/en/knowledge-sharing/printed-model-warping"}]
      },
      {
        title:"橋接、接縫與表面：用試片定位變因",
        body:"橋接下垂與跨距、方向、速度、溫度和冷卻相關；接縫是每層開始與結束的位置，位置可管理但不一定能完全消失；表面粗糙則可能來自受潮、流量、速度、振動或頂層不足。先在切片預覽定位問題，再選專用小試片，只改一個變因。",
        manga:{src:"../assets/advanced-a02/illustrations/bridge-seam-surface.webp",alt:"橋接下垂、接縫凸點、表面粗糙與單一變因試片",label:"GPT 教學圖解",caption:"切片預覽告訴你問題是否固定在路徑位置；小試片則用較少時間確認是哪個設定造成變化。"},
        details:[{label:"橋接",title:"先縮短跨距或改方向",text:"幾何能改善時先改幾何，再測速度、溫度或冷卻；不要一開始就堆滿支撐。"},{label:"接縫",title:"判斷固定凸點是否與層起點重合",text:"在預覽中查看接縫位置，再單獨比較對齊、背面或其他接縫策略。"},{label:"表面",title:"分清整面粗糙或局部週期紋",text:"整面不穩優先查材料與流量；固定週期紋可能要再檢查機構與速度。"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜橋接、接縫與表面品質",url:"https://wiki.bambulab.com/en/filament-acc/filament/print-quality"}]
      },
      {
        title:"熱蠕變／熱堆積：材料在冷端提早軟化",
        body:"熱蠕變／熱堆積（Heat Creep）是熱量往冷端累積，使線材在應保持硬挺的位置提早軟化、膨脹或變形；送料阻力上升後，常見出料漸少、送料齒輪喀喀聲與磨料，最後可能形成堵塞。這不是噴嘴外部起火，而是熱端散熱平衡被破壞。",
        manga:{src:"../assets/advanced-a02/illustrations/a1-p1s-heat-creep.webp",alt:"A1、P1S 與熱蠕變造成冷端線材軟化及送料受阻",label:"GPT 教學圖解",caption:"看冷端散熱、風扇氣流、環境與腔體溫度，再核對低軟化溫度材料是否長時間處在過熱條件。"},
        compareHeaders:["案例","可能情境","安全檢查順序"],
        compare:[["A1 開放式","環境溫度高、冷端風扇或進風受阻、長時間低流量列印","確認風扇運轉與進風無遮擋，記錄室溫與發生時間"],["P1S 封閉式","低軟化溫度材料在偏熱腔體長時間列印，熱氣不易散出","依材料與機型建議管理艙門／上蓋，確認冷端散熱並記錄腔溫"],["兩者共通","材料預設不符、送料阻力、熱端組件或風扇異常","停止工作、等待冷卻；不帶電拆機，必要時聯絡支援"]],
        callout:"若風扇不轉、反覆堵塞、溫度讀值異常或需要拆電氣與熱端零件，停止測試並交由教師、管理者或原廠支援處理。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜Heat Creep 與堵塞預防",url:"https://wiki.bambulab.com/en/knowledge-sharing/how_to_avoid_nozzle_clogs"}]
      }
    ],
    task:{title:"完成一份單一變因診斷紀錄",text:"選一個安全的小型失敗件，拍下整體、問題特寫與切片預覽；用一句話描述症狀，列出三個可能原因，完成不用拆機的檢查，再只改一項並重印。記錄改善、無變化或惡化，決定下一個測試。"},
    checkpoint:"我能把品質問題寫成可觀察的症狀，用安全檢查與單一變因測試縮小原因，也知道熱蠕變反覆發生或涉及風扇、熱端、電氣時要停止並尋求支援。"
  }
];
