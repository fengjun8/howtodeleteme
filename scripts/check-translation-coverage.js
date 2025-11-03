const fs = require('fs');
const path = require('path');

// 读取数据文件
const sitesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/data/sites_detailed.json'), 'utf8'));

// 支持的语言
const locales = ['zh', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'tr', 'ja', 'ko'];

// 统计信息
const stats = {
  total: sitesData.length,
  byLocale: {},
  untranslated: []
};

// 初始化每个语言的统计
locales.forEach(locale => {
  stats.byLocale[locale] = {
    translated: 0,
    untranslated: 0,
    untranslatedItems: []
  };
});

console.log('正在分析翻译覆盖情况...\n');

// 分析每个条目
sitesData.forEach((site, index) => {
  const baseNotes = site.notes;
  
  if (!baseNotes) return; // 跳过没有基础notes的条目
  
  locales.forEach(locale => {
    const localizedNotes = site[`notes_${locale}`];
    
    // 检查是否已翻译（不等于基础英文notes且不为空）
    if (localizedNotes && localizedNotes !== baseNotes && localizedNotes.trim() !== '') {
      stats.byLocale[locale].translated++;
    } else {
      stats.byLocale[locale].untranslated++;
      stats.byLocale[locale].untranslatedItems.push({
        index,
        name: site.name,
        baseNotes: baseNotes.substring(0, 100) + (baseNotes.length > 100 ? '...' : ''),
        currentNotes: localizedNotes || '(empty)'
      });
    }
  });
});

// 输出统计结果
console.log('=== 翻译覆盖情况统计 ===');
console.log(`总条目数: ${stats.total}`);
console.log('');

locales.forEach(locale => {
  const localeStats = stats.byLocale[locale];
  const coverage = ((localeStats.translated / stats.total) * 100).toFixed(1);
  
  console.log(`${locale.toUpperCase()}:`);
  console.log(`  已翻译: ${localeStats.translated}`);
  console.log(`  未翻译: ${localeStats.untranslated}`);
  console.log(`  覆盖率: ${coverage}%`);
  console.log('');
});

// 找出未翻译最多的条目
console.log('=== 未翻译条目最多的前10个网站 ===');
const untranslatedCounts = {};

sitesData.forEach((site, index) => {
  let untranslatedCount = 0;
  locales.forEach(locale => {
    const localizedNotes = site[`notes_${locale}`];
    if (!localizedNotes || localizedNotes === site.notes || localizedNotes.trim() === '') {
      untranslatedCount++;
    }
  });
  
  if (untranslatedCount > 0) {
    untranslatedCounts[index] = {
      name: site.name,
      count: untranslatedCount,
      baseNotes: site.notes ? site.notes.substring(0, 80) + '...' : '(no notes)'
    };
  }
});

// 按未翻译数量排序
const sortedUntranslated = Object.entries(untranslatedCounts)
  .sort(([,a], [,b]) => b.count - a.count)
  .slice(0, 10);

sortedUntranslated.forEach(([index, data]) => {
  console.log(`${data.name}: ${data.count}个语言未翻译`);
  console.log(`  基础notes: ${data.baseNotes}`);
  console.log('');
});

// 输出需要翻译的条目总数
const totalUntranslated = Object.values(untranslatedCounts).reduce((sum, item) => sum + item.count, 0);
console.log(`=== 总计需要翻译的条目数: ${totalUntranslated} ===`);