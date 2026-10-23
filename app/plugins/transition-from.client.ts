// Records where a navigation came from (see useTransitionFrom / useEntrance).
export default defineNuxtPlugin(() => {
  const from = useTransitionFrom()
  const isClientNav = useIsClientNav()
  const router = useRouter()

  const transitionsEnabled =
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  router.beforeEach((_to, prev) => {
    // prev.matched is empty on the very first navigation (hard load)
    const inSite = prev.matched.length > 0
    isClientNav.value = inSite
    from.value = transitionsEnabled && inSite ? normalisePath(prev.path) : null
  })
})
