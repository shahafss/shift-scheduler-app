import { defineComponent } from "vue"
import { css } from "@emotion/css"
import type { Employee } from "./EmplyeesListView"
import { CellItem } from "./CellItem"


export const Grid = defineComponent({
	name: "ShiftsGrid",
	props:{
		selectedEmployee: {type: Object as PropType<Employee | null>, required: true}
	},
	setup(props) {
		const cellEmployeeMap = ref(new Map<string, Employee | null>())


		const handleCellClick = (dayIndex: number, cellIndex: number) => {
			if(!props.selectedEmployee) return 

			const cellId = `cell-${dayIndex}-${cellIndex}`
			// if (cellEmployeeMap.value.has(cellId)){
			// 	cellEmployeeMap.value.delete(cellId)
			// }
			// cellEmployeeMap.value.set(cellId, props.selectedEmployee)
			if (!cellEmployeeMap.value.has(cellId)) {
				cellEmployeeMap.value.set(cellId, props.selectedEmployee)
				console.log(cellEmployeeMap.value)
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
			const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].reverse()

			return days.map((day, dayIndex) => (
				<div class={column}>
					<h2 class={columnTitle}>{day}</h2>
					{[1, 2, 3].map((_, cellIndex) => (
						<div
							onClick={() => handleCellClick(dayIndex, cellIndex)}
							class={[row]}
						>
							{renderCellItems(dayIndex, cellIndex)}
						</div>
					))}
				</div>
			))
		}

		return () => (
			<div id="container" class={gridContainer}>
				{renderDays()}
				<div class={column}>
					<h2 class={columnTitle}>משמרת</h2>
					<div class={row}>בוקר</div>
					<div class={row}>צהריים</div>
					<div class={row}>ערב</div>
				</div>
			</div>
		)
	}
})

const gridContainer = css({
	display: "grid",
	gridTemplateColumns: "repeat(8, 1fr)",
	gap: "1px",
	height:"fit-content"
})

const columnTitle = css({
	marginTop: 0
})

const column = css({
	border: "1px solid black",
	padding: "10px",
	textAlign: "center",
})

const row = css({
	height: "2rem",
	borderTop: "3px solid black",
	padding: "5px",

	// backgroundColor: "red",
	// fontWeight: 900,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
})

