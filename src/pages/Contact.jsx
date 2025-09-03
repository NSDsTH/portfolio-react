import React from 'react'

export default function Contact(){
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <form className="form" onSubmit={(e)=>e.preventDefault()}>
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
    </section>
  )
}
