import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*.json$",
          "/api/",
        ],
      },
    ],
    sitemap: "https://howtodelete.me/sitemap.xml",
  }
}
