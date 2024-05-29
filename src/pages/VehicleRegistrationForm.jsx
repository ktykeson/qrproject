import React, { useState } from 'react';
import '../styles/registration/VehicleRegistrationForm.css';

function VehicleRegistrationForm() {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    vehicleCategory: '',
    vehicleOwnerName: '',
    vehicleOwnerPhone: '',
    vehicleOwnerAddress: '',
    vehicleColor: '',
    membershipCard: '',
    membershipExpiry: '',
    registrationCertificate: null,
    ownerCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="vehicle-registration-form">
    <h2 className="title">ယာဉ်အမှတ်တင်</h2>
    <form onSubmit={handleSubmit}>
    <div className="vehicle-form-column">
    <div className="left-column">
        <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleNumber">ယာဉ်အမှတ်</label>
        <input
          type="text"
          id="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleType">ယာဉ်အမျိုးအစား</label>
        <input
          type="text"
          id="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleCategory">Color</label>
        <input
          type="text"
          id="vehicleCategory"
          value={formData.vehicleCategory}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleColor">အရောင်</label>
        <input
          type="text"
          id="vehicleColor"
          value={formData.vehicleColor}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <h2>ယာဉ်ပိုင်ရှင်</h2>
        <label htmlFor="vehicleOwnerName">ယာဉ်ပိုင်ရှင်</label>
        <input
          type="text"
          id="vehicleOwnerName"
          value={formData.vehicleOwnerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleOwnerPhone">အမည်</label>
        <input
          type="text"
          id="vehicleOwnerPhone"
          value={formData.vehicleOwnerPhone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="vehicleOwnerAddress">ဖုန်းနံပါတ်</label>
        <input
          type="text"
          id="vehicleOwnerAddress"
          value={formData.vehicleOwnerAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
        <label htmlFor="membershipCard">အသင်းဝင်ကတ်</label>
        <input
          type="text"
          id="membershipCard"
          value={formData.membershipCard}
          onChange={handleChange}
          required
        />
      </div>
      <div className="vehicle-registration-form-group">
          <label htmlFor="state">အသင်းဝင်မည့် ပြည်နယ်/တိုင်း:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">ရန်ကုန်</option>
            {/* Other options */}
          </select>
        </div>
    </div>
      

    <div className="right-column">
      <div className="form-group">
        <label htmlFor="membershipExpiry">ဂိတ်</label>
        <input
          type="text"
          id="membershipExpiry"
          value={formData.membershipExpiry}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="membershipExpiry">ဂိတ်</label>
        <input
          type="text"
          id="membershipExpiry"
          value={formData.membershipExpiry}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="membershipExpiry">ဂိတ်</label>
        <input
          type="text"
          id="membershipExpiry"
          value={formData.membershipExpiry}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="membershipExpiry">ဂိတ်</label>
        <input
          type="text"
          id="membershipExpiry"
          value={formData.membershipExpiry}
          onChange={handleChange}
          required
        />
      </div>
        


      <div className="form-group">
        <label htmlFor="registrationCertificate">ယာဉ်မှတ်ပုံတင်</label>
        <input
          type="file"
          id="registrationCertificate"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ownerCertificate">ယာဉ်ပိုင်ရှင် မှတ်ပုံတင်</label>
        <input
          type="file"
          id="ownerCertificate"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      </div>
      </div>


      <button type="submit">Submit and Pay</button>
    </form>
  </div>
  );
}

export default VehicleRegistrationForm;
