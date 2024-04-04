import { ref, onMounted, onBeforeUnmount } from "vue"

export function useScreenSize() {
  const isSsize = ref(false)
  const isMsize = ref(false)
  const isLsize = ref(false)

  const handleResize = () => {
    const width = window.innerWidth
    isSsize.value = width < 600
    isMsize.value = width >= 600 && width < 1024
    isLsize.value = width >= 1024
  }

  onMounted(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
  })

  return { isSsize, isMsize, isLsize }
}
