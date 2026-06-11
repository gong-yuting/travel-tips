/**
 * Generate destination-specific routes, foods, festivals, and heritage
 * for the 49 compact destinations. Uses country + city-specific data.
 */

import { readFileSync, writeFileSync } from 'fs';

const part2 = JSON.parse(
  readFileSync('js/destinations-part2.js', 'utf8')
    .replace('const DESTINATIONS_PART2 = ', '')
    .replace(/;\s*if\s*\(typeof[\s\S]*$/, '')
);

// ── Country-specific cuisine data ──
const CUISINE = {
  'France': [
    { name: '可颂与咖啡', type: '早餐', desc: '层层酥脆的黄油可颂配Café au Lait——巴黎人的晨间仪式' },
    { name: '法式洋葱汤', type: '前菜', desc: '焦糖洋葱配格鲁耶尔芝士焗面包，冬日暖胃经典' },
    { name: '油封鸭', type: '正餐', desc: 'Confit de Canard——鸭腿在鸭油中慢炖至骨肉分离' }
  ],
  'United Kingdom': [
    { name: '英式全套早餐', type: '早餐', desc: '培根、香肠、煎蛋、烤豆、黑布丁——一整天的能量' },
    { name: '炸鱼薯条', type: '主食', desc: '鳕鱼裹啤酒面糊炸至金黄，配粗薯条与麦芽醋' },
    { name: '下午茶三层塔', type: '仪式', desc: '手指三明治、司康配凝脂奶油、精致甜点，配伯爵红茶' }
  ],
  'Italy': [
    { name: '手工意面', type: '主食', desc: '蛋黄、佩科里诺芝士与黑胡椒——Carbonara的灵魂三元素' },
    { name: '意式冰淇淋', type: '甜品', desc: 'Gelato——比Ice Cream更绵密、更浓郁、更低脂' },
    { name: '玛格丽特披萨', type: '主食', desc: '那不勒斯申请了UNESCO——番茄、莫扎里拉、罗勒三色旗' }
  ],
  'Spain': [
    { name: 'Tapas巡礼', type: '小吃', desc: '从Patatas Bravas到伊比利亚火腿——分享才是西班牙美食的精髓' },
    { name: '海鲜饭', type: '主食', desc: 'Paella——藏红花染色的米饭满载地中海的海获' },
    { name: '西班牙油条', type: '甜品', desc: 'Churros蘸热巧克力——西班牙式深夜甜蜜' }
  ],
  'Netherlands': [
    { name: '荷兰煎饼', type: '主食', desc: 'Pannekoek——比法式可丽饼厚，配苹果与培根' },
    { name: '生鲱鱼', type: '小吃', desc: 'Haring配洋葱碎与酸黄瓜——荷兰人的街头灵魂' }
  ],
  'Czech Republic': [
    { name: '捷克烤鸭', type: '正餐', desc: '脆皮烤鸭配馒头片与紫甘蓝——波西米亚的周日味道' },
    { name: '捷克啤酒', type: '饮品', desc: 'Pilsner Urquell的故乡——人均啤酒消费量全球第一' }
  ],
  'Austria': [
    { name: '维也纳炸牛排', type: '正餐', desc: 'Wienerschnitzel——小牛肉裹面包屑煎至金黄' },
    { name: '萨赫蛋糕', type: '甜品', desc: 'Sachertorte——巧克力蛋糕夹杏子酱，维也纳的甜蜜名片' }
  ],
  'Greece': [
    { name: '希腊沙拉', type: '前菜', desc: '番茄、黄瓜、橄榄、菲达芝士——地中海的阳光盛在碗里' },
    { name: 'Souvlaki', type: '小吃', desc: '炭火烤肉串配皮塔饼与Tzatziki酸奶黄瓜酱' }
  ],
  'Switzerland': [
    { name: '芝士火锅', type: '正餐', desc: 'Fondue——格鲁耶尔与Vacherin芝士融化在葡萄酒中' },
    { name: '瑞士巧克力', type: '甜品', desc: '瑞士每人年均消费11公斤巧克力——全球冠军' }
  ],
  'Iceland': [
    { name: '冰岛炖羊肉', type: '正餐', desc: 'Kjötsúpa——冰岛羊肉与根茎蔬菜慢炖数小时' },
    { name: 'Skyr', type: '甜品', desc: '冰岛式酸奶——比希腊酸奶更浓厚，维京人的蛋白质来源' }
  ],
  'Norway': [
    { name: '挪威三文鱼', type: '主食', desc: '烟熏三文鱼配黑面包与莳萝——挪威峡湾的味道' },
    { name: '棕色芝士', type: '特产', desc: 'Brunost——焦糖化的乳清芝士，挪威独有的甜咸风味' }
  ],
  'Germany': [
    { name: '咖喱香肠', type: '小吃', desc: 'Currywurst——柏林人的街头灵魂，每年消费8亿根' },
    { name: '椒盐卷饼', type: '烘焙', desc: 'Brezel——巴伐利亚碱水面包配白香肠与芥末' }
  ],
  'Hungary': [
    { name: '古拉什汤', type: '汤品', desc: 'Gulyás——匈牙利的国家名片，红椒粉是灵魂' },
    { name: '烟囱蛋糕', type: '甜品', desc: 'Kürtőskalács——炭火烤制的肉桂糖卷筒' }
  ],
  'Portugal': [
    { name: '葡式蛋挞', type: '甜品', desc: 'Pastel de Nata——焦糖酥皮蛋奶挞，贝伦区百年老店配方' },
    { name: '烤沙丁鱼', type: '主食', desc: '夏季街头碳烤沙丁鱼的焦香飘满里斯本的巷弄' }
  ],
  'Croatia': [
    { name: '黑烩饭', type: '主食', desc: 'Crni Rižot——墨鱼汁染黑的大米，亚得里亚海的暗黑美味' },
    { name: '佩卡烤肉', type: '正餐', desc: 'Peka——铁钟下炭火慢烤的八爪鱼或羊肉' }
  ],
  'Belgium': [
    { name: '比利时薯条', type: '小吃', desc: '牛油炸制的粗薯条配蛋黄酱——比利时人发明了薯条' },
    { name: '比利时华夫', type: '甜品', desc: '列日华夫——珍珠糖在铁板上焦化成脆壳' }
  ],
  'Russia': [
    { name: '罗宋汤', type: '汤品', desc: '甜菜根与牛肉熬制的浓汤配酸奶油' },
    { name: '俄式饺子', type: '主食', desc: 'Pelmeni——西伯利亚式小饺子，配醋与酸奶油' }
  ],
  'Denmark': [
    { name: '开放式三明治', type: '午餐', desc: 'Smørrebrød——黑麦面包上的艺术品，腌鲱鱼是经典' },
    { name: '丹麦酥', type: '烘焙', desc: 'Wienerbrød——层层黄油酥皮，丹麦人叫它"维也纳面包"' }
  ],
  'Ireland': [
    { name: '爱尔兰炖肉', type: '正餐', desc: 'Irish Stew——羊肉与土豆在健力士黑啤中慢炖' },
    { name: '苏打面包', type: '烘焙', desc: '无酵母的黑麦面包，配烟熏三文鱼与黄油' }
  ],
  'United States': [
    { name: '纽约披萨', type: '主食', desc: '薄底大尺寸——可以折叠的街头食物' },
    { name: '南部BBQ', type: '正餐', desc: '烟熏低温慢烤——德州vs堪萨斯vs孟菲斯各有流派' }
  ],
  'Peru': [
    { name: '酸橘汁腌鱼', type: '前菜', desc: 'Ceviche——新鲜海鱼在青柠汁中"煮熟"，安第斯山的馈赠' },
    { name: 'Pisco Sour', type: '饮品', desc: '皮斯科白兰地加青柠汁与蛋白——秘鲁国饮' }
  ],
  'Brazil': [
    { name: '巴西烤肉', type: '正餐', desc: 'Churrascaria——剑串烤肉无限供应，肉食者的天堂' },
    { name: '黑豆饭', type: '主食', desc: 'Feijoada——猪肉与黑豆慢炖，巴西的国民灵魂' }
  ],
  'Cuba': [
    { name: '古巴三明治', type: '小吃', desc: '烤猪肉、火腿、瑞士芝士、酸黄瓜——古巴移民的经典创造' },
    { name: '莫吉托', type: '饮品', desc: '朗姆酒、青柠、薄荷、苏打——海明威最爱的哈瓦那味道' }
  ],
  'Canada': [
    { name: '普丁', type: '小吃', desc: 'Poutine——薯条浇肉汁与芝士凝块，魁北克的罪恶美味' },
    { name: '枫糖浆', type: '特产', desc: '加拿大枫糖产量占全球85%——枫叶国的液体黄金' }
  ],
  'Argentina': [
    { name: '阿根廷烤肉', type: '正餐', desc: 'Asado——巴塔哥尼亚羊肉在铁架上炭火慢烤' },
    { name: '马黛茶', type: '饮品', desc: 'Mate——南美人的社交之茶，一根吸管轮流传递' }
  ],
  'Morocco': [
    { name: '塔吉锅', type: '正餐', desc: 'Tajine——锥形陶盖中慢炖的羊肉与杏干，摩洛哥的符号' },
    { name: '薄荷茶', type: '饮品', desc: '绿茶配新鲜薄荷与大量糖——摩洛哥式待客之道' }
  ],
  'South Africa': [
    { name: 'Bobotie', type: '正餐', desc: '咖喱肉末焗蛋奶——马来香料与荷兰烹饪的完美融合' },
    { name: 'Braai烧烤', type: '正餐', desc: '南非式BBQ——Boerewors香肠与烤肉，彩虹之国的社交核心' }
  ],
  'Tanzania': [
    { name: 'Ugali', type: '主食', desc: '玉米粉糊——东非人的能量基础，配烤肉或炖豆' },
    { name: 'Nyama Choma', type: '正餐', desc: '斯瓦希里式炭火烤肉——东非最受欢迎的社交食物' }
  ],
  'Egypt': [
    { name: '库莎丽', type: '主食', desc: 'Koshari——米饭、扁豆、通心粉、炸洋葱与番茄酱的碳水狂欢' },
    { name: 'Ful Medames', type: '早餐', desc: '炖蚕豆配芝麻酱与柠檬——埃及人千年不变的早餐' }
  ],
  'Australia': [
    { name: 'Flat White', type: '饮品', desc: '澳洲发明的浓缩咖啡——细腻奶泡下的力量与平衡' },
    { name: '澳洲肉派', type: '小吃', desc: 'Meat Pie——足球赛配番茄酱的国民小吃' }
  ],
  'New Zealand': [
    { name: 'Hāngī', type: '正餐', desc: '毛利式地热烹饪——在地坑中用热石慢蒸数小时' },
    { name: '帕夫洛娃', type: '甜品', desc: 'Pavlova——酥脆蛋白霜配鲜奶油与奇异果' }
  ],
  'French Polynesia': [
    { name: 'Poisson Cru', type: '前菜', desc: '椰奶腌生鱼——大溪地的国菜，南太平洋的味道' },
    { name: '面包果', type: '主食', desc: 'Uru——烤或炸的淀粉主食，波利尼西亚的生命之树' }
  ],
  'Jordan': [
    { name: 'Mansaf', type: '正餐', desc: '羊肉配酸奶酱与米饭——约旦国菜，贝都因人的盛宴' },
    { name: '阿拉伯咖啡', type: '饮品', desc: '加豆蔻的黄铜壶煮咖啡，配椰枣饮用' }
  ],
  'Uzbekistan': [
    { name: 'Plov抓饭', type: '主食', desc: '羊肉、黄萝卜与米饭在大铁锅中慢炖——中亚的灵魂食物' },
    { name: 'Samsa', type: '小吃', desc: '泥炉烤制的羊肉馅饼——撒马尔罕的街头味道' }
  ],
  'Myanmar': [
    { name: 'Mohinga', type: '早餐', desc: '鲶鱼汤米粉——缅甸国民早餐，街头巷尾的清晨味道' },
    { name: '茶叶沙拉', type: '沙拉', desc: 'Lahpet Thoke——发酵茶叶拌花生蚕豆，缅甸独有的味道' }
  ],
  'South Korea': [
    { name: '韩定食', type: '正餐', desc: '宫廷料理的现代演绎——一桌十碟，五味五色' },
    { name: '街头辣炒年糕', type: '小吃', desc: 'Tteokbokki——辣酱中的嚼劲年糕，弘大街头的灵魂' }
  ],
  'Vietnam': [
    { name: 'Pho', type: '主食', desc: '牛肉河粉——牛骨汤熬制8小时，越南的国民味道' },
    { name: '越南法棍', type: '小吃', desc: 'Bánh Mì——法式面包与越南食材的完美殖民混血' }
  ],
  'Maldives': [
    { name: 'Mas Huni', type: '早餐', desc: '金枪鱼碎配椰丝与面饼——马尔代夫式清晨' },
    { name: 'Garudhiya', type: '汤品', desc: '金枪鱼清汤配米饭与酸橙——海岛生活的朴素美味' }
  ],
  'Mexico': [
    { name: 'Tacos al Pastor', type: '小吃', desc: '旋转烤猪肉配菠萝——墨西哥街头之魂' },
    { name: 'Guacamole', type: '前菜', desc: '牛油果酱配玉米片——墨西哥最伟大的发明之一' }
  ],
  'Colombia': [
    { name: 'Arepa', type: '主食', desc: '玉米饼——哥伦比亚人的日常面包，可烤可煎可炸' },
    { name: 'Bandeja Paisa', type: '正餐', desc: '哥伦比亚超级拼盘——米饭、豆子、烤肉、煎蛋、牛油果一网打尽' }
  ]
};

// ── Country-specific routes ──
const ROUTES = {
  'France': [
    { name: '经典城市巡礼', days: 2, highlights: ['埃菲尔铁塔/地标','卢浮宫/博物馆','塞纳河畔','蒙马特高地','圣母院'] },
    { name: '美食与艺术', days: 2, highlights: ['本地市集','面包房巡礼','艺术画廊','米其林体验','葡萄酒吧'] },
    { name: '周边一日游', days: 1, highlights: ['近郊宫殿','葡萄酒庄园','中世纪古镇','薰衣草田(夏季)'] }
  ],
  'United Kingdom': [
    { name: '皇家伦敦/都市巡礼', days: 2, highlights: ['白金汉宫/地标','大英博物馆','西敏寺','伦敦眼','泰晤士河畔'] },
    { name: '博物馆马拉松', days: 2, highlights: ['大英博物馆','国家美术馆','V&A博物馆','泰特现代','自然历史博物馆'] },
    { name: '英伦乡村一日', days: 1, highlights: ['科茨沃尔德','巴斯罗马浴场','巨石阵','莎士比亚故居'] }
  ],
  'Italy': [
    { name: '永恒之城巡礼', days: 2, highlights: ['斗兽场/地标','万神殿','许愿池','老城区','意式冰淇淋店'] },
    { name: '文艺复兴朝圣', days: 2, highlights: ['乌菲兹/博物馆','圣母百花穹顶','老桥','米开朗基罗广场','手工皮具坊'] },
    { name: '托斯卡纳田园', days: 1, highlights: ['基安蒂葡萄酒庄','圣吉米尼亚诺','锡耶纳','丝柏之路'] }
  ],
  'Spain': [
    { name: '高迪与哥特', days: 2, highlights: ['圣家堂/地标','哥特区','兰布拉大道','毕加索博物馆','地中海海滩'] },
    { name: 'Tapas之夜', days: 1, highlights: ['波盖利亚市场','Tapas Bar巡礼','弗拉明戈表演','屋顶酒吧'] },
    { name: '安达卢西亚风情', days: 2, highlights: ['阿尔罕布拉宫','阿尔拜辛区','弗拉明戈洞穴','内华达山脉'] }
  ],
  'Netherlands': [
    { name: '运河与博物馆', days: 2, highlights: ['国立博物馆','梵高博物馆','运河游船','安妮之家'] },
    { name: '自行车城市', days: 1, highlights: ['自行车骑行','九小街','北教堂','约旦区咖啡馆'] },
    { name: '风车与花田', days: 1, highlights: ['桑斯安斯风车村','库肯霍夫花园(春季)','福伦丹渔村'] }
  ],
  'Czech Republic': [
    { name: '百塔之城', days: 2, highlights: ['布拉格城堡','查理大桥','老城广场','天文钟','犹太区'] },
    { name: '啤酒朝圣', days: 1, highlights: ['皮尔森啤酒厂','啤酒SPA','本地酒馆','啤酒博物馆'] },
    { name: '波西米亚小镇', days: 1, highlights: ['CK小镇','人骨教堂','温泉城卡罗维发利'] }
  ],
  'Austria': [
    { name: '音乐之都', days: 2, highlights: ['美泉宫','金色大厅','斯蒂芬大教堂','霍夫堡','咖啡馆'] },
    { name: '莫扎特足迹', days: 1, highlights: ['莫扎特出生地','米拉贝尔花园','要塞','《音乐之声》取景地'] },
    { name: '阿尔卑斯湖区', days: 1, highlights: ['哈尔施塔特','沃尔夫冈湖','圣沃尔夫冈','盐矿'] }
  ],
  'Greece': [
    { name: '蓝白梦幻', days: 2, highlights: ['伊亚日落','蓝顶教堂','火山口徒步','黑沙滩','葡萄酒庄'] },
    { name: '雅典卫城', days: 1, highlights: ['帕特农神庙','卫城博物馆','普拉卡老城','宪法广场换岗'] }
  ],
  'Switzerland': [
    { name: '少女峰之巅', days: 2, highlights: ['少女峰铁路','欧洲之巅','冰川徒步','格林德瓦','滑翔伞'] },
    { name: '双湖漫游', days: 1, highlights: ['图恩湖游船','布里恩茨湖','吉斯巴赫瀑布','因特拉肯老城'] }
  ],
  'Iceland': [
    { name: '黄金圈经典', days: 2, highlights: ['辛格维利尔裂谷','间歇泉','黄金瀑布','蓝湖温泉'] },
    { name: '南部海岸', days: 2, highlights: ['斯科加瀑布','黑沙滩','杰古沙龙冰河湖','钻石沙滩','北极光'] }
  ],
  'Norway': [
    { name: '峡湾巡礼', days: 2, highlights: ['松恩峡湾','弗洛姆铁路','布道石','卑尔根彩色木屋'] },
    { name: '午夜太阳之路', days: 2, highlights: ['罗弗敦群岛','北极圈','巨魔峡湾','海鹰观赏'] }
  ],
  'Germany': [
    { name: '柏林墙与艺术', days: 2, highlights: ['勃兰登堡门','东边画廊','博物馆岛','波茨坦广场','夜店区'] },
    { name: '包豪斯之路', days: 1, highlights: ['包豪斯档案馆','柏林艺术区','犹太纪念馆','蒂尔加滕'] }
  ],
  'Hungary': [
    { name: '多瑙河双城', days: 2, highlights: ['国会大厦','渔人堡','塞切尼链桥','布达城堡','温泉浴场'] },
    { name: '废墟酒吧之夜', days: 1, highlights: ['犹太区废墟酒吧','中央市场','安德拉什大街','英雄广场'] }
  ],
  'Portugal': [
    { name: '七丘之城', days: 2, highlights: ['贝伦塔','热罗尼莫斯修道院','28路电车','阿尔法玛','商业广场'] },
    { name: '辛特拉童话', days: 1, highlights: ['佩纳宫','罗卡角','卡斯凯什','地狱之口'] }
  ],
  'Croatia': [
    { name: '亚得里亚明珠', days: 2, highlights: ['古城墙环绕','洛克鲁姆岛','缆车','权力的游戏取景地','红屋顶日落'] },
    { name: '海岛跳游', days: 1, highlights: ['赫瓦尔岛','蓝洞','科尔丘拉','葡萄酒品鉴'] }
  ],
  'Belgium': [
    { name: '中世纪运河', days: 2, highlights: ['钟楼','运河游船','圣母教堂','巧克力工作坊','啤酒品鉴'] },
    { name: '佛兰德艺术', days: 1, highlights: ['根特祭坛画','鲁本斯故居','安特卫普钻石区'] }
  ],
  'Russia': [
    { name: '北方威尼斯', days: 2, highlights: ['冬宫','滴血大教堂','夏宫','涅瓦大街','白夜开桥'] },
    { name: '沙皇宫殿', days: 1, highlights: ['叶卡捷琳娜宫','琥珀宫','彼得霍夫喷泉群'] }
  ],
  'Denmark': [
    { name: 'Hygge之都', days: 2, highlights: ['新港','小美人鱼','蒂沃利','克里斯蒂安尼亚','单车骑行'] },
    { name: '北欧设计之路', days: 1, highlights: ['设计博物馆','Illums Bolighus','Nørrebro街区','肉库区美食'] }
  ],
  'Ireland': [
    { name: '文学与黑啤', days: 2, highlights: ['三一学院图书馆','吉尼斯仓库','圣殿酒吧','圣帕特里克大教堂'] },
    { name: '野性大西洋', days: 1, highlights: ['莫赫悬崖','高威','巴伦国家公园','阿兰群岛'] }
  ],
  'United States': [
    { name: '大苹果精华', days: 2, highlights: ['自由女神','中央公园','时代广场','帝国大厦','布鲁克林大桥'] },
    { name: '文化深潜', days: 1, highlights: ['大都会博物馆','百老汇','高线公园','哈莱姆爵士酒吧'] },
    { name: '旧金山风情', days: 2, highlights: ['金门大桥','渔人码头','恶魔岛','九曲花街','索萨利托'] }
  ],
  'Peru': [
    { name: '天空之城', days: 2, highlights: ['马丘比丘日出','印加古道','华纳比丘','太阳门','温泉镇'] },
    { name: '圣谷探索', days: 1, highlights: ['盐田','莫雷梯田','皮萨克市集','欧雁台'] },
    { name: '印加帝国之都', days: 2, highlights: ['武器广场','萨克塞瓦曼','圣谷','羊驼牧场','彩虹山'] }
  ],
  'Brazil': [
    { name: '上帝之城', days: 2, highlights: ['基督像','面包山','科帕卡巴纳','伊帕内玛','拉帕拱门'] },
    { name: '桑巴之夜', days: 1, highlights: ['桑巴俱乐部','拉帕夜生活','明日博物馆','科隆波咖啡馆'] }
  ],
  'Cuba': [
    { name: '时光倒流', days: 2, highlights: ['老爷车巡游','海滨大道','老城广场','海明威酒吧','莫罗城堡'] },
    { name: '雪茄与朗姆', days: 1, highlights: ['雪茄工厂','朗姆酒博物馆','海明威故居','维尼亚莱斯山谷'] }
  ],
  'Canada': [
    { name: '落基山蓝宝石', days: 2, highlights: ['路易斯湖','梦莲湖','冰原大道','硫磺山','野生动物'] },
    { name: '法兰西飞地', days: 2, highlights: ['芳堤娜城堡','老城墙','圣劳伦斯河','小香普兰区','冰酒店'] }
  ],
  'Argentina': [
    { name: '世界尽头', days: 2, highlights: ['菲茨罗伊峰','莫雷诺冰川','百内国家公园','火地岛','Ushuaia'] },
    { name: '巴塔哥尼亚徒步', days: 3, highlights: ['W线','法国谷','灰色冰川','百内角峰'] }
  ],
  'Morocco': [
    { name: '红城千零一夜', days: 2, highlights: ['杰马夫纳广场','马约尔花园','巴希亚宫','麦地那','神学院'] },
    { name: '蓝城梦境', days: 1, highlights: ['蓝色麦地那','里夫山脉','乌塔哈曼广场','山羊与瀑布'] }
  ],
  'South Africa': [
    { name: '桌山与好望角', days: 2, highlights: ['桌山缆车','好望角','博卡普','企鹅海滩','酒庄品鉴'] },
    { name: '花园大道', days: 2, highlights: ['赫曼努斯观鲸','克尼斯纳泻湖','齐齐卡马国家公园'] }
  ],
  'Tanzania': [
    { name: '大迁徙Safari', days: 3, highlights: ['角马过河','狮子追踪','热气球','恩戈罗恩戈罗火山口'] },
    { name: '香料之岛', days: 2, highlights: ['石头城','香料之旅','努维海滩','海豚湾','监狱岛巨龟'] }
  ],
  'Egypt': [
    { name: '法老之路', days: 2, highlights: ['吉萨金字塔','埃及博物馆','哈利利市场','尼罗河帆船','狮身人面像'] },
    { name: '帝王谷探秘', days: 2, highlights: ['帝王谷','卡纳克神庙','卢克索神庙','热气球','哈特谢普苏特'] }
  ],
  'Australia': [
    { name: '歌剧院与海滩', days: 2, highlights: ['悉尼歌剧院','海港大桥','邦迪海滩','蓝山','达令港'] },
    { name: '大洋路自驾', days: 2, highlights: ['十二门徒','大洋路','菲利普岛企鹅','咖啡巷弄'] }
  ],
  'New Zealand': [
    { name: '冒险之都', days: 2, highlights: ['蹦极发源地','米尔福德峡湾','瓦卡蒂普湖','指环王取景地','箭镇'] },
    { name: '中土世界', days: 2, highlights: ['格林诺奇','天堂谷','Routeburn Track','卓越山脉'] }
  ],
  'French Polynesia': [
    { name: '泻湖天堂', days: 3, highlights: ['水上屋','魔鬼鱼浮潜','珊瑚花园','私人沙洲野餐','奥特马努山'] }
  ],
  'Jordan': [
    { name: '玫瑰红城', days: 2, highlights: ['卡兹尼神殿','蛇道','修道院','罗马剧场','佩特拉之夜'] },
    { name: '沙漠与死海', days: 1, highlights: ['瓦迪拉姆沙漠','死海漂浮','贝都因营地','星空'] }
  ],
  'Uzbekistan': [
    { name: '蓝色丝路', days: 2, highlights: ['雷吉斯坦广场','青金石穹顶','兀鲁伯天文台','帖木儿陵','大巴扎'] }
  ],
  'Myanmar': [
    { name: '万塔之城', days: 2, highlights: ['阿南达寺','热气球','伊洛瓦底江','达玛扬基寺','蒲甘日出'] }
  ],
  'South Korea': [
    { name: '汉拿山与海女', days: 2, highlights: ['汉拿山徒步','城山日出峰','海女表演','柱状节理','偶来小路'] }
  ],
  'Vietnam': [
    { name: '千年古都', days: 2, highlights: ['还剑湖','三十六行街','文庙','Pho早餐','升龙皇城'] },
    { name: '梯田云海', days: 2, highlights: ['番西邦峰缆车','苗族村落','沙巴梯田','云海日出'] }
  ],
  'Maldives': [
    { name: '水上天堂', days: 3, highlights: ['水上别墅','SPA','日落海钓','私人沙洲晚餐','Manta Point'] }
  ],
  'Mexico': [
    { name: '玛雅探秘', days: 2, highlights: ['奇琴伊察','天然井游泳','图卢姆遗址','女人岛浮潜'] },
    { name: '加勒比时光', days: 2, highlights: ['坎昆海滩','Xcaret公园','地下河','Cozumel岛'] }
  ],
  'Colombia': [
    { name: '加勒比色彩', days: 2, highlights: ['古城墙','圣费利佩城堡','罗萨里奥群岛','Getsemani街区'] }
  ]
};

// ── Assign content ──
let enrichedCount = 0;
const enriched = part2.map(dest => {
  // Check if already has unique content (not from template)
  const hasUniqueContent = dest.routes?.length && dest.foods?.length &&
    !dest.routes[0]?.highlights?.includes('历史中心'); // crude check for template

  if (hasUniqueContent) return dest;

  const countryData = CUISINE[dest.country] || [];
  const routeData = ROUTES[dest.country] || [
    { name: '经典城市巡礼', days: 2, highlights: ['主要地标', '历史街区', '博物馆', '本地市场'] },
    { name: '深度文化探索', days: 2, highlights: ['文化遗产', '艺术区', '美食之旅', '音乐现场'] },
    { name: '自然与户外', days: 1, highlights: ['周边自然景观', '徒步', '摄影点', '日出/日落'] }
  ];

  // Generate festivals based on country
  const festivals = {
    'France': [{ name: '法国国庆日', month: 7, desc: '香榭丽舍阅兵与埃菲尔铁塔烟花' }, { name: '尼斯狂欢节', month: 2, desc: '地中海冬日最盛大的嘉年华' }],
    'United Kingdom': [{ name: '诺丁山狂欢节', month: 8, desc: '欧洲最大街头狂欢，加勒比色彩席卷伦敦' }, { name: '爱丁堡艺穗节', month: 8, desc: '全球最大艺术节，三千场演出席卷全城' }],
    'Italy': [{ name: '威尼斯狂欢节', month: 2, desc: '世界上最古老的面具狂欢' }, { name: '锡耶纳赛马节', month: 7, desc: '坎波广场的疯狂90秒——中世纪传承至今' }],
    'Spain': [{ name: '番茄大战', month: 8, desc: '布尼奥尔小镇——全球最大的食物战争' }, { name: '圣梅尔塞节', month: 9, desc: '叠人塔、巨人游行——加泰罗尼亚的狂欢' }],
    'Netherlands': [{ name: '国王节', month: 4, desc: '全城橙色狂欢，运河上跳蚤市场漂满船只' }],
    'Czech Republic': [{ name: '布拉格之春', month: 5, desc: '全球顶级古典音乐节' }, { name: '圣诞市集', month: 12, desc: '老城广场——欧洲最美圣诞市集之一' }],
    'Austria': [{ name: '萨尔茨堡音乐节', month: 7, desc: '全球最负盛名的古典音乐盛会' }, { name: '维也纳舞会季', month: 1, desc: '金色大厅华尔兹——三百场舞会闪耀冬季' }],
    'Greece': [{ name: '希腊复活节', month: 4, desc: '圣周火炬游行与午夜烟花——最盛大的宗教节日' }],
    'Switzerland': [{ name: '因特拉肯音乐节', month: 7, desc: '少女峰下的露天古典音乐' }, { name: '瑞士国庆日', month: 8, desc: '全境篝火与烟花——1291年联邦成立的纪念' }],
    'Iceland': [{ name: '北极光季', month: 9, desc: '九月至次年三月——冰岛天空变成绿色剧场' }, { name: '雷克雅未克文化夜', month: 8, desc: '全城博物馆免费开放至午夜' }],
    'Norway': [{ name: '午夜太阳马拉松', month: 6, desc: '在永不落下的太阳下奔跑——全球最北马拉松' }, { name: '卑尔根国际音乐节', month: 5, desc: '格里格的故乡——北欧最大音乐节' }],
    'Germany': [{ name: '柏林电影节', month: 2, desc: '世界三大电影节之一——金熊奖的诞生地' }, { name: '慕尼黑啤酒节', month: 9, desc: '六百万人在巨型帐篷中举杯Prost' }],
    'Hungary': [{ name: '布达佩斯温泉之夜', month: 7, desc: '塞切尼温泉变身水上派对——DJ、灯光、热温泉' }],
    'Portugal': [{ name: '圣安东尼奥节', month: 6, desc: '里斯本全城烤沙丁鱼、跳Fado、挂彩色纸灯笼' }],
    'Croatia': [{ name: '杜布罗夫尼克夏季艺术节', month: 7, desc: '古城墙内上演莎士比亚与古典音乐' }],
    'Belgium': [{ name: '布鲁日啤酒节', month: 9, desc: '超过300种比利时啤酒——修道院啤酒的朝圣' }],
    'Russia': [{ name: '白夜艺术节', month: 6, desc: '圣彼得堡太阳几乎不落——芭蕾、歌剧、升桥' }],
    'Denmark': [{ name: '罗斯基勒音乐节', month: 7, desc: '北欧最大摇滚音乐节——八万人八天狂欢' }],
    'Ireland': [{ name: '圣帕特里克节', month: 3, desc: '全城变绿——三叶草、吉尼斯、爱尔兰音乐的狂欢' }],
    'United States': [{ name: '感恩节游行', month: 11, desc: '梅西百货巨型气球穿越曼哈顿' }, { name: '爵士音乐节', month: 4, desc: '爵士乐诞生地的盛大庆祝' }],
    'Peru': [{ name: '太阳祭', month: 6, desc: '印加帝国最盛大的节日——重现太阳神祭祀' }],
    'Brazil': [{ name: '里约嘉年华', month: 2, desc: '地球上最盛大的派对——桑巴学校的年度巅峰' }],
    'Cuba': [{ name: '哈瓦那雪茄节', month: 2, desc: '全球最顶级的雪茄品鉴盛会' }],
    'Canada': [{ name: '冬季嘉年华', month: 2, desc: '冰雕城堡与雪上运动——全球最大冬季狂欢' }, { name: '卡尔加里牛仔节', month: 7, desc: '世界上最大的户外牛仔竞技' }],
    'Argentina': [{ name: '巴塔哥尼亚马拉松', month: 9, desc: '在世界尽头的荒野中奔跑' }],
    'Morocco': [{ name: '玫瑰节', month: 5, desc: '达德斯谷三万吨玫瑰花瓣覆盖山谷' }, { name: '菲斯世界神圣音乐节', month: 6, desc: '苏菲旋转、非洲节奏、格列高利圣咏' }],
    'South Africa': [{ name: '开普敦爵士音乐节', month: 4, desc: '全球第四大爵士音乐节' }, { name: '鲸鱼节', month: 9, desc: '赫曼努斯——全球最佳陆上观鲸地' }],
    'Tanzania': [{ name: '角马产子季', month: 2, desc: '塞伦盖蒂——每天八千头角马出生' }, { name: '桑给巴尔国际电影节', month: 7, desc: '石头城古迹中的非洲电影盛宴' }],
    'Egypt': [{ name: '阿布辛贝太阳节', month: 2, desc: '一年两天，阳光精准射入神庙68米深处的圣殿' }],
    'Australia': [{ name: '悉尼跨年烟花', month: 1, desc: '全球最先跨入新年的城市之一——海港大桥烟花' }, { name: '澳网公开赛', month: 1, desc: '四大满贯的开年之战' }],
    'New Zealand': [{ name: '毛利新年', month: 6, desc: 'Matariki——昴星团升起标志着毛利新年开始' }],
    'French Polynesia': [{ name: 'Heiva节', month: 7, desc: '大溪地传统舞蹈、独木舟比赛——波利尼西亚文化的巅峰' }],
    'Jordan': [{ name: '佩特拉之夜', month: '全年', desc: '每周三次——蛇道两侧千支蜡烛照亮卡兹尼神殿' }],
    'Uzbekistan': [{ name: '诺鲁孜节', month: 3, desc: '波斯新年——春分之日，中亚最盛大的节日' }],
    'Myanmar': [{ name: '点灯节', month: 10, desc: 'Thadingyut——万盏灯火庆祝佛陀从天界返回' }],
    'South Korea': [{ name: '济州油菜花节', month: 4, desc: '全岛被金色油菜花覆盖——春天在济州最先到来' }],
    'Vietnam': [{ name: '春节', month: '1-2', desc: 'Tet——越南人最重要节日，全城桃枝与金桔' }, { name: '沙巴云海节', month: 9, desc: '梯田金黄——收获季节的苗族庆典' }],
    'Maldives': [{ name: '斋月与开斋节', month: '回历9月', desc: '伊斯兰斋月——日落后海岛盛宴' }],
    'Mexico': [{ name: '亡灵节', month: 11, desc: '万寿菊铺成通往祖先的道路——最绚烂的死亡庆典' }],
    'Colombia': [{ name: '巴兰基亚嘉年华', month: 2, desc: 'UNESCO非遗——哥伦比亚最大狂欢节' }]
  };

  let destFestivals = festivals[dest.country] || [
    { name: '本地文化节', month: 7, desc: '音乐、舞蹈与本地美食的传统年度盛会' }
  ];

  // Generate heritage story
  const heritage = [{
    title: dest.nameCN + '——时光的见证者',
    story: (dest.tagline || dest.nameCN) + '。' + (dest.desc || '') + ' 在每一块石头、每一条街道、每一缕香气中，这座城市讲述着属于自己的独特故事——关于人、关于时间、关于那些被地图标记但无法被地图定义的灵魂。',
    media: dest.heroImage || ''
  }];

  enrichedCount++;
  return {
    ...dest,
    routes: routeData,
    foods: countryData,
    festivals: destFestivals,
    heritage
  };
});

console.log('Differentiated ' + enrichedCount + ' destinations');
writeFileSync('js/destinations-part2.js',
  'const DESTINATIONS_PART2 = ' + JSON.stringify(enriched, null, 1) +
  ';\n\nif (typeof module !== "undefined") module.exports = DESTINATIONS_PART2;\n'
);
console.log('Written to destinations-part2.js');
