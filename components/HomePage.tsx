import { defineComponent } from "vue"
import { css } from "@emotion/css"
import { Grid } from "./Grid"
import { EmployeesListView, type Employee } from "./EmplyeesListView"
import { useScreenSize } from "./composables/useScreenSize"

export const HomePage = defineComponent({
  name: "HomePage",
  setup() {
    const selectedEmployee = ref<Employee>()
    const handleSelectedEmployeeUpdate = (employee?: Employee) => {
      if (selectedEmployee.value?.id === employee?.id) {
        selectedEmployee.value = undefined
      } else {
        selectedEmployee.value = employee
      }
    }

    const { isMsize, isSsize } = useScreenSize()

    return () => (
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
  },
})

const containerStyle = css({
  display: "flex",
})

const contentStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
