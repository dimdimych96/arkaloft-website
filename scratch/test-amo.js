const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testAmo() {
  const AMO_BASE_URL = process.env.AMO_BASE_URL;
  const AMO_TOKEN = process.env.AMO_LONG_LIVED_TOKEN;

  console.log('Testing AmoCRM connection...');
  console.log('URL:', AMO_BASE_URL);
  
  if (!AMO_BASE_URL || !AMO_TOKEN) {
    console.error('Missing credentials in .env');
    return;
  }

  const payload = [
    {
      name: 'Тестовая сделка (Antigravity)',
      _embedded: {
        contacts: [
          {
            first_name: 'Тест',
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: '+79991112233', enum_code: 'MOB' }]
              }
            ]
          }
        ]
      }
    }
  ];

  try {
    const response = await fetch(`${AMO_BASE_URL}/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AMO_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testAmo();
