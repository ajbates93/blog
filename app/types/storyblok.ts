// Storyblok API Response Types
export interface StoryblokStory {
  id: number
  uuid: string
  name: string
  slug: string
  full_slug: string
  created_at: string
  published_at: string
  updated_at: string
  first_published_at: string
  content: BlogPostContent
  tag_list: string[]
  is_startpage: boolean
  parent_id: number
  group_id: string
  sort_by_date: string | null
  position: number
  meta_data: any
  component: string
  lang: string
  path: string | null
  alternates: any[]
  default_full_slug: string | null
  translated_slugs: any[] | null
}

export interface StoryblokApiResponse {
  story: StoryblokStory
  cv: number
  rels: any[]
  links: any[]
}

export interface StoryblokStoriesResponse {
  stories: StoryblokStory[]
  cv: number
  rels: any[]
  links: any[]
}

// Blog Post Content Schema (based on actual Storyblok data)
export interface BlogPostContent {
  _uid: string
  component: string
  
  // Your custom fields
  title: string
  description: string
  content: string // This is markdown content
  banner_image: StoryblokAsset
  
  // Optional fields that might be added later
  tags?: string
}

// Storyblok Asset Type (based on actual data)
export interface StoryblokAsset {
  id: number | null
  alt: string | null
  name: string
  focus: string | null
  title: string | null
  source: string | null
  filename: string
  copyright: string | null
  fieldtype: string
  meta_data: {
    [key: string]: any
  }
}

// Transformed Blog Post Interface (for use in components)
export interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  date: string
  path: string
  tags: string[]
  image?: string
  slug: string
  publishedAt: string
  firstPublishedAt: string
  component: string
}