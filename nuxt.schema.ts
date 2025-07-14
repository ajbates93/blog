import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    parent: group({
      title: 'Parent',
      description: 'Parent description.',
      icon: 'i-heroicons-home',
      fields: {
        leaf: field({
          type: 'string',
          title: 'Title',
          description: 'The title of the page.',
          default: 'My page'
        })
      }
    })
  }
})