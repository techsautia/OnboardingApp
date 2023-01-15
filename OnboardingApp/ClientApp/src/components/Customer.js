import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Icon,
  Form,
  Modal,
  TextArea,
  Header,
} from "semantic-ui-react";

export function Customer() {
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [action, setAction] = useState("");
  const [customerId, setCustomerId] = useState();
  const [customerName, setCustomerName] = useState();
  const [address, setAddress] = useState();
  const [deteleModal, setDeleteModal] = useState();

  useEffect(() => {
    fetch("customer")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Customers");
        } else {
          console.log(result);
          setResult(result);
          setCustomer(false);
        }
      });
  }, [customer]);

  const resetValue = () => {
    setCustomerId();
    setCustomerName("");
    setAddress("");
  };

  const inlineStyle = {
    modal: {
      marginTop: "0px !important",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  const handleClose = () => {
    setOpen(false);
    console.log("Modal Closed");
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("Modal Open");
  };

  const handleSave = () => {
    let data = {
      customerName,
      address,
    };
    fetch("customer", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res == 1) {
          console.log("Customer Saved!");
          handleClose();
          setCustomer(true);
          resetValue();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleAdd = (value) => {
    resetValue();
    handleOpen();
    setAction(value);
    setOpen(true);
    console.log(value);
  };

  const handleEdit = (value, id, name, address) => {
    setAction(value);
    setCustomerId(id);
    setCustomerName(name);
    setAddress(address);
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log("Update Customer");
    console.log(customerId);
    let data = {
      customerId,
      customerName,
      address,
    };
    fetch("customer", {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res == 1) {
          console.log("Customer Updated!");
          handleClose();
          setCustomer(true);
          resetValue();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleDelete = (value, id) => {
    console.log("Delete Customer");
    setAction(value);
    setCustomerId(id);
    console.log(value);
    setDeleteModal(true);
  };

  const DeleteCustomer = () => {
    console.log("Confirmed Deleted Customer");
    console.log(customerId);
    let data = {
      customerId,
      customerName,
      address,
    };
    fetch("customer", {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res == 1) {
          console.log("Customer Deleted!");
          setDeleteModal(false);
          setCustomer(true);
          resetValue();
        } else {
          console.log("Error!!!");
          setDeleteModal(false);
        }
      });
  };

  return (
    <div>
      <h2>Customer</h2>
      <Button primary onClick={() => handleAdd("Create")}>
        Add Customer
      </Button>

      {result.length == 0 ? (
        <h4>No Customers</h4>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result.map((result, index) => (
              <Table.Row key={index}>
                <Table.HeaderCell>{result.customerName}</Table.HeaderCell>
                <Table.HeaderCell>{result.address}</Table.HeaderCell>
                <Table.HeaderCell>
                  <Button
                    color="orange"
                    size="mini"
                    onClick={() =>
                      handleEdit(
                        "Update",
                        result.customerId,
                        result.customerName,
                        result.address
                      )
                    }
                  >
                    <Icon name="edit" size="small" />
                    Update
                  </Button>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Button
                    color="red"
                    size="mini"
                    onClick={() => handleDelete("Delete", result.customerId)}
                  >
                    <Icon name="trash" size="small" />
                    Delete
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <Modal
        onClose={() => handleClose()}
        onOpen={() => handleOpen()}
        open={open}
        centered={false}
        size="tiny"
        style={inlineStyle.modal}
      >
        <Modal.Header>{action} Customer</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="Customer name"
                  onChange={(e) => setCustomerName(e.target.value)}
                  value={customerName}
                />
              </Form.Field>
              <Form.Field
                label="Customer Address"
                control={TextArea}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button
            content={action}
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              action == "Create" ? handleSave() : handleUpdate();
            }}
            color={action == "Create" ? "green" : "orange"}
          />
        </Modal.Actions>
      </Modal>

      <Modal
        closeIcon
        open={deteleModal}
        onClose={() => setDeleteModal(false)}
        onOpen={() => setDeleteModal(true)}
      >
        <Header content="Delete Customer" />
        <Modal.Content>
          <p>Are you sure want to Delete this Customer?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" onClick={() => DeleteCustomer(customerId)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
