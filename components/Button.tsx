import { css } from "@emotion/css"

export const Button = defineComponent({
  name: "ButtonBasic",
  props: {
    onClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <button class={buttonStyle} onClick={() => props.onClick()}>
        {slots.default?.()}
      </button>
    )
  },
})

const buttonStyle = css({
  border: "1px solid black",
  borderRadius: "0.3rem",
  fontWeight: 600,
  backgroundColor: "lightsteelblue",
  ":hover": {
    backgroundColor: "gray",
    color: "white",
  },
})
