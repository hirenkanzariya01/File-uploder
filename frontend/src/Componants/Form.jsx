import React from 'react'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import swal from 'sweetalert'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Form() {
  const [file, setFile] = useState()
  const [file_err, setFile_err] = useState(false)

  const [product_name, setProduct_name] = useState('')
  const [product_name_err, setProduct_name_err] = useState(false)

  const [product_price, setProduct_price] = useState('')
  const [product_price_err, setProduct_price_err] = useState(false)

  const [product_description, setProduct_description] = useState('')
  const [product_description_err, setProduct_description_err] = useState(false)
  const [productData, setProductData] = useState([])
  const [btnDisable, setBtnDisable] = useState(false)

  const [isupdate, setIsUpdate] = useState(false)
  const [update_p_image, set_update_p_image] = useState('')
  const fileRef = useRef()
  const [update_p_id, set_update_p_id] = useState()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const base_url = "http://localhost:4000"

  const sendData = async (e) => {
    console.log('btn click ')
    setBtnDisable(true)
    if (!file) {
      setFile_err(true)
    }
    else {
      setFile_err(false)
    }

    if (!product_name) {
      setProduct_name_err(true)
    }
    else {
      setProduct_name_err(false)
    }

    if (!product_description) {
      setProduct_description_err(true)
    }
    else {
      setProduct_description_err(false)
    }

    if (!product_price) {
      setProduct_price_err(true)
    }
    else {
      setProduct_price_err(false)
    }

    if (!file_err && !product_name_err && !product_description_err && !product_price_err) {
      try {
        let formData = new FormData()
        formData.append('file', file)
        formData.append("product_name", product_name);
        formData.append("price", product_price);
        formData.append("description", product_description);

        console.log("form data", formData)
        const uplodeProduct = await axios.post(base_url + '/upload', formData)
        console.log('api is call', uplodeProduct)
        getProduct()
        console.log('get data function is call')
        console.log('btn is disable', btnDisable)
        if (fileRef.current) {
          fileRef.current.value = "";
          setFile('')
          setFile_err(false)
        }
        setProduct_name('')
        setProduct_description('')
        setProduct_price('')

      } catch (error) {
        console.log(error)
      }
    }
  }

  const getProduct = async () => {
    try {
      const productData = await axios.get(base_url + '/getproduct')
      console.log('All Product Data ', productData.data.data)
      setProductData(productData.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])


  const delete_product = async (e) => {
    const p_id = e._id
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this Product?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      swal("Deleted!", "Your imaginary file has been deleted!", "success");
      const delete_pro = await axios.delete(base_url + '/deleteProduct/' + p_id)
      if (delete_pro) getProduct()
    }

  }

  const update_product = async () => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append("product_name", product_name);
    formData.append("price", product_price);
    formData.append("description", product_description);

    console.log("form data from put api", formData)
    console.log("product id", update_p_id)

    const uplodeProduct = await axios.put(base_url + '/updateProduct/'+update_p_id, formData)
    console.log('api is call', uplodeProduct)
    getProduct()
  }

  return (
    <div className="container">
      <div className="upload-card">
        <h2>Add Product</h2>

        {
          isupdate ? <><img style={{ width: '100px' }} src={update_p_image} alt="" onClick={fileRef.current.click()} /></> :
            <input
              type="file"
              className="file-input"
              onChange={(e) => { setFile(e.target.files[0]); setFile_err(false); }}
              ref={fileRef}
            />
        }


        {file ?
          <RxCross2 onClick={() => {
            if (fileRef.current) {
              fileRef.current.value = ""; // Safely resets the input selection
              setFile('')
              setFile_err(true)
            }
          }} />
          : <></>
        }
        {
          file_err ? <p>File is Require</p> : <p></p>
        }

        <input
          type="text"
          placeholder="Product Name"
          className="input-field"
          value={product_name}
          onChange={(e) => {
            setProduct_name(e.target.value); setProduct_name_err(false);
            if (!e.target.value) {
              setProduct_name_err(true)
            }
          }}
        />
        {
          product_name_err ? <p>Product Name is Require</p> : <p></p>
        }

        <input
          type="number"
          placeholder="Product Price"
          className="input-field"
          value={product_price}
          onChange={(e) => {
            setProduct_price(e.target.value); setProduct_price_err(false);
            setProduct_price_err(false);
            if (!e.target.value) {
              setProduct_price_err(true)
            }
          }}
        />
        {
          product_price_err ? <p>Product Price is Require</p> : <p></p>
        }

        <textarea
          placeholder="Enter Product Description"
          className="textarea-field"
          value={product_description}
          onChange={(e) => {
            setProduct_description(e.target.value); setProduct_description_err(false); if (!e.target.value) {
              setProduct_description_err(true)
            }
          }}

        ></textarea>
        {
          product_description_err ? <p>Product Description is Require</p> : <p></p>
        }

        {
          btnDisable ?
            <button className="upload-btn" disabled >Upload Product</button>
            :
            <button className="upload-btn" onClick={() => { sendData() }}>Upload Product</button>
        }
      </div>

      <div className="ProductList">
        {productData.map((e) => (
          <div className="product-card" key={e._id}>
            <img src={e.product_image_path} alt={e.product_name} />

            <div className="product-info">
              <h2>{e.product_name}</h2>
              <h4>₹{e.price}</h4>
              <p>{e.description}</p>
              <button className='delete-btn' onClick={() => { delete_product(e) }}>Delete </button>
              <button className='update-btn' onClick={() => { set_update_p_id(e._id); handleShow() }}>Update </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation={false}
      >
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold">
            Update Product
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4">
          {/* Product Image */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Product Image
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => { setFile(e.target.files[0]) }}
              ref={fileRef}
            />

            <div className="form-text">
              Select a new image for this product.
            </div>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Product Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter New Product Name"
              value={product_name}
              onChange={(e) => {
                setProduct_name(e.target.value);

              }}
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Product Price
            </label>

            <div className="input-group">
              <span className="input-group-text">₹</span>

              <input
                type="number"
                className="form-control"
                placeholder="Enter New Product Price"
                onChange={(e) => {
                  setProduct_price(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Product Description
            </label>

            <textarea
              className="form-control"
              rows="5"
              placeholder="Enter Product Description"
              onChange={(e) => {
                setProduct_description(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4">
          <Button
            variant="secondary"
            className="px-4"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            className="px-4"
            onClick={() => { update_product() }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Form
