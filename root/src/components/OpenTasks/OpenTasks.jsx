import { Box } from "@mui/material"
import TaskCard from "../TaskCard/TaskCard"
import PropTypes from "prop-types"

const OpenTasks = ({ oT }) => {

  
  return (
    <>
      {oT && oT.map((oTItem) => {
        return (
          <Box key={oTItem.id} >
            {oTItem.registryTasks.map((task) => {
              return (
                <div key={task.id}>
                  <TaskCard
                    task={task.task}
                    taskRegistry={task.id}
                    checkeable={true}
                    checkbox={task.checkbox}
                  />
                </div>
              )
            })}
          </Box>
        )
      })}
    </>
  )
}

OpenTasks.propTypes = {
  oT: PropTypes.array.isRequired,
}

export default OpenTasks;
