// 测试分类名称和URL slug之间的转换

const testCategories = [
  'Social Media',
  'E-commerce', 
  'Gaming',
  'Finance',
  'Productivity',
  'Entertainment',
  'Communication',
  'Education',
  'Health',
  'Travel',
  'Shopping',
  'News',
  'Developer',
  'Business',
  'China Apps',
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
  'Cryptocurrency & Blockchain',
  'Other'
];

console.log('=== 分类名称到URL slug转换测试 ===\n');

testCategories.forEach(category => {
  const slug = category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");
  console.log(`${category.padEnd(30)} -> /category/${slug}`);
});

console.log('\n=== URL slug到分类名称反向转换测试 ===\n');

// 模拟反向转换
const testSlugs = [
  'social-media',
  'security--vpn', 
  'government--services',
  'file-storage--sharing',
  'qa--knowledge',
  'cryptocurrency--blockchain'
];

testSlugs.forEach(slug => {
  const found = testCategories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === slug
  );
  
  if (found) {
    console.log(`/category/${slug.padEnd(25)} -> ${found}`);
  } else {
    console.log(`/category/${slug.padEnd(25)} -> 未找到匹配的分类`);
  }
});