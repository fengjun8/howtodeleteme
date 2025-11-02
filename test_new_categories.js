const fs = require('fs');

// 读取网站数据
const guidesData = JSON.parse(fs.readFileSync('./lib/data/sites_detailed.json', 'utf8'));

// 导入分类函数
const { CATEGORIES, categorizeGuide } = require('./lib/utils/categories.ts');

console.log('=== 测试新分类系统 ===\n');

// 处理所有指南
const processedGuides = guidesData.map(guide => ({
  ...guide,
  category: categorizeGuide(guide)
}));

// 统计每个分类的数量
const categoryStats = {};
processedGuides.forEach(guide => {
  if (!categoryStats[guide.category]) {
    categoryStats[guide.category] = [];
  }
  categoryStats[guide.category].push(guide.name);
});

// 显示所有分类及其数量
console.log('=== 所有分类统计 ===');
Object.keys(categoryStats)
  .sort()
  .forEach(category => {
    console.log(`${category}: ${categoryStats[category].length} 个网站`);
  });

console.log('\n=== 新分类详情 ===');

// 检查新添加的分类
const newCategories = [
  'Automotive',
  'Security & VPN', 
  'Government & Services',
  'Software & Tools',
  'Cloud & Hosting',
  'Domain & DNS',
  'File Storage & Sharing',
  'Anime & Manga',
  'Forums & Communities',
  'Fashion & Lifestyle',
  'Q&A & Knowledge',
  'Maps & Navigation',
  'Cryptocurrency & Blockchain'
];

newCategories.forEach(category => {
  if (categoryStats[category]) {
    console.log(`\n${category} (${categoryStats[category].length} 个网站):`);
    categoryStats[category].slice(0, 10).forEach(site => {
      console.log(`  - ${site}`);
    });
    if (categoryStats[category].length > 10) {
      console.log(`  ... 还有 ${categoryStats[category].length - 10} 个网站`);
    }
  } else {
    console.log(`\n${category}: 没有网站被分类到此分类`);
  }
});

console.log('\n=== 路由测试 ===');
// 测试分类名称到URL slug的转换
newCategories.forEach(category => {
  const slug = category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");
  console.log(`${category} -> /category/${slug}`);
});