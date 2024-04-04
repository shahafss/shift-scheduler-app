import { ref, onMounted, onBeforeUnmount } from "vue"
import { debounce } from "lodash"

export function useScreenSize() {
  const isSsize = ref(false)
  const isMsize = ref(false)
  const isLsize = ref(false)

  const handleResize = debounce(() => {
    const width = window.innerWidth
    isSsize.value = width < 600
    isMsize.value = width >= 600 && width < 1024
    isLsize.value = width >= 1024
  }, 200)

  onMounted(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
  })

  return { isSsize, isMsize, isLsize }
}
