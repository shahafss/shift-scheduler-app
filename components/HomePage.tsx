import { defineComponent } from "vue"
import { css } from "@emotion/css"
import { Grid } from "./Grid"
import { EmployeesListView, type Employee } from "./EmplyeesListView"
import { useScreenSize } from "./composables/useScreenSize"

export const HomePage = defineComponent({
  name: "HomePage",
  setup() {
    const selectedEmployee = ref<Employee | null>(null)
    const handleSelectedEmployeeUpdate = (employee: Employee | null) => {
      if (selectedEmployee.value?.id === employee?.id) {
        selectedEmployee.value = null
      } else {
        selectedEmployee.value = employee
      }
    }

    return () => {
      const { isSsize, isMsize } = useScreenSize()

      return (
        <div class={containerStyle}>
          <div class={contentStyle}>
            <Grid
              selectedEmployee={selectedEmployee.value}
              size={isSsize.value ? "s" : isMsize.value ? "m" : "l"}
            />
            <div style={{ marginTop: "1rem" }}>
              <EmployeesListView
                selectedEmployee={selectedEmployee.value}
                onUpdateSelectedEmployee={handleSelectedEmployeeUpdate}
              />
            </div>
          </div>
        </div>
      )
    }
  },
})

const containerStyle = css({
  width: "100%",
  height: "100dvh",
  backgroundColor: "wheat",
  display: "flex",
})

const contentStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
