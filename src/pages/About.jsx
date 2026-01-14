import React from 'react'

export default function About() {
  const resumeFilePath = "/resume.pdf"; // อย่าลืมเช็คว่าไฟล์ชื่อ resume.pdf อยู่ใน folder public

  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="lead">
          Short bio: Developer & Engineer with a passion for IoT and AI. 
          Expertise in React, Python, and Industrial Automation.
        </p>
        
        {/* ส่วนปุ่มกด (ยังเก็บไว้เพื่อให้คนโหลดไฟล์ได้ง่าย) */}
        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 32, display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <a 
            className="btn btn--ghost" 
            href={resumeFilePath} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Open in New Tab
          </a>
          <a 
            className="btn btn--filled" 
            href={resumeFilePath} 
            download="Burathat_Resume.pdf"
            style={{ 
               backgroundColor: '#333', 
               color: '#fff', 
               textDecoration: 'none',
               padding: '0.5rem 1rem',
               border: '1px solid #333',
               borderRadius: '4px' // เพิ่มความมนให้ปุ่มเล็กน้อย
            }}
          >
            Download
          </a>
        </div>

        {/* --- ส่วนที่เพิ่ม: แสดงไฟล์ PDF --- */}
        <div style={{ 
            maxWidth: '850px', // กำหนดความกว้างไม่ให้เต็มจอเกินไป สวยงามกว่า
            margin: '0 auto',  // จัดกึ่งกลาง
            border: '1px solid #e0e0e0', // ใส่กรอบบางๆ ให้ดูเรียบร้อย
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)' // ใส่เงาเล็กน้อยให้ดูลอยขึ้นมา
        }}>
          <iframe 
            src={`${resumeFilePath}#view=FitH`} // #view=FitH คือคำสั่งให้ PDF ขยายเต็มความกว้าง
            title="Resume Preview"
            width="100%"
            height="800px" // กำหนดความสูงตามต้องการ
            style={{ border: 'none', display: 'block' }} 
          />
        </div>
        {/* ---------------------------------- */}

      </div>
    </section>
  )
}