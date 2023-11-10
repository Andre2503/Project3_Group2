// Fetch data from the API
fetch('http://127.0.0.1:5000/api/v1.0/fundamental')
  .then(response => response.json())
  .then(data => {
    console.log('Response from API:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
