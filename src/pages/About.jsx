import React from 'react'

export default function About(){
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="lead">
          Short bio: 3–4 บรรทัด เล่า role/stack/impact. โทนเหมือนใน Figma — กลางหน้า กว้าง ~760px.
          ใส่เนื้อหาจริงของแกได้เลย
        </p>
        <div style={{textAlign:'center',marginTop:16}}>
          <a className="btn btn--ghost" href="#contact">Download CV</a>
        </div>
      </div>
    </section>
  )
}
