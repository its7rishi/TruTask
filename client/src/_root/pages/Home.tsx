import { useContext, useEffect, useState } from "react";
import SearchField from "../../components/SearchField";
import Tasks from "../../components/Tasks";
import { ITask } from "../../types";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("default");
  const [tasks, setTasks] = useState<ITask[] | undefined>([] || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskCount, setTaskCount] = useState<number>(0);

  const user = useContext(AuthContext);
  // console.log("user:", user);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios
        // .get("http://localhost:5000/api/v1/tasks");
        .get(
          "https://tru-task-bgglln4wv-its7rishis-projects.vercel.app/api/v1/tasks"
        );

      if (response) {
        // console.log(response?.data.data[0].createdBy === user.user.id);
        const filteredData = response.data.data.filter(
          (item: ITask) => item.createdBy === user.user.id
        );
        setTasks(filteredData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleUpdate(value: ITask) {
    await axios
      // .put(`http://localhost:5000/api/v1/tasks/${value._id}`, value)
      .put(
        `https://tru-task-bgglln4wv-its7rishis-projects.vercel.app/api/v1/tasks/${value._id}`,
        value
      )
      .then((res) => {
        console.log(res);
        fetchTasks();
      })
      .catch((err) => console.log(err.message));
  }

  async function handleDelete(id: string) {
    await axios
      // .delete(`http://localhost:5000/api/v1/tasks/${id}`)
      .delete(
        `https://tru-task-bgglln4wv-its7rishis-projects.vercel.app/api/v1/tasks/${id}`
      )
      .then((res) => {
        if (res.data.status === "ok") {
          fetchTasks();
        }
      })
      .catch((err) => console.log(err.message));
  }
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("SearchValue: ", searchValue);
  }, [searchValue]);

  return (
    <div className="mt-6 w-full px-4">
      <div className="w-full flex items-center justify-start gap-4 flex-wrap">
        <SearchField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <select
          className="select select-accent select-md w-36 max-w-xs"
          defaultValue={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="default">All Tasks</option>
          <option value="open">Open Tasks</option>
          <option value="flagged">Flagged</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mt-6 w-full max-w-5xl">
        <h2 className="font-semibold text-2xl capitalize tracking-wider">
          {filterValue === "default" ? "All" : filterValue} Tasks{" "}
          <span className=" px-4  py-2 text-sm rounded-xl bg-secondary">
            {tasks && taskCount}
          </span>
        </h2>
        <Tasks
          tasks={tasks}
          isLoading={isLoading}
          filterValue={filterValue}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          setTaskCount={setTaskCount}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};
export default Home;
