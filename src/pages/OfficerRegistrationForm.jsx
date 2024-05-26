// OfficerRegistrationForm.jsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import '../styles/registration/OfficerRegistrationForm.css';

const OfficerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        usernamePhone: '',
        password: '',
        retypePassword: '',
        region: '',
        rank: '',
        office: '',
        idNumber: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (value.trim() !== '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
        setHasSignature(true);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const validateForm = () => {
        const errors = {};
        for (const [key, value] of Object.entries(formData)) {
            if (value.trim() === '' && key !== 'retypePassword') {
                errors[key] = 'Field Required';
            }
        }
        if (formData.password !== formData.retypePassword) {
            errors.retypePassword = 'Passwords do not match';
        }
        if (!hasSignature) {
            errors.signature = 'Signature Required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const { retypePassword, ...finalFormData } = formData; // Exclude retypePassword from final form data
        console.log(finalFormData);

        const canvas = canvasRef.current;
        const signatureImage = await html2canvas(canvas).then(canvas => canvas.toDataURL('image/png'));

        const link = document.createElement('a');
        link.href = signatureImage;
        link.download = 'signature.png';
        link.click();
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            usernamePhone: '',
            password: '',
            retypePassword: '',
            region: '',
            rank: '',
            office: '',
            idNumber: ''
        });
        setFormErrors({});
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    return (
        <form className="officer-registration-form" onSubmit={handleSubmit}>
            <h2>Officer Registration Form</h2>
            {['name', 'usernamePhone', 'password', 'retypePassword', 'region', 'rank', 'office', 'idNumber'].map((field) => (
                <div className="form-group" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
                    <input
                        type={field.includes('password') ? 'password' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={formErrors[field] ? 'error' : ''}
                    />
                    {formErrors[field] && <span className="error-text">{formErrors[field]}</span>}
                </div>
            ))}
            <div className="form-group">
                <label>Signature:</label>
                <canvas
                    ref={canvasRef}
                    className={`signature-canvas ${formErrors.signature ? 'error' : ''}`}
                    width="400"
                    height="200"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
                {formErrors.signature && <span className="error-text">{formErrors.signature}</span>}
            </div>
            <div className="form-buttons">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default OfficerRegistrationForm;
