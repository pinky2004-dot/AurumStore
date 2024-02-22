import { Fragment, useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminPage() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //New
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [measurement, setMeasurement] = useState('');

  //Edit
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editQuantity, setEditQuantity] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editMeasurement, setEditMeasurement] = useState('');

  // const empdata = [
  //   {
  //     id: 1,
  //     ProductName: 'Dove Soap',
  //     Quantity: 700,
  //     ProductPrice: 3.54,
  //     measurement: 'count'
  //   },
  //   {
  //     id: 2,
  //     ProductName: 'Kettle Chips',
  //     Quantity: 399,
  //     ProductPrice: 5.54,
  //     measurement: 'count'
  //   },
  //   {
  //     id: 3,
  //     ProductName: 'Coca Cola',
  //     Quantity: 1000,
  //     ProductPrice: 10.54,
  //     measurement: 'count'
  //   },
  // ]
  const [prod, setProd] = useState([]);

  useEffect(() => {
    fetch('/api/Products/GetProducts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProd(data);
      });

  }, []);

  // const getProd = () => {
  //   debugger;
  //   fetch('http://localhost:5023/api/Products/GetProducts')
  //     .then((result) => {
  //       setProd(result);
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // const [editProdId, setEditProdId] = useState('');

  const handleEdit = (id) => {
    //alert(id);
    handleShow();
    // const productEdit = prod.find(prod => prod.id === id);

    // setEditProdId(productEdit);

  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?") === true) {
      alert(id);
    }
  }

  const handleUpdate = () => {

  }

  // const saveProductToDatabase = () => {
  //   const url = 'http://localhost:5023/api/Products/AddProducts';
  //   const prod = {
  //     "productName": name,
  //     "quantity": quantity,
  //     "productPrice": price,
  //     "measurement": measurement
  //   }

  //   axios.post(url, prod)
  //     .then((response) => {
  //       console.log('Product added successfully:', response.data);
  //       clear(); // Assuming you have a function to clear the form
  //       toast.success('Product has been added to the database');
  //     })
  //     .catch((error) => {
  //       console.error('Error adding product:', error);
  //       toast.error('Error adding product. Please try again.');
  //     });

  // }

  // const handleSave = () => {
  //   saveProductToDatabase();
  // };

  const handleSave = () => {
    const url = '/api/Products/AddProducts';
    const prod = {
      "productName": name,
      "quantity": quantity,
      "productPrice": price,
      "measurement": measurement
    }

    axios.post(url, prod)
      .then((result) => {
        //getProd();
        clear();
        toast.success('Product has been added');
      })
  }

  const clear = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setMeasurement('');
    setEditName('');
    setEditQuantity('');
    setEditPrice('');
    setEditMeasurement('');
    setEditId('');
  }

  return (
    <MainLayout>
      <div>
        Admin Page
      </div>
      <br></br>
      <div>
        <Fragment>
          <ToastContainer />
          <Container>
            <Row>
              <Col>
                <input type='text' className='form-control' placeholder='Enter Product Name' value={name}
                  onChange={(e) => setEditName(e.target.value)} />
              </Col>
              <Col>
                <input type='text' className='form-control' placeholder='Enter Quantity' value={quantity}
                  onChange={(e) => setEditQuantity(e.target.value)} />
              </Col>
              <Col>
                <input type='text' className='form-control' placeholder='Enter Product Price' value={price}
                  onChange={(e) => setEditPrice(e.target.value)} />
              </Col>
              <Col>
                <input type='text' className='form-control' placeholder='Enter Measurement' value={measurement}
                  onChange={(e) => setEditMeasurement(e.target.value)} />
              </Col>
              <Col>
                <button className='btn btn-primary' onClick={() => handleSave()}>Submit</button>
              </Col>
            </Row>
          </Container>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Price</th>
                <th>Measurement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                prod && prod.length > 0 ?
                  prod.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.productPrice}</td>
                        <td>{item.measurement}</td>
                        <td colSpan={2}>
                          <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                          <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  }) : 'Loading...'
              }
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modify / Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <input type='text' className='form-control' placeholder='Enter Name' value={editName}
                    onChange={(e) => setName(e.target.value)} />
                </Col>
                <Col>
                  <input type='text' className='form-control' placeholder='Enter Quantity' value={editQuantity}
                    onChange={(e) => setQuantity(e.target.value)} />
                </Col>
                <Col>
                  <input type='text' className='form-control' placeholder='Enter Price' value={editPrice}
                    onChange={(e) => setPrice(e.target.value)} />
                </Col>
                <Col>
                  <input type='text' className='form-control' placeholder='Enter Measurement' value={editMeasurement}
                    onChange={(e) => setMeasurement(e.target.value)} />
                </Col>
                <Col>
                  <button className='btn btn-primary'>Submit</button>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      </div>
    </MainLayout>
  )
}

export default AdminPage;