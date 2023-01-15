import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  Table,
  Icon,
  Header,
} from "semantic-ui-react";
import moment from "moment";

export function Sale() {
  const [result, setResult] = useState([]);
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [productId, setProductId] = useState([]);
  const [storeId, setStoreId] = useState([]);
  const [dateSold, setDateSold] = useState();
  const [sale, setSale] = useState();
  const [salesId, setSalesId] = useState();
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchProduct();
    fetchStore();
    setSale(false);

    fetch("sale")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Sales");
        } else {
          setResult(result);
          console.log(result);
        }
      });
  }, [sale]);

  const fetchCustomers = () => {
    fetch("customer")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Products");
        } else {
          const temp = result.map((customer) => {
            const options = {};

            options.key = customer.customerId;
            options.text = customer.customerName;
            options.value = customer.customerId;

            return options;
          });
          setCustomerOptions(temp);
          console.log(temp);
        }
      });
  };

  const fetchProduct = () => {
    fetch("product")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Products");
        } else {
          const temp = result.map((product) => {
            const options = {};

            options.key = product.productId;
            options.text = product.productName;
            options.value = product.productId;

            return options;
          });
          setProductOptions(temp);
          console.log(temp);
        }
      });
  };

  const fetchStore = () => {
    fetch("store")
      .then((res) => res.json())
      .then((result) => {
        if (result.length == 0) {
          console.log("No Products");
        } else {
          const temp = result.map((store) => {
            const options = {};

            options.key = store.storeId;
            options.text = store.storeName;
            options.value = store.storeId;

            return options;
          });
          setStoreOptions(temp);
          console.log(temp);
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
    console.log("Modal Closed");
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("Modal Open");
  };

  const handleAdd = () => {
    console.log("Create Sale");
    setAction("Create");
    setOpen(true);
  };

  const clearValues = () => {
    setDateSold();
    setCustomerId();
    setProductId();
    setStoreId();
    setAction();
  };

  //   const handleSave = () => {
  //     console.log("Save Sale");
  //     console.log(dateOfSale);
  //     console.log(customerId);
  //     console.log(productId);
  //     console.log(storeId);
  //     setOpen(false);
  //     clearValues();
  //   };

  const handleSave = () => {
    console.log("Save Sale");
    let data = {
      productId,
      customerId,
      storeId,
      dateSold,
    };
    fetch("sale", {
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
          setSale(true);
          clearValues();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleUpdate = () => {
    console.log("Update Sale");
    console.log(salesId);
    let data = {
      salesId,
      productId,
      customerId,
      storeId,
      dateSold,
    };
    fetch("sale", {
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
          console.log("Sale Updated!");
          handleClose();
          setSale(true);
          clearValues();
        } else {
          console.log("Error!!!");
        }
      });
  };

  const handleOnChange = (e, data) => {
    console.log(e.target.value);
  };

  const handleEdit = (value, id, custId, prodId, storId, dateSld) => {
    setAction(value);
    setSalesId(id);
    console.log(id);
    setCustomerId(custId);
    setProductId(prodId);
    setStoreId(storId);
    setDateSold(dateSld);
    setOpen(true);
  };

  const handleDelete = (value, id) => {
    console.log("Delete Sales");
    console.log(id);
    setAction(value);
    setSalesId(id);
    setDeleteModal(true);
  };

  const DeleteSale = () => {
    console.log("Confirmed Deleted Sale");
    let data = {
      salesId,
    };
    fetch("sale", {
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
          console.log("Sale Deleted!");
          setDeleteModal(false);
          setSale(true);
          clearValues();
        } else {
          console.log("Error!!!");
          setDeleteModal(false);
        }
      });
  };

  return (
    <div>
      <h2>Sales</h2>
      <Button primary onClick={() => handleAdd("Create")}>
        Add Sale
      </Button>

      {result.length == 0 ? (
        <h4>No Sales</h4>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {result.map((result, index) => (
              <Table.Row key={index}>
                <Table.HeaderCell>{result.customerName}</Table.HeaderCell>
                <Table.HeaderCell>{result.productName}</Table.HeaderCell>
                <Table.HeaderCell>{result.storeName}</Table.HeaderCell>
                <Table.HeaderCell>
                  {moment(result.dateSold).format("DD/MM/YYYY")}
                  {/* {result.dateSold} */}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Button
                    color="orange"
                    size="mini"
                    onClick={() =>
                      handleEdit(
                        "Update",
                        result.salesId,
                        result.customerId,
                        result.productId,
                        result.storeId,
                        result.dateSold
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
                    onClick={() => handleDelete("Delete", result.salesId)}
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
        <Modal.Header>{action} Sales</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Date Sold</label>
                <input
                  type="date"
                  placeholder="Date of Sale"
                  //   onChange={handleOnChange}
                  onChange={(e) => setDateSold(e.target.value)}
                  value={dateSold}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Dropdown
                  placeholder="Select Customer"
                  fluid
                  search
                  selection
                  options={customerOptions}
                  //   onChange={handleOnChange}
                  onChange={(e, data) => setCustomerId(data.value)}
                  value={customerId}
                />
              </Form.Field>
              <Form.Field>
                <label>Product</label>
                <Dropdown
                  placeholder="Select Product"
                  fluid
                  search
                  selection
                  onChange={(e, data) => setProductId(data.value)}
                  value={productId}
                  options={productOptions}
                />
              </Form.Field>
              <Form.Field>
                <label>Store</label>
                <Dropdown
                  placeholder="Select Store"
                  fluid
                  search
                  selection
                  onChange={(e, data) => setStoreId(data.value)}
                  value={storeId}
                  options={storeOptions}
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
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onOpen={() => setDeleteModal(true)}
      >
        <Header content="Delete Store" />
        <Modal.Content>
          <p>Are you sure want to Delete this Sale?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setDeleteModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="red" onClick={() => DeleteSale(salesId)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
