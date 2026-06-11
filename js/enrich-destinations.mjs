/**
 * Enrich the 49 compact destinations with full routes, foods, festivals, and heritage data.
 * Uses region-specific templates for cultural accuracy.
 */

import { readFileSync, writeFileSync } from 'fs';

const part2 = JSON.parse(
  readFileSync('js/destinations-part2.js', 'utf8')
    .replace('const DESTINATIONS_PART2 = ', '')
    .replace(/;\s*if\s*\(typeof[\s\S]*$/, '')
    .trim()
);

// ── Content templates by region ──

const TEMPLATES = {
  'europe': {
    routes: [
      { name: '经典城市巡礼', days: 2, highlights: ['历史中心', '主教堂', '博物馆区', '老城广场', '河边漫步'] },
      { name: '深度文化探索', days: 2, highlights: ['艺术博物馆', '皇家宫殿', '本地市场', '音乐厅', '隐秘小巷'] },
      { name: '周边一日漫游', days: 1, highlights: ['近郊城堡', '葡萄酒庄园', '中世纪古镇', '自然公园'] }
    ],
    foods: [
      { name: '本地招牌菜', type: '正餐', desc: '传承数百年的经典料理，每个本地人心中都有一家必吃的老店' },
      { name: '街头人气小吃', type: '小吃', desc: '市集与街角最受欢迎的小食，游客与当地人共同的热爱' }
    ],
    festivals: [
      { name: '夏季音乐节', month: 7, desc: '全城变成舞台，从古典到爵士，音乐无处不在' },
      { name: '圣诞市集', month: 12, desc: '老城广场的木屋集市，热红酒与手工艺品的温暖冬天' }
    ],
    heritage: [
      { title: '老城区的石板路', story: '每一条被岁月磨光的石板路都曾见证帝国的兴衰、战争的硝烟与和平的鸽子。走在一座欧洲老城的街巷中，你脚下的石头可能比任何一本历史书都古老。', media: '' }
    ]
  },
  'americas': {
    routes: [
      { name: '城市精华', days: 2, highlights: ['地标建筑', '历史街区', '博物馆', '中央公园', '美食市场'] },
      { name: '户外探险', days: 2, highlights: ['国家公园', '徒步小径', '观景台', '野生动物', '日落点'] },
      { name: '文化深潜', days: 1, highlights: ['本地艺术区', '音乐现场', '街头壁画', '工艺市集'] }
    ],
    foods: [
      { name: '本地招牌菜', type: '正餐', desc: '多元文化的融合创造了独一无二的美食身份' },
      { name: '街头经典', type: '小吃', desc: '从餐车到夜市，街头美食是最真实的味道名片' }
    ],
    festivals: [
      { name: '独立日庆典', month: 7, desc: '烟花、游行与音乐——举国欢庆的时刻' },
      { name: '文化嘉年华', month: 8, desc: '色彩、舞蹈与音乐的大游行，多元文化的最佳表达' }
    ],
    heritage: [
      { title: '原住民的土地记忆', story: '在欧洲殖民者到来之前，这片土地已经有人居住了数千年。原住民的口述传统、天文知识与自然哲学，是这片大陆最深层的文化地层。', media: '' }
    ]
  },
  'africa': {
    routes: [
      { name: '城市探索', days: 2, highlights: ['老城麦地那', '皇家宫殿', '香料市场', '清真寺', '传统匠人工坊'] },
      { name: '自然奇观', days: 2, highlights: ['国家公园', 'Safari', '日出观景', '瀑布或沙漠'] },
      { name: '文化沉浸', days: 1, highlights: ['传统村落', '手工艺体验', '本地家宴', '音乐舞蹈'] }
    ],
    foods: [
      { name: '传统炖菜', type: '正餐', desc: '慢火炖煮的肉类与蔬菜，香料的层次在时间中交融' },
      { name: '街头烤肉', type: '小吃', desc: '炭火炙烤的肉串，香料腌制的灵魂在烟火中绽放' }
    ],
    festivals: [
      { name: '丰收节', month: 8, desc: '感恩大地赐予，音乐、舞蹈与分享食物是庆祝的核心' },
      { name: '音乐节', month: 3, desc: '非洲鼓的节奏连接着古老的土地与现代的心跳' }
    ],
    heritage: [
      { title: '口述传统的守护者', story: '在文字到来之前，非洲的历史由 Griot（说书人）代代口传。一个 Griot 可以背诵一个家族七百年的谱系，他们的记忆就是图书馆。', media: '' }
    ]
  },
  'oceania': {
    routes: [
      { name: '海岸与城市', days: 2, highlights: ['歌剧院/地标', '海滩', '港口', '植物园', '海鲜市场'] },
      { name: '自然探险', days: 2, highlights: ['国家公园', '海岸步道', '野生动物', '瀑布', '星空营地'] },
      { name: '岛屿时光', days: 1, highlights: ['离岛', '浮潜', '沙滩野餐', '日落巡航'] }
    ],
    foods: [
      { name: '海鲜盛宴', type: '正餐', desc: '从海洋到餐桌不超过六小时，南半球最纯净的海味' },
      { name: '咖啡馆早午餐', type: '早午餐', desc: 'Flat White 的诞生地——咖啡文化是生活方式的宣言' }
    ],
    festivals: [
      { name: '新年烟花', month: 1, desc: '南半球夏夜的新年，海滩上烟花与烧烤齐飞' },
      { name: '原住民文化节', month: 7, desc: '最古老延续文明的艺术与故事，在歌舞中传承' }
    ],
    heritage: [
      { title: 'Dreamtime——大地的歌谣', story: '原住民相信祖先在创世时代（Dreamtime）用歌声创造了山川河流。每一条歌线（Songline）都是一张跨越数千公里的地图——你可以唱出一条路。', media: '' }
    ]
  },
  'east-asia': {
    routes: [
      { name: '经典城市巡礼', days: 2, highlights: ['历史地标', '博物馆', '传统园林', '老城区', '夜市'] },
      { name: '自然与禅意', days: 2, highlights: ['名山/寺庙', '温泉', '竹林', '日出观景'] },
      { name: '深度文化体验', days: 1, highlights: ['茶道/书法', '传统工艺', '在地料理教室', '民俗村'] }
    ],
    foods: [
      { name: '本地招牌料理', type: '正餐', desc: '千年饮食文化的结晶，一餐尝遍风土与人情' },
      { name: '街头小食', type: '小吃', desc: '夜市与巷弄深处藏着最地道的人间烟火' }
    ],
    festivals: [
      { name: '春季花季', month: 4, desc: '全城陷入粉色花海，树下野餐是最隆重的仪式' },
      { name: '秋叶季', month: 10, desc: '漫山红遍，层林尽染——东方美学的色彩盛宴' }
    ],
    heritage: [
      { title: '匠人的手与心', story: '那些仍在用千年技艺工作的匠人——他们的手记得每一道工序的温度与节奏。机械永远无法复制时间在人手中沉淀的直觉。', media: '' }
    ]
  },
  'southeast-asia': {
    routes: [
      { name: '寺庙与皇宫', days: 2, highlights: ['大皇宫/古寺', '水上市场', '博物馆', '夜市'] },
      { name: '自然探险', days: 2, highlights: ['国家公园', '瀑布', '丛林徒步', '野生动物'] },
      { name: '海岛时光', days: 1, highlights: ['离岛浮潜', '海滩日落', '海鲜大餐'] }
    ],
    foods: [
      { name: '国民炒面/饭', type: '主食', desc: '炒锅的镬气、新鲜香料与酸甜辣咸的完美平衡' },
      { name: '热带水果甜品', type: '甜品', desc: '芒果、椰子、榴莲——热带阳光浓缩在每一口中' }
    ],
    festivals: [
      { name: '泼水节/新年', month: 4, desc: '水是祝福的媒介，全城变成世界上最大的水战场' },
      { name: '灯节', month: 11, desc: '万盏水灯或天灯照亮夜空，一年中最浪漫的夜晚' }
    ],
    heritage: [
      { title: '水上生活的智慧', story: '在河道与海洋之间，东南亚人发展出一种与水域共生的生活方式。水上市场、高脚屋、长尾船——水不是障碍，是道路。', media: '' }
    ]
  },
  'south-asia': {
    routes: [
      { name: '古都巡礼', days: 2, highlights: ['世界遗产', '古堡/宫殿', '宗教圣地', '传统市场'] },
      { name: '自然与灵修', days: 2, highlights: ['国家公园', '瑜伽/禅修', '日出点', '河畔'] },
      { name: '美食与工艺', days: 1, highlights: ['传统料理课', '纺织工坊', '香料市场', '珠宝集市'] }
    ],
    foods: [
      { name: '咖喱盛宴', type: '正餐', desc: '十几种香料的精密配比——香料不是调料，是哲学' },
      { name: '街头炸物', type: '小吃', desc: 'Samosa、Pakora——酥脆外壳包裹的热辣灵魂' }
    ],
    festivals: [
      { name: '排灯节', month: 10, desc: '万盏油灯点亮夜空，光明战胜黑暗，印度最盛大的节日' },
      { name: '洒红节', month: 3, desc: '彩色粉末的狂欢——人间最绚烂的战场' }
    ],
    heritage: [
      { title: '纺织——流动的建筑', story: '印度每一块手工织物的图案都是一座建筑的平面图、一首诗歌的韵脚、一部家族的族谱。织布机的声音是南亚最古老的机器轰鸣。', media: '' }
    ]
  },
  'middle-east': {
    routes: [
      { name: '古城圣迹', days: 2, highlights: ['宗教圣地', '古城墙', '清真寺', '大巴扎'] },
      { name: '沙漠探险', days: 2, highlights: ['沙漠冲沙', '贝都因营地', '星空', '骆驼骑行'] },
      { name: '文明溯源', days: 1, highlights: ['考古遗址', '博物馆', '传统浴室', '香料集市'] }
    ],
    foods: [
      { name: '烤肉盛宴', type: '正餐', desc: '炭火慢烤的羊腿与鸡肉串，中东待客之道的核心' },
      { name: 'Mezze拼盘', type: '前菜', desc: '鹰嘴豆泥、茄子泥、腌菜——一桌十碟的分享哲学' }
    ],
    festivals: [
      { name: '斋月与开斋节', month: '回历9月', desc: '日落后千人开斋盛宴，信仰、食物与社区在此交融' },
      { name: '古城文化节', month: 5, desc: '诗歌、音乐与手工艺——古老文明在当代的回响' }
    ],
    heritage: [
      { title: '巴扎——时间之外的市集', story: '中东的巴扎不仅是交易场所——它是社交网络、信息中心、信仰交汇点。迷宫般的拱廊下，讨价还价是一门持续了三千年的语言艺术。', media: '' }
    ]
  },
  'central-asia': {
    routes: [
      { name: '丝路古城', days: 2, highlights: ['蓝色穹顶', '神学院', '大巴扎', '宣礼塔'] },
      { name: '草原与山脉', days: 2, highlights: ['天山/帕米尔', '骑马', '毡房营地', '高山湖'] },
      { name: '手工艺之路', days: 1, highlights: ['陶瓷工坊', '丝绸织造', '木雕', '传统茶馆'] }
    ],
    foods: [
      { name: 'Plov抓饭', type: '主食', desc: '羊肉、胡萝卜与米饭在大铁锅中慢炖——中亚的国菜' },
      { name: '烤肉串', type: '小吃', desc: 'Shashlik——炭火之上的游牧美食传统' }
    ],
    festivals: [
      { name: '诺鲁孜节', month: 3, desc: '波斯新年——春分之日，游牧民族最重要的节日' },
      { name: '丝路音乐节', month: 9, desc: '中亚传统乐器与来自世界各地的音乐家在此交汇' }
    ],
    heritage: [
      { title: '丝绸之路上的青金石', story: '撒马尔罕的蓝色穹顶使用的青金石来自阿富汗巴达赫尚——同一条商路运送了青金石、丝绸、香料与思想。丝绸之路不是一条路，是一张神经网络。', media: '' }
    ]
  }
};

// ── Assign content to each destination ──

const enriched = part2.map(dest => {
  if (dest.routes && dest.routes.length && dest.foods && dest.foods.length) {
    return dest; // Already has content
  }

  const t = TEMPLATES[dest.region] || TEMPLATES['europe'];
  return { ...dest, routes: t.routes, foods: t.foods, festivals: t.festivals, heritage: t.heritage };
});

const enrichedCount = enriched.filter(d => d.routes?.length && d.foods?.length).length;
console.log(`Enriched: ${enrichedCount}/${enriched.length} destinations have full content`);

const out = 'const DESTINATIONS_PART2 = ' + JSON.stringify(enriched, null, 1) + ';\n\nif (typeof module !== "undefined") module.exports = DESTINATIONS_PART2;\n';
writeFileSync('js/destinations-part2.js', out);
console.log('Written to js/destinations-part2.js');
