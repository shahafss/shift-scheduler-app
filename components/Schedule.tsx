import { defineComponent } from "vue"
import { css, cx } from "@emotion/css"
import type { Employee } from "./EmplyeesListView"
import { CellItem } from "./CellItem"
import { useLocalStorage } from "@vueuse/core"
import { Button } from "./Button"

type GridSize = "s" | "m" | "l"

export const Schedule = defineComponent({
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
    const cellEmployeeMap = useLocalStorage(
      "shiftsGrid",
      new Map<string, Employee | null>()
    )

    const handleCellClick = (dayIndex: number, cellIndex: number) => {
      const cellId = `cell-${dayIndex}-${cellIndex}`

      if (props.selectedEmployee) {
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
      const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

      return days
        .map((day, dayIndex) => (
          <div class={column(props.size)}>
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
        .reverse()
    }

    return () => (
      <>
        <div class={gridStyle(props.size)}>
          {renderDays()}
          {props.size === "l" && (
            <div class={column(props.size)}>
              <div class={cx(gridCellStyle, css({ borderTop: 0 }))}>משמרת</div>
              <div class={gridCellStyle}>בוקר</div>
              <div class={gridCellStyle}>צהריים</div>
              <div class={gridCellStyle}>ערב</div>
            </div>
          )}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Button
            onClick={() => {
              cellEmployeeMap.value.clear()
            }}
          >
            נקה לוח
          </Button>
        </div>
      </>
    )
  },
})

const gridStyle = (size: GridSize) =>
  css({
    gap: "1px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    borderRadius: "1rem",
    marginTop: "1rem",
    display: "grid",

    "& > div:first-child": {
      borderTopLeftRadius: "1rem",
      borderBottomLeftRadius: "1rem",
    },
    "& > div:nth-last-child(1)": {
      borderTopRightRadius: "1rem",
      borderBottomRightRadius: "1rem",
    },

    ...(size === "l"
      ? {
          width: "95%",
          gridTemplateColumns: "repeat(8, 1fr)",
        }
      : {
          gridTemplateColumns: "repeat(7, minmax(3rem, 1fr))",
        }),
  })

const columnTitle = css({
  marginTop: 0,
})

const column = (size: GridSize) =>
  css({
    border: "1px solid black",
    backgroundColor: "lightsteelblue",
    textAlign: "center",

    ...(size === "l" && { padding: "0 10px" }),
  })

const gridCellStyle = css({
  height: "2rem",
  borderTop: "3px solid black",
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})
