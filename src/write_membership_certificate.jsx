import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const PdfFormMembership = () => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [formData, setFormData] = useState({
    company_name_en: 'Your Company Name MM',
    company_name_mm: 'Your Company Name EN',
    address_mm: 'Your Address MM',
    address_en: 'Your Address EN',
    registration_no: 'Your Registration No',
    registration_date: 'Your Registration Date',
    phone_number: 'Your Phone',
    email_address: 'Your Email',
    person_name: 'Your Person Name',
    nrc_no: 'Your NRC No',
    ranking: 'Your Rank',
    id_no: 'Your ID No',
    validity_to_from: 'Your Validity'
  });


  const fillForm = async () => {
    try {
      const formUrl = './certificate_of_membership_template-4-2.pdf';
      const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

      const qrURL = './facebookQR.png'
      const qrImageBytes = await fetch(qrURL).then(res => res.arrayBuffer())

      const burmeseFontUrl = './NotoSansMyanmar-Regular.ttf';
      const burmeseFontBytes = await fetch(burmeseFontUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(formPdfBytes);

      pdfDoc.registerFontkit(fontkit);

      const burmeseFont = await pdfDoc.embedFont(burmeseFontBytes);

      const form = pdfDoc.getForm();
      
      const qrImage = await pdfDoc.embedPng(qrImageBytes)

      // Your form fields
      const companyNameMM = form.getTextField('Company Name MM');
      const companyNameEN = form.getTextField('Company Name EN');
      const addressMM = form.getTextField('Address MM');
      const addressEN = form.getTextField('Address EN');
      const registrationNo = form.getTextField('Registration No');
      const registrationDate = form.getTextField('Registration Date');
      const phone = form.getTextField('Phone');
      const email = form.getTextField('Email');
      const personName = form.getTextField('Person Name');
      const nrcNo = form.getTextField('NRC No');
      const rank = form.getTextField('Rank');
      const idNo = form.getTextField('ID Number');
      const validity = form.getTextField('Validity');
      const qrImageField = form.getTextField('QR Field');    

      // Fill the form fields
      companyNameMM.setText(formData.company_name_mm);
      companyNameEN.setText(formData.company_name_en);
      addressMM.setText(formData.address_mm);
      addressEN.setText(formData.address_en);
      registrationNo.setText(formData.registration_no);
      registrationDate.setText(formData.registration_date);
      phone.setText(formData.phone_number);
      email.setText(formData.email_address);
      personName.setText(formData.person_name);
      nrcNo.setText(formData.nrc_no);
      rank.setText(formData.ranking);
      idNo.setText(formData.id_no);
      validity.setText(formData.validity_to_from);
      qrImageField.setImage(qrImage)

      companyNameMM.updateAppearances(burmeseFont);

      companyNameMM.enableReadOnly();
      companyNameEN.enableReadOnly();

      form.flatten();

      const generatedPdfBytes = await pdfDoc.save();

      setPdfBytes(generatedPdfBytes);
    } catch (error) {
      console.error('Error filling form:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDownloadPdf = async () => {
    if (pdfBytes) {
      try {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filled_form.pdf';
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
  };
  

  return (
    <div>
        <div>
            <label>Company Name MM:</label>
            <input type="text" name="company_name_mm" value={formData.company_name_mm} onChange={handleInputChange} />
        </div>
        <div>
            <label>Company Name EN:</label>
            <input type="text" name="company_name_en" value={formData.company_name_en} onChange={handleInputChange} />
        </div>
        <div>
            <label>Address MM:</label>
            <input type="text" name="address_mm" value={formData.address_mm} onChange={handleInputChange} />
        </div>
        <div>
            <label>Address EN:</label>
            <input type="text" name="address_en" value={formData.address_en} onChange={handleInputChange} />
        </div>
        <div>
            <label>Registration No:</label>
            <input type="text" name="registration_no" value={formData.registration_no} onChange={handleInputChange} />
        </div>
        <div>
            <label>Registration Date:</label>
            <input type="text" name="registration_date" value={formData.registration_date} onChange={handleInputChange} />
        </div>
        <div>
            <label>Phone Number:</label>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
        </div>
        <div>
            <label>Email Address:</label>
            <textarea name="email_address" value={formData.email_address} onChange={handleInputChange} />
        </div>
        <div>
            <label>Person Name:</label>
            <textarea name="person_name" value={formData.person_name} onChange={handleInputChange} />
        </div>
        <div>
            <label>NRC No:</label>
            <textarea name="nrc_no" value={formData.nrc_no} onChange={handleInputChange} />
        </div>
        <div>
            <label>Rank:</label>
            <textarea name="ranking" value={formData.ranking} onChange={handleInputChange} />
        </div>
        <div>
            <label>ID No:</label>
            <textarea name="id_no" value={formData.id_no} onChange={handleInputChange} />
        </div>
        <div>
            <label>Validity From To:</label>
            <textarea name="validity_to_from" value={formData.validity_to_from} onChange={handleInputChange} />
        </div>
      <div>
        <button onClick={fillForm}>Fill PDF</button>
        <button onClick={handleDownloadPdf}>Download PDF</button>
    </div>
    </div>
  );
};

export default PdfFormMembership;
