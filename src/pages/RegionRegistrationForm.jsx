import React, { useState } from 'react';
import '../styles/registration/RegionRegistrationForm.css';

const RegionRegistrationForm = () => {
  const [regionName, setRegionName] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const Regions = ['Yangon', 'Mandalay', 'Ayarwaddy', 'Nay Pyi Taw'];

  const handleInputChange = (event) => {
    setRegionName(event.target.value);
  };

  const handleCheckboxChange = (region) => {
    setSelectedRegions((prevSelectedRegions) => {
      if (prevSelectedRegions.includes(region)) {
        return prevSelectedRegions.filter((r) => r !== region);
      } else {
        return [...prevSelectedRegions, region];
      }
    });
  };

  const handleSubmit = () => {
    console.log('Submitted:', { regionName, selectedRegions });
  };

  const handleCancel = () => {
    setRegionName('');
    setSelectedRegions([]);
  };

  return (
    <div className="form-container">
      <div className="input-field">
        <label htmlFor="regionName">Region Name</label>
        <input
          type="text"
          id="regionName"
          value={regionName}
          onChange={handleInputChange}
        />
      </div>
      <table className="region-table">
        <thead>
          <tr>
            <th>Region</th>
            <th>Region Access</th>
          </tr>
        </thead>
        <tbody>
          {Regions.map((region) => (
            <tr key={region}>
              <td>{region}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => handleCheckboxChange(region)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button type="button" className='cancel' onClick={handleCancel}>Cancel</button>
        <button type="button" className='submit' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default RegionRegistrationForm;
