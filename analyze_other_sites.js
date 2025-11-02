const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lib/data/sites_detailed.json', 'utf8'));

// 当前的分类系统（从categories.ts复制）
const CATEGORIES = {
  "Social Media": [
    "facebook", "instagram", "twitter", "tiktok", "snapchat", "linkedin", "reddit", "pinterest", 
    "youtube", "whatsapp", "telegram", "discord", "mastodon", "bluesky", "x.com", "social",
    "tumblr", "flickr", "vimeo", "vine", "periscope", "clubhouse", "spaces", "threads"
  ],
  "E-commerce": [
    "amazon", "ebay", "etsy", "alibaba", "shopify", "paypal", "stripe", "square", "walmart", 
    "target", "bestbuy", "shop", "store", "retail", "marketplace", "commerce", "shopping",
    "mercado", "rakuten", "wish", "overstock", "newegg", "wayfair", "zappos"
  ],
  Finance: [
    "paypal", "venmo", "cashapp", "robinhood", "coinbase", "stripe", "binance", "kraken", 
    "bank", "credit", "loan", "mortgage", "investment", "crypto", "bitcoin", "trading",
    "finance", "financial", "money", "payment", "wallet", "card", "visa", "mastercard",
    "amex", "discover", "wells", "chase", "citi", "bofa", "schwab", "fidelity", "vanguard"
  ],
  Gaming: [
    "steam", "epic", "xbox", "playstation", "nintendo", "twitch", "discord", "riot", 
    "blizzard", "ubisoft", "ea", "activision", "game", "gaming", "esports", "gamer",
    "origin", "battle.net", "rockstar", "bethesda", "valve", "minecraft", "roblox",
    "fortnite", "league", "overwatch", "wow", "cod", "fifa", "nba2k", "madden"
  ],
  Productivity: [
    "notion", "trello", "asana", "slack", "teams", "zoom", "dropbox", "drive", "onedrive", 
    "evernote", "todoist", "office", "workspace", "productivity", "collaboration",
    "monday", "clickup", "basecamp", "jira", "confluence", "sharepoint", "box",
    "airtable", "zapier", "ifttt", "calendly", "docusign", "adobe", "canva"
  ],
  Entertainment: [
    "netflix", "spotify", "hulu", "disney", "prime", "youtube", "twitch", "music", 
    "video", "streaming", "entertainment", "media", "podcast", "radio", "tv",
    "hbo", "paramount", "peacock", "apple tv", "crunchyroll", "funimation",
    "pandora", "soundcloud", "deezer", "tidal", "audible", "kindle"
  ],
  Communication: [
    "gmail", "outlook", "yahoo", "protonmail", "telegram", "whatsapp", "signal", 
    "skype", "zoom", "teams", "mail", "email", "chat", "messaging", "communication",
    "messenger", "viber", "line", "wechat", "kik", "snapchat", "facetime",
    "hangouts", "meet", "webex", "gotomeeting", "slack"
  ],
  Education: [
    "coursera", "udemy", "khan", "edx", "duolingo", "school", "university", "learning", 
    "education", "course", "study", "academic", "student", "teacher", "classroom",
    "blackboard", "canvas", "moodle", "skillshare", "lynda", "pluralsight",
    "codecademy", "treehouse", "masterclass", "brilliant", "memrise"
  ],
  Health: [
    "fitbit", "myfitnesspal", "strava", "health", "medical", "fitness", "wellness", 
    "healthcare", "doctor", "hospital", "pharmacy", "medicine", "nutrition",
    "nike", "adidas", "garmin", "polar", "withings", "headspace", "calm",
    "peloton", "noom", "weight watchers", "cvs", "walgreens", "rite aid"
  ],
  Travel: [
    "booking", "airbnb", "expedia", "uber", "lyft", "travel", "hotel", "flight", 
    "trip", "vacation", "tourism", "airline", "car rental", "cruise",
    "priceline", "kayak", "tripadvisor", "hotels.com", "vrbo", "homeaway",
    "delta", "united", "american", "southwest", "jetblue", "hertz", "avis", "enterprise"
  ],
  News: [
    "cnn", "bbc", "reuters", "news", "media", "press", "journal", "newspaper", 
    "magazine", "blog", "times", "post", "guardian", "telegraph", "wsj",
    "nytimes", "washingtonpost", "usatoday", "fox", "msnbc", "npr", "pbs",
    "associated press", "bloomberg", "forbes", "techcrunch", "wired", "verge"
  ],
  Developer: [
    "github", "gitlab", "stackoverflow", "npm", "docker", "aws", "google cloud", 
    "azure", "dev", "code", "programming", "software", "api", "developer",
    "bitbucket", "heroku", "digitalocean", "linode", "vultr", "cloudflare",
    "jenkins", "travis", "circleci", "kubernetes", "terraform", "ansible"
  ],
  Business: [
    "salesforce", "hubspot", "mailchimp", "business", "crm", "marketing", 
    "enterprise", "corporate", "professional", "b2b", "saas", "erp",
    "quickbooks", "freshbooks", "xero", "sage", "oracle", "sap", "workday",
    "zendesk", "intercom", "drift", "pipedrive", "zoho", "constant contact"
  ],
  "China Apps": [
    "wechat", "weibo", "douyin", "taobao", "alipay", "baidu", "tencent", "xiaomi", 
    "huawei", "bytedance", "didi", "meituan", "bilibili", "zhihu", "sina", "qq", 
    "tmall", "163", "126", "netease", "youku", "iqiyi", "kuaishou", "pinduoduo",
    "jd.com", "ctrip", "ele.me", "mobike", "ofo", "renren", "tieba", "qzone",
    "99app", "1point3acres", "280daily", "4pda", "abacashi", "china", "chinese"
  ],
  "Stock Photos": [
    "123rf", "shutterstock", "getty", "unsplash", "pexels", "pixabay", "freepik",
    "depositphotos", "alamy", "istock", "adobe stock", "dreamstime", "bigstock",
    "stocksy", "500px", "photo", "image", "stock", "picture"
  ],
  "Utilities": [
    "17track", "2captcha", "1fichier", "4shared", "abload", "hosting", "captcha",
    "file", "upload", "download", "track", "utility", "tool", "service", "convert",
    "compress", "extract", "backup", "sync", "transfer", "share", "storage"
  ],
  "Books & Reading": [
    "abebooks", "academia", "acciobooks", "goodreads", "kindle", "audible", "scribd",
    "book", "read", "library", "literature", "novel", "ebook", "audiobook", "academic"
  ],
  "Design & Creative": [
    "99designs", "canva", "figma", "sketch", "adobe", "dribbble", "behance",
    "design", "creative", "art", "graphic", "ui", "ux", "logo", "brand", "template"
  ],
  "Dating & Relationships": [
    "tinder", "bumble", "match", "eharmony", "okcupid", "hinge", "plenty of fish",
    "dating", "relationship", "love", "romance", "singles", "meet", "partner"
  ],
  "Real Estate": [
    "zillow", "realtor", "redfin", "trulia", "apartments", "rent", "property",
    "real estate", "home", "house", "apartment", "rental", "mortgage", "listing"
  ],
  "Food & Delivery": [
    "ubereats", "doordash", "grubhub", "postmates", "seamless", "deliveroo", "foodpanda",
    "food", "restaurant", "delivery", "order", "meal", "dining", "recipe", "cooking"
  ],
  Other: []
};

