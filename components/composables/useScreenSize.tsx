import { useWindowSize } from "@vueuse/core"
import { ref } from "vue"

export function useScreenSize() {
  const { width } = useWindowSize()

  const breakpoint = {
    small: 414,
    medium: 640,
  }

  const isSsize = ref(width.value <= breakpoint.small)
  const isMsize = ref(
    width.value <= breakpoint.medium && width.value > breakpoint.small
  )

  watch(
    width,
    () => {
      isSsize.value = width.value <= breakpoint.small
      isMsize.value =
        width.value <= breakpoint.medium && width.value > breakpoint.small
    },
    { immediate: true }
  )

  return { isSsize, isMsize }
}
