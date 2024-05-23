import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import DeleteUser from "./DeleteUser";
import AddEditUser from "./AddEditUser";

const ListUsers = () => {
  const users = useSelector((store) => store.user.users);
  return (
    <div>
      <div className="d-flex justify-content-between pb-2">
        <h4>List of Users.</h4>
        <AddEditUser />
      </div>
      <div className="table-responsive">
        <Table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              <>
                {users.map((user, idx) => (
                  <tr key={user?.id}>
                    <td>{idx + 1}</td>
                    <td>#{user?.id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.address?.city}</td>
                    <td>{user?.address?.zipcode}</td>
                    <td>
                      <AddEditUser key={user.id} id={user?.id} />
                      <DeleteUser key={user.id} id={user?.id} />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td className="text-center" colSpan={8}>
                  No user are there
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListUsers;
