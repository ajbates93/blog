// Records where a navigation came from (see useTransitionFrom / useEntrance).
export default defineNuxtPlugin((nuxtApp) => {
  const from = useTransitionFrom()
  const isClientNav = useIsClientNav()
  const router = useRouter()

  const transitionsEnabled =
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Only navigations after the first page has mounted count as in-site. Counting the
  // initial (hydration) navigation would make the client render different entrance
  // styles from the server HTML, causing hydration mismatches.
  let appMounted = false
  nuxtApp.hook('app:mounted', () => {
    appMounted = true
  })

  router.beforeEach((_to, prev) => {
    const inSite = appMounted && prev.matched.length > 0
    isClientNav.value = inSite
    from.value = transitionsEnabled && inSite ? normalisePath(prev.path) : null
  })
})
