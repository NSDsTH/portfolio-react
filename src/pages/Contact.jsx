import React from 'react'

export default function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        {/* สร้าง Wrapper เพื่อจัดเรียง QR Code กับ Form ให้อยู่ด้วยกัน */}
        <div className="contact-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', marginTop: '20px' }}>

          {/* ส่วนที่ 1: Line QR Code */}
          <div className="line-qr-box" style={{ textAlign: 'center', minWidth: '250px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add us on Line</h3>
            
            {/* อย่าลืมเปลี่ยน path รูปภาพตรง src ให้เป็นไฟล์ของคุณ */}
            <img 
              src="/line.jpg" 
              alt="Line QR Code" 
              style={{ width: '200px', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }} 
            />
            
            {/* <p style={{ marginTop: '10px', color: '#666' }}>
              Scan or click to add<br/>
              ID: @yourlineid
            </p> */}
          </div>

          {/* ส่วนที่ 2: Contact Form เดิม */}
          <form className="form" onSubmit={(e)=>e.preventDefault()} style={{ flex: 1, minWidth: '300px' }}>
            <div className="form__row">
              <label>Name</label>
              <input placeholder="Your name" required />
            </div>
            <div className="form__row">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" required />
            </div>
            <div className="form__row">
              <label>Message</label>
              <textarea rows={6} placeholder="Tell me about your project..." required />
            </div>
            <button className="btn btn--brand" type="submit">Send Message</button>
          </form>

        </div>
      </div>
    </section>
  )
}