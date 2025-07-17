import React, { useState, useEffect } from 'react';
import './Contact.css';
import { apiCall, API_CONFIG } from '../config/api';

interface ContactData {
  phone: string;
  email: string;
  address: string;
}

interface ReachoutData {
  name: string;
  email: string;
  phoneNo: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReachoutData>({
    name: '',
    email: '',
    phoneNo: '',
    subject: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await apiCall<ContactData>(API_CONFIG.ENDPOINTS.CONTACT_DETAILS);
        setContactData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    setFormSuccess(false);

    try {
      const result = await apiCall<{message: string}>(API_CONFIG.ENDPOINTS.REACHOUT, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (result.message === 'SUCCESS') {
        setFormSuccess(true);
        setFormData({
          name: '',
          email: '',
          phoneNo: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="contact">
        <div className="container">
          <div className="spinner"></div>
          <p>Loading contact information...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="contact">
        <div className="container">
          <div className="error">
            <h2>Error loading contact information</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">📧 Contact Me</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>{contactData?.email}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>{contactData?.phone}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>{contactData?.address}</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send a Message</h3>
            {formSuccess && (
              <div className="success-message">
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {formError && (
              <div className="error-message">
                <p>Error: {formError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phoneNo"
                  placeholder="Your Phone Number" 
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={formSubmitting}
              >
                {formSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;