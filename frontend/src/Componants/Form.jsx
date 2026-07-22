import React from 'react'
import { useState } from 'react'
import axios from 'axios'


function Form() {
  const [file, setFile] = useState()
  const api = "http://localhost:4000/updateProduct/6a5a3beaa5329aa9b2e669f9"

  const hendleImage = async (e) => {
    try {
      
      let formData = new FormData()
      formData.append('file', file)
      formData.append("product_name", "productName");
      formData.append("price", 120);
      formData.append("description", "description");


      const sendData = await axios.put(api, formData)
      console.log(sendData)
      console.log(formData)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} /><br></br>
      <button onClick={() => { hendleImage() }}>Uplode File</button>
    </div>
  )
}

export default Form
