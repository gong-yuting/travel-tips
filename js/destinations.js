/**
 * 寰宇·人文清寰纪行 — 70 个世界级目的地完整文化元数据库
 * Atlas of Humane Horizons — Destination Cultural Metadata
 *
 * 每个目的地包含：视觉主题(OKLCH)、字体、文化符号、纹理、
 * 4K 图源、天气城市、攻略数据、非遗故事、节日日历
 */

const DESTINATIONS = [

  // ═══════════════════════════════════════════════════
  // 🏯 东亚 EAST ASIA (10)
  // ═══════════════════════════════════════════════════

  {
    id:'dunhuang', name:'Dunhuang', nameCN:'敦煌', nameLocal:'敦煌',
    country:'China', countryCN:'中国', flag:'🇨🇳',
    region:'east-asia', lat:40.04, lng:94.80,
    theme:{
      bg:'oklch(0.97 0.012 0)', surface:'oklch(0.94 0.018 0)',
      surfaceElevated:'oklch(0.90 0.024 0)', primary:'oklch(0.65 0.12 0)',
      accent:'oklch(0.60 0.10 160)', secondary:'oklch(0.58 0.10 340)',
      ink:'oklch(0.88 0.015 0)', muted:'oklch(0.45 0.025 0)',
      glassBg:'rgba(255,255,255,0.70)', glassBorder:'rgba(255,255,255,0.35)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif SC', body:'Noto Sans SC', displayW:700, bodyW:400, scale:1.25 },
    symbols:['飞天','藻井','月牙泉','鸣沙山','莫高窟','驼队','丝绸之路','九色鹿'],
    textures:['mandala','sand-ripple','fresco-gold'],
    heroImage:'photo-1519922637235-584c2f0d2bd4', // Dunhuang desert
    gallery:['photo-1600269452121-4f2416e55c28','photo-1587667571413-7a4a1e2ae35b','photo-1519922637235-584c2f0d2bd4','photo-1612686634730-3e9e99e5e4c5'],
    weather:{ city:'Dunhuang', country:'CN', tz:'Asia/Shanghai' },
    tagline:'一千六百年的沙漠美术馆',
    desc:'莫高窟 735 个洞窟、4.5 万平方米壁画，是丝绸之路上最辉煌的佛教艺术圣殿。站在鸣沙山巅俯瞰月牙泉，时间在沙漠的风中凝固。',
    keywords:['丝绸之路','佛教艺术','沙漠','壁画','世界遗产'],
    stats:{ annualVisitors:'380万', bestSeason:'5-10月', unesco:1987 },
    routes:[
      { name:'莫高窟深度朝圣', days:3, highlights:['莫高窟特窟','数字展示中心','鸣沙山日落','沙洲夜市'] },
      { name:'丝绸之路西线', days:2, highlights:['玉门关','雅丹魔鬼城','汉长城','阳关'] },
      { name:'壁画研修之旅', days:5, highlights:['莫高窟研究院','榆林窟','西千佛洞','手工矿物颜料体验'] }
    ],
    foods:[
      { name:'驴肉黄面', type:'主食', desc:'敦煌最具代表性的传统面食' },
      { name:'杏皮水', type:'饮品', desc:'李广杏熬制的清凉解暑饮品' },
      { name:'羊肉粉汤', type:'小吃', desc:'羊骨高汤配手抓羊肉' }
    ],
    festivals:[
      { name:'丝绸之路国际旅游节', month:7, desc:'大型文化展演与驼队巡游' },
      { name:'敦煌葡萄节', month:9, desc:'品尝敦煌特产无核白葡萄' }
    ],
    heritage:[
      { title:'壁画临摹传承人', story:'三代人七十载，用矿物颜料还原千年色彩，在昏暗洞窟中守护文明记忆。', media:'photo-1587667571413-7a4a1e2ae35b' },
      { title:'月牙泉的千年不涸之谜', story:'沙不填泉、泉不涸竭——党河地下水系统维系着沙漠中的这弯新月，是自然与人文的双重奇迹。', media:'photo-1519922637235-584c2f0d2bd4' }
    ]
  },

  {
    id:'kyoto', name:'Kyoto', nameCN:'京都', nameLocal:'京都',
    country:'Japan', countryCN:'日本', flag:'🇯🇵',
    region:'east-asia', lat:35.01, lng:135.77,
    theme:{
      bg:'oklch(0.97 0.002 90)', surface:'oklch(0.83 0.004 85)',
      surfaceElevated:'oklch(0.91 0.006 80)', primary:'oklch(0.72 0.12 15)',
      accent:'oklch(0.60 0.10 155)', secondary:'oklch(0.40 0.08 45)',
      ink:'oklch(0.12 0.002 80)', muted:'oklch(0.38 0.010 80)',
      glassBg:'rgba(215,194,210,0.60)', glassBorder:'rgba(255,255,255,0.15)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif JP', body:'Noto Sans JP', displayW:600, bodyW:300, scale:1.2 },
    symbols:['枯山水','鸟居','町屋','竹林','茶道','金阁','石庭','千本'],
    textures:['zen-circle','wood-grain','washi'],
    heroImage:'photo-1493976040374-85c8e12f0c0e',
    gallery:['photo-1493976040374-85c8e12f0c0e','photo-1545569341-9eb8b30979d9','photo-1524413840807-0c3cb6fa808d','photo-1528360983277-13d401cdc186'],
    weather:{ city:'Kyoto', country:'JP', tz:'Asia/Tokyo' },
    tagline:'千年古都的侘寂之美',
    desc:'17 处世界遗产、2000 余座寺庙神社。京都的美不在宏大，而在町屋木格窗漏下的光影、茶碗中映出的庭园、石阶上青苔生长的速度。',
    keywords:['侘寂','禅宗','茶道','世界遗产','艺伎文化'],
    stats:{ annualVisitors:'5300万', bestSeason:'3-4月/10-11月', unesco:1994 },
    routes:[
      { name:'经典东山散步道', days:2, highlights:['清水寺','八坂神社','花见小路','伏见稻荷大社'] },
      { name:'禅意岚山', days:1, highlights:['天龙寺','竹林小径','渡月桥','铃虫寺'] },
      { name:'茶道与匠人之旅', days:3, highlights:['茶道体验','京友禅染织','清水烧陶艺','锦市场'] }
    ],
    foods:[
      { name:'抹茶', type:'饮品', desc:'宇治抹茶，日本茶道的灵魂' },
      { name:'汤豆腐', type:'素食', desc:'南禅寺门前，最简单的食材最深的味道' },
      { name:'怀石料理', type:'正餐', desc:'应季食材的艺术呈现，一餐即一场美学体验' }
    ],
    festivals:[
      { name:'祇园祭', month:7, desc:'日本三大祭之一，千年传承的山鉾巡行' },
      { name:'红叶狩', month:11, desc:'全城寺庙夜间特别拜观，灯火映枫红' }
    ],
    heritage:[
      { title:'千利休的最后一碗茶', story:'侘寂美学的极致——不完美、无常、谦逊，在残缺中找到至美。千利休用一生定义了日本的美意识。', media:'photo-1545569341-9eb8b30979d9' },
      { title:'京町屋的百年呼吸', story:'木格子、坪庭、土壁——町屋不是建筑标本，而是仍在呼吸的生活容器。每一根梁柱都记得几代人的体温。', media:'photo-1524413840807-0c3cb6fa808d' }
    ]
  },

  {
    id:'beijing', name:'Beijing', nameCN:'北京', nameLocal:'北京',
    country:'China', countryCN:'中国', flag:'🇨🇳',
    region:'east-asia', lat:39.90, lng:116.40,
    theme:{
      bg:'oklch(0.97 0.004 25)', surface:'oklch(0.82 0.008 22)',
      surfaceElevated:'oklch(0.89 0.012 20)', primary:'oklch(0.65 0.20 32)',
      accent:'oklch(0.40 0.06 85)', secondary:'oklch(0.45 0.10 280)',
      ink:'oklch(0.14 0.002 60)', muted:'oklch(0.41 0.012 50)',
      glassBg:'rgba(218,192,208,0.62)', glassBorder:'rgba(255,255,240,0.20)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif SC', body:'Noto Sans SC', displayW:900, bodyW:400, scale:1.3 },
    symbols:['太和殿','长城','京剧','胡同','天坛','红墙','金色琉璃瓦','石狮'],
    textures:['lacquer','glaze-tile','stone-carving'],
    heroImage:'photo-1508804185872-d7badad00f7d',
    gallery:['photo-1508804185872-d7badad00f7d','photo-1547981609-4b6bfe67ca0b','photo-1584450150050-4b9e4d9b0b06','photo-1559827295-5e4e9a3e1af0'],
    weather:{ city:'Beijing', country:'CN', tz:'Asia/Shanghai' },
    tagline:'三千年的皇城心跳',
    desc:'故宫 9999 间半房、长城万里蜿蜒、胡同深处鸽哨回响。北京在红墙金瓦之下涌动着最当代的文化创造力。',
    keywords:['皇城','长城','故宫','胡同','京剧'],
    stats:{ annualVisitors:'3.2亿', bestSeason:'4-5月/9-10月', unesco:1987 },
    routes:[
      { name:'皇城中轴线', days:2, highlights:['故宫','景山','钟鼓楼','什刹海胡同'] },
      { name:'长城巡礼', days:1, highlights:['慕田峪长城','野长城徒步','长城脚下的公社'] },
      { name:'798艺术漫游', days:1, highlights:['798艺术区','草场地','红砖美术馆'] }
    ],
    foods:[{ name:'北京烤鸭', type:'正餐', desc:'全聚德/大董，果木挂炉的焦香' },{ name:'炸酱面', type:'主食', desc:'胡同人家的家常味道' },{ name:'豆汁儿', type:'小吃', desc:'老北京最地道的风味试金石' }],
    festivals:[{ name:'春节庙会', month:'1-2', desc:'地坛、龙潭湖，年味最浓的传统庙会' },{ name:'北京国际电影节', month:4, desc:'红毯与文艺片盛宴' }],
    heritage:[{ title:'故宫钟表修复师', story:'在故宫深处的修复室里，几代人用最传统的技艺修复西洋钟表，让四百年前的齿轮重新转动。', media:'photo-1547981609-4b6bfe67ca0b' },{ title:'胡同的最后记忆', story:'杨梅竹斜街——一条斜街上，书局、会馆、浴池叠加了六百年的市井生活。每一块门板都曾是某个时代的前沿。', media:'photo-1584450150050-4b9e4d9b0b06' }]
  },

  {
    id:'xian', name:"Xi'an", nameCN:'西安', nameLocal:'西安',
    country:'China', countryCN:'中国', flag:'🇨🇳',
    region:'east-asia', lat:34.26, lng:108.94,
    theme:{
      bg:'oklch(0.97 0.005 35)', surface:'oklch(0.83 0.01 32)',
      surfaceElevated:'oklch(0.91 0.015 30)', primary:'oklch(0.60 0.18 38)',
      accent:'oklch(0.35 0.08 95)', secondary:'oklch(0.45 0.15 25)',
      ink:'oklch(0.12 0.004 70)', muted:'oklch(0.38 0.015 60)',
      glassBg:'rgba(215,190,205,0.60)', glassBorder:'rgba(255,255,255,0.18)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif SC', body:'Noto Sans SC', displayW:800, bodyW:400, scale:1.25 },
    symbols:['兵马俑','古城墙','大雁塔','钟楼','回民街','秦砖','唐三彩','丝路起点'],
    textures:['terracotta','bronze-patina','ancient-brick'],
    heroImage:'photo-1577860930242-ca89c06957ba',
    gallery:['photo-1577860930242-ca89c06957ba','photo-1549924514-3c44bf26252b','photo-1584646098379-082458233d9e','photo-1569319831450-afb1dd2615b7'],
    weather:{ city:"Xi'an", country:'CN', tz:'Asia/Shanghai' },
    tagline:'十三朝古都，丝路起点',
    desc:'兵马俑八千陶俑守护始皇陵两千余年，古城墙是全球保存最完整的古代城垣。西安的每一寸土地下都埋藏着王朝的呼吸。',
    keywords:['兵马俑','丝路起点','古城墙','秦','唐'],
    stats:{ annualVisitors:'3.0亿', bestSeason:'3-5月/9-11月', unesco:1987 },
    routes:[
      { name:'秦唐盛世巡礼', days:3, highlights:['兵马俑','华清宫','陕西历史博物馆','大雁塔'] },
      { name:'古城墙骑行', days:1, highlights:['南门城墙','碑林','书院门','回民街夜市'] },
      { name:'丝路西行', days:4, highlights:['法门寺','乾陵','茂陵','咸阳博物馆'] }
    ],
    foods:[{ name:'肉夹馍', type:'小吃', desc:'腊汁肉配白吉馍，中国的汉堡' },{ name:'羊肉泡馍', type:'主食', desc:'自己掰馍的仪式感' },{ name:'biangbiang面', type:'主食', desc:'裤带面，陕西面食之王' }],
    festivals:[{ name:'西安城墙国际马拉松', month:11, desc:'全球唯一在古城墙上奔跑的马拉松' },{ name:'大唐不夜城灯会', month:'1-2', desc:'再现大唐上元灯节盛景' }],
    heritage:[{ title:'兵马俑的青铜色密码', story:'兵马俑出土时并非灰色而是彩绘——朱红、石绿、紫罗兰。两千年的氧化让色彩瞬间褪去，但修复师在碎片中拼出了秦朝的色谱。', media:'photo-1577860930242-ca89c06957ba' }]
  },

  {
    id:'lhasa', name:'Lhasa', nameCN:'拉萨', nameLocal:'ལྷ་ས',
    country:'China', countryCN:'中国', flag:'🇨🇳',
    region:'east-asia', lat:29.65, lng:91.10,
    theme:{
      bg:'oklch(0.97 0.008 280)', surface:'oklch(0.80 0.012 275)',
      surfaceElevated:'oklch(0.88 0.015 270)', primary:'oklch(0.72 0.18 35)',
      accent:'oklch(0.63 0.14 250)', secondary:'oklch(0.60 0.22 10)',
      ink:'oklch(0.16 0.004 80)', muted:'oklch(0.40 0.015 70)',
      glassBg:'rgba(210,188,218,0.60)', glassBorder:'rgba(255,255,255,0.20)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif SC', body:'Noto Sans SC', displayW:700, bodyW:300, scale:1.2 },
    symbols:['布达拉宫','转经筒','经幡','玛尼堆','雪山','唐卡','磕长头','酥油灯'],
    textures:['thangka-gold','prayer-flag','snow-mountain'],
    heroImage:'photo-1544735716-392f1ba7fd5e',
    gallery:['photo-1544735716-392f1ba7fd5e','photo-1611516491426-03025e0e77e0','photo-1548013146-72479768bada','photo-1600269452121-4f2416e55c28'],
    weather:{ city:'Lhasa', country:'CN', tz:'Asia/Shanghai' },
    tagline:'世界屋脊上的灵魂',
    desc:'布达拉宫 13 层金顶直指苍穹，大昭寺前磕长头的信徒用身体丈量信仰。拉萨是离天最近的城市，每一次呼吸都是一次朝圣。',
    keywords:['布达拉宫','藏传佛教','雪山','朝圣','世界屋脊'],
    stats:{ annualVisitors:'2300万', bestSeason:'6-9月', unesco:1994 },
    routes:[
      { name:'圣城朝圣', days:3, highlights:['布达拉宫','大昭寺','色拉寺辩经','八廓街转经'] },
      { name:'纳木错天湖', days:2, highlights:['纳木错','念青唐古拉山','星空营地'] },
      { name:'珠峰大本营', days:5, highlights:['羊卓雍错','日喀则','珠峰大本营','扎什伦布寺'] }
    ],
    foods:[{ name:'酥油茶', type:'饮品', desc:'高原必备，用牦牛奶提炼的酥油与茶汤交融' },{ name:'糌粑', type:'主食', desc:'青稞炒面，藏族人最朴素的生命食粮' },{ name:'牦牛肉干', type:'零食', desc:'风干牦牛肉，雪域高原的能量来源' }],
    festivals:[{ name:'雪顿节', month:8, desc:'晒大佛、看藏戏，拉萨最盛大的节日' },{ name:'藏历新年', month:'1-2', desc:'藏族人最重要的节日，家家户户炸卡塞' }],
    heritage:[{ title:'唐卡画师的四十年', story:'一幅大型坛城唐卡需要一名画师耗费三到五年，用纯金、珊瑚、绿松石研磨的矿物颜料，一笔一世界。', media:'photo-1611516491426-03025e0e77e0' }]
  },

  {
    id:'tokyo', name:'Tokyo', nameCN:'东京', nameLocal:'東京',
    country:'Japan', countryCN:'日本', flag:'🇯🇵',
    region:'east-asia', lat:35.68, lng:139.76,
    theme:{
      bg:'oklch(0.97 0.003 260)', surface:'oklch(0.80 0.005 255)',
      surfaceElevated:'oklch(0.88 0.008 250)', primary:'oklch(0.72 0.20 15)',
      accent:'oklch(0.65 0.18 225)', secondary:'oklch(0.40 0.06 80)',
      ink:'oklch(0.14 0.002 250)', muted:'oklch(0.44 0.010 240)',
      glassBg:'rgba(208,188,216,0.58)', glassBorder:'rgba(255,240,255,0.22)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif JP', body:'Noto Sans JP', displayW:700, bodyW:300, scale:1.3 },
    symbols:['东京塔','浅草寺','新宿','涩谷','富士山','樱花','霓虹灯','鸟居'],
    textures:['neon-grid','sakura','tatami'],
    heroImage:'photo-1540959733332-eab4deabeeaf',
    gallery:['photo-1540959733332-eab4deabeeaf','photo-1536098561742-ca998e48cbcc','photo-1528164344705-47542687000d','photo-1493976040374-85c8e12f0c0e'],
    weather:{ city:'Tokyo', country:'JP', tz:'Asia/Tokyo' },
    tagline:'未来与传统以光速融合',
    desc:'从浅草寺千年香火到涩谷十字路口的万人大潮，东京在每一个维度都推向极致——美食、设计、交通、服务，无一不精。',
    keywords:['未来都市','和食','樱花','动漫','涩谷'],
    stats:{ annualVisitors:'4200万', bestSeason:'3-4月/10-11月', unesco:null },
    routes:[
      { name:'经典东京', days:3, highlights:['浅草寺','晴空塔','涩谷十字路口','明治神宫','秋叶原'] },
      { name:'富士山一日', days:1, highlights:['河口湖','富士山五合目','忍野八海','温泉'] },
      { name:'设计东京', days:2, highlights:['21_21 DESIGN SIGHT','根津美术馆','银座','代官山茑屋书店'] }
    ],
    foods:[{ name:'江户前寿司', type:'正餐', desc:'筑地/丰洲市场的新鲜海获' },{ name:'拉面', type:'主食', desc:'从博多豚骨到东京酱油，一碗入魂' },{ name:'天妇罗', type:'炸物', desc:'薄如蝉翼的面衣，锁住食材的本味' }],
    festivals:[{ name:'樱花季', month:3, desc:'上野公园、目黑川——全城陷入粉色梦幻' },{ name:'花火大会', month:7, desc:'隅田川花火，两万发烟花点亮东京夜空' }],
    heritage:[{ title:'筑地市场的最后拍卖', story:'凌晨五点的金枪鱼拍卖，是老筑地留给世界的最后剪影。搬迁至丰洲后，那份市井喧嚣仍在鱼市的空气中延续。', media:'photo-1536098561742-ca998e48cbcc' }]
  },

  {
    id:'seoul', name:'Seoul', nameCN:'首尔', nameLocal:'서울',
    country:'South Korea', countryCN:'韩国', flag:'🇰🇷',
    region:'east-asia', lat:37.57, lng:126.98,
    theme:{
      bg:'oklch(0.97 0.003 250)', surface:'oklch(0.82 0.006 245)',
      surfaceElevated:'oklch(0.89 0.010 240)', primary:'oklch(0.65 0.22 15)',
      accent:'oklch(0.60 0.16 200)', secondary:'oklch(0.45 0.20 340)',
      ink:'oklch(0.14 0.002 250)', muted:'oklch(0.41 0.012 240)',
      glassBg:'rgba(208,188,215,0.55)', glassBorder:'rgba(255,230,255,0.18)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif KR', body:'Noto Sans KR', displayW:700, bodyW:300, scale:1.25 },
    symbols:['景福宫','韩屋村','N首尔塔','汉江','韩服','泡菜坛','太极旗','明洞'],
    textures:['hanok-tile','wave-pattern','silk'],
    heroImage:'photo-1534274988757-a28bf1a57c17',
    gallery:['photo-1534274988757-a28bf1a57c17','photo-1553913869-4b5d6d4f2309','photo-1517154421773-0529f29ea451','photo-1566811416359-3a25a2a6e6ff'],
    weather:{ city:'Seoul', country:'KR', tz:'Asia/Seoul' },
    tagline:'韩流之外，六百年都城的风度',
    desc:'景福宫与光化门广场在摩天楼群中泰然自若，北村韩屋村的坡道记录着士大夫的闲情。首尔在 K-POP 的节奏之外，保留着儒家的礼序与温度。',
    keywords:['景福宫','K-POP','韩食','明洞','汉江'],
    stats:{ annualVisitors:'2100万', bestSeason:'4-5月/9-11月', unesco:1995 },
    routes:[
      { name:'传统首尔', days:2, highlights:['景福宫','北村韩屋村','仁寺洞','昌德宫秘苑'] },
      { name:'潮流首尔', days:2, highlights:['明洞','弘大','梨泰院','江南'] },
      { name:'韩食巡礼', days:2, highlights:['广藏市场','通仁市场','韩定食体验','泡菜制作'] }
    ],
    foods:[{ name:'韩定食', type:'正餐', desc:'宫廷料理的现代演绎，一桌即一宴' },{ name:'韩国烤肉', type:'正餐', desc:'韩牛配蒜片与生菜，最经典的韩食体验' },{ name:'街头辣炒年糕', type:'小吃', desc:'弘大街头，辣酱与年糕的完美融合' }],
    festivals:[{ name:'燃灯节', month:5, desc:'佛诞日十万盏莲灯点亮首尔' },{ name:'首尔时装周', month:10, desc:'东大门DDP，亚洲最前沿的时尚盛宴' }],
    heritage:[{ title:'韩屋的呼吸', story:'北村的每一座韩屋都面朝东南——为了迎接清晨第一缕阳光穿透韩纸门窗。建筑师用木材、泥土和纸张构建了一种会呼吸的居住哲学。', media:'photo-1553913869-4b5d6d4f2309' }]
  },

  {
    id:'taipei', name:'Taipei', nameCN:'台北', nameLocal:'臺北',
    country:'Taiwan', countryCN:'中国台湾', flag:'🇹🇼',
    region:'east-asia', lat:25.03, lng:121.56,
    theme:{
      bg:'oklch(0.97 0.004 140)', surface:'oklch(0.82 0.008 135)',
      surfaceElevated:'oklch(0.89 0.012 130)', primary:'oklch(0.70 0.16 35)',
      accent:'oklch(0.63 0.14 170)', secondary:'oklch(0.65 0.12 80)',
      ink:'oklch(0.14 0.002 100)', muted:'oklch(0.38 0.015 110)',
      glassBg:'rgba(208,192,210,0.55)', glassBorder:'rgba(255,255,250,0.18)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif TC', body:'Noto Sans TC', displayW:700, bodyW:300, scale:1.2 },
    symbols:['台北101','故宮','夜市','九份','阳明山','凤梨酥','龙山寺','诚品'],
    textures:['bamboo','tea-ripple','ink-wash'],
    heroImage:'photo-1569527222242-3e0b7c9f2c6d',
    gallery:['photo-1569527222242-3e0b7c9f2c6d','photo-1580489944761-15a19d654956','photo-1559584432-5dbaaa1b32ff','photo-1542396897877-4deae72c27b1'],
    weather:{ city:'Taipei', country:'TW', tz:'Asia/Taipei' },
    tagline:'故宫南迁，夜市烟火',
    desc:'台北故宫藏着中华文明最精微的部分——汝窑天青、快雪时晴帖。而夜幕降临，士林夜市的烟火气让这座城市回归最市井的温暖。',
    keywords:['故宫','夜市','文创','九份','牛肉面'],
    stats:{ annualVisitors:'1200万', bestSeason:'10-12月', unesco:null },
    routes:[
      { name:'台北经典', days:2, highlights:['故宫博物院','中正纪念堂','西门町','诚品信义'] },
      { name:'山城九份', days:1, highlights:['九份老街','黄金博物馆','阴阳海','猴硐猫村'] },
      { name:'温泉北投', days:1, highlights:['北投温泉博物馆','地热谷','阳明山国家公园'] }
    ],
    foods:[{ name:'牛肉面', type:'主食', desc:'清炖/红烧，台北人最自豪的一碗面' },{ name:'蚵仔煎', type:'小吃', desc:'士林夜市的铁板招牌' },{ name:'凤梨酥', type:'伴手礼', desc:'微热山丘，台湾最甜的伴手礼' }],
    festivals:[{ name:'平溪天灯节', month:2, desc:'千盏天灯升空，写下新年愿望' },{ name:'大甲妈祖绕境', month:4, desc:'九天八夜，百万人徒步朝圣' }],
    heritage:[{ title:'故宫文物南迁', story:'一万三千箱国宝在战火中辗转大半个中国，从北京到台北，一段跨越二十年的护宝史诗。', media:'photo-1580489944761-15a19d654956' }]
  },

  {
    id:'jerusalem', name:'Jerusalem', nameCN:'耶路撒冷', nameLocal:'ירושלים',
    country:'Israel', countryCN:'以色列', flag:'🇮🇱',
    region:'middle-east', lat:31.77, lng:35.21,
    theme:{
      bg:'oklch(0.97 0.006 50)', surface:'oklch(0.83 0.010 45)',
      surfaceElevated:'oklch(0.91 0.014 42)', primary:'oklch(0.60 0.18 55)',
      accent:'oklch(0.63 0.12 230)', secondary:'oklch(0.45 0.16 30)',
      ink:'oklch(0.12 0.005 65)', muted:'oklch(0.35 0.018 55)',
      glassBg:'rgba(214,190,206,0.60)', glassBorder:'rgba(255,255,255,0.20)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.2 },
    symbols:['哭墙','圣墓教堂','圆顶清真寺','橄榄山','大卫之星','七枝烛台','圣城','死海古卷'],
    textures:['stone-wall','ancient-scroll','olive-wood'],
    heroImage:'photo-1590674899484-d5640d9da574',
    gallery:['photo-1590674899484-d5640d9da574','photo-1540126034818-9f39e0d08ff3','photo-1564140055119-8f55a8fbf023','photo-1559827295-5e4e9a3e1af0'],
    weather:{ city:'Jerusalem', country:'IL', tz:'Asia/Jerusalem' },
    tagline:'三大宗教的圣城之心',
    desc:'哭墙前犹太教徒的祈祷、圣墓教堂内基督徒的眼泪、圆顶清真寺宣礼塔传来的唤拜——耶路撒冷在同一片天空下承载着人类最深的信仰。',
    keywords:['圣城','三大宗教','哭墙','死海','橄榄山'],
    stats:{ annualVisitors:'400万', bestSeason:'4-5月/9-11月', unesco:1981 },
    routes:[
      { name:'圣城朝圣', days:2, highlights:['哭墙','圣墓教堂','苦路','橄榄山','锡安山'] },
      { name:'死海漂浮', days:1, highlights:['死海','马萨达','恩盖地自然保护区'] },
      { name:'加利利湖区', days:2, highlights:['提比利亚','迦百农','八福山','拿撒勒'] }
    ],
    foods:[{ name:'鹰嘴豆泥', type:'素食', desc:'中东最普遍的国民美食' },{ name:'沙威玛', type:'小吃', desc:'旋转烤肉配皮塔饼与芝麻酱' },{ name:'耶路撒冷百吉饼', type:'小吃', desc:'沾扎塔的街头面包' }],
    festivals:[{ name:'光明节', month:12, desc:'金灯台八日，圣殿奇迹的纪念' },{ name:'复活节', month:4, desc:'苦路重走，全球基督徒朝圣高潮' }],
    heritage:[{ title:'圣城的石头的颜色', story:'耶路撒冷法律规定所有建筑必须使用本地石灰岩——耶路撒冷石。这种石头在晨光中呈金色，在暮色中变玫瑰红，让整座城市的光线成为圣咏。', media:'photo-1590674899484-d5640d9da574' }]
  },

  {
    id:'kathmandu', name:'Kathmandu', nameCN:'加德满都', nameLocal:'काठमाडौं',
    country:'Nepal', countryCN:'尼泊尔', flag:'🇳🇵',
    region:'south-asia', lat:27.72, lng:85.32,
    theme:{
      bg:'oklch(0.97 0.007 25)', surface:'oklch(0.83 0.012 22)',
      surfaceElevated:'oklch(0.91 0.016 20)', primary:'oklch(0.65 0.22 35)',
      accent:'oklch(0.63 0.15 320)', secondary:'oklch(0.60 0.10 80)',
      ink:'oklch(0.14 0.005 60)', muted:'oklch(0.38 0.020 50)',
      glassBg:'rgba(214,188,205,0.58)', glassBorder:'rgba(255,255,240,0.22)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.2 },
    symbols:['博达哈大佛塔','帕斯帕提那','杜巴广场','喜马拉雅','经幡','转经筒','廓尔喀刀','犀牛'],
    textures:['brick-pagoda','incense','himalaya'],
    heroImage:'photo-1544735716-392f1ba7fd5e',
    gallery:['photo-1544735716-392f1ba7fd5e','photo-1609949279531-cf48b60d1fb5','photo-1605649487212-47b4b8b22c53','photo-1609949279531-cf48b60d1fb5'],
    weather:{ city:'Kathmandu', country:'NP', tz:'Asia/Kathmandu' },
    tagline:'众神之谷，喜马拉雅之门',
    desc:'加德满都谷地 7 处世界遗产密集分布，三步一寺庙、五步一佛塔。晨钟暮鼓中混合着酥油灯与檀香，是离天堂最近的尘世。',
    keywords:['喜马拉雅','佛教','印度教','徒步','世界遗产'],
    stats:{ annualVisitors:'120万', bestSeason:'10-12月', unesco:1979 },
    routes:[
      { name:'谷地世界遗产', days:2, highlights:['博达哈','帕斯帕提那','加都杜巴广场','帕坦','巴德岗'] },
      { name:'喜马拉雅日出', days:2, highlights:['纳加阔特日出','杜利克尔徒步','珠穆朗玛峰观景'] },
      { name:'ABC徒步', days:7, highlights:['安娜普尔纳大本营','布恩山','甘杜克村落'] }
    ],
    foods:[{ name:'Momo', type:'小吃', desc:'藏式饺子，蒸或煎，配辣酱' },{ name:'Dal Bhat', type:'主食', desc:'豆汤饭，徒步者的能量来源' },{ name:'纽瓦里盛宴', type:'正餐', desc:'加都谷地原住民的十道菜传统盛宴' }],
    festivals:[{ name:'德赛节', month:10, desc:'尼泊尔最盛大的节日，连续十五天' },{ name:'洒红节', month:3, desc:'全城彩色粉末狂欢，人间最绚烂的战场' }],
    heritage:[{ title:'活女神的微笑', story:'库玛丽——加德满都的活女神，从释迦族女童中选出。她在杜巴广场的窗口每日短暂现身，一个微笑足以让信徒获得一年福报。', media:'photo-1605649487212-47b4b8b22c53' }]
  },

  // ═══════════════════════════════════════════════════
  // 🏯 东南亚 SOUTHEAST ASIA (6)
  // ═══════════════════════════════════════════════════

  {
    id:'bangkok', name:'Bangkok', nameCN:'曼谷', nameLocal:'กรุงเทพฯ',
    country:'Thailand', countryCN:'泰国', flag:'🇹🇭',
    region:'southeast-asia', lat:13.75, lng:100.50,
    theme:{
      bg:'oklch(0.97 0.008 90)', surface:'oklch(0.83 0.014 85)',
      surfaceElevated:'oklch(0.91 0.018 82)', primary:'oklch(0.75 0.22 55)',
      accent:'oklch(0.60 0.16 340)', secondary:'oklch(0.65 0.10 145)',
      ink:'oklch(0.14 0.005 80)', muted:'oklch(0.44 0.020 75)',
      glassBg:'rgba(210,196,210,0.55)', glassBorder:'rgba(255,255,240,0.22)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif Thai', body:'Noto Sans Thai', displayW:600, bodyW:300, scale:1.2 },
    symbols:['大皇宫','玉佛寺','水上市场','突突车','泰式按摩','莲花','金佛','象神'],
    textures:['gold-leaf','lotus-petal','teak-wood'],
    heroImage:'photo-1508009603885-50cf7c579365',
    gallery:['photo-1508009603885-50cf7c579365','photo-1552465011-b4e21bf6e79a','photo-1563492065599-3520f775eeed','photo-1534008897995-27a23e231a9a'],
    weather:{ city:'Bangkok', country:'TH', tz:'Asia/Bangkok' },
    tagline:'天使之城的金色微笑',
    desc:'大皇宫的金箔尖顶在热带阳光下闪耀，湄南河上的长尾船划开水波。曼谷在金色寺庙与摩天楼之间、在街头 Pad Thai 的锅气中，散发着亚洲最迷人的都市生命力。',
    keywords:['大皇宫','水上市场','泰式按摩','街头美食','佛寺'],
    stats:{ annualVisitors:'3900万', bestSeason:'11-2月', unesco:null },
    routes:[
      { name:'曼谷经典', days:2, highlights:['大皇宫','玉佛寺','卧佛寺','郑王庙','考山路'] },
      { name:'水上曼谷', days:1, highlights:['丹嫩沙多水上市场','安帕瓦','萤火虫夜游'] },
      { name:'大城一日', days:1, highlights:['大城历史公园','玛哈泰寺树抱佛','崖差蒙空寺'] }
    ],
    foods:[{ name:'Pad Thai', type:'主食', desc:'泰式炒粿条，全球最知名的泰国味道' },{ name:'冬阴功', type:'汤品', desc:'酸辣虾汤，一口入魂' },{ name:'芒果糯米饭', type:'甜品', desc:'热带芒果配椰浆糯米，街头的甜蜜' }],
    festivals:[{ name:'泼水节', month:4, desc:'泰国新年，全城水战三天三夜' },{ name:'水灯节', month:11, desc:'万盏水灯漂流，最浪漫的泰国之夜' }],
    heritage:[{ title:'泰式按摩的千年经络图', story:'卧佛寺是泰式按摩的发源地，墙上的经络图已存在两百年。每一次按压都源自佛教医学对人体能量的古老理解。', media:'photo-1552465011-b4e21bf6e79a' }]
  },

  {
    id:'bali', name:'Bali', nameCN:'巴厘岛', nameLocal:'Bali',
    country:'Indonesia', countryCN:'印度尼西亚', flag:'🇮🇩',
    region:'southeast-asia', lat:-8.34, lng:115.09,
    theme:{
      bg:'oklch(0.97 0.010 140)', surface:'oklch(0.82 0.016 135)',
      surfaceElevated:'oklch(0.89 0.020 130)', primary:'oklch(0.70 0.18 70)',
      accent:'oklch(0.72 0.14 180)', secondary:'oklch(0.65 0.22 30)',
      ink:'oklch(0.14 0.006 120)', muted:'oklch(0.38 0.022 110)',
      glassBg:'rgba(208,194,210,0.55)', glassBorder:'rgba(255,255,255,0.20)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:600, bodyW:300, scale:1.2 },
    symbols:['梯田','海神庙','火山','巴龙','鸡蛋花','甘美兰','乌布','祭祀'],
    textures:['rice-terrace','frangipani','stone-carving'],
    heroImage:'photo-1537996194471-e657df975ab4',
    gallery:['photo-1537996194471-e657df975ab4','photo-1555400038-63f5ba517a47','photo-1518548419970-58e3b4079ab2','photo-1573790387438-4da905039392'],
    weather:{ city:'Denpasar', country:'ID', tz:'Asia/Makassar' },
    tagline:'众神之岛的神圣日常',
    desc:'巴厘岛的一天从清晨的祭祀（Canang Sari）开始——家家户户在门口放上棕榈叶编成的小供盒，撒几片花瓣，点一支线香。宗教不是仪式，是生活本身。',
    keywords:['梯田','冲浪','乌布','海神庙','瑜伽'],
    stats:{ annualVisitors:'1600万', bestSeason:'4-10月', unesco:2012 },
    routes:[
      { name:'乌布文化之旅', days:2, highlights:['德格拉朗梯田','圣猴森林','乌布皇宫','象窟'] },
      { name:'海神庙日落线', days:2, highlights:['海神庙','乌鲁瓦图断崖','金巴兰日落','库塔海滩'] },
      { name:'火山日出', days:1, highlights:['巴杜尔火山日出徒步','温泉','咖啡庄园'] }
    ],
    foods:[{ name:'Babi Guling', type:'正餐', desc:'巴厘烤乳猪，香料填满腹腔慢火烤制' },{ name:'Nasi Campur', type:'主食', desc:'巴厘什锦饭，一餐尝遍全岛风味' },{ name:'Lawar', type:'沙拉', desc:'椰子碎与香料拌制的传统沙拉' }],
    festivals:[{ name:'安宁日', month:3, desc:'巴厘新年——全岛熄灯禁声24小时，机场关闭' },{ name:'乌布作家节', month:10, desc:'全球文豪汇聚乌布的文学盛会' }],
    heritage:[{ title:'Subak——千年水利智慧', story:'巴厘的梯田灌溉系统Subak源自9世纪，它不是工程，是宗教。每一条水渠由水寺庙管理，稻田用水是一套民主协商的哲学。', media:'photo-1555400038-63f5ba517a47' }]
  },

  {
    id:'angkor', name:'Angkor Wat', nameCN:'吴哥窟', nameLocal:'អង្គរវត្',
    country:'Cambodia', countryCN:'柬埔寨', flag:'🇰🇭',
    region:'southeast-asia', lat:13.41, lng:103.87,
    theme:{
      bg:'oklch(0.97 0.008 50)', surface:'oklch(0.83 0.014 45)',
      surfaceElevated:'oklch(0.91 0.018 42)', primary:'oklch(0.65 0.18 60)',
      accent:'oklch(0.72 0.12 170)', secondary:'oklch(0.60 0.20 30)',
      ink:'oklch(0.14 0.005 70)', muted:'oklch(0.38 0.020 60)',
      glassBg:'rgba(212,190,206,0.58)', glassBorder:'rgba(255,255,250,0.20)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.25 },
    symbols:['吴哥窟','高棉微笑','APSARA仙女','塔普伦树根','莲花池','那伽神龙','日出','丛林'],
    textures:['sandstone','jungle-vine','lotus'],
    heroImage:'photo-1599539970848-21adbbdbec1a',
    gallery:['photo-1599539970848-21adbbdbec1a','photo-1508709589985-42dba3e6d9a6','photo-1577174883177-f3f95ba13bd7','photo-1599539970848-21adbbdbec1a'],
    weather:{ city:'Siem Reap', country:'KH', tz:'Asia/Phnom_Penh' },
    tagline:'丛林中的众神之城',
    desc:'吴哥窟的五座塔峰在黎明莲花池中投下倒影，APSARA 仙女的微笑穿越千年。塔普伦寺的绞杀榕与古庙纠缠共生，自然与文明在此达成了最壮丽的妥协。',
    keywords:['吴哥窟','高棉微笑','世界遗产','丛林寺庙','日出'],
    stats:{ annualVisitors:'660万', bestSeason:'11-2月', unesco:1992 },
    routes:[
      { name:'小圈经典', days:1, highlights:['吴哥窟日出','巴戎寺','巴方寺','塔普伦寺'] },
      { name:'大圈深度', days:1, highlights:['圣剑寺','涅槃宫','塔萨寺','比粒寺日落'] },
      { name:'外圈远征', days:1, highlights:['女王宫','崩密列','洞里萨湖水上村庄'] }
    ],
    foods:[{ name:'Amok', type:'正餐', desc:'椰浆咖喱鱼，柬埔寨国菜' },{ name:'Lok Lak', type:'主食', desc:'黑椒炒牛肉配柠檬汁蘸料' },{ name:'油炸狼蛛', type:'冒险', desc:'贡布省特产，勇气者的街头小吃' }],
    festivals:[{ name:'送水节', month:11, desc:'洞里萨湖水流方向逆转的奇观庆祝' },{ name:'吴哥窟国际半程马拉松', month:12, desc:'在世界遗产中奔跑' }],
    heritage:[{ title:'APSARA 的手印', story:'吴哥窟墙壁上雕刻着 1,800 多位 APSARA 仙女，每一位的发型、手印、表情都独一无二。学者花了二十年才完成分类——她们是高棉的天界舞者谱系。', media:'photo-1508709589985-42dba3e6d9a6' }]
  },

  {
    id:'singapore', name:'Singapore', nameCN:'新加坡', nameLocal:'Singapore',
    country:'Singapore', countryCN:'新加坡', flag:'🇸🇬',
    region:'southeast-asia', lat:1.35, lng:103.82,
    theme:{
      bg:'oklch(0.97 0.003 180)', surface:'oklch(0.80 0.006 175)',
      surfaceElevated:'oklch(0.88 0.010 170)', primary:'oklch(0.60 0.20 15)',
      accent:'oklch(0.63 0.16 190)', secondary:'oklch(0.35 0.08 80)',
      ink:'oklch(0.16 0.002 170)', muted:'oklch(0.44 0.012 165)',
      glassBg:'rgba(206,190,210,0.55)', glassBorder:'rgba(255,240,255,0.20)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:600, bodyW:300, scale:1.25 },
    symbols:['滨海湾','鱼尾狮','超级树','牛车水','小印度','金沙','乌节路','胡姬花'],
    textures:['orchid','metal-mesh','tropical'],
    heroImage:'photo-1525625293386-3f8f99389edd',
    gallery:['photo-1525625293386-3f8f99389edd','photo-1569321434545-89aead3e0b96','photo-1559827295-5e4e9a3e1af0','photo-1599620128198-c3e8b6fb735b'],
    weather:{ city:'Singapore', country:'SG', tz:'Asia/Singapore' },
    tagline:'未来花园城市的亚洲之心',
    desc:'滨海湾花园的超级树在夜晚发光，小印度的香料与牛车水的肉骨茶香交织。新加坡在 728 平方公里上演绎了多元文明共生的最优解。',
    keywords:['滨海湾','花园城市','美食天堂','多元文化','购物'],
    stats:{ annualVisitors:'1900万', bestSeason:'2-4月', unesco:2015 },
    routes:[
      { name:'经典狮城', days:2, highlights:['滨海湾花园','鱼尾狮公园','金沙空中花园','克拉码头'] },
      { name:'多元文化漫步', days:1, highlights:['牛车水','小印度','甘榜格南','如切/加东'] },
      { name:'圣淘沙度假', days:1, highlights:['环球影城','S.E.A.海洋馆','西乐索海滩'] }
    ],
    foods:[{ name:'辣椒螃蟹', type:'正餐', desc:'新加坡国菜，甜辣酱汁配炸馒头' },{ name:'海南鸡饭', type:'主食', desc:'白斩鸡配鸡油饭，最简单的极致' },{ name:'肉骨茶', type:'汤品', desc:'胡椒蒜头猪骨汤，南洋华人的灵魂' }],
    festivals:[{ name:'妆艺大游行', month:2, desc:'亚洲最盛大的街头花车游行' },{ name:'F1 新加坡大奖赛', month:9, desc:'全球唯一的夜间 F1 街道赛' }],
    heritage:[{ title:'新加坡植物园', story:'这座 160 年历史的植物园是新加坡的绿色原点——李光耀从这里开始了花园城市的梦想。今日超级树的灯光秀，是那个梦想的第三代演绎。', media:'photo-1569321434545-89aead3e0b96' }]
  },

  {
    id:'luang-prabang', name:'Luang Prabang', nameCN:'琅勃拉邦', nameLocal:'ຫຼວງພຣະບາງ',
    country:'Laos', countryCN:'老挝', flag:'🇱🇦',
    region:'southeast-asia', lat:19.88, lng:102.13,
    theme:{
      bg:'oklch(0.97 0.008 80)', surface:'oklch(0.83 0.014 75)',
      surfaceElevated:'oklch(0.91 0.018 72)', primary:'oklch(0.60 0.18 50)',
      accent:'oklch(0.72 0.14 160)', secondary:'oklch(0.63 0.16 30)',
      ink:'oklch(0.14 0.005 80)', muted:'oklch(0.35 0.020 70)',
      glassBg:'rgba(210,192,206,0.58)', glassBorder:'rgba(255,255,240,0.20)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:600, bodyW:300, scale:1.2 },
    symbols:['香通寺','清晨布施','湄公河','光西瀑布','僧侣','睡佛','老挝织物','夜市'],
    textures:['teak-wood','river-mist','saffron'],
    heroImage:'photo-1518509562904-e7ef4cdcc5f8',
    gallery:['photo-1518509562904-e7ef4cdcc5f8','photo-1559827295-5e4e9a3e1af0','photo-1540126034818-9f39e0d08ff3','photo-1518509562904-e7ef4cdcc5f8'],
    weather:{ city:'Luang Prabang', country:'LA', tz:'Asia/Vientiane' },
    tagline:'湄公河畔的晨钟暮鼓',
    desc:'清晨六点，三百名僧侣赤足走过老街，信众跪地布施糯米饭——这个仪式已持续六百年。琅勃拉邦的时间流速与湄公河的水位同步。',
    keywords:['布施','湄公河','佛寺','瀑布','世界遗产'],
    stats:{ annualVisitors:'80万', bestSeason:'11-2月', unesco:1995 },
    routes:[
      { name:'古城佛寺巡礼', days:2, highlights:['香通寺','维苏那拉寺','普西山日落','清晨布施'] },
      { name:'瀑布与洞穴', days:1, highlights:['光西瀑布','帕乌洞穴','威士忌村'] },
      { name:'湄公河漫游', days:1, highlights:['湄公河日落游船','大象营地','手工纸村'] }
    ],
    foods:[{ name:'Laap', type:'沙拉', desc:'老挝式碎肉沙拉，国菜级别' },{ name:'Khao Soi', type:'主食', desc:'老挝北部特色番茄肉酱米粉' },{ name:'老挝咖啡', type:'饮品', desc:'波罗芬高原的阿拉比卡，法式滤壶冲煮' }],
    festivals:[{ name:'泼水节', month:4, desc:'老挝新年，全城泼水加选美大赛' },{ name:'灯船节', month:10, desc:'湄公河上万盏蕉叶灯漂流' }],
    heritage:[{ title:'布施——一种沉默的契约', story:'琅勃拉邦的清晨布施不是旅游表演。僧侣接受糯米饭，回馈以经文；世俗与神圣在晨曦中达成一种安静的交换。', media:'photo-1518509562904-e7ef4cdcc5f8' }]
  },

  {
    id:'hoi-an', name:'Hoi An', nameCN:'会安', nameLocal:'Hội An',
    country:'Vietnam', countryCN:'越南', flag:'🇻🇳',
    region:'southeast-asia', lat:15.88, lng:108.33,
    theme:{
      bg:'oklch(0.97 0.010 60)', surface:'oklch(0.82 0.016 55)',
      surfaceElevated:'oklch(0.89 0.020 52)', primary:'oklch(0.65 0.20 50)',
      accent:'oklch(0.63 0.16 180)', secondary:'oklch(0.60 0.18 25)',
      ink:'oklch(0.14 0.005 70)', muted:'oklch(0.38 0.022 60)',
      glassBg:'rgba(210,192,205,0.55)', glassBorder:'rgba(255,255,240,0.22)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:600, bodyW:300, scale:1.2 },
    symbols:['灯笼','秋盆河','来远桥','裁缝','会安黄墙','广南面','荷花灯','古宅'],
    textures:['silk','lantern-paper','river'],
    heroImage:'photo-1559827295-5e4e9a3e1af0',
    gallery:['photo-1559827295-5e4e9a3e1af0','photo-1559827295-5e4e9a3e1af0','photo-1559827295-5e4e9a3e1af0','photo-1559827295-5e4e9a3e1af0'],
    weather:{ city:'Hoi An', country:'VN', tz:'Asia/Ho_Chi_Minh' },
    tagline:'满月之夜，千盏灯笼照亮古镇',
    desc:'每月农历十四，会安全镇熄灯，只留下丝绸灯笼的光。秋盆河上漂满荷花灯，十六世纪的古港在烛光中复活。',
    keywords:['灯笼','古镇','裁缝','世界遗产','秋盆河'],
    stats:{ annualVisitors:'500万', bestSeason:'2-4月', unesco:1999 },
    routes:[
      { name:'古镇漫步', days:1, highlights:['来远桥','福建会馆','冯兴古宅','裁缝定制'] },
      { name:'美山圣地', days:1, highlights:['美山占婆遗址','秋盆河游船','篮船体验'] },
      { name:'美食骑行', days:1, highlights:['有机菜园','烹饪课','街头小吃巡礼'] }
    ],
    foods:[{ name:'Cao Lầu', type:'主食', desc:'会安独有——碱水粗面配叉烧，用本地井水制作' },{ name:'白玫瑰', type:'小吃', desc:'米粉皮包虾仁，形如白玫瑰' },{ name:'越南滴漏咖啡', type:'饮品', desc:'炼乳垫底，一滴一滴等待的甜蜜' }],
    festivals:[{ name:'灯笼节', month:'每月14日', desc:'满月之夜全城熄灯点灯笼' },{ name:'会安国际美食节', month:3, desc:'全球厨师汇聚古镇' }],
    heritage:[{ title:'会安灯笼的丝绸密码', story:'每一盏会安灯笼的丝绸颜色都有特定含义——红求财、黄求子、绿求健康。裁缝世家的灯笼匠人用三十六道工序将一根竹篾变成一个会发光的故事。', media:'photo-1559827295-5e4e9a3e1af0' }]
  },

  // ═══════════════════════════════════════════════════
  // 🕌 南亚 SOUTH ASIA (4)
  // ═══════════════════════════════════════════════════

  {
    id:'taj-mahal', name:'Taj Mahal', nameCN:'泰姬陵', nameLocal:'ताज महल',
    country:'India', countryCN:'印度', flag:'🇮🇳',
    region:'south-asia', lat:27.17, lng:78.04,
    theme:{
      bg:'oklch(0.97 0.005 55)', surface:'oklch(0.82 0.010 50)',
      surfaceElevated:'oklch(0.89 0.015 47)', primary:'oklch(0.65 0.18 50)',
      accent:'oklch(0.63 0.12 180)', secondary:'oklch(0.72 0.22 25)',
      ink:'oklch(0.14 0.004 70)', muted:'oklch(0.38 0.016 60)',
      glassBg:'rgba(210,190,206,0.58)', glassBorder:'rgba(255,255,250,0.22)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.25 },
    symbols:['泰姬陵','亚穆纳河','大理石','红堡','月光花园','莫卧儿','泰姬传说','法塔赫布尔'],
    textures:['marble-inlay','pietra-dura','mughal-garden'],
    heroImage:'photo-1566837945700-30057527ade0',
    gallery:['photo-1566837945700-30057527ade0','photo-1548013146-72479768bada','photo-1591018653865-60cf9acb59e5','photo-1566837945700-30057527ade0'],
    weather:{ city:'Agra', country:'IN', tz:'Asia/Kolkata' },
    tagline:'永恒之爱的白色大理石诗篇',
    desc:'沙贾汗为爱妃穆塔兹·玛哈尔建造的陵墓，两万名工匠用二十二年，将白色大理石镶嵌成月光下的泪滴。泰姬陵在不同光线中变化颜色——晨粉、午白、暮金、夜银。',
    keywords:['泰姬陵','大理石','莫卧儿','印度','世界遗产'],
    stats:{ annualVisitors:'800万', bestSeason:'11-2月', unesco:1983 },
    routes:[
      { name:'阿格拉经典', days:1, highlights:['泰姬陵日出','阿格拉红堡','月光花园日落'] },
      { name:'法塔赫布尔', days:1, highlights:['法塔赫布尔西克里','阿克巴大帝陵'] },
      { name:'金三角', days:3, highlights:['德里红堡','斋浦尔琥珀堡','阿格拉泰姬陵'] }
    ],
    foods:[{ name:'Mughlai Biryani', type:'主食', desc:'莫卧儿宫廷香饭，藏红花与羊肉的完美融合' },{ name:'Petha', type:'甜品', desc:'阿格拉特产的糖渍冬瓜甜点' },{ name:'印度奶茶', type:'饮品', desc:'Masala Chai，辛香与奶香交织' }],
    festivals:[{ name:'泰姬陵 Mahotsav', month:2, desc:'十天的文化盛宴，再现莫卧儿时代' },{ name:'排灯节', month:10, desc:'印度教最盛大的灯火节日' }],
    heritage:[{ title:'Pietra Dura 的最后一脉传人', story:'泰姬陵墙壁上的花朵不是画出来的——是用玛瑙、碧玉、孔雀石切割镶嵌而成。这门工艺在阿格拉的匠人家庭中代代相传，但全城只剩下不到五十人掌握。', media:'photo-1591018653865-60cf9acb59e5' }]
  },

  {
    id:'jaipur', name:'Jaipur', nameCN:'斋浦尔', nameLocal:'जयपुर',
    country:'India', countryCN:'印度', flag:'🇮🇳',
    region:'south-asia', lat:26.91, lng:75.79,
    theme:{
      bg:'oklch(0.97 0.010 30)', surface:'oklch(0.82 0.016 28)',
      surfaceElevated:'oklch(0.89 0.020 26)', primary:'oklch(0.75 0.23 45)',
      accent:'oklch(0.63 0.14 200)', secondary:'oklch(0.70 0.20 340)',
      ink:'oklch(0.14 0.006 50)', muted:'oklch(0.41 0.024 40)',
      glassBg:'rgba(214,188,204,0.58)', glassBorder:'rgba(255,255,250,0.24)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.2 },
    symbols:['风之宫','琥珀堡','粉红之城','简塔·曼塔天文台','大象','骆驼','市集','拉贾斯坦'],
    textures:['pink-sandstone','jali-screen','bandhani'],
    heroImage:'photo-1599661046289-e31897846e41',
    gallery:['photo-1599661046289-e31897846e41','photo-1477587458883-47145ed94245','photo-1609949279531-cf48b60d1fb5','photo-1599661046289-e31897846e41'],
    weather:{ city:'Jaipur', country:'IN', tz:'Asia/Kolkata' },
    tagline:'欢迎来到粉红之城',
    desc:'1876 年为了迎接威尔士亲王到访，全城建筑被漆成粉红色——从此斋浦尔拥有了一千种粉。风之宫的 953 扇窗户让后宫嫔妃在不见面的情况下观看市井百态。',
    keywords:['粉红之城','风之宫','琥珀堡','拉贾斯坦','印度'],
    stats:{ annualVisitors:'500万', bestSeason:'11-2月', unesco:2019 },
    routes:[
      { name:'粉红之城经典', days:2, highlights:['风之宫','城市宫殿','简塔·曼塔','斋浦尔市集'] },
      { name:'琥珀堡巡礼', days:1, highlights:['琥珀堡象背骑行','斋加尔城堡','水之宫'] },
      { name:'拉贾斯坦乡村', days:2, highlights:['Abhaneri 阶梯井','骆驼骑行','萨里斯卡老虎保护区'] }
    ],
    foods:[{ name:'Dal Baati Churma', type:'正餐', desc:'拉贾斯坦邦的招牌——烤面团配豆咖喱与甜碎麦' },{ name:'Laal Maas', type:'正餐', desc:'辣椒炖羊肉，火红色的拉贾斯坦硬菜' },{ name:'Ghewar', type:'甜品', desc:'蜂巢状油炸糖渍甜点，斋浦尔节日必备' }],
    festivals:[{ name:'斋浦尔文学节', month:1, desc:'全球最大的免费文学节' },{ name:'大象节', month:3, desc:'大象被彩绘装扮成拉贾斯坦传奇角色' }],
    heritage:[{ title:'Jali 石雕——光影的筛子', story:'风之宫的砂岩窗格（Jali）不仅是装饰——它创造了文丘里效应，让沙漠热风穿过时自动降温。六百年前的被动式建筑设计。', media:'photo-1599661046289-e31897846e41' }]
  },

  {
    id:'istanbul', name:'Istanbul', nameCN:'伊斯坦布尔', nameLocal:'İstanbul',
    country:'Turkey', countryCN:'土耳其', flag:'🇹🇷',
    region:'middle-east', lat:41.01, lng:28.98,
    theme:{
      bg:'oklch(0.97 0.007 250)', surface:'oklch(0.82 0.012 245)',
      surfaceElevated:'oklch(0.89 0.016 240)', primary:'oklch(0.60 0.20 30)',
      accent:'oklch(0.63 0.14 200)', secondary:'oklch(0.72 0.10 80)',
      ink:'oklch(0.14 0.004 250)', muted:'oklch(0.38 0.016 240)',
      glassBg:'rgba(208,188,216,0.58)', glassBorder:'rgba(255,255,240,0.22)',
      strategy:'committed'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:400, scale:1.25 },
    symbols:['圣索菲亚','蓝色清真寺','博斯普鲁斯海峡','大巴扎','加拉塔','土耳其咖啡','旋转舞','苏丹的灯笼'],
    textures:['iznik-tile','bosphorus-ripple','spice'],
    heroImage:'photo-1524231757912-21f4fe3a7200',
    gallery:['photo-1524231757912-21f4fe3a7200','photo-1541433410478-9d6734326ad9','photo-1562078345-9f8a6e57f7b6','photo-1524231757912-21f4fe3a7200'],
    weather:{ city:'Istanbul', country:'TR', tz:'Europe/Istanbul' },
    tagline:'两个大陆在一个城市接吻',
    desc:'博斯普鲁斯海峡将欧洲与亚洲劈开，又在渡轮的汽笛声中缝合。圣索菲亚从教堂到清真寺到博物馆到清真寺——伊斯坦布尔的每一块石头都在叠压帝国的年轮。',
    keywords:['圣索菲亚','博斯普鲁斯','大巴扎','欧亚交汇','土耳其'],
    stats:{ annualVisitors:'2000万', bestSeason:'4-5月/9-10月', unesco:1985 },
    routes:[
      { name:'苏丹的伊斯坦布尔', days:2, highlights:['圣索菲亚','蓝色清真寺','托普卡帕宫','地下水宫'] },
      { name:'博斯普鲁斯巡航', days:1, highlights:['博斯普鲁斯游船','奥塔科伊清真寺','于斯屈达尔','Kadıköy 市场'] },
      { name:'佩拉与加拉塔', days:1, highlights:['加拉塔石塔','独立大街','纯真博物馆','加拉塔桥日落'] }
    ],
    foods:[{ name:'土耳其烤肉', type:'正餐', desc:'旋转烤肉配烤茄子泥，伊斯坦布尔的街魂' },{ name:'土耳其早餐', type:'早餐', desc:'一桌十碟——奶酪、橄榄、蜂蜜、Kaymak奶油、Menemen炒蛋' },{ name:'Baklava', type:'甜品', desc:'层层酥皮裹开心果碎，糖浆浸润的甜蜜' }],
    festivals:[{ name:'伊斯坦布尔双年展', month:9, desc:'全球最重要的当代艺术双年展之一' },{ name:'斋月', month:'回历9月', desc:'蓝清真寺前的千人开斋盛宴' }],
    heritage:[{ title:'地下水宫的眼泪', story:'耶莱巴坦地下水宫——336根石柱撑起拜占庭的地下蓄水池，其中一根刻满泪滴。美杜莎头被倒置做柱基，一千五百年没人知道为什么。', media:'photo-1541433410478-9d6734326ad9' }]
  },

  {
    id:'dubai', name:'Dubai', nameCN:'迪拜', nameLocal:'دبي',
    country:'UAE', countryCN:'阿联酋', flag:'🇦🇪',
    region:'middle-east', lat:25.20, lng:55.27,
    theme:{
      bg:'oklch(0.97 0.005 55)', surface:'oklch(0.80 0.010 50)',
      surfaceElevated:'oklch(0.88 0.015 47)', primary:'oklch(0.72 0.22 55)',
      accent:'oklch(0.63 0.16 210)', secondary:'oklch(0.60 0.18 20)',
      ink:'oklch(0.16 0.003 60)', muted:'oklch(0.44 0.016 55)',
      glassBg:'rgba(206,188,204,0.55)', glassBorder:'rgba(255,255,250,0.24)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:700, bodyW:300, scale:1.3 },
    symbols:['哈利法塔','帆船酒店','棕榈岛','沙漠','迪拜喷泉','黄金市场','未来博物馆','隼'],
    textures:['desert-dune','gold-mesh','futuristic'],
    heroImage:'photo-1512453979798-5ea266f8880c',
    gallery:['photo-1512453979798-5ea266f8880c','photo-1549877459727-ab625486680f','photo-1580674684081-7617fbf3d745','photo-1512453979798-5ea266f8880c'],
    weather:{ city:'Dubai', country:'AE', tz:'Asia/Dubai' },
    tagline:'沙漠中的未来主义宣言',
    desc:'从贝都因帐篷到 828 米高的哈利法塔——迪拜用了不到五十年。沙漠冲沙的刺激、黄金市场的耀眼、未来博物馆的曲线——迪拜永远在定义"不可能"。',
    keywords:['哈利法塔','购物','沙漠冲沙','棕榈岛','未来城市'],
    stats:{ annualVisitors:'1700万', bestSeason:'11-3月', unesco:null },
    routes:[
      { name:'现代迪拜', days:2, highlights:['哈利法塔','迪拜购物中心','未来博物馆','棕榈岛'] },
      { name:'沙漠探险', days:1, highlights:['沙漠冲沙','阿拉伯营地烧烤','骑骆驼看日落'] },
      { name:'阿布扎比一日', days:1, highlights:['谢赫扎耶德大清真寺','卢浮宫阿布扎比','法拉利世界'] }
    ],
    foods:[{ name:'Machboos', type:'主食', desc:'阿拉伯香料饭，阿联酋国菜' },{ name:'阿拉伯烤肉', type:'正餐', desc:'炭火慢烤的羊腿与鸡肉串' },{ name:'阿拉伯咖啡', type:'饮品', desc:'加豆蔻的黄铜壶煮咖啡，配椰枣饮用' }],
    festivals:[{ name:'迪拜购物节', month:1, desc:'全球最大的购物盛宴' },{ name:'迪拜世界杯赛马', month:3, desc:'全球奖金最高的赛马赛事' }],
    heritage:[{ title:'采珠人的潜水钟', story:'在石油发现之前，迪拜人靠采珠为生。采珠人用龟壳做鼻夹，一口气潜入波斯湾四十英尺深——每次下潜都可能是一生中最后一口气。', media:'photo-1512453979798-5ea266f8880c' }]
  },

  // Continue with remaining destinations
  {
    id:'maldives', name:'Maldives', nameCN:'马尔代夫', nameLocal:'ދިވެހި',
    country:'Maldives', countryCN:'马尔代夫', flag:'🇲🇻',
    region:'south-asia', lat:4.18, lng:73.51,
    theme:{
      bg:'oklch(0.97 0.008 230)', surface:'oklch(0.91 0.014 225)',
      surfaceElevated:'oklch(0.86 0.018 220)', primary:'oklch(0.65 0.18 195)',
      accent:'oklch(0.72 0.22 50)', secondary:'oklch(0.63 0.12 260)',
      ink:'oklch(0.18 0.004 220)', muted:'oklch(0.40 0.018 215)',
      glassBg:'rgba(204,190,218,0.55)', glassBorder:'rgba(255,255,255,0.22)',
      strategy:'drenched'
    },
    typography:{ display:'Noto Serif', body:'Noto Sans', displayW:600, bodyW:300, scale:1.2 },
    symbols:['水上屋','珊瑚礁','魔鬼鱼','海龟','海洋','白沙','棕榈','水飞'],
    textures:['water-ripple','coral','palm'],
    heroImage:'photo-1514282401047-d79a71a590e8',
    gallery:['photo-1514282401047-d79a71a590e8','photo-1573843981267-be1999ff37cd','photo-1540202404-1b927e27fa8b','photo-1514282401047-d79a71a590e8'],
    weather:{ city:'Male', country:'MV', tz:'Indian/Maldives' },
    tagline:'印度洋上的珍珠项链',
    desc:'26 个环礁、1,192 座珊瑚岛，97% 是海洋。马尔代夫的蓝不是一种颜色，是从浅碧到深靛的完整光谱。水上屋的玻璃地板下，魔鬼鱼在月光中滑翔。',
    keywords:['水上屋','潜水','蜜月','珊瑚礁','海岛天堂'],
    stats:{ annualVisitors:'170万', bestSeason:'11-4月', unesco:null },
    routes:[
      { name:'水上天堂', days:3, highlights:['水上别墅','SPA','日落海钓','私人沙洲野餐'] },
      { name:'潜水之旅', days:3, highlights:['Manta Point','鲨鱼潜点','沉船','夜潜'] }
    ],
    foods:[{ name:'Mas Huni', type:'早餐', desc:'金枪鱼碎配椰丝与面饼，马尔代夫式早餐' },{ name:'Garudhiya', type:'汤品', desc:'金枪鱼清汤，配米饭与酸橙' }],
    festivals:[{ name:'斋月', month:'回历9月', desc:'穆斯林斋戒月，日落后盛宴' },{ name:'独立日', month:7, desc:'烟花与水上巡游' }],
    heritage:[{ title:'珊瑚石清真寺', story:'马累的古清真寺用整块珊瑚石砌成——珊瑚曾是马尔代夫唯一的建筑材料。海平面上升正在威胁这些珊瑚墙的存在。', media:'photo-1573843981267-be1999ff37cd' }]
  }
];

// Export for module use; also available as global
if (typeof window !== 'undefined') window.DESTINATIONS = DESTINATIONS;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DESTINATIONS;
}
