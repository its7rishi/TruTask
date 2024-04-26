import { useEffect, useMemo } from "react";
import { ITask } from "../types";
import TaskItem from "./TaskItem";

interface TasksProps {
  tasks: ITask[] | undefined;
  isLoading: boolean;
  filterValue: string;
  handleUpdate: (value: ITask) => void;
  handleDelete: (id: string) => void;
  setTaskCount: React.Dispatch<React.SetStateAction<number>>;
  searchValue: string;
}

const Tasks = ({
  tasks,
  isLoading,
  filterValue,
  handleUpdate,
  handleDelete,
  setTaskCount,
  searchValue,
}: TasksProps) => {
  let filteredTasks: ITask[] | undefined = useMemo(() => [], []);

  switch (filterValue) {
    case "flagged":
      filteredTasks = tasks?.filter(
        (task) =>
          task.isFlagged && task.title.toLowerCase().search(searchValue) >= 0
      );
      break;
    case "completed":
      filteredTasks = tasks?.filter(
        (task) =>
          task.isCompleted && task.title.toLowerCase().search(searchValue) >= 0
      );
      break;
    case "open":
      filteredTasks = tasks?.filter(
        (task) =>
          !task.isCompleted && task.title.toLowerCase().search(searchValue) >= 0
      );
      break;
    default:
      filteredTasks = tasks?.filter(
        (task) => task && task.title.toLowerCase().search(searchValue) >= 0
      );
  }

  useEffect(() => {
    if (filteredTasks && filteredTasks?.length > 0)
      setTaskCount(() => filteredTasks?.length);
  }, [filteredTasks, setTaskCount]);

  if (filteredTasks?.length === 0) {
    return (
      <h2 className=" mt-20 md:mt-36 text-xl md:text-2xl text-center font-semibold">
        No Tasks. Please create a task
      </h2>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="w-full mt-36 flex items-center justify-center">
          <span className="loading loading-bars loading-sm md:loading-lg"></span>
        </div>
      ) : (
        <ul className="mt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
          {filteredTasks?.map((task) => (
            <TaskItem
              task={task}
              key={task._id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </>
  );
};
export default Tasks;
