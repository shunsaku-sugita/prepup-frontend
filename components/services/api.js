import axios from "axios";
import * as SecureStore from "expo-secure-store";
import apiClient from "./apiClient";
import {
  BASE_URL,
  PATH_INTERVIEW,
  PATH_PROFILE,
  TYPE_CATEGORY,
  TYPE_GENERATE_QUESTION,
} from "../../config/apiConfig";
import { socket } from "./socket";

const storeTokenSecurely = async (token) => {
  try {
    await SecureStore.setItemAsync("authToken", token);
  } catch (error) {
    console.error("Error storing token securely:", error.message);
  }
};

const getTokenSecurely = async () => {
  try {
    return await SecureStore.getItemAsync("authToken");
  } catch (error) {
    console.error("Error getting token securely:", error.message);
  }
};

export const signup = async (email, password, givenName, familyName) => {
  const signupData = {
    email,
    password,
    givenName,
    familyName,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      signupData
    );
    const token = response.data.authorization;

    if (token) {
      await storeTokenSecurely(token);
      console.log("Token stored successfully");
    } else {
      console.error("Token not received");
    }
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response ? error.response.data : error.message
    );
  }
};

export const fetchJobs = async (page = 1, where = "") => {
  try {
    storeTokenSecurely(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA5OTAxYjJjMWFlM2U4ZTY0MmJjYTYiLCJpYXQiOjE3Mjg2Nzk5NjUsImV4cCI6MTgyODkzOTE2NX0.zKa2jczPvt4ZIkWZmKPfZbS3FzAJb6HeAWXwNCLbpao"
    );
    const token = await getTokenSecurely();
    const response = await axios.get(BASE_URL + "/jobFinder/jobs", {
      headers: {
        authorization: token,
      },
      params: {
        ...(where && { where }),
        page: page,
      },
    });

    const jobs = response.data;
    console.log("Jobs:", jobs);
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export const fetchJobsByKeyword = async (page = 1, where = "", keywords) => {
  try {
    const token = await getTokenSecurely();
    const response = await axios.get(BASE_URL + "/jobFinder/jobs/keyword", {
      headers: {
        authorization: token,
      },
      params: {
        page: page,
        what: keywords,
        ...(where && { where }),
      },
    });

    const jobs = response.data;
    console.log("Jobs:", jobs);
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export const generateQuestionByJobDescription = async (
  adzunaJobId,
  setProgressUpdate
) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_GENERATE_QUESTION;
    const data = { adzunaJobId: adzunaJobId, categoryName: "test" }; // TODO : REMOVE CATEGORY NAME FROM HERE - Khushal @ 18th Oct

    apiClient.post(endpoint, data).then((response) => {
      if (response.status == 200) {
        const progressTrackingId = response.data.trackingId;

        socket.on("connect", () => {
          console.log("Connected to Socket.IO server");
        });
        socket.emit("job-status", progressTrackingId);

        socket.on(progressTrackingId, (data) => {
          console.log(`Job Status Update for ${jobId}:`, data);
          setProgressUpdate(data);
        });
      }
    });
  } catch (error) {
    console.error(
      "Error Generating Questions : ",
      error.response ? error.response.data : error.message
    );

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
  }
};

export const getInterviewCategory = async () => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_CATEGORY;

    apiClient.get(endpoint).then((response) => {
      if (response.status == 200) {
        return response.data;
      }
    });
  } catch (error) {
    console.error(
      "Error getting job category : ",
      error.response ? error.response.data : error.message
    );
  }
};

// data represent an object that contain user data to be updated, Key of the data needs to be same to update
// for example
// data = {
//   "givenName": "Test",
//   "familyName": "Mate",
//   "occupation": "Android Engineer"
// }
// all fields are not required
// and if you update occupation the interview question related to occupation will be updated
export const updateProfile = async (data) => {
  try {
    const endpoint = "/" + PATH_PROFILE + "/";
    apiClient.put(endpoint).then((response) => {
      return true;
    });
  } catch (error) {
    console.error(
      "Error updating user profile : ",
      error.response ? error.response.data : error.message
    );
    return true;
  }
};
