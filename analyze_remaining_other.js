const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lib/data/sites_detailed.json', 'utf8'));

// 当前分类系统
const CATEGORIES = {
  "Social Media": [
    "facebook", "instagram", "twitter", "tiktok", "snapchat", "linkedin", "reddit", "pinterest", 
    "youtube", "whatsapp", "telegram", "discord", "mastodon", "bluesky", "x.com", "social",
    "tumblr", "flickr", "vimeo", "vine", "periscope", "clubhouse", "spaces", "threads", "9gag"
  ],
  "E-commerce": [
    "amazon", "ebay", "etsy", "alibaba", "shopify", "paypal", "stripe", "square", "walmart", 
    "target", "bestbuy", "shop", "store", "retail", "marketplace", "commerce", "shopping",
    "mercado", "rakuten", "wish", "overstock", "newegg", "wayfair", "zappos", "aboutyou"
  ],
  Finance: [
    "paypal", "venmo", "cashapp", "robinhood", "coinbase", "stripe", "binance", "kraken", 
    "bank", "credit", "loan", "mortgage", "investment", "crypto", "bitcoin", "trading",
    "finance", "financial", "money", "payment", "wallet", "card", "visa", "mastercard",
    "amex", "discover", "wells", "chase", "citi", "bofa", "schwab", "fidelity", "vanguard",
    "acorns", "agoradesk", "1xbet", "actblue"
  ],
  Gaming: [
    "steam", "epic", "xbox", "playstation", "nintendo", "twitch", "discord", "riot", 
    "blizzard", "ubisoft", "ea", "activision", "game", "gaming", "esports", "gamer",
    "origin", "battle.net", "rockstar", "bethesda", "valve", "minecraft", "roblox",
    "fortnite", "league", "overwatch", "wow", "cod", "fifa", "nba2k", "madden",
    "3daimtrainer", "aim", "trainer"
  ],
  Productivity: [
    "notion", "trello", "asana", "slack", "teams", "zoom", "dropbox", "drive", "onedrive", 
    "evernote", "todoist", "office", "workspace", "productivity", "collaboration",
    "monday", "clickup", "basecamp", "jira", "confluence", "sharepoint", "box",
    "airtable", "zapier", "ifttt", "calendly", "docusign", "adobe", "canva",
    "activecampaign", "activehosted", "acronis", "airdroid", "assembla"
  ],
  Entertainment: [
    "netflix", "spotify", "hulu", "disney", "prime", "youtube", "twitch", "music", 
    "video", "streaming", "entertainment", "media", "podcast", "radio", "tv",
    "hbo", "paramount", "peacock", "apple tv", "crunchyroll", "funimation",
    "pandora", "soundcloud", "deezer", "tidal", "audible", "kindle", "7digital",
    "7plus", "adn", "animationdigitalnetwork", "anghami", "audiomack", "audiofanzine"
  ],
  Communication: [
    "gmail", "outlook", "yahoo", "protonmail", "telegram", "whatsapp", "signal", 
    "skype", "zoom", "teams", "mail", "email", "chat", "messaging", "communication",
    "messenger", "viber", "line", "kik", "snapchat", "facetime",
    "hangouts", "meet", "webex", "gotomeeting", "slack", "addmefast"
  ],
  Education: [
    "coursera", "udemy", "khan", "edx", "duolingo", "school", "university", "learning", 
    "education", "course", "study", "academic", "student", "teacher", "classroom",
    "blackboard", "canvas", "moodle", "skillshare", "lynda", "pluralsight",
    "codecademy", "treehouse", "masterclass", "brilliant", "memrise", "aulafacil",
    "16personalities", "acceptd", "getacceptd"
  ],
  Health: [
    "fitbit", "myfitnesspal", "strava", "health", "medical", "fitness", "wellness", 
    "healthcare", "doctor", "hospital", "pharmacy", "medicine", "nutrition",
    "nike", "adidas", "garmin", "polar", "withings", "headspace", "calm",
    "peloton", "noom", "weight watchers", "cvs", "walgreens", "rite aid",
    "athletic greens", "drinkag1"
  ],
  Travel: [
    "booking", "airbnb", "expedia", "uber", "lyft", "travel", "hotel", "flight", 
    "trip", "vacation", "tourism", "airline", "car rental", "cruise",
    "priceline", "kayak", "tripadvisor", "hotels.com", "vrbo", "homeaway",
    "delta", "united", "american", "southwest", "jetblue", "hertz", "avis", "enterprise",
    "agoda", "airbaltic", "aiqfome"
  ],
  News: [
    "cnn", "bbc", "reuters", "news", "media", "press", "journal", "newspaper", 
    "magazine", "blog", "times", "post", "guardian", "telegraph", "wsj",
    "nytimes", "washingtonpost", "usatoday", "fox", "msnbc", "npr", "pbs",
    "associated press", "bloomberg", "forbes", "techcrunch", "wired", "verge",
    "avclub"
  ],
  Developer: [
    "github", "gitlab", "stackoverflow", "npm", "docker", "aws", "google cloud", 
    "azure", "dev", "code", "programming", "software", "api", "developer",
    "bitbucket", "heroku", "digitalocean", "linode", "vultr", "cloudflare",
    "jenkins", "travis", "circleci", "kubernetes", "terraform", "ansible",
    "auth0", "autodesk", "aescripts", "altium"
  ],
  Business: [
    "salesforce", "hubspot", "mailchimp", "business", "crm", "marketing", 
    "enterprise", "corporate", "professional", "b2b", "saas", "erp",
    "quickbooks", "freshbooks", "xero", "sage", "oracle", "sap", "workday",
    "zendesk", "intercom", "drift", "pipedrive", "zoho", "constant contact",
    "ada"
  ],
  "China Apps": [
    "wechat", "weibo", "douyin", "taobao", "alipay", "baidu", "tencent", "xiaomi", 
    "huawei", "bytedance", "didi", "meituan", "bilibili", "zhihu", "sina", "qq", 
    "tmall", "163", "126", "netease", "youku", "iqiyi", "kuaishou", "pinduoduo",
    "jd.com", "ctrip", "ele.me", "mobike", "ofo", "renren", "tieba", "qzone",
    "99app", "1point3acres", "280daily", "4pda", "abacashi", "china", "chinese"
  ],
  "Automotive": [
    "autoscout24", "autowebsurf", "autozis", "audi", "bmw", "mercedes", "toyota",
    "honda", "ford", "volkswagen", "car", "auto", "vehicle", "automotive"
  ],
  "Security & VPN": [
    "adguard", "vpn", "security", "antivirus", "firewall", "protection", "privacy",
    "nordvpn", "expressvpn", "surfshark", "cyberghost", "protonvpn", "malware",
    "kaspersky", "norton", "mcafee", "bitdefender", "avast", "avg"
  ],
  "Government & Services": [
    "ants", "gouv", "government", "gov", "official", "public", "service", "state",
    "federal", "municipal", "city", "county", "ameli", "agence", "nationale"
  ],
  "Software & Tools": [
    "acer", "asus", "software", "tool", "utility", "application", "program",
    "system", "platform", "service", "tech", "technology", "digital", "app",
    "atavi", "aternos", "augment", "authy"
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

// 获取所有Other分类的网站
const otherSites = [];
data.forEach(guide => {
  const category = categorizeGuide(guide);
  if (category === 'Other') {
    otherSites.push({
      name: guide.name,
      domains: guide.domains
    });
  }
});

console.log(`=== 分析剩余的 ${otherSites.length} 个未分类网站 ===`);
console.log('');

// 分析域名和名称中的关键词
const domainKeywords = {};
const nameKeywords = {};

otherSites.forEach(site => {
  // 分析域名关键词
  site.domains.forEach(domain => {
    const parts = domain.toLowerCase()
      .replace(/\.(com|org|net|edu|gov|mil|int|co|uk|de|fr|jp|cn|ru|br|au|ca|in|it|nl|es|kr|mx|se|ch|no|dk|fi|be|at|pl|cz|hu|pt|gr|il|tr|th|my|sg|ph|vn|id|za|eg|ma|ng|ke|tz|ug|zm|zw|bw|mw|sz|ls|na|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw|ug|ke|tz|mw|zm|zw|bw|sz|ls|na|ao|mz|mg|mu|sc|re|yt|km|dj|so|et|er|sd|ly|tn|dz|mr|ml|bf|ne|td|cf|cm|gq|ga|cg|cd|st|gw|gn|sl|lr|ci|gh|tg|bj|sn|gm|cv|bi|rw)$/g, '')
      .split(/[.-]/)
      .filter(part => part.length > 2);
    
    parts.forEach(part => {
      domainKeywords[part] = (domainKeywords[part] || 0) + 1;
    });
  });
  
  // 分析名称关键词
  const nameWords = site.name.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !['the', 'and', 'for', 'with', 'app', 'web', 'site'].includes(word));
  
  nameWords.forEach(word => {
    nameKeywords[word] = (nameKeywords[word] || 0) + 1;
  });
});

// 显示最频繁的关键词
console.log('=== 域名中最频繁的关键词 (出现3次以上) ===');
Object.entries(domainKeywords)
  .filter(([word, count]) => count >= 3)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50)
  .forEach(([word, count]) => {
    console.log(`${word}: ${count}`);
  });

