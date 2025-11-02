# 数据设置说明

## 当前状态

项目目前包含 **5个示例网站数据**，用于测试和开发。

## 加载完整数据集（2339个网站）

要加载完整的网站删除指南数据，请按照以下步骤操作：

### 方法1：运行Python脚本（推荐）

1. 确保你在项目根目录
2. 运行以下命令：

\`\`\`bash
python scripts/load-full-data.py
\`\`\`

这个脚本会自动将完整的2339个网站数据从上传的文件复制到 `lib/data/sites_detailed.json`。

### 方法2：手动复制

如果Python脚本无法运行，你可以手动复制：

1. 找到文件：`user_read_only_context/text_attachments/sites_detailed-TRf5e.json`
2. 复制其内容
3. 粘贴到：`lib/data/sites_detailed.json`

## 验证数据加载

数据加载成功后，你应该能看到：

- 首页显示更多网站卡片
- 搜索功能返回更多结果
- 分类页面包含更多网站
- 控制台日志显示：`[v0] Processed guides count: 2339`

## 数据结构

每个网站条目包含以下字段：

\`\`\`json
{
  "name": "网站名称",
  "url": "https://example.com",
  "difficulty": "easy|medium|hard|limited-availability|impossible",
  "notes": "删除说明",
  "email": "联系邮箱（可选）",
  "domains": ["example.com"]
}
\`\`\`

## 难度级别说明

- **easy** - 简单流程，可以直接在设置中删除
- **medium** - 需要一些额外步骤
- **hard** - 无法完全删除，需要联系客服
- **limited-availability** - 仅在有隐私权的地区可以删除
- **impossible** - 无法删除
\`\`\`

```tsx file="" isHidden
