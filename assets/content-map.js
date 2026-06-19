// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const contentRegistry = {
  partitions: [
    {
      id: "home",
      title: "首页",
      tags: ["aoke", "index", "导航"],
      url: "https://index-cn-aoke.com",
      description: "主入口及综合信息展示"
    },
    {
      id: "docs",
      title: "文档中心",
      tags: ["aoke", "指南", "参考"],
      url: "https://index-cn-aoke.com/docs",
      description: "使用手册与开发文档"
    },
    {
      id: "blog",
      title: "博客",
      tags: ["aoke", "文章", "动态"],
      url: "https://index-cn-aoke.com/blog",
      description: "最新技术文章与公告"
    },
    {
      id: "support",
      title: "支持",
      tags: ["aoke", "帮助", "FAQ"],
      url: "https://index-cn-aoke.com/support",
      description: "常见问题与客户支持"
    }
  ],
  keywords: ["aoke", "index-cn-aoke", "导航", "文档", "博客", "支持", "API"]
};

function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery === "") {
    return [];
  }

  const results = [];

  for (const partition of contentRegistry.partitions) {
    const matchTitle = partition.title.toLowerCase().includes(lowerQuery);
    const matchDesc = partition.description.toLowerCase().includes(lowerQuery);
    const matchTags = partition.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const matchUrl = partition.url.toLowerCase().includes(lowerQuery);

    if (matchTitle || matchDesc || matchTags || matchUrl) {
      results.push({
        id: partition.id,
        title: partition.title,
        url: partition.url,
        description: partition.description,
        matchedTags: partition.tags.filter(tag =>
          tag.toLowerCase().includes(lowerQuery)
        )
      });
    }
  }

  return results;
}

function filterByTag(tag) {
  if (!tag || typeof tag !== "string") {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  if (lowerTag === "") {
    return [];
  }

  return contentRegistry.partitions
    .filter(partition =>
      partition.tags.some(t => t.toLowerCase() === lowerTag)
    )
    .map(partition => ({
      id: partition.id,
      title: partition.title,
      url: partition.url,
      tags: partition.tags
    }));
}

function getAllKeywords() {
  return [...contentRegistry.keywords];
}

function getPartitionById(id) {
  if (!id) return null;
  return contentRegistry.partitions.find(p => p.id === id) || null;
}

// 示例用法（可移除或保留作为参考）
// console.log(searchContent("aoke"));
// console.log(filterByTag("文档"));
// console.log(getAllKeywords());
// console.log(getPartitionById("blog"));