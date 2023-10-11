import React, { useState } from 'react';

function BootstrapForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Form submitted!');
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="border p-4 mt-3">
            <h2 className="text-center">Contact Form</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={{ maxWidth: '100%' }}
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default BootstrapForm;
