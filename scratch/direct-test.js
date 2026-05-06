const url = 'https://arkaloft18.amocrm.ru/api/v4/leads/complex';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZlZGE5OGFjZmVhY2IyNjA3M2Q1YmY0YmY4MmVkY2MyZGZkNGQ3Y2VkMjhjMDQ3NjBlMGYxMjI3YTQyOTY5MWM4Njc1ZmIwMzc1M2Q0YjI4In0.eyJhdWQiOiJhZjA0MTc4MS02NTFjLTRmNTctYTRlYS02Mjk3ZTRiMTg5MGUiLCJqdGkiOiI2ZWRhOThhY2ZlYWNiMjYwNzNkNWJmNGJmODJlZGNjMmRmZDRkN2NlZDI4YzA0NzYwZTBmMTIyN2E0Mjk2OTFjODY3NWZiMDM3NTNkNGIyOCIsImlhdCI6MTc3Nzk4MjE1MywibmJmIjoxNzc3OTgyMTUzLCJleHAiOjE5MDM4MjQwMDAsInN1YiI6IjU3MjM0NDAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjg3MzU1NDYsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwibm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiI0OTU2NDFjMC1lZjAyLTQyN2QtOTYxMS1iZjM3NmFlNjA4NTUiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.WEjMXgUtcYXQiyYrBH6ukn5e0tp7lx_ZjlrMRXLVHcsms_xRmyyfD0HBYHJAmIlSs4oBpD-TrRjjQ26JgUiPNJwpTv4Y0ywDHNr0aSZwK1HgrFwqv338r65Ox7_8vwVOqpmnN7pIGxrJVB4pKPGYEoQoK8bOEos5aKNf13rKMAtKZM2HhhjzqEmNngKG7d7a65TkleVA2cs9Y5WRYz-6ImKdyXkC5TFnJiCnuZX3vbbE3UuTxkP-vv0dihtQenepy6Tf3OXkIjSDndcNgkTWV8Rv4m-y4ZJUDEjY4ruuKxI0icnr5b14CemSVvTpo71xOm3qOet4WeHKZESrrKt57g';

async function run() {
  const payload = [{
    name: "Тестовая сделка (прямой тест)",
    _embedded: {
      contacts: [{
        first_name: "Тестер",
        custom_fields_values: [{
          field_code: "PHONE",
          values: [{ value: "+79998887766", enum_code: "MOB" }]
        }]
      }]
    }
  }];

  console.log('Sending to:', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

run();
