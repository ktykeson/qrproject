import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registration/MemberRegistrationForm.css';

const MemberRegistrationForm = () => {
  const [formData, setFormData] = useState({
    memberType: '',
    state: '',
    nameMM: '',
    nameEN: '',
    addressMM: '',
    addressEN: '',
    phone: '',
    email: '',
    regNo: '',
    regDate: '',
    repName: '',
    repID: '',
    repRole: '',
    image: null,
  });

  const [imageUploaded, setImageUploaded] = useState(false); // State to track whether an image is uploaded
  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));

    // Update the label text when a file is uploaded
    if (name === 'image' && files && files.length > 0) {
      setImageUploaded(true); // Set imageUploaded state to true when an image is uploaded
      const fileName = files[0].name;
      const uploadLabel = document.querySelector('.file-upload-button');
      if (uploadLabel) {
        uploadLabel.textContent = `Uploaded: ${fileName}`;
      }
      setFileName(fileName); // Store the file name in state
    }
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image: null }); // Clear the image from the form data
    setImageUploaded(false); // Reset imageUploaded state to false
    const uploadInput = document.getElementById('image');
    if (uploadInput) {
      uploadInput.value = null; // Reset the file input value
    }
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create a JavaScript object containing all form data
    const formDataToSend = {
      memberType: formData.memberType,
      state: formData.state,
      nameMM: formData.nameMM,
      nameEN: formData.nameEN,
      addressMM: formData.addressMM,
      addressEN: formData.addressEN,
      phone: formData.phone,
      email: formData.email,
      regNo: formData.regNo,
      regDate: formData.regDate,
      repName: formData.repName,
      repID: formData.repID,
      repRole: formData.repRole,
      // Do not include the 'image' field in the JSON as it's handled separately
    };
  
    try {
      
      const formDataJson = JSON.stringify(formDataToSend);
  
     
      const response = await axios.post(
        'https://your-api-endpoint.com/data',
        formDataJson,
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );
  
      console.log('Response:', response.data);
      
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  

  return (
    <div className="member-registration-form">
      <form onSubmit={handleSubmit}>
        <div className="member-form-column">
        <div className="member-registration-form-group">
          <label htmlFor="member-type">အသင်းဝင် အမျိုးအစား:</label>
          <div className="radio-group">
            <input
                type="radio"
                id="member-type-company"
                name="memberType"
                value="company"
                checked={formData.memberType === 'company'}
                className="radio-input"
                onChange={handleChange}
            />
            <label htmlFor="member-type-company">ကုမ္ပဏီ</label>
            <input
                type="radio"
                id="member-type-car-gate"
                name="memberType" 
                value="car-gate"
                checked={formData.memberType === 'car-gate'}
                className="radio-input"
                onChange={handleChange}
            />
            <label htmlFor="member-type-car-gate">ကားဂိတ်</label>
            <input
                type="radio"
                id="member-type-car-owner"
                name="memberType" 
                value="car-owner"
                checked={formData.memberType === 'car-owner'}
                className="radio-input"
                onChange={handleChange}
            />
            <label htmlFor="member-type-car-owner">ကားပိုင်ရှင်</label>
            </div>
        </div>
        <div className="member-registration-form-group">
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
        <div className="member-registration-form-group">
          <label htmlFor="name-mm">အမည် (မြန်မာ):</label>
          <input
            type="text"
            id="name-mm"
            name="nameMM"
            value={formData.nameMM}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="name-en">Name (English):</label>
          <input
            type="text"
            id="name-en"
            name="nameEN"
            value={formData.nameEN}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="address-mm">လိပ်စာ (မြန်မာ):</label>
          <textarea
            id="address-mm"
            name="addressMM"
            value={formData.addressMM}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="address-en">Address (English):</label>
          <textarea
            id="address-en"
            name="addressEN"
            value={formData.addressEN}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-subtitle-full">
            <h3>Company Registration</h3>
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="reg-no">Register No.:</label>
          <input
            type="text"
            id="reg-no"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="reg-date">Register date:</label>
          <input
            type="date"
            id="reg-date"
            name="regDate"
            value={formData.regDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-subtitle-full">
            <h3>အသင်းဝင်ကိုယ်စားလှယ်</h3>
        </div>

        <div className="member-group">
        <div className="member-registration-form-group">
          <label htmlFor="rep-name">အမည်:</label>
          <input
            type="text"
            id="rep-name"
            name="repName"
            value={formData.repName}
            onChange={handleChange}
          />
        </div>
        
        <div className="member-registration-form-group">
          <label htmlFor="rep-id">မှတ်ပုံတင်အမှတ်:</label>
          <input
            type="text"
            id="rep-id"
            name="repID"
            value={formData.repID}
            onChange={handleChange}
          />
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="rep-role">ရာထူး:</label>
          <input
            type="text"
            id="rep-role"
            name="repRole"
            value={formData.repRole}
            onChange={handleChange}
          />
        </div>
        </div>
        <div className="member-registration-form-group">
          <label htmlFor="image">ကိုယ်စားလှယ်၏ ဓာတ်ပုံ:</label>
          {imageUploaded ? (
            <div>
            <button type="button" onClick={handleDeleteImage}>
            Delete Image
            </button>
            {fileName && <p>{fileName}</p>} {/* Render the file name if available */}
            </div>
            ) : (
            <label className="file-upload-button">
            Upload
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
            />
            </label>
        )}
        </div>

        </div>
        <div className="center-submit-btn">
            <button type="submit">Submit and Pay</button>
        </div>
      </form>
    </div>
  );
};

export default MemberRegistrationForm;
