import React from 'react'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";
import swal from 'sweetalert'

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

  const update_product = (data) => {
    setIsUpdate(true)
    console.log('Update product data', data)
    setProduct_name(data.product_name)
    setProduct_description(data.description)
    setProduct_price(data.price)

    set_update_p_image(data.product_image_path)
    // fileRef.current.value = data.product_image_path
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
              <button className='update-btn' onClick={() => { update_product(e) }}>Update </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Form
