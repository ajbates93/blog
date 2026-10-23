/**
 * Path of the page we just navigated from, when the navigation is animated
 * with a view transition. `null` on first load, during SSR, when the browser
 * doesn't support view transitions, or when the user prefers reduced motion.
 *
 * Elements that morph between pages (page titles, post image/title) use this
 * to skip their fade-up entrance, so the morph lands on a visible element.
 */
export const useTransitionFrom = () => useState<string | null>('transition-from', () => null)

/** True after the first page load, i.e. for any in-site (client-side) navigation. */
export const useIsClientNav = () => useState<boolean>('is-client-nav', () => false)

/** Normalises "/blog/" and "/blog" to the same value. */
export const normalisePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)

/**
 * Fade-up entrance timings for motion-v elements.
 * First load: the full, slow staggered entrance.
 * In-site navigation: short and tight, so content doesn't trickle in after a page transition.
 */
export const useEntrance = () => {
  const isClientNav = useIsClientNav()

  const enter = (delay = 0, duration = 0.6) =>
    isClientNav.value
      ? { duration: 0.3, ease: 'easeOut' as const, delay: Math.min(delay * 0.25, 0.15) }
      : { duration, ease: 'easeOut' as const, delay }

  const enterFrom = (axis: 'x' | 'y' = 'y', distance = 30) => ({
    opacity: 0,
    [axis]: isClientNav.value ? 12 : distance,
  })

  return { enter, enterFrom }
}
