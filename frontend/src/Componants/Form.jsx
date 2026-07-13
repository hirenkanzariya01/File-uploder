import React from 'react'
import { useState } from 'react'
import axios from 'axios'


function Form() {
  const [file, setFile] = useState()
  const api = "http://localhost:4000/uplode/image"

  const hendleImage = async (e) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const sendData = await axios.post(api, formData)
      console.log(sendData)

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
