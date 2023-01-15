import React, { useState, useEffect } from "react";
import { Button, Table, Icon, Modal, Form, Header } from "semantic-ui-react";

export function Store() {
  const [result, setResult] = useState([]);
  const [store, setStore] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [storeId, setStoreId] = useState();
  const [storeName, setStoreName] = useState();
  const [storeAddress, setStoreAddress] = useState();
  const [deteleModal, setDeleteModal] = useState();

  useEffect(() => {
    fetch("store")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Products");
        } else {
          console.log(result);
          setResult(result);
          setStore(false);
        }
      });
  }, [store]);

  const resetValue = () => {
    setStoreId();
    setStoreName("");
    setStoreAddress("");
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
    console.log("Save Store");
    let data = {
      storeName,
      storeAddress,
    };
    fetch("store", {
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
          console.log("Store Saved!");
          handleClose();
          setStore(true);
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
    setStoreId(id);
    setStoreName(name);
    setStoreAddress(address);
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log("Update Store");
    console.log(storeId);
    let data = {
      storeId,
      storeName,
      storeAddress,
    };
    fetch("store", {
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
          console.log("Store Updated!");
          handleClose();
          setStore(true);
          resetValue();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleDelete = (value, id) => {
    console.log("Delete Product");
    setAction(value);
    setStoreId(id);
    console.log(value);
    setDeleteModal(true);
  };

  const DeleteProduct = () => {
    console.log("Confirmed Deleted Store");
    console.log(storeId);
    let data = {
      storeId,
      storeName,
      storeAddress,
    };
    fetch("store", {
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
          console.log("Store Deleted!");
          setDeleteModal(false);
          setStore(true);
          resetValue();
        } else {
          console.log("Error!!!");
          setDeleteModal(false);
        }
      });
  };

  return (
    <div>
      <h2>Store</h2>
      <Button primary onClick={() => handleAdd("Create")}>
        Add Store
      </Button>

      {result.length == 0 ? (
        <h4>No Stores</h4>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result.map((result, index) => (
              <Table.Row key={index}>
                <Table.HeaderCell>{result.storeName}</Table.HeaderCell>
                <Table.HeaderCell>{result.storeAddress}</Table.HeaderCell>
                <Table.HeaderCell>
                  <Button
                    color="orange"
                    size="mini"
                    onClick={() =>
                      handleEdit(
                        "Update",
                        result.storeId,
                        result.storeName,
                        result.storeAddress
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
                    onClick={() => handleDelete("Delete", result.storeId)}
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
        // style={inlineStyle.modal}
      >
        <Modal.Header>{action} Store</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Store Name</label>
                <input
                  type="text"
                  placeholder="Store name"
                  onChange={(e) => setStoreName(e.target.value)}
                  value={storeName}
                />
              </Form.Field>
              <Form.Field>
                <label>Store Address</label>
                <input
                  type="text"
                  placeholder="Store Address"
                  onChange={(e) => setStoreAddress(e.target.value)}
                  value={storeAddress}
                />
              </Form.Field>
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
        <Header content="Delete Store" />
        <Modal.Content>
          <p>Are you sure want to Delete this Store?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" onClick={() => DeleteProduct(storeId)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
