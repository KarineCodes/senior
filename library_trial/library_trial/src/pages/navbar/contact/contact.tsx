import { useState } from "react"
import"./contact.css"

export function Contact() {
    const[data, setData] = useState({name:"", email:"", phone:"", message:""});
    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({...data, [name]: value})
    }
    // const handleSubmit = (event:any) => {
    //     event.preventDefault()
    //     alert(data)
    // }
    return (
        <div>
            {/* <form method="post" onSubmit="sendEmail()"></form> */}
            <img src="src/pages/navbar/contact/contactImage.jpg" alt="Side Image" className="side-image" />
        <form action="https://formsubmit.co/sayeghnatalie34@gmail.com" method="POST">
            <h1>CONTACT <span>HERE!</span></h1>
            <input type="text" name="name" id="" onChange={handleChange} value={data.name} placeholder="enter name" required/>
            <input type="email" name="email" id="" onChange={handleChange} value={data.email} placeholder="enter email" required/>
            {/* <input type="phone" name="phone" id="" onChange={handleChange} value={data.phone} placeholder="enter phone number" required/> */}
            <textarea name="message" id="" cols={30} rows={10} onChange={handleChange} value={data.message} placeholder="type here..." required/>
            <input type="hidden" name="_captcha" value="false"></input>
            <button type="submit">send</button>
        </form>
        
        </div>
    )
  }
  
  
  export default Contact