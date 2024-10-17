import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const storeTokenSecurely = async (token) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
  } catch (error) {
    console.error('Error storing token securely:', error.message);
  }
};

const getTokenSecurely = async () => {
  try {
    return await SecureStore.getItemAsync('authToken');
  } catch (error) {
    console.error('Error getting token securely:', error.message);
  }
}

export const signup = async (email, password, givenName, familyName) => {
  const signupData = {
    email,
    password,
    givenName,
    familyName
  };

  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', signupData);
    const token = response.data.authorization;

    if (token) {
      await storeTokenSecurely(token);
      console.log('Token stored successfully');
    } else {
      console.error('Token not received');
    }

  } catch (error) {
    console.error('Error during signup:', error.response ? error.response.data : error.message);
  }
};

export const fetchJobs = async (page = 1, where = "") => {
  try {
    storeTokenSecurely('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBlZDE3NmJkNGViZWM3ZWYyMjY2YzkiLCJpYXQiOjE3MjkwMjQzNzUsImV4cCI6MTcyOTI4MzU3NX0.gGNWlf12bGqcDJdxIF5izIG5SzBM8LDXcuQulcxTSJ4');
    const token = await getTokenSecurely();
    const response = await axios.get('http://localhost:4000/api/jobFinder/jobs', {
      headers: {
        authorization: token,
      },
      params: {
        ...(where && { where }),
        page: page
      }
    });

    const jobs = response.data;
    console.log('Jobs:', jobs);
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

export const fetchJobsByKeyword = async (page = 1, where = "", keywords) => {
  try {
    const token = await getTokenSecurely();
    const response = await axios.get('http://localhost:4000/api/jobFinder/jobs/keyword', {
      headers: {
        authorization: token,
      },
      params: {
        page: page,
        what: keywords,
        ...(where && { where })
      }
    });

    const jobs = response.data;
    console.log('Jobs:', jobs);
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};
