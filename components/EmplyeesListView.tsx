import { defineComponent } from "vue"
import { css, cx } from "@emotion/css"
import { EmployeeListItem } from "./EmployeeListItem"
import { v4 as uuidv4 } from "uuid"

export interface Employee {
  id: string
  name: string
  selected: boolean
  color: string
}

export const EmployeesListView = defineComponent({
  name: "EmployeesListView",
  props: {
    selectedEmployee: {
      type: Object as PropType<Employee | null>,
      required: true,
    },
    onUpdateSelectedEmployee: {
      type: Function as PropType<(employee: Employee | null) => void>,
      required: true,
    },
  },
  setup(props) {
    const inputValue = ref<string>()
    const showInput = ref(false)

    const employees = ref<Employee[]>([])

    const onAddEmployeeClick = () => {
      if (!showInput.value) {
        showInput.value = true
        return
      }

      if (!inputValue.value) return

      employees.value.push({
        name: inputValue.value,
        id: uuidv4(),
        selected: false,
        color: generateRandomSoftRGBA(),
      })
      showInput.value = false
      inputValue.value = undefined
    }

    function generateRandomSoftRGBA(): string {
      let r, g, b
      do {
        r = Math.floor(Math.random() * 150 + 50) // Red component (50-200)
        g = Math.floor(Math.random() * 150 + 50) // Green component (50-200)
        b = Math.floor(Math.random() * 150 + 50) // Blue component (50-200)
        // Ensure the difference between colors is significant
      } while (
        Math.abs(r - g) < 50 ||
        Math.abs(r - b) < 50 ||
        Math.abs(g - b) < 50
      )

      const a = Math.random() * 0.3 + 0.5

      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    const onEmployeeClick = (employee: Employee) => {
      props.onUpdateSelectedEmployee(employee)
      showInput.value = false
    }

    const onDeleteEmployeeClick = () => {
      const index = employees.value.findIndex(
        (employee) => employee.id === props.selectedEmployee?.id
      )
      employees.value.splice(index, 1)
      props.onUpdateSelectedEmployee(null)
    }

    return () => (
      <div>
        <div class={container}>
          <div class={[employeeListStyle, shadowStyle]}>
            <div class={title}>
              <span class={titleText}>עובדים</span>
            </div>
            <div style={{ padding: "2px" }}>
              {employees.value.map((employee) => (
                <EmployeeListItem
                  employee={employee}
                  onClick={onEmployeeClick}
                  onDeleteClick={onDeleteEmployeeClick}
                  isSelected={employee.id === props.selectedEmployee?.id}
                />
              ))}
            </div>
          </div>
          <div
            class={shadowStyle}
            style={{ marginTop: "0.25rem", borderRadius: "0.3rem" }}
          >
            {showInput.value && (
              <input
                class={inputStyle}
                onInput={({ target }) =>
                  (inputValue.value = (target as HTMLInputElement).value)
                }
              />
            )}
            <button
              class={cx(
                addButtonStyle,
                showInput.value && inputShownButtonStyle
              )}
              onClick={() => onAddEmployeeClick()}
            >
              הוסף
            </button>
          </div>
        </div>
      </div>
    )
  },
})

const container = css({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
})

const employeeListStyle = css({
  minWidth: "11.75rem",
  minHeight: "3rem",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.5rem",
  paddingBottom: "8px",
})

const title = css({
  backgroundColor: "blueviolet",
  borderTopLeftRadius: "0.5rem",
  borderTopRightRadius: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
})

const titleText = css({
  width: "100%",
  color: "white",
  textAlign: "center",
})

const inputStyle = css({
  border: "1px solid black",
  borderTopLeftRadius: "0.3rem",
  borderBottomLeftRadius: "0.3rem",
  textAlign: "right",
  direction: "rtl",

  ":focus": {
    outline: "none",
  },
})

const addButtonStyle = css({
  border: "1px solid black",
  borderRadius: "0.3rem",
  fontWeight: 600,
  backgroundColor: "lightsteelblue",
  ":hover": {
    backgroundColor: "gray",
    color: "white",
  },
})

const inputShownButtonStyle = css({
  borderRadius: 0,
  borderTopRightRadius: "0.3rem",
  borderBottomRightRadius: "0.3rem",
})

const shadowStyle = css({
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
})
