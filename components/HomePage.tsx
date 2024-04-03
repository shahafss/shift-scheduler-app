import { defineComponent } from "vue"
import { css } from "@emotion/css"
import { Grid } from "./Grid"
import { EmployeesListView, type Employee } from "./EmplyeesListView"

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

    return () => (
      <div class={style}>
        <div style={{ width: "100%" }}>
          <Grid selectedEmployee={selectedEmployee.value} />
          <div style={{ marginTop: "1rem" }}>
            <EmployeesListView
              selectedEmployee={selectedEmployee.value}
              onUpdateSelectedEmployee={handleSelectedEmployeeUpdate}
            />
          </div>
        </div>
      </div>
    )
  },
})

const style = css({
  width: "100%",
  height: "100vh",
  backgroundColor: "wheat",
  display: "flex",
})
