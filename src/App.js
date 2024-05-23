import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./apis/user";
import "./App.css";
import { addInitialUsers } from "./store/reducers/users";
import ListUsers from "./components/ListUsers";

function App() {
  const dispatch = useDispatch();

  const getInitialUser = async (controller) => {
    const users = await fetchUsers("/users", controller);
    dispatch(addInitialUsers(users.data));
  };

  useEffect(() => {
    const controller = new AbortController();
    getInitialUser(controller);
    return () => {
      // cancel the request
      controller.abort();
    };
  }, []); // Dependency array is empty so that is calls only once.

  return <div className="p-4">
    <ListUsers />
  </div>;
}

export default App;
