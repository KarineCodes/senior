import "./contact.css";

export function About() {
    return <div>
<div className="contact-container">
    <div className="contact-item">
      <img src="https://static-00.iconduck.com/assets.00/phone-icon-2048x2048-nottqc8j.png" alt="Phone Icon"/>
      <p>Phone: 123-456-7890</p>
    </div>
    <div className="contact-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYt4yKPBnydTsPmE-BEX3Ln0WV_q55mGz9A&usqp=CAU" alt="Location Icon"/>
      <p>123 Street, City, Country</p>
    </div>
    <div className="contact-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2sebiGbN096zHuLZWh78TqI5sXskaYs4Ow&usqp=CAU" alt="Email Icon"/>
      <p>Email: example@example.com</p>
    </div>
  </div>
    </div>;
  }
  
  
  export default About