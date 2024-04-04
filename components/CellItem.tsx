import { css } from "@emotion/css"
import { defineComponent } from "vue"
import type { Employee } from "./EmplyeesListView"

export const CellItem = defineComponent({
  name: "CellItem",
  props: {
    employee: { type: Object as PropType<Employee>, required: true },
  },
  setup(props) {
    return () => (
      <div class={cellItemStyle(props.employee.color)}>
        {props.employee && props.employee.name}
      </div>
    )
  },
})

const cellItemStyle = (color: string) =>
  css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: color,
    fontWeight: 900,
    borderRadius: "0.5rem",
  })
