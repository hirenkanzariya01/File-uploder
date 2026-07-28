import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

function Form() {
  const [file, setFile] = useState()
  const [file_err, setFile_err] = useState(false)

  const [product_name, setProduct_name] = useState('')
  const [product_name_err, setProduct_name_err] = useState(false)

  const [product_price, setProduct_price] = useState('')
  const [product_price_err, setProduct_price_err] = useState(false)

  const [product_description, setProduct_description] = useState('')
  const [product_description_err, setProduct_description_err] = useState(false)


  const fileRef = useRef()


  const api = "http://localhost:4000/updateProduct/6a5a3beaa5329aa9b2e669f9"

  const sendData = async (e) => {

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


    // try {

    //   let formData = new FormData()
    //   formData.append('file', file)
    //   formData.append("product_name", "productName");
    //   formData.append("price", 120);
    //   formData.append("description", "description");


    //   const sendData = await axios.put(api, formData)
    //   console.log(sendData)
    //   console.log(formData)

    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <div className="container">
      <div className="upload-card">
        <h2>Add Product</h2>

        <input
          type="file"
          className="file-input"
          onChange={(e) => { setFile(e.target.files[0]); setFile_err(false); }}
          ref={fileRef}
        />
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
          onChange={(e) => {
            setProduct_description(e.target.value); setProduct_description_err(false); if (!e.target.value) {
              setProduct_description_err(true)
            }
          }}

        ></textarea>
        {
          product_description_err ? <p>Product Description is Require</p> : <p></p>
        }

        <button className="upload-btn" onClick={() => { sendData() }}>Upload Product</button>
      </div>
    </div>
  )
}

export default Form
