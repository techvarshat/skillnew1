import axios from 'axios';

// Udemy API credentials (replace with your actual values)
const CLIENT_ID = 'BLB9r09wVUUc0LSFXAK4ssc5f6DkoQbOQ8pkRhIC';
const CLIENT_SECRET = 'E7c2mpcK5BQ9NkUphdcqzal2BCVuZnTB3sPPjezbjleLW60aVyBRRF0hZlGKL5C6ehSfCuz0WblrIjHoQ6Jq3TNcAUjh6HE47bEYUMkMvm3RNs8dclRq72DoHMzibO8T';

// Function to get access token
async function getAccessToken() {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    const response = await axios.post('https://www.udemy.com/api-2.0/oauth2/token/', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    console.log('Access token obtained successfully!');
    return response.data.access_token;
  } catch (error) {
    console.error('Failed to obtain access token:', error.response ? error.response.data : error.message);
    console.error('Full error:', error);
    throw error;
  }
}

// Function to test API call
async function testApiCall(accessToken) {
  try {
    const response = await axios.get('https://www.udemy.com/api-2.0/courses/', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      },
      params: {
        page_size: 1  // Limit to 1 course for testing
      }
    });

    console.log('API call successful!');
    console.log('Sample course data:', JSON.stringify(response.data.results[0], null, 2));
  } catch (error) {
    console.error('API call failed:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Main test function
async function testUdemyApi() {
  try {
    console.log('Testing Udemy API...');
    const accessToken = await getAccessToken();
    await testApiCall(accessToken);
    console.log('Udemy API is working correctly!');
  } catch (error) {
    console.error('Udemy API test failed.');
  }
}

// Run the test
testUdemyApi();
