import React, { useState, useEffect } from "react";
import { Button, Table, Icon, Modal, Form, Header } from "semantic-ui-react";

export function Product() {
  const [result, setResult] = useState([]);
  const [product, setProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [productId, setProductId] = useState();
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [deteleModal, setDeleteModal] = useState();

  useEffect(() => {
    fetch("product")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Products");
        } else {
          console.log(result);
          setResult(result);
          setProduct(false);
        }
      });
  }, [product]);

  const resetValue = () => {
    setProductId();
    setProductName("");
    setProductPrice("");
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
    console.log("Save Product");
    let data = {
      productName,
      productPrice,
    };
    fetch("product", {
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
          console.log("Product Saved!");
          handleClose();
          setProduct(true);
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
    setProductId(id);
    setProductName(name);
    setProductPrice(address);
    setOpen(true);
  };

  const handleUpdate = () => {
    console.log("Update Customer");
    console.log(productId);
    let data = {
      productId,
      productName,
      productPrice,
    };
    fetch("product", {
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
          console.log("Product Updated!");
          handleClose();
          setProduct(true);
          resetValue();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleDelete = (value, id) => {
    console.log("Delete Product");
    setAction(value);
    setProductId(id);
    console.log(value);
    setDeleteModal(true);
  };

  const DeleteProduct = () => {
    console.log("Confirmed Deleted Product");
    console.log(productId);
    let data = {
      productId,
      productName,
      productPrice,
    };
    fetch("product", {
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
          console.log("Product Deleted!");
          setDeleteModal(false);
          setProduct(true);
          resetValue();
        } else {
          console.log("Error!!!");
          setDeleteModal(false);
        }
      });
  };

  return (
    <div>
      <h2>Product</h2>
      <Button primary onClick={() => handleAdd("Create")}>
        Add Product
      </Button>

      {result.length == 0 ? (
        <h4>No Products</h4>
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
                <Table.HeaderCell>{result.productName}</Table.HeaderCell>
                <Table.HeaderCell>{result.productPrice}</Table.HeaderCell>
                <Table.HeaderCell>
                  <Button
                    color="orange"
                    size="mini"
                    onClick={() =>
                      handleEdit(
                        "Update",
                        result.productId,
                        result.productName,
                        result.productPrice
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
                    onClick={() => handleDelete("Delete", result.productId)}
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
        <Modal.Header>{action} Product</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Product name"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </Form.Field>
              <Form.Field>
                <label>Product Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={productPrice}
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
        <Header content="Delete Product" />
        <Modal.Content>
          <p>Are you sure want to Delete this Product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" onClick={() => DeleteProduct(productId)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
