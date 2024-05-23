import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editUser, newUser } from "../store/reducers/users";

const AddEditUser = ({ id }) => {
  const users = useSelector((store) => store.user.users);
  const dispatch = useDispatch();

  const currentUser = id ? users.filter((user) => user.id === id) : [{}];

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(currentUser[0]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name on dot to handle nested state
    const keys = name.split(".");

    if (keys.length === 1) {
      // Handle top-level state update
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else if (keys.length === 2) {
      // Handle nested state update
      setUser((prevUser) => ({
        ...prevUser,
        [keys[0]]: {
          ...prevUser[keys[0]],
          [keys[1]]: value,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // edit user
      dispatch(
        editUser({
          id,
          user,
        })
      );
    } else {
      // Save user
      dispatch(
        newUser({
          ...user,
          id: Date.now(),
        })
      );
      setUser({});
    }

    setShow(false);
  };

  return (
    <>
      {id ? (
        <span
          role="button"
          className="d-inline-block px-2 text-light rounded bg-info underline me-2"
          onClick={() => setShow(true)}
        >
          Edit
        </span>
      ) : (
        <button className="btn btn-success" onClick={() => setShow(true)}>
          Add New User
        </button>
      )}

      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{id ? "Edit" : "Add"} User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter phone no."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="address.city"
                value={user.address?.city}
                onChange={handleChange}
                placeholder="Enter City"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                name="address.zipcode"
                value={user.address?.zipcode}
                onChange={handleChange}
                placeholder="Enter Zip code"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddEditUser;
