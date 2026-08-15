window.ADVANCED_COURSES = [
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
  },
  {
    id:"A03", slug:"03-support-settings.html", stage:"切片策略", stageNo:"A", duration:"35 分鐘", type:"判讀＋對照實驗",
    title:"支撐與支撐介面設定", subtitle:"先減少不必要的支撐，再用接觸面與間距換到可接受的底面品質。",
    lead:"支撐不是越多越安全。它會增加材料、時間、換料與後處理，也可能在模型留下接觸痕。本課依 Bambu Studio 的支撐流程，從模型方向、一般支撐與樹狀支撐、臨界角度，一路理解支撐主體、支撐接觸面與頂部Z距離，最後用同一試片找出可拆又好看的設定。",
    goals:["用方向、橋接與幾何修改減少不必要支撐","依懸空形狀選擇一般支撐、樹狀支撐或手動支撐","用臨界角度與切片預覽控制支撐範圍","解釋支撐接觸面、線距、層數與頂部Z距離","以固定試片比較底面品質、好拆度、材料量與時間"],
    goalArt:[
      {src:"../assets/advanced-a03/illustrations/support-or-redesign.webp",alt:"比較旋轉模型、橋接、倒角與開啟支撐的繁體中文動漫圖解"},
      {src:"../assets/advanced-a03/illustrations/support-types.webp",alt:"一般支撐、樹狀支撐與手動支撐適用形狀對照圖"},
      {src:"../assets/advanced-a03/illustrations/threshold-preview.webp",alt:"臨界角度改變支撐覆蓋範圍並在切片預覽確認的圖解"},
      {src:"../assets/advanced-a03/illustrations/interface-z-gap.webp",alt:"支撐主體、接觸面與頂部Z距離剖面及好拆度對照"},
      {src:"../assets/advanced-a03/illustrations/support-test.webp",alt:"用同一支撐試片比較底面品質、拆除難度、材料與時間的實驗流程"}
    ],
    sections:[
      {
        title:"先別急著開支撐：方向與幾何先判斷",
        body:"看到懸空面時，先問模型能不能旋轉到更穩定的方向、跨距能不能當作橋接、尖銳的水平懸空能不能改成倒角，或模型能不能安全分件。只有這些方法會破壞功能、外觀或裝配時，才進入支撐設定。這一步通常比堆更多支撐更省時間，也能減少接觸痕。",
        manga:{src:"../assets/advanced-a03/illustrations/support-or-redesign.webp",alt:"旋轉、橋接、倒角、分件與開支撐的決策圖",label:"GPT 教學圖解",caption:"支撐是最後的幾何工具之一。先改方向或形狀，能同時省材料、時間與拆除工作。"},
        compareHeaders:["做法","適合情境","需要留意"],
        compare:[["旋轉模型","讓大面朝向平台、減少水平懸空","強度方向、外觀面與平台接觸面會改變"],["橋接／倒角","短跨距或可修改的水平突出","必須在預覽確認橋接方向與跨距"],["分件後組裝","內部難拆支撐或複雜空腔","增加接合、定位與裝配需求"],["開啟支撐","功能面不能改、懸空仍無法自撐","增加耗材、時間與接觸痕"]],
        callout:"不要因切片警示就立刻接受所有自動支撐。先轉動模型並重新切片，用支撐用量、時間與接觸位置比較方案。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜支撐用途與設定",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"}]
      },
      {
        title:"一般、樹狀、自動與手動怎麼選",
        body:"一般支撐會把懸空區域向平台投影，適合大型、平坦的懸空面；樹狀支撐以分支靠近局部懸空，常能繞開模型並減少材料。自動模式依幾何和臨界角度產生支撐；手動模式只在支撐生成區或繪製區工作，適合保護外觀面或補上軟體沒選到的位置。",
        manga:{src:"../assets/advanced-a03/illustrations/support-types.webp",alt:"一般支撐、樹狀支撐、自動與手動支撐的用途對照",label:"GPT 教學圖解",caption:"大平面先比較一般或樹狀混合；曲面與角色局部懸空可比較樹狀；指定區域則使用手動繪製。"},
        details:[{label:"一般支撐",title:"大面積、平坦懸空",text:"支撐接觸較連續，底面可較穩定，但材料與接觸範圍通常較多。"},{label:"樹狀支撐",title:"曲面、角色與局部懸空",text:"分支能繞開模型並合併節點，常較省料；細長分支仍要檢查穩定性。"},{label:"自動模式",title:"先取得可比較的基準",text:"依臨界角度產生支撐，切片後仍要逐層檢查是否碰到不想留下痕跡的表面。"},{label:"手動模式",title:"指定生成或遮蔽",text:"用支撐繪製、生成器或遮蔽器限制位置，不代表可以跳過切片預覽。"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜一般、樹狀與手動支撐",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"},{label:"延伸參考：Bambu Lab Wiki｜支撐繪製",url:"https://wiki.bambulab.com/en/software/bambu-studio/support-painting"}]
      },
      {
        title:"臨界角度：用預覽決定支撐範圍",
        body:"Bambu Studio 的臨界角度是自動支撐判斷的一部分：相對水平面的坡度低於臨界值時會生成支撐；角度設得越大，通常會得到更多支撐。不要只看輸入數字，因為模型曲面、層高、橋接與支撐樣式都會改變實際結果。每次修改後都重新切片，用逐層預覽核對接觸位置。",
        manga:{src:"../assets/advanced-a03/illustrations/threshold-preview.webp",alt:"小、中、大臨界角度對應不同支撐範圍並回到切片預覽確認",label:"GPT 教學圖解",caption:"角度不是品質旋鈕。先保留材料預設作為基準，再以預覽確認多出的支撐是否真的解決風險。"},
        steps:["保留目前機型、噴嘴、材料與層高預設","切片並記錄支撐時間、材料量與接觸位置","只改臨界角度後重新切片","逐層查看懸空、橋接與支撐接觸面","若支撐過多，先回頭檢查方向與手動遮蔽"],
        callout:"臨界角度的方向容易看反：在 Bambu Studio 中，數值越大通常產生越多支撐。以切片預覽為最後判斷，不靠記憶猜測。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜Threshold Angle",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"}]
      },
      {
        title:"支撐接觸面與頂部Z距離的取捨",
        body:"支撐由較疏的主體與靠近模型的支撐接觸面組成。頂部接觸面層數與線距會影響接觸面的連續程度；頂部Z距離則是支撐頂部與模型之間的垂直間隙。同材質列印時，間距加大通常較好拆但底面較容易下垂；間距縮小可改善承托，卻可能讓支撐黏得更牢。",
        manga:{src:"../assets/advanced-a03/illustrations/interface-z-gap.webp",alt:"支撐主體、頂部接觸面、模型與頂部Z距離的剖面對照",label:"GPT 教學圖解",caption:"先認清三個不同東西：接觸面層數、接觸面線距、頂部Z距離。一次只調一項，才知道是哪個變因造成改變。"},
        compareHeaders:["設定方向","底面表現","拆除與風險"],
        compare:[["同材質＋較大頂部Z距離","底面線條較可能下垂或粗糙","通常較容易拆除"],["同材質＋較小頂部Z距離","承托更接近，底面可能改善","黏得更牢，拆除痕與破損風險上升"],["同材質＋頂部Z距離為 0","看似完全承托","不建議當通用值，可能融合而極難拆"],["相容專用支撐材料＋距離 0","可形成連續承托面","依官方材料相容與換料建議操作"]],
        callout:"不要把「接觸面高度」當成單一參數。實際要分別查看頂部接觸面層數、頂部接觸面線距與頂部Z距離。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜支撐接觸面與 Top Z Distance",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"}]
      },
      {
        title:"用同一試片找到可拆又好看的設定",
        body:"專用支撐材料通常只放在支撐接觸面，主體仍用模型材料，可節省專用材料；但增加換料與沖刷時間。官方說明指出，相容的專用支撐材料可把頂部Z距離設為 0，讓底面獲得連續承托。若支撐接觸面與模型使用同材質，則從材料與層高預設開始，以固定試片逐項比較，不直接套用別人的最佳數字。",
        manga:{src:"../assets/advanced-a03/illustrations/support-test.webp",alt:"固定支撐試片、只改一項、列印、冷卻拆除、評分與保存設定的實驗流程",label:"GPT 教學圖解",caption:"最好的設定不是只有底面漂亮；還要能安全拆除、耗時合理，並在相同條件下重複成功。"},
        steps:["固定模型、方向、層高、材料與支撐類型","記錄基準的頂部接觸面層數、線距與頂部Z距離","每輪只改一項，重新切片並記錄時間與材料量","列印後等待冷卻，再朝遠離手掌方向拆除支撐","用底面完整度、拆除難度、耗材與時間評分","保存成功的 3MF、照片與適用材料，不覆蓋原始預設"],
        examples:[{icon:"tools",label:"實作案例 · Flashforge",title:"Top Z 距離測試",body:"影片使用固定試片比較 0.20～0.30 mm：逐一拆除支撐，找出容易拆除、底面品質也能接受的試片，再把該數值填入切片軟體的 Top Z distance。",why:"這段數值是 Flashforge Creator 5 的示範範圍，不是通用答案。改用 Bambu Studio 時仍要固定材料、層高與支撐類型，從目前預設開始做單一變因測試並檢查切片預覽。",source:"https://www.facebook.com/share/r/17qYS85Bnm/?mibextid=wwXIfr",sourceLabel:"觀看 Flashforge 原始影片"}],
        callout:"使用不同支撐接觸面材料前，先核對材料相容性、噴嘴與 AMS／進料限制。若切換材料需要頂部Z距離為 0，接受官方建議後仍要先檢查切片預覽。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜專用支撐材料與接觸面",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"},{label:"影片來源：Flashforge 官方 Facebook 頻道",url:"https://www.facebook.com/flashforge3dprinters"}]
      }
    ],
    task:{title:"完成一張支撐介面對照表",text:"選一個有平坦懸空面的固定試片，先保存預設切片結果。保持模型、方向、材料、層高與支撐類型不變，每輪只改頂部Z距離、頂部接觸面層數或線距其中一項；記錄列印時間、支撐材料量、冷卻後拆除難度與底面照片，選出本材料可接受的平衡。"},
    checkpoint:"我能先減少不必要支撐，分辨一般、樹狀與手動支撐，也能把支撐接觸面層數、線距和頂部Z距離分開測試；使用專用支撐材料時會先核對官方相容性與切片預覽。"
  },
  {
    id:"A04", slug:"04-filament-selection.html", stage:"材料應用", stageNo:"A", duration:"40 分鐘", type:"情境判讀＋選材實作",
    title:"依作品需求選擇線材", subtitle:"先看作品要承受什麼，再從功能需求縮小材料範圍。",
    lead:"選線材不是背一張材料排行表，也不是越昂貴越好。本課從室內外環境、溫度、受力、彎曲、外觀與後加工六個問題出發，比較 PLA、PETG、ABS、ASA、TPU、PC、PA 與 CF／GF 填料線材，最後用小件測試確認選擇。以下社群案例用來觀察真實用途，不等於官方性能認證。",
    goals:["用六個作品問題寫出需求條件","把材料特性連到實際功能與環境","比較常用、耐候、柔性與工程材料","理解 CF／GF 填料改善的是剛性與穩定性","用候選材料與小件測試留下選材證據"],
    goalArt:[
      {src:"../assets/advanced-a04/illustrations/needs-six-questions.webp",alt:"從室內外、溫度、受力、彎曲、外觀與後加工判斷作品需求"},
      {src:"../assets/advanced-a04/illustrations/material-function-map.webp",alt:"以容易列印、日常耐用、戶外耐候、柔性、工程功能與剛性分類線材"},
      {src:"../assets/advanced-a04/illustrations/pla-petg-applications.webp",alt:"PLA 展示模型與 PETG 日常功能件的應用比較"},
      {src:"../assets/advanced-a04/illustrations/abs-asa-applications.webp",alt:"ABS 耐熱外殼與 ASA 戶外耐候零件的應用比較"},
      {src:"../assets/advanced-a04/illustrations/tpu-flexibility.webp",alt:"TPU 壓縮、彎曲、回彈與壁厚設計的功能圖解"}
    ],
    sections:[
      {
        title:"先問六個問題，再看材料名稱",
        body:"先寫清楚作品會放在室內或戶外、接觸多高的環境溫度、承受撞擊或長期載重、是否需要彎曲回彈、表面要精緻或耐磨，以及完成後是否要打磨、鑽孔或黏合。答案越具體，越能排除不合適的材料；若只寫「要堅固」，候選範圍仍然太大。",
        manga:{src:"../assets/advanced-a04/illustrations/needs-six-questions.webp",alt:"老師以六個使用情境問題帶領學生整理選材需求",label:"GPT 教學圖解",caption:"不要先問哪一種線材最強；先問作品在哪裡用、怎麼受力、需要什麼外觀與後加工。"},
        steps:["寫出室內或戶外與日照條件","估計環境溫度與熱源距離","描述撞擊、彎曲或持續載重","決定硬挺、韌性或柔性需求","列出外觀、耐磨與後加工要求","挑兩種候選材料做小件測試"],
        callout:"材料規格是縮小範圍的依據，不是成品保證。模型方向、壁厚、結構、受潮與列印品質都會改變最終表現。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜初學者線材選擇指南",url:"https://wiki.bambulab.com/en/knowledge-sharing/filament-guide-beginners"}]
      },
      {
        title:"把需求對到材料功能地圖",
        body:"容易列印的 PLA 適合快速驗證與展示；PETG 偏向日常耐用；ABS、ASA、PC、PA 服務更明確的耐熱、耐候或工程需求；TPU 負責柔性與回彈；加入短切 CF／GF 的線材則著重剛性與尺寸穩定。功能地圖只用來建立候選，不用來宣布唯一答案。",
        manga:{src:"../assets/advanced-a04/illustrations/material-function-map.webp",alt:"六種作品功能需求對應不同線材家族的地圖",label:"GPT 教學圖解",caption:"從用途入口進入材料家族，再回到機型、保存狀態與小件測試確認。"},
        compareHeaders:["作品需求","先看的材料家族","再確認"],
        compare:[["快速模型與室內展示","PLA","耐熱需求與外觀"],["日常容器、治具與耐用件","PETG","剛性、耐磨與環境"],["戶外或較高溫環境","ASA／ABS／PC","日照、溫度與機型條件"],["保護套、緩衝與回彈","TPU","硬度、壁厚與送料穩定"],["受力活動件與工程治具","PA／PC／CF／GF 複合材料","吸濕、方向與小件測試"]],
        sources:[{label:"內容參考：Bambu Lab Wiki｜線材材料特性表",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      },
      {
        title:"PLA 與 PETG：從展示模型到日常功能件",
        body:"PLA 容易取得良好外觀與細節，適合室內模型、教具和快速原型，但不應把它當成高溫環境的通用材料。PETG 通常比 PLA 更適合需要韌性、耐水與日常耐用的收納、夾具或工具；它也可能較容易拉絲，外觀與可列印性仍要用實際預設確認。",
        manga:{src:"../assets/advanced-a04/illustrations/pla-petg-applications.webp",alt:"PLA 室內展示模型與 PETG 日常收納功能件的應用圖",label:"GPT 教學圖解",caption:"PLA 強在快速、細節與室內展示；PETG 常被選來做更耐用的日常功能件。"},
        details:[{label:"PLA",title:"模型、教具、外觀原型",text:"適合快速驗證尺寸和造型；若作品靠近熱源、車內或戶外曝曬，先重新評估。"},{label:"PETG",title:"收納、夾具、日常工具",text:"適合需要韌性與耐水的功能件；仍要留意剛性、拉絲與表面需求。"}],
        examples:[{icon:"box",label:"社群案例 · PLA",title:"可堆疊收納抽屜",body:"用實際收納件觀察 PLA 如何服務室內整理與尺寸驗證。",why:"社群案例提供用途靈感，不等於官方性能認證。",source:"https://makerworld.com/en/models/139371",sourceLabel:"MakerWorld 查看作品"},{icon:"tools",label:"社群案例 · PETG",title:"洞洞板傾斜抽屜",body:"抽屜、把手與安裝結構呈現 PETG 在日常耐用件上的常見方向。",why:"實際承重仍取決於方向、壁厚與列印品質；不等於官方性能認證。",source:"https://makerworld.com/en/models/919517-tilted-gridfinity-drawer-for-pegboards-with-handle",sourceLabel:"MakerWorld 查看作品"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜PLA、PETG 材料特性",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      },
      {
        title:"ABS 與 ASA：較高溫環境和戶外耐候",
        body:"ABS 常見於需要韌性、耐衝擊與較高耐熱需求的外殼或功能件；ASA 的方向相近，並更適合考慮紫外線與戶外耐候的作品。兩者比 PLA、PETG 更容易受收縮與環境風影響，通常應使用合適的封閉式機型、平台與官方材料預設。",
        manga:{src:"../assets/advanced-a04/illustrations/abs-asa-applications.webp",alt:"ABS 耐熱設備外殼與 ASA 戶外日照用品的功能比較",label:"GPT 教學圖解",caption:"ABS 先看耐熱外殼與室內功能件；ASA 進一步處理日照、雨水與戶外耐候需求。"},
        points:["接近熱源不等於可直接接觸火焰；先查材料與成品的安全限制","戶外使用除了材料，還要評估積水、固定方式、厚度與長期載重","大型平面與尖角更容易翹曲，先從方向與幾何降低風險"],
        examples:[{icon:"sun",label:"社群案例 · ASA",title:"沙灘用 AirTag 防護盒",body:"戶外攜帶、沙塵與日照情境展示 ASA 類材料為何會成為候選。",why:"這是設計用途參考，不代表防水、耐候或保護等級的官方認證。",source:"https://makerworld.com/en/models/497031-sand-safe-with-airtag",sourceLabel:"MakerWorld 查看作品"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜ABS、ASA 材料特性與機型建議",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      },
      {
        title:"TPU：用硬度、壁厚與形狀設計回彈",
        body:"TPU 的價值不是單純「軟」，而是能透過材料硬度、壁厚、填充與幾何做出保護、緩衝、防滑和可彎曲結構。同一捲 TPU 做成薄殼會容易彎曲，增加壁厚或肋條後會明顯變硬；因此選材時必須把材料與結構一起測試。",
        manga:{src:"../assets/advanced-a04/illustrations/tpu-flexibility.webp",alt:"TPU 壓縮、彎曲、回彈及壁厚改變剛性的圖解",label:"GPT 教學圖解",caption:"TPU 的手感由材料硬度與模型結構共同決定；先印薄片與實際局部結構，比只看線材名稱更可靠。"},
        compareHeaders:["設計方式","可能手感","常見用途"],
        compare:[["薄壁、開孔或細帶","容易彎曲","束帶、保護套、活動連接"],["較厚壁與圓角","緩衝並可回彈","防撞墊、腳墊、握把"],["厚壁、肋條或高填充","較硬且抗壓","輪胎、支撐墊、受壓功能件"]],
        examples:[{icon:"shield",label:"社群案例 · TPU",title:"手機保護殼",body:"薄壁、按鍵與包覆邊緣能觀察 TPU 柔性、回彈和局部厚度的配合。",why:"保護效果取決於設計與測試，不等於官方防摔性能認證。",source:"https://makerworld.com/en/models/210252-iphone-13-case",sourceLabel:"MakerWorld 查看作品"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜TPU 材料特性與送料注意事項",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      },
      {
        title:"PC 與 PA：耐衝擊、韌性和反覆受力",
        body:"PC 常被列入耐衝擊、耐熱與硬挺外殼的候選；PA（尼龍）則常用在需要韌性、耐磨或反覆活動的齒輪、鉸鏈與治具。兩者都屬於需要更完整材料管理與列印條件的工程材料，尤其 PA 吸濕後可能快速失去穩定出料與表面品質，測試前應依官方說明乾燥。",
        manga:{src:"../assets/advanced-a04/illustrations/pc-pa-engineering.webp",alt:"PC 耐衝擊耐熱外殼與 PA 齒輪鉸鏈反覆受力的應用圖",label:"GPT 教學圖解",caption:"PC 先看耐衝擊與耐熱外殼；PA 先看韌性、耐磨與活動零件，兩者都要重視環境和含水狀態。"},
        details:[{label:"PC",title:"硬挺外殼與受衝擊零件",text:"適合進一步評估耐熱與衝擊需求，但仍要檢查環境、方向與機型條件。"},{label:"PA",title:"齒輪、鉸鏈與反覆受力件",text:"韌性與耐磨是常見選擇理由；乾燥、密封保存與列印後調濕都可能影響結果。"}],
        examples:[{icon:"hook",label:"社群案例 · PC／PC-CF",title:"桌邊掛鉤",body:"以集中載重的掛鉤觀察幾何、列印方向與材料剛性如何共同工作。",why:"標題中的材料選擇來自作者案例，不等於官方承重性能認證。",source:"https://makerworld.com/en/models/15447-strongarm-a-table-desk-holder-hook-for-bags-and-pu",sourceLabel:"MakerWorld 查看作品"},{icon:"tray",label:"社群案例 · PA6-CF",title:"工程用零件托盤",body:"薄壁分隔、尺寸配合和耐用需求呈現 PA 複合材料的功能件方向。",why:"實際耐化學與尺寸表現需自行驗證，不等於官方性能認證。",source:"https://makerworld.com/en/models/1160299-yec-tray-pa6-cf",sourceLabel:"MakerWorld 查看作品"}],
        sources:[{label:"內容參考：Bambu Lab Wiki｜PC、PA 材料特性",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"},{label:"內容參考：Bambu Lab Wiki｜工程材料乾燥",url:"https://wiki.bambulab.com/en/filament-acc/filament/dry-filament"}]
      },
      {
        title:"CF／GF 填料：提高剛性與尺寸穩定，不是連續纖維",
        body:"CF／GF 線材通常是在基材中加入短切碳纖或玻璃纖維，用來提高剛性、降低部分收縮並改善尺寸穩定；它不等同連續纖維零件，也不能取代結構設計與方向測試。適合治具、支架、機器零件和需要保持形狀的功能件。這類材料可能磨耗送料路徑並對噴嘴有要求，使用前只需依材料頁核對機型、硬化鋼噴嘴、噴嘴尺寸與送料方式，不另把設備限制當成選材主題。",
        manga:{src:"../assets/advanced-a04/illustrations/cf-gf-functional-parts.webp",alt:"短切碳纖與玻璃纖維複合線材用於治具、支架與機器零件",label:"GPT 教學圖解",caption:"重點是治具與支架需要的剛性、抗彎和尺寸穩定；短纖填料不是連續纖維結構。"},
        points:["先寫清楚是需要更硬挺、較穩定尺寸，還是需要抗衝擊與韌性","確認基材是 PLA、PETG、PA 或其他材料，填料不會抹去基材特性","以實際受力方向列印小件，和未填料基材做同條件比較","研磨、鑽孔與粉塵處理依場域安全規範進行"],
        examples:[{icon:"tools",label:"社群案例 · PAHT-CF",title:"汽車離合器飛輪固定工具",body:"工具需要維持形狀並承受操作力，是剛性、幾何與列印方向共同作用的例子。",why:"作者分享的是實際用途，不等於官方承載、維修或安全性能認證。",source:"https://makerworld.com/en/models/721613-bmw-clutch-flywheel-lock-tool",sourceLabel:"MakerWorld 查看作品"}],
        callout:"最後流程：需求 → 候選 → 材料與機型相容 → 小件測試 → 記錄結果。若小件失敗，先找症狀原因，不要直接把材料換成更昂貴的等級。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜CF／GF 複合線材與噴嘴相容",url:"https://wiki.bambulab.com/en/general/filament-guide-material-table"}]
      }
    ],
    task:{title:"完成一張作品選材卡",text:"挑一件準備製作的作品，寫出六項需求並選兩種候選材料。引用官方材料表說明入選與淘汰理由，再固定模型、方向、層高與尺寸，各列印一個小型關鍵結構；比較外觀、手感、變形與破壞位置，留下照片和最終選擇。"},
    checkpoint:"我能從作品環境與受力需求建立候選材料，分辨 PLA、PETG、ABS、ASA、TPU、PC、PA 與 CF／GF 填料的功能方向，也會用官方資料和小件測試確認，而不是把社群案例當成性能保證。"
  },
  {
    id:"A05", slug:"05-force-direction.html", stage:"結構設計", stageNo:"A", duration:"40 分鐘", type:"受力判讀＋破壞實驗",
    title:"受力方向與列印方向", subtitle:"先追蹤力量怎麼走，再決定模型怎麼放。",
    lead:"功能零件不是只要印得漂亮；掛上重量、鎖入螺絲或反覆按壓後，力量會沿結構尋找路徑。本課用十張標註圖，帶你從外力、固定點與傳力路徑判斷列印方向，並以安全小件測試驗證。",
    goals:["分辨拉伸、壓縮、彎曲、剪切與扭轉","解釋 XY 層內路徑與 Z 層間接合的方向性","標出固定邊界、外力、傳力路徑與可能破壞面","比較同一支架平放、側放與直立的取捨","在 Bambu Studio 預覽關鍵層與截面","完成只改列印方向的安全小件測試"],
    goalArt:[
      {src:"../assets/advanced-a05/illustrations/force-types.webp",alt:"五種基本受力的方向與變形方式"},
      {src:"../assets/advanced-a05/illustrations/xy-z-anisotropy.webp",alt:"XY 層內路徑與 Z 層間接合比較"},
      {src:"../assets/advanced-a05/illustrations/hook-load-path.webp",alt:"掛鉤固定點、載重與傳力路徑"},
      {src:"../assets/advanced-a05/illustrations/bracket-orientations.webp",alt:"同一支架三種列印方向比較"},
      {src:"../assets/advanced-a05/illustrations/bambu-preview.webp",alt:"切片預覽中的外殼、填充與接縫"},
      {src:"../assets/advanced-a05/illustrations/break-test.webp",alt:"固定條件只改方向的小件測試"}
    ],
    sections:[
      {
        title:"先畫力，不先旋轉模型",
        body:"先找作品如何被固定，再畫使用時的外力。拉伸把物體拉長，壓縮把物體推短，彎曲會讓同一截面一側受拉、一側受壓，剪切讓相鄰截面相對滑動，扭轉則繞軸旋轉。實際零件常同時承受兩種以上受力，所以先畫固定點、力與方向，比直接猜擺法可靠。",
        manga:{src:"../assets/advanced-a05/illustrations/force-types.webp",alt:"五種基本受力的方向、固定點與變形方式比較",label:"GPT 教學圖解",caption:"先把力的方向說清楚，再討論層線；同一個零件在不同使用方式下，主要受力也可能改變。",guides:[
          {number:"1",title:"先看外力",text:"藍色箭頭表示力量從哪裡進入，以及推、拉或旋轉的方向。"},
          {number:"2",title:"再找固定點",text:"黃色位置限制零件移動，外力與固定點之間才會形成內部受力。"},
          {number:"3",title:"辨認主要變形",text:"觀察零件被拉長、壓短、彎曲、滑移或扭轉，不只看力箭頭。"},
          {number:"4",title:"注意組合受力",text:"掛鉤與支架通常以彎曲為主，同時也可能包含剪切或拉伸。"}
        ]},
        points:["力必須有來源，也必須有承受它的固定位置","彎曲截面的受拉側常比受壓側更需要連續材料路徑","若使用情境改變，原本合理的列印方向也可能需要重選"],
        callout:"本課只建立設計與測試方法，不提供吊掛、攀爬、人體承重或安全關鍵零件的承載保證。"
      },
      {
        title:"線條、層面與異向性",
        body:"FFF 先在 XY 平面形成單層擠出路徑，再沿 Z 軸逐層堆疊；因此同一材料在不同方向受力時，結果可能不同。沿單層路徑受力與跨越層間接合受力不是同一件事，但也不能簡化成「Z 永遠最弱」：材料、溫度、含水、擠出品質、幾何、外殼、接縫與路徑中斷都會改變實際表現。",
        manga:{src:"../assets/advanced-a05/illustrations/xy-z-anisotropy.webp",alt:"XY 單層擠出路徑與 Z 逐層堆疊、層間接合的受力方向比較",label:"GPT 教學圖解",caption:"水平箭頭表示單層擠出路徑，垂直 Z 箭頭表示逐層堆疊方向；先看受力是否跨層，再把材料與列印品質納入判斷。",guides:[
          {number:"1",title:"沿單層路徑追蹤",text:"綠色 XY 層內路徑能沿擠出線傳遞力量，但轉角、接縫與中斷仍需另外檢查。"},
          {number:"2",title:"辨認層間接合",text:"紫色層面代表每層與上一層熔接的位置。"},
          {number:"3",title:"確認逐層堆疊方向",text:"Z 軸是逐層堆疊方向；藍色箭頭若把層面拉開，就要特別留意層間品質。"},
          {number:"4",title:"保留條件",text:"紅色虛線是可能剝離面，不是每個成品都會沿此處斷裂。"}
        ]},
        sources:[{label:"UltiMaker｜How to design for FFF 3D printing",url:"https://ultimaker.com/wp-content/uploads/2024/06/How-to-design-for-FFF-1.pdf"},{label:"同儕審查研究｜列印方向與拉伸、破壞行為",url:"https://doi.org/10.1016/j.mtcomm.2026.115715"}]
      },
      {
        title:"同一支架的三種列印方向",
        body:"平放、側放與直立會同時改變層線相對受力的方向、平台接觸面、支撐需求、列印高度、表面與孔的品質。不要只選支撐最少的擺法；先用相同外力追蹤綠色傳力路徑，再比較紅色可能裂縫是否切斷主要路徑。",
        manga:{src:"../assets/advanced-a05/illustrations/bracket-orientations.webp",alt:"同一 L 型支架平放、側放與直立時的傳力和層線比較",label:"GPT 教學圖解",caption:"三種擺法沒有脫離情境的固定冠軍；要把強度、支撐、接觸面、時間與表面一起比較。",guides:[
          {number:"1",title:"保持外力相同",text:"三個支架使用同一固定方式與同一向下載重，才有可比性。"},
          {number:"2",title:"追綠色路徑",text:"從受力孔一路追到固定孔，找出路徑是否連續。"},
          {number:"3",title:"對照層線",text:"紫色線隨擺放改變，注意主要受拉區是否跨越層面。"},
          {number:"4",title:"再比較製程",text:"把支撐、接觸面與列印高度列成取捨，不只看其中一項。"}
        ]},
        compareHeaders:["擺放方式","先觀察","還要付出的代價"],
        compare:[["平放","層線與支架平面、孔周路徑","底面外觀與孔形"],["側放","主要路徑與層線關係","懸空與支撐接觸面"],["直立","截面與層面關係","高度、晃動與列印時間"]],
        sources:[{label:"Stratasys｜Design Considerations: FDM Additive Manufacturing Tooling",url:"https://www.stratasys.com/contentassets/1a0cc7a8e7d14f29ac972189bfeade4c/dg_fdm_designconsiderationsfdmtooling_0718a.pdf?v=48fbe5"}]
      },
      {
        title:"四種功能零件：從力找到薄弱位置",
        body:"掛鉤先畫完整夾持邊界、載重接觸點與根部分析截面，再判斷該截面的受拉側和受壓側；L 型支架先看內角與孔之間的傳力；螺絲孔若使用自攻／擠牙螺絲直接鎖入塑膠，要看底孔、扭力造成的環向撐開與螺絲座根部；卡扣則要看反覆彎曲時的根部受拉、圓角與列印線。這些都是找測試位置的線索，不是斷裂預言。",
        manga:{src:"../assets/advanced-a05/illustrations/hook-load-path.webp",alt:"掛鉤的完整夾持邊界、載重接觸點、根部分析截面與可能起裂區",label:"GPT 教學圖解",caption:"先把夾具接觸形成的固定邊界畫完整，再在根部選定截面判斷拉壓；紅色位置只是可能起裂區，不是唯一破壞路徑。",guides:[
          {number:"1",title:"載重進入",text:"藍色向下箭頭是袋子或物件施加在鉤端的力。"},
          {number:"2",title:"畫完整夾持邊界",text:"桌緣、背板與壓緊螺桿共同限制掛鉤移動，不把單一接觸點當成全部固定條件。"},
          {number:"3",title:"傳力回固定點",text:"綠線顯示力如何穿過彎曲部與根部。"},
          {number:"4",title:"在根部截面分辨拉壓",text:"只在選定的根部分析截面標示受拉側與受壓側，避免把整段曲面都當成相同狀態。"},
          {number:"5",title:"觀察可能起裂區",text:"紅色位置是優先觀察區；圓角可降低尖銳應力集中，但實際裂縫仍由測試確認。"}
        ]},
        detailFigures:[{src:"../assets/advanced-a05/illustrations/screw-boss-detail.webp",alt:"自攻或擠牙螺絲直接鎖入塑膠時的環向撐開、孔周外殼與螺絲座根部風險",label:"GPT 教學圖解",caption:"這是自攻／擠牙螺絲直接鎖入塑膠的案例；底孔過小、扭力過高或沉頭楔入會增加撐裂風險，不能套用到所有螺絲接合。",guides:[
          {number:"1",title:"先確認螺絲接合方式",text:"只有自攻／擠牙螺絲直接成形塑膠牙時，才把環向撐開列為主要檢查。"},
          {number:"2",title:"檢查孔周外殼",text:"綠色同心路徑應連續包圍孔，不被稀疏填充取代。"},
          {number:"3",title:"核對底孔與扭力",text:"底孔過小、扭力過高及沉頭楔入都可能提高螺絲座開裂風險。"},
          {number:"4",title:"看螺絲座根部",text:"力量最後回到支架本體，根部圓角與厚度很重要。"},
          {number:"5",title:"分清嵌件與螺帽",text:"機械牙螺絲配合金屬嵌件／螺帽時，主要載重可能改為軸向夾緊、孔壁承壓或剪切。"}
        ]}],
        sources:[{label:"Covestro｜Self-tapping screws for thermoplastics",url:"https://solutions.covestro.com/-/media/covestro/solution-center/story/brochures/self-tapping-screws_gb.pdf"}]
      },
      {
        title:"方向、外殼與填充的調整順序",
        body:"先調整模型方向與幾何，讓主要傳力路徑更連續並降低尖角；再檢查孔周、根部與外表面的外殼圈數；最後把填充密度、圖樣或角度當成單一變因。100% 填充不是通用答案：許多殼狀或以彎曲為主的零件會由外殼承擔較多外側拉壓，但填充仍可能承擔剪切、支撐外殼、抵抗壓縮與挫曲，必須依實際幾何和載重測試。",
        manga:{src:"../assets/advanced-a05/illustrations/fastener-snap-fit.webp",alt:"功能零件先調方向和幾何，再看外殼與填充",label:"GPT 教學圖解",caption:"先讓力走得順，再補足孔周外殼；不要用提高填充掩蓋不利方向或尖銳根部。",guides:[
          {number:"1",title:"先改方向",text:"讓主要受拉區減少跨層剝離風險。"},
          {number:"2",title:"再改幾何",text:"增加圓角、厚度或肋條，讓傳力轉折更平順。"},
          {number:"3",title:"補足外殼",text:"孔周與外表面用連續圈數承受主要拉壓。"},
          {number:"4",title:"最後測填充",text:"固定其他條件，比較密度或方向對變形和破壞的影響。"}
        ]},
        steps:["方向與固定方式","根部圓角與截面","外殼圈數與孔周路徑","填充密度、圖樣或角度","同尺寸小件測試"],
        sources:[{label:"Prusa Knowledge Base｜Infill：外殼與填充對強度的角色",url:"https://help.prusa3d.com/article/infill_42"},{label:"Prusa Knowledge Base｜Modeling with 3D printing in mind",url:"https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135"}]
      },
      {
        title:"回到 Bambu Studio 預覽關鍵截面",
        body:"擺好方向後，不要只看實心模型外觀。切片後切換到 Bambu Studio 預覽，逐層檢查外殼是否繞過孔、填充如何接上外殼、填充方向是否符合假設、接縫是否落在高應力區，以及關鍵截面是否突然變薄。預覽能查路徑，但不能直接證明承重能力。",
        manga:{src:"../assets/advanced-a05/illustrations/bambu-preview.webp",alt:"切片預覽中的外殼、孔周路徑、填充方向、接縫與關鍵截面",label:"GPT 教學圖解",caption:"從整體預覽切到關鍵層；孔周連續圈、填充接合與接縫位置都要在送出前確認。",guides:[
          {number:"1",title:"先看外殼",text:"外殼是否沿零件外緣保持連續，轉角是否突然變少。"},
          {number:"2",title:"放大孔周",text:"孔邊應有清楚的同心路徑，而非只有填充擦過。"},
          {number:"3",title:"看填充接合",text:"追蹤填充方向及其如何連到外殼，不只看密度數字。"},
          {number:"4",title:"找接縫",text:"紫色接縫若落在高受力根部，可比較其他接縫策略。"},
          {number:"5",title:"滑到關鍵層",text:"沿 Z 軸逐層查看孔、根部和截面是否出現不連續。"}
        ]},
        detailFigures:[{src:"../assets/advanced-a05/illustrations/preview-fracture-match.webp",alt:"切片關鍵層與實際斷裂試片的外殼、填充、接縫和裂縫對照",label:"GPT 教學圖解",caption:"把預覽截圖與斷面照片用相同編號對照，才能知道原先的路徑假設是否接近實際破壞。",guides:[
          {number:"1",title:"對照外殼",text:"確認斷面外圍與預覽中的外殼圈數及位置。"},
          {number:"2",title:"對照填充",text:"觀察裂縫是否穿過填充、沿填充或先從外殼開始。"},
          {number:"3",title:"對照接縫",text:"檢查裂縫起點是否靠近接縫或其他路徑中斷處。"},
          {number:"4",title:"保存記錄",text:"保留關鍵層截圖、測試照片與裂縫方向，供下一版比較。"}
        ]}],
        sources:[{label:"Bambu Studio 官方專案與目前版本功能",url:"https://github.com/bambulab/BambuStudio"},{label:"Bambu Studio 官方製程設定檔",url:"https://github.com/bambulab/BambuStudio/blob/master/resources/profiles/BBL/process/fdm_process_common.json"}]
      },
      {
        title:"固定條件，做安全的小件破壞測試",
        body:"用同一模型、材料批次、機型、噴嘴、層高、外殼與填充，只改平放、側放、直立。以有防護罩的小型治具逐步加載，記錄開始變形的載重、最大載重、破壞位置與裂縫方向。測試答案只適用於這組條件；不可外推成人體承重或安全關鍵用途。",
        manga:{src:"../assets/advanced-a05/illustrations/break-test.webp",alt:"固定其他條件、只改列印方向的小型支架破壞測試",label:"GPT 教學圖解",caption:"相同試片、相同載重方式、一次只改方向；結果才有機會回答方向是否改變破壞行為。",guides:[
          {number:"1",title:"固定條件",text:"模型、材料、層高、外殼、填充與列印機保持一致。"},
          {number:"2",title:"只改方向",text:"平放、側放、直立是本輪唯一設計變因。"},
          {number:"3",title:"逐步加載",text:"在透明防護罩內用小砝碼緩慢增加，不用手直接壓。"},
          {number:"4",title:"記錄裂縫",text:"同時記變形、載重、裂縫位置與方向，不只寫斷或沒斷。"},
          {number:"5",title:"限制結論",text:"結果用來改良這個小件，不代表其他材料、尺寸或用途。"}
        ]},
        detailFigures:[{src:"../assets/advanced-a05/illustrations/snap-fit-sequence.webp",alt:"卡扣從壓入、最大彎曲到回彈定位的三格動作與根部受力",label:"GPT 教學圖解",caption:"反覆動作件要觀察完整循環；一次成功扣上，不等於長期疲勞壽命已經驗證。",guides:[
          {number:"1",title:"壓入",text:"記錄藍色力的方向，確認固定點與列印線相對位置。"},
          {number:"2",title:"最大彎曲",text:"根部受拉最大，優先觀察白化、永久變形與裂縫。"},
          {number:"3",title:"回彈定位",text:"測量是否回到原位，以及卡合力是否逐次下降。"},
          {number:"4",title:"比較圓角",text:"固定其他尺寸，只改根部圓角做下一輪單一變因測試。"}
        ]}],
        callout:"全程戴護目鏡並使用透明防護罩。不要把手、臉或身體置於受力方向，也不要測試可能彈射、墜落或傷人的零件。"
      }
    ],
    task:{title:"完成一組方向對照試片",text:"選一個小型 L 型支架，先標固定點、外力、傳力路徑與可能裂縫；以相同材料與切片設定製作平放、側放、直立三件。保存每一件的關鍵層預覽，再於透明防護罩內逐步加載，記錄變形、載重與裂縫方向。"},
    checkpoint:"我能先依使用情境畫出受力與固定點，在切片預覽核對外殼、孔周、填充與接縫，並以固定條件的小件測試驗證列印方向，而不是把 Z 軸或 100% 填充當成通用答案。"
  },
  {
    id:"A06", slug:"06-infill-selection.html", stage:"切片策略", stageNo:"A", duration:"45 分鐘", type:"需求判讀＋對照實驗",
    title:"依作品需求選擇填充", subtitle:"先判斷作品需要什麼，再決定圖樣與密度。",
    lead:"填充不是把模型內部隨意塞滿，也不是密度越高就一定越好。本課先分清外殼、頂底層與填充的工作，再從展示模型、收納盒、支架與受壓零件四種用途，選擇可測試的圖樣和密度起點，最後回到 Bambu Studio 預覽並做單一變因比較。",
    goals:["分辨外殼、頂底層與填充各自的工作","依受力、表面、時間與材料限制整理需求","辨認七種常用填充圖樣的路徑特性","為四種作品選擇填充密度起點","在 Bambu Studio 預覽內部路徑與材料估算","完成起始值、＋5%、＋10% 的單一變因試片"],
    goalArt:[{src:"../assets/advanced-a06/illustrations/infill-anatomy.webp",alt:"外殼、頂底層與內部填充共同組成列印零件的剖面總覽"}],
    sections:[
      {
        title:"填充不是把模型塞滿",
        body:"切片後的零件通常由外殼、頂層、底層與內部填充共同組成。外殼形成外形並承接表面附近的拉壓；頂底層封住模型；填充則支撐上方路徑、連接兩側外殼，並依幾何承擔部分剪切、壓縮或抗挫曲工作。提高填充不能補救太薄的外殼、不利的列印方向或尖銳受力轉角。",
        manga:{src:"../assets/advanced-a06/illustrations/infill-anatomy.webp",alt:"透明零件剖面標示外殼、頂層、底層、填充與載重方向",label:"GPT 教學圖解",caption:"先看各部分負責什麼，再決定要增加外殼、頂層，或調整內部填充。",guides:[
          {number:"1",title:"外殼形成連續邊界",text:"外表面附近常承受較大的彎曲拉壓，外殼圈數不能被填充密度取代。"},
          {number:"2",title:"頂底層封住模型",text:"頂面是否能被平順托住，會受到填充間距、圖樣與頂層厚度共同影響。"},
          {number:"3",title:"填充連接並支撐",text:"內部路徑可支撐頂面、傳遞部分力量，也會改變時間、重量和材料量。"},
          {number:"4",title:"先處理主要弱點",text:"方向、截面、圓角或孔周不足時，單純加密通常不是最有效的第一步。"}
        ]},
        points:["外殼與填充是合作關係，不是互相替代","視覺模型也需要足以支撐頂面的內部結構","功能件應先沿實際固定點與外力追蹤傳力路徑"],
        sources:[{label:"一般切片原理：Prusa Knowledge Base｜Infill",url:"https://help.prusa3d.com/article/infill_42"},{label:"設計補充：UltiMaker｜How to design for FFF",url:"https://ultimaker.com/wp-content/uploads/2024/06/How-to-design-for-FFF-1.pdf"}]
      },
      {
        title:"選填充前先回答四個問題",
        body:"不要先從圖樣清單猜答案。先確認作品是不是只展示、是否需要平整頂面、主要力量從哪裡進入，以及時間與材料能花多少。答案會把候選縮小，再由小件測試確認；若需求改變，原本的選擇也要重做。",
        manga:{src:"../assets/advanced-a06/illustrations/decision-flow.webp",alt:"從作品用途、受力、表面與製作成本走向填充候選的決策流程",label:"GPT 教學圖解",caption:"四個問題先建立條件，最後才選圖樣與密度；圖中的百分比是測試起點，不是保證值。",guides:[
          {number:"1",title:"作品做什麼",text:"展示、收納、固定或承壓，決定你最在意外觀、重量還是變形。"},
          {number:"2",title:"力量怎麼走",text:"標出固定點、外力方向與關鍵截面，判斷是否需要多方向連接。"},
          {number:"3",title:"表面需要什麼",text:"大面積平頂通常需要更穩定的下方支撐，也可能要增加頂層。"},
          {number:"4",title:"成本能接受多少",text:"把列印時間、材料重量和失敗成本一起比較，不只看密度。"}
        ]},
        compareHeaders:["先問","觀察證據","會影響的設定"],
        compare:[["用途","展示、收納、支撐或承壓","密度範圍與圖樣候選"],["受力","方向、固定點、載重時間","多方向或方向性路徑"],["表面","平頂跨距、外觀面位置","密度、圖樣與頂層"],["成本","時間、重量、材料限制","先採較低起點再測試"]],
        callout:"以下百分比均為本課建議起始值。它們不是 Bambu Lab 官方保證，也不能直接推算承重能力。"
      },
      {
        title:"七種常用填充圖樣",
        body:"Lines 與 Rectilinear 路徑簡單、速度快；Grid 在同層交叉，列印時交會點可能重複經過；Gyroid 以連續曲面形成多方向連接；Cubic 建立三維斜向結構；Triangles 形成較硬挺的平面網格；Lightning 只在需要托住上方的位置長出分枝；Concentric 沿外形一圈圈縮進。圖樣名稱相同，也要以目前切片器版本的預覽為準。",
        manga:{src:"../assets/advanced-a06/illustrations/pattern-matrix.webp",alt:"七種常用填充圖樣的俯視與立體路徑功能比較",label:"GPT 教學圖解",caption:"圖樣沒有全面冠軍；用路徑方向、頂面支撐、列印效率與受力需求選候選。",guides:[
          {number:"1",title:"快速與省料",text:"Lines、Rectilinear 適合快速原型；Lightning 更偏向支撐頂面而非功能承載。"},
          {number:"2",title:"多方向連接",text:"Gyroid 與 Cubic 常被拿來作為功能件起點，但仍要配合方向和外殼測試。"},
          {number:"3",title:"平面硬挺",text:"Triangles、Grid 可形成密集平面網格，但交會方式和列印時間需看預覽。"},
          {number:"4",title:"跟隨外形",text:"Concentric 沿輪廓排列，適合特定外形或柔性行為，不代表普遍最強。"}
        ]},
        detailFigures:[{src:"../assets/advanced-a06/illustrations/path-crossing.webp",alt:"Grid 同層交叉與 Gyroid 連續路徑的噴嘴行走差異",label:"GPT 教學圖解",caption:"同樣看似多方向，路徑是否在同層重複交叉仍不同；用逐層預覽確認實際走法。",guides:[
          {number:"1",title:"看同一層",text:"先把預覽滑到單層，不用模型外觀猜內部路徑。"},
          {number:"2",title:"找交會點",text:"Grid 的路徑可能在同層交叉，交會處的實際行為受切片器版本與設定影響。"},
          {number:"3",title:"看連續轉向",text:"Gyroid 以曲線轉向形成三維連接，通常不以同層直線交叉完成。"},
          {number:"4",title:"回到需求",text:"交叉少不等於自動更強；仍需比較受力、時間與成品結果。"}
        ]}],
        sources:[{label:"一般切片原理：Prusa Knowledge Base｜Infill patterns",url:"https://help.prusa3d.com/article/infill-patterns_177130"},{label:"一般設計參考：UltiMaker｜Infill density guide",url:"https://ultimaker.com/learn/3d-printing-infill-density-optimizing-strength-and-speed/"}]
      },
      {
        title:"四種作品，填充密度從多少開始",
        body:"先依作品用途選一個容易操作的起始值，不必在寬廣區間裡猜數字。展示模型先設 8%、收納盒先設 15%、支架先設 20%、受壓底座先設 30%；切片後記錄時間與材料，列印後觀察實際變形。若結果不足，每次只增加 5%，不要一次跳到最高密度。",
        manga:{src:"../assets/advanced-a06/illustrations/display-lightning.webp",alt:"展示模型以 8% 填充密度開始並觀察外觀與手感",label:"GPT 教學圖解",caption:"展示模型：第一次先設 8%，確認外觀完整且拿取時不會明顯變形。",guides:[
          {number:"1",title:"確認用途",text:"只用來觀看、陳列或確認造型，才歸在展示模型。"},
          {number:"2",title:"先設 8%",text:"把 8% 當作第一次測試，不是所有展示模型的固定答案。"},
          {number:"3",title:"觀察結果",text:"若外觀不完整或拿取時明顯變形，再提高到 13% 比較。"}
        ]},
        detailFigures:[
          {src:"../assets/advanced-a06/illustrations/storage-box.webp",alt:"收納盒以 15% 填充密度開始並進行手壓與堆疊觀察",label:"GPT 教學圖解",caption:"收納盒：第一次先設 15%，用手壓與實際堆疊觀察是否明顯變形。",guides:[{number:"1",title:"確認用途",text:"用於收納、日常拿取或輕度堆疊，不是承重設備。"},{number:"2",title:"先設 15%",text:"切片後先記錄時間、材料與重量估算。"},{number:"3",title:"觀察結果",text:"若手壓或堆疊時明顯變形，再提高到 20% 比較。"}]},
          {src:"../assets/advanced-a06/illustrations/bracket-infill.webp",alt:"功能支架以 20% 填充密度開始並在固定方式下觀察變形",label:"GPT 教學圖解",caption:"支架：第一次先設 20%，依實際固定方式逐步測試並記錄變形。",guides:[{number:"1",title:"確認用途",text:"作品會固定其他物件或承受日常操作力，才歸在支架。"},{number:"2",title:"先設 20%",text:"保持方向、外殼與其他設定不變，建立第一次測試。"},{number:"3",title:"觀察結果",text:"若固定測試下的變形不能接受，再提高到 25% 比較。"}]},
          {src:"../assets/advanced-a06/illustrations/compression-block.webp",alt:"受壓底座以 30% 填充密度開始並觀察塌陷與側向鼓出",label:"GPT 教學圖解",caption:"受壓底座：第一次先設 30%，逐步施壓並觀察塌陷或側向鼓出。",guides:[{number:"1",title:"確認用途",text:"力量主要由上往下壓入，並由底面承接。"},{number:"2",title:"先設 30%",text:"只在小型、非安全關鍵的測試件上使用這個起點。"},{number:"3",title:"觀察結果",text:"若出現明顯塌陷或側向鼓出，再提高到 35% 比較。"}]}
        ],
        compareHeaders:["作品用途","第一次先設","什麼情況提高密度"],
        compare:[["展示模型、公仔","8%","外觀不完整或拿取時明顯變形"],["收納盒、外殼","15%","手壓或堆疊時明顯變形"],["支架、功能零件","20%","固定測試下的變形不能接受"],["受壓底座、墊塊","30%","壓縮時明顯塌陷或向側面鼓出"]],
        callout:"四個數值是課堂測試起點，不是官方保證或承重規格。若問題主要來自受力方向、外殼或形狀，先回到 A05「受力方向與列印方向」，不要只提高填充密度。",
        sources:[{label:"先修回顧：A05｜受力方向與列印方向",url:"05-force-direction.html"}]
      },
      {
        title:"為什麼不是密度越高越好",
        body:"密度提高通常會增加材料、重量與列印時間，內部路徑也更頻繁；但強度增幅不一定與百分比成正比，破壞位置甚至可能仍在孔邊、接縫、尖角或層間。對許多彎曲零件，增加外殼、改善方向或加圓角可能比一路提高填充更有效。",
        points:["先修正方向、幾何與外殼，再測填充","比較切片估算與實際成品，不只看設定數字","觀察變形與真正破壞位置，不只看成品重量","100% 可能增加內應力、時間與材料，也不等同射出實心件"],
        sources:[{label:"一般設計參考：UltiMaker｜Infill density guide",url:"https://ultimaker.com/learn/3d-printing-infill-density-optimizing-strength-and-speed/"},{label:"一般切片原理：Prusa Knowledge Base｜Infill",url:"https://help.prusa3d.com/article/infill_42"}]
      },
      {
        title:"在 Bambu Studio 實際設定",
        body:"選定候選後，在 Bambu Studio 的強度設定中調整填充密度與圖樣，再切片查看時間、材料和逐層路徑。不要只停在參數欄：切到預覽，找外殼、內部填充、頂面下方支撐與關鍵截面。官方常用製程設定檔可證明欄位與預設存在，但不代表每件作品都應套用同一數值。",
        manga:{src:"../assets/advanced-a06/illustrations/bambu-infill-preview.webp",alt:"Bambu Studio 強度設定與逐層預覽中標示填充密度、圖樣、外殼和頂面",label:"GPT 教學圖解",caption:"設定只是輸入；逐層預覽才讓你確認切片器實際建立了哪些路徑。",guides:[
          {number:"1",title:"先複製預設",text:"保留可回復的原始設定，再只改填充圖樣或密度。"},
          {number:"2",title:"重新切片",text:"記錄時間與材料估算，避免只憑感覺比較。"},
          {number:"3",title:"逐層看內部",text:"檢查圖樣方向、外殼接合、交叉位置與頂面下方間距。"},
          {number:"4",title:"保存證據",text:"截下相同高度的預覽，和列印後照片放在同一紀錄。"}
        ]},
        steps:["選定機型、噴嘴、材料與層高","複製製程預設並只改一項","設定填充圖樣與密度後重新切片","記錄時間、材料重量與關鍵層截圖","確認頂面支撐、外殼接合與受力截面"],
        sources:[{label:"Bambu 官方：Bambu Studio 常用製程設定檔",url:"https://github.com/bambulab/BambuStudio/blob/master/resources/profiles/BBL/process/fdm_process_common.json"},{label:"Bambu 官方：強度類製程描述文字",url:"https://github.com/bambulab/BambuStudio/blob/master/src/slic3r/Utils/ProfileDescription.hpp"}]
      },
      {
        title:"單一變因填充實驗",
        body:"先依第 04 節選出作品的起始值，再用同一個小型試片與同一捲材料，固定方向、層高、外殼、頂底層、圖樣、速度與溫度，只比較起始值、起始值＋5%、起始值＋10%。每件記錄切片時間、材料重量、外觀與固定方式下的變形；若要比較圖樣，另開下一輪並固定密度。",
        manga:{src:"../assets/advanced-a06/illustrations/density-comparison.webp",alt:"起始值、起始值加 5% 與加 10% 三個相同試片的單一變因比較流程",label:"GPT 教學圖解",caption:"先依作品用途選起始值，再只增加 5% 與 10% 做同條件比較，避免測試範圍和作品需求互相矛盾。",guides:[
          {number:"1",title:"固定基準",text:"模型、方向、材料、外殼、圖樣與列印條件完全相同。"},
          {number:"2",title:"只改密度",text:"建立起始值、＋5%、＋10% 三份設定，清楚命名並保存。"},
          {number:"3",title:"記錄四項結果",text:"比較時間、重量、外觀與固定方式下的變形。"},
          {number:"4",title:"限制結論",text:"選的是這件作品的足夠起點，不是所有模型的最佳百分比。"}
        ]},
        compareHeaders:["試片","唯一變因","共同記錄"],
        compare:[["A","起始值","時間、重量、外觀、變形"],["B","起始值＋5%","時間、重量、外觀、變形"],["C","起始值＋10%","時間、重量、外觀、變形"]],
        callout:"若要施力，使用小型固定治具、護目鏡與透明防護罩；不要徒手折斷可能彈射的零件，也不要把結果外推到安全關鍵用途。"
      }
    ],
    task:{title:"完成一張填充選擇與比較表",text:"從展示模型、收納盒、支架或受壓底座選一種，依第 04 節選出密度起始值；固定其他條件，列印起始值、＋5%、＋10% 三個小試片。保存三張相同高度的切片預覽，記錄時間、重量、外觀與變形，選出足夠而非最高的密度。"},
    checkpoint:"我能先分清外殼、頂底層與填充的角色，依作品需求選擇圖樣與密度起點，在 Bambu Studio 預覽實際路徑，並以單一變因試片驗證，而不是把高密度或 100% 當成通用答案。"
  }
];
window.COURSES = window.ADVANCED_COURSES;
