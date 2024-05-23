import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/reducers/users";

const DeleteUser = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if(window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id))
    }
  };

  return (
    <span
      role="button"
      className="d-inline-block px-2 text-light rounded bg-danger underline"
      onClick={handleDelete}
    >
      Delete
    </span>
  );
};

export default DeleteUser;