console.log('');
console.log('=== 网站名称中最频繁的关键词 (出现3次以上) ===');
Object.entries(nameKeywords)
  .filter(([word, count]) => count >= 3)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 50)
  .forEach(([word, count]) => {
    console.log(`${word}: ${count}`);
  });

// 按类型分组显示一些网站
console.log('');
console.log('=== 可能的新分类建议 ===');

// 云服务和API
const cloudSites = otherSites.filter(site => {
  const text = `${site.name} ${site.domains.join(' ')}`.toLowerCase();
  return text.includes('cloud') || text.includes('api') || text.includes('aws') || 
         text.includes('azure') || text.includes('hosting') || text.includes('server');
});

if (cloudSites.length > 0) {
  console.log(`\n云服务/API (${cloudSites.length}个):`);
  cloudSites.slice(0, 10).forEach(site => {
    console.log(`- ${site.name} (${site.domains.join(', ')})`);
  });
}

// 域名和网络服务
const domainSites = otherSites.filter(site => {
  const text = `${site.name} ${site.domains.join(' ')}`.toLowerCase();
  return text.includes('domain') || text.includes('dns') || text.includes('whois') || 
         text.includes('registrar') || text.includes('nameserver');
});

if (domainSites.length > 0) {
  console.log(`\n域名服务 (${domainSites.length}个):`);
  domainSites.slice(0, 10).forEach(site => {
    console.log(`- ${site.name} (${site.domains.join(', ')})`);
  });
}

