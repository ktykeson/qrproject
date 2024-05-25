import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

const PdfFormFiller = () => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const [formData, setFormData] = useState({
    name: 'Mario',
    age: '24 years',
    height: `5' 1"`,
    weight: '196 lbs',
    eyes: 'blue',
    skin: 'white',
    hair: 'brown',
    allies: `Allies:
  • Princess Daisy
  • Princess Peach
  • Rosalina
  • Geno
  • Luigi
  • Donkey Kong
  • Yoshi
  • Diddy Kong
  
Organizations:
  • Italian Plumbers Association`,
    factionName: `Mario's Emblem`,
    backstory: `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`,
    featTraits: `Mario can use three basic three power-ups:
  • the Super Mushroom, which causes Mario to grow larger
  • the Fire Flower, which allows Mario to throw fireballs
  • the Starman, which gives Mario temporary invincibility`,
    treasure: `• Gold coins
• Treasure chests`
  });

  const fillForm = async () => {
    try {
      const formUrl = 'https://pdf-lib.js.org/assets/dod_character.pdf';
      const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

      const marioUrl = 'https://pdf-lib.js.org/assets/small_mario.png'
      const marioImageBytes = await fetch(marioUrl).then(res => res.arrayBuffer())

      const emblemUrl = 'https://pdf-lib.js.org/assets/mario_emblem.png'
      const emblemImageBytes = await fetch(emblemUrl).then(res => res.arrayBuffer())
      

      const burmeseFontUrl = './NotoSansMyanmar-Regular.ttf';
      const burmeseFontBytes = await fetch(burmeseFontUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(formPdfBytes);

      pdfDoc.registerFontkit(fontkit);

      const burmeseFont = await pdfDoc.embedFont(burmeseFontBytes);

      const form = pdfDoc.getForm();

      const marioImage = await pdfDoc.embedPng(marioImageBytes)
      const emblemImage = await pdfDoc.embedPng(emblemImageBytes)

      // Your form fields
      const nameField = form.getTextField('CharacterName 2');
      const ageField = form.getTextField('Age');
      const heightField = form.getTextField('Height');
      const weightField = form.getTextField('Weight');
      const eyesField = form.getTextField('Eyes');
      const skinField = form.getTextField('Skin');
      const hairField = form.getTextField('Hair');
      const alliesField = form.getTextField('Allies');
      const factionField = form.getTextField('FactionName');
      const backstoryField = form.getTextField('Backstory');
      const traitsField = form.getTextField('Feat+Traits');
      const treasureField = form.getTextField('Treasure');
      const characterImageField = form.getButton('CHARACTER IMAGE');
      const factionImageField = form.getButton('Faction Symbol Image');      


      // Fill the form fields
      nameField.setText(formData.name);
      ageField.setText(formData.age);
      heightField.setText(formData.height);
      weightField.setText(formData.weight);
      eyesField.setText(formData.eyes);
      skinField.setText(formData.skin);
      hairField.setText(formData.hair);
      alliesField.setText(formData.allies);
      factionField.setText(formData.factionName);
      factionImageField.setImage(emblemImage);
      characterImageField.setImage(marioImage);
      backstoryField.setText(formData.backstory);
      traitsField.setText(formData.featTraits);
      treasureField.setText(formData.treasure);

      nameField.updateAppearances(burmeseFont);

      nameField.enableReadOnly();
      ageField.enableReadOnly();

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
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
      </div>
      <div>
        <label>Height:</label>
        <input type="text" name="height" value={formData.height} onChange={handleInputChange} />
      </div>
      <div>
        <label>Weight:</label>
        <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} />
      </div>
      <div>
        <label>Eyes:</label>
        <input type="text" name="eyes" value={formData.eyes} onChange={handleInputChange} />
      </div>
      <div>
        <label>Skin:</label>
        <input type="text" name="skin" value={formData.skin} onChange={handleInputChange} />
      </div>
      <div>
        <label>Hair:</label>
        <input type="text" name="hair" value={formData.hair} onChange={handleInputChange} />
      </div>
      <div>
        <label>Allies:</label>
        <textarea name="allies" value={formData.allies} onChange={handleInputChange} />
      </div>
      <div>
        <label>Faction Name:</label>
        <input type="text" name="factionName" value={formData.factionName} onChange={handleInputChange} />
      </div>
      <div>
        <label>Backstory:</label>
        <textarea name="backstory" value={formData.backstory} onChange={handleInputChange} />
      </div>
      <div>
        <label>Feat and Traits:</label>
        <textarea name="featTraits" value={formData.featTraits} onChange={handleInputChange} />
      </div>
      <div>
        <label>Treasure:</label>
        <textarea name="treasure" value={formData.treasure} onChange={handleInputChange} />
      </div>
      <div>
      {/* Render form inputs */}
      <button onClick={fillForm}>Fill PDF</button>
      <button onClick={handleDownloadPdf}>Download PDF</button>
    </div>
    </div>
  );
};

export default PdfFormFiller;
