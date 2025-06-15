---
isArchived: false
isPublished: true 
title: "Building this blog"
description: "A few notes on the stack I used to build this site, and some other stuff that's been going on."
date: 2024-10-16 

tags:
  - blog
  - tech
---

Hi there! 👋

I wanted somewhere to come and brain dump every now and then. Quite often I'll
work on little side projects and I thought it would be useful to talk about
interesting things I've come across whilst building.

A bit about me - I'm a software dev based in the UK that mainly works in web
development. I've worked at a couple of different companies along the way. One
of which for a _very_ long time and the other for about a year now.

This site is built using Nuxt - a Vue.js meta-framework. I've been writing
applications in Vue for about 4 years now and I love it.

One thing I was excited to explore with this project is the ever-growing list of
Nuxt Modules. Here's a list of the ones I'm using (so far):

- [Nuxt Content](https://content.nuxtjs.org/) for writing content (these blogs) in Markdown.
  I didn't want to put in anything too heavy like a CMS for the time being, so
  Nuxt Content was exactly the tool I needed. It's all just Markdown.
- [Nuxt UI](https://ui.nuxt.com/) for the design system. Nuxt UI has a bunch of
  components that are easy to use and look great. I've been thinking about
  splashing out on the pro license.
- [Nuxt Fonts](https://fonts.nuxt.com/) for loading the fonts. This was really
  cool DX. Literally all I did was install the module and specify the font in my
  `tailwind.config.ts`. That's it. Behind-the-scenes the module is doing all the
  heavy lifting for stuff like downloading the font files. It also does some
  pretty neat stuff like using `fontaine` to avoid nasty things like cumulative layout shift.
- [Nuxt SEO](https://nuxtseo.com/) to avoid all the boring SEO stuff that I
  don't want to deal with. Lazy, I know.

The Nuxt Module ecosystem has grown massively since I last built a production
site in it. This took me probably a couple of evenings to get completely up and
running from scratch which was really nice.

![nuxt modules images](/img/nuxtmodules.png)

The plan is to keep working on this site and adding more features as I go. I
just wanted to get something out the door for now.

Cheers!
