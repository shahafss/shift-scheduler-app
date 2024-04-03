import { css } from "@emotion/css"
import type { Employee } from "./EmplyeesListView"

export const EmployeeListItem = defineComponent({
  name: "EmployeeListItem",
  props: {
    employee: { type: Object as PropType<Employee>, required: true },
    onClick: {
      type: Function as PropType<(employee: Employee) => void>,
      required: true,
    },
    onDeleteClick: { type: Function as PropType<() => void>, required: true },
    isSelected: Boolean,
  },
  setup(props) {
    return () => {
      const { isSelected, employee, onClick, onDeleteClick } = props

      return (
        <div
          class={[employeeStyle, isSelected && employeeSelectedStyle]}
          onClick={() => onClick(employee)}
        >
          {isSelected && (
            <button onClick={() => onDeleteClick()} class={deleteButtonStyle}>
              X
            </button>
          )}
          {employee.name}
        </div>
      )
    }
  },
})

const employeeStyle = css({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  width: "10rem",
  textAlign: "end",
  fontWeight: 600,
  border: "1px solid black",
  paddingRight: "0.25rem",
  margin: "2px 8px 0",
  borderRadius: "0.25rem",
  userSelect: "none",
  transition: "all ease 0.3s",
  ":hover": { transform: "scale(1.1)" },
})

const employeeSelectedStyle = css({
  backgroundColor: "lightblue",
})

const deleteButtonStyle = css({
  border: 0,
  marginRight: "auto",
  backgroundColor: "transparent",
  ":hover": {
    color: "red",
  },
})