// 文件存储和分享
const fileSites = otherSites.filter(site => {
  const text = `${site.name} ${site.domains.join(' ')}`.toLowerCase();
  return text.includes('file') || text.includes('upload') || text.includes('download') || 
         text.includes('share') || text.includes('storage') || text.includes('drive');
});

if (fileSites.length > 0) {
  console.log(`\n文件存储/分享 (${fileSites.length}个):`);
  fileSites.slice(0, 10).forEach(site => {
    console.log(`- ${site.name} (${site.domains.join(', ')})`);
  });
}

// 动漫和漫画
const animeSites = otherSites.filter(site => {
  const text = `${site.name} ${site.domains.join(' ')}`.toLowerCase();
  return text.includes('anime') || text.includes('manga') || text.includes('anilist') || 
         text.includes('anidb') || text.includes('myanimelist') || text.includes('crunchyroll');
});

if (animeSites.length > 0) {
  console.log(`\n动漫/漫画 (${animeSites.length}个):`);
  animeSites.slice(0, 10).forEach(site => {
    console.log(`- ${site.name} (${site.domains.join(', ')})`);
  });
}

// 论坛和社区
const forumSites = otherSites.filter(site => {
  const text = `${site.name} ${site.domains.join(' ')}`.toLowerCase();
  return text.includes('forum') || text.includes('community') || text.includes('board') || 
         text.includes('discussion') || text.includes('talk') || site.name.toLowerCase().includes('community');
});

if (forumSites.length > 0) {
  console.log(`\n论坛/社区 (${forumSites.length}个):`);
  forumSites.slice(0, 10).forEach(site => {
    console.log(`- ${site.name} (${site.domains.join(', ')})`);
  });
}

console.log('');
console.log('=== 前50个未分类网站详情 ===');
otherSites.slice(0, 50).forEach((site, index) => {
  console.log(`${index + 1}. ${site.name} - ${site.domains.join(', ')}`);
});