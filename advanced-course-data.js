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
        callout:"使用不同支撐接觸面材料前，先核對材料相容性、噴嘴與 AMS／進料限制。若切換材料需要頂部Z距離為 0，接受官方建議後仍要先檢查切片預覽。",
        sources:[{label:"內容參考：Bambu Lab Wiki｜專用支撐材料與接觸面",url:"https://wiki.bambulab.com/en/software/bambu-studio/support"}]
      }
    ],
    task:{title:"完成一張支撐介面對照表",text:"選一個有平坦懸空面的固定試片，先保存預設切片結果。保持模型、方向、材料、層高與支撐類型不變，每輪只改頂部Z距離、頂部接觸面層數或線距其中一項；記錄列印時間、支撐材料量、冷卻後拆除難度與底面照片，選出本材料可接受的平衡。"},
    checkpoint:"我能先減少不必要支撐，分辨一般、樹狀與手動支撐，也能把支撐接觸面層數、線距和頂部Z距離分開測試；使用專用支撐材料時會先核對官方相容性與切片預覽。"
  }
];
