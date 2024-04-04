import { defineComponent } from "vue"
import { css, cx } from "@emotion/css"
import type { Employee } from "./EmplyeesListView"
import { CellItem } from "./CellItem"

type GridSize = "s" | "m" | "l"

export const Grid = defineComponent({
  name: "ShiftsGrid",
  props: {
    selectedEmployee: {
      type: Object as PropType<Employee>,
    },
    size: {
      type: String as PropType<GridSize>,
      required: true,
    },
  },
  setup(props) {
    const cellEmployeeMap = ref(new Map<string, Employee | null>())

    const handleCellClick = (dayIndex: number, cellIndex: number) => {
      if (!props.selectedEmployee) return

      const cellId = `cell-${dayIndex}-${cellIndex}`
      if (!cellEmployeeMap.value.has(cellId)) {
        cellEmployeeMap.value.set(cellId, props.selectedEmployee)
      } else {
        cellEmployeeMap.value.delete(cellId)
      }
    }

    const renderCellItems = (dayIndex: number, cellIndex: number) => {
      const cellId = `cell-${dayIndex}-${cellIndex}`
      if (cellEmployeeMap.value.has(cellId)) {
        return <CellItem employee={cellEmployeeMap.value.get(cellId)!} />
      } else {
        return null
      }
    }

    const renderDays = () => {
      const days = [
        "ראשון",
        "שני",
        "שלישי",
        "רביעי",
        "חמישי",
        "שישי",
        "שבת",
      ].reverse()

      return days.map((day, dayIndex) => (
        <div class={column}>
          <div class={cx(gridCellStyle, css({ borderTop: 0 }))}>
            <div class={columnTitle}>{day}</div>
          </div>
          {[1, 2, 3].map((_, cellIndex) => (
            <div
              onClick={() => handleCellClick(dayIndex, cellIndex)}
              class={gridCellStyle}
            >
              {renderCellItems(dayIndex, cellIndex)}
            </div>
          ))}
        </div>
      ))
    }

    return () => (
      <div
        class={
          props.size === "l" || props.size === "m"
            ? gridContainer
            : gridContainerSmall
        }
      >
        {renderDays()}
        {props.size === "l" && (
          <div class={column}>
            <div class={cx(gridCellStyle, css({ borderTop: 0 }))}>משמרת</div>
            <div class={gridCellStyle}>בוקר</div>
            <div class={gridCellStyle}>צהריים</div>
            <div class={gridCellStyle}>ערב</div>
          </div>
        )}
      </div>
    )
  },
})

const gridContainer = css({
  display: "grid",
  gridTemplateColumns: "repeat(8, 1fr)",
  gap: "5px",
  height: "fit-content",
})

const gridContainerSmall = css({
  scale: "0.7",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1px",
  height: "fit-content",
})

const columnTitle = css({
  marginTop: 0,
})

const column = css({
  border: "1px solid black",
  padding: "0 10px",
  textAlign: "center",
})

const gridCellStyle = css({
  height: "2rem",
  borderTop: "3px solid black",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "3rem",
})

// const gridCellSmallStyle = css({})
