import { marked } from 'marked'

// RSS 2.0 feed of published blog posts, prerendered at build time (see nuxt.config.ts).
const SITE = 'https://alexbates.dev'

interface FeedStory {
  slug: string
  name: string
  first_published_at: string
  published_at: string
  tag_list: string[]
  content: {
    title?: string
    description?: string
    content?: string
    banner_image?: { filename?: string }
  }
}

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

// CDATA can't contain "]]>", so split it if the HTML ever does
const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`

export default defineEventHandler(async (event) => {
  const token = process.env.STORYBLOK_ACCESS_TOKEN
  if (!token) throw createError({ statusCode: 500, statusMessage: 'STORYBLOK_ACCESS_TOKEN is not set' })

  const { stories } = await $fetch<{ stories: FeedStory[] }>('https://api.storyblok.com/v2/cdn/stories', {
    query: {
      token,
      version: 'published',
      starts_with: 'posts/',
      sort_by: 'first_published_at:desc',
      per_page: 50,
      cv: Date.now(),
    },
  })

  const items = stories.map((story) => {
    const url = `${SITE}/blog/${story.slug}`
    const title = story.content.title || story.name
    const banner = story.content.banner_image?.filename
    const html = (banner ? `<p><img src="${banner}" alt="" /></p>` : '') + marked.parse(story.content.content ?? '', { async: false, gfm: true, breaks: true })

    return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(story.first_published_at).toUTCString()}</pubDate>
      ${story.content.description ? `<description>${escapeXml(story.content.description)}</description>` : ''}
      ${story.tag_list.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
      <content:encoded>${cdata(html as string)}</content:encoded>
    </item>`
  })

  const lastBuild = stories[0] ? new Date(stories[0].published_at).toUTCString() : new Date().toUTCString()

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Alex Bates</title>
    <link>${SITE}/blog</link>
    <description>Writing from Alex Bates on web and mobile development, side projects and things learned along the way.</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`
})