function categorizeGuide(guide) {
  const searchText = `${guide.name} ${guide.domains.join(' ')}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (category === 'Other') continue;
    if (keywords.some(keyword => searchText.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
}

// 分析Other分类下的网站
const otherSites = [];
data.forEach(guide => {
  const category = categorizeGuide(guide);
  if (category === 'Other') {
    otherSites.push({
      name: guide.name,
      domains: guide.domains,
      searchText: `${guide.name} ${guide.domains.join(' ')}`.toLowerCase()
    });
  }
});

console.log(`Other分类下共有 ${otherSites.length} 个网站`);
console.log('\n分析前100个Other网站的模式：\n');

// 分析域名模式
const domainPatterns = {};
const namePatterns = {};

otherSites.slice(0, 100).forEach((site, index) => {
  console.log(`${index + 1}. ${site.name}`);
  console.log(`   域名: ${site.domains.join(', ')}`);
  
  // 分析域名关键词
  site.domains.forEach(domain => {
    const cleanDomain = domain.replace(/^www\./, '').replace(/\.(com|org|net|io|co\.uk|de|fr|ru|cn|jp)$/, '');
    const words = cleanDomain.split(/[.-]/);
    words.forEach(word => {
      if (word.length > 2) {
        domainPatterns[word] = (domainPatterns[word] || 0) + 1;
      }
    });
  });
  
  // 分析网站名称关键词
  const nameWords = site.name.toLowerCase().split(/\s+/);
  nameWords.forEach(word => {
    if (word.length > 2) {
      namePatterns[word] = (namePatterns[word] || 0) + 1;
    }
  });
  
  console.log('');
});

console.log('\n=== 域名中出现频率最高的关键词 ===');
Object.entries(domainPatterns)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([word, count]) => {
    console.log(`${word}: ${count}次`);
  });

console.log('\n=== 网站名称中出现频率最高的关键词 ===');
Object.entries(namePatterns)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([word, count]) => {
    console.log(`${word}: ${count}次`);
  });