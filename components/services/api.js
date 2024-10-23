import axios from "axios";
import * as SecureStore from "expo-secure-store";
import apiClient from "./apiClient";
import {
  BASE_URL,
  PATH_INTERVIEW,
  PATH_PROFILE,
  PATH_JOBFINDER,
  TYPE_CATEGORY,
  TYPE_GENERATE_QUESTION,
  TYPE_ANALYZE_ANSWERS,
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

// Job Finder APIs
export const fetchJobs = async (page = 1) => {
  try {
    const endpoint = `/${PATH_JOBFINDER}/search/${page}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch jobs");
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const fetchJobsByKeyword = async (page = 1, keywords) => {
  try {
    const endpoint = `/${PATH_JOBFINDER}/search/keyword/${page}`;
    const response = await apiClient.get(endpoint, {
      params: {
        keywords: keywords,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch jobs");
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const bookmarkJob = async (jobDetails) => {
  try {
    const endpoint = `/${PATH_JOBFINDER}/bookmark`;
    const response = await apiClient.post(endpoint, jobDetails);

    if (response.status === 200) {
      console.log("Job bookmarked successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to bookmark job");
    }
  } catch (error) {
    console.error("Error bookmarking job:", error);
    throw error;
  }
};

export const unbookmarkJob = async (jobId) => {
  try {
    const endpoint = `/${PATH_JOBFINDER}/bookmark/${jobId}`;
    const response = await apiClient.delete(endpoint);

    if (response.status === 200) {
      console.log("Job unbookmarked successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to unbookmark job");
    }
  } catch (error) {
    console.error("Error unbookmarking job:", error);
    throw error;
  }
};

export const fetchSavedJobs = async () => {
  try {
    const endpoint = `/${PATH_JOBFINDER}/bookmarked`;
    const response = await apiClient.get(endpoint);

    if (response.status === 200) {
      console.log("Fetch bookmarked jobs successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to fetch bookmarked job");
    }
  } catch (error) {
    console.error("Error fetching bookmarked job:", error);
    throw error;
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

    const response = await apiClient.get(endpoint);

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error getting job category : ",
      error.response ? error.response.data : error.message
    );
    return undefined;
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
    const response = await apiClient.put(endpoint);

    if (response == 200) {
      return true;
    }
  } catch (error) {
    console.error(
      "Error updating user profile : ",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};

export const analyzeAnswer = async (answers) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_ANALYZE_ANSWERS;
    const response = await apiClient.post(endpoint, { answers });

    if (response.status == 200) {
      console.log("WHAT IS DATA HERE ========> ");
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Error while analyzing answers : ",
      error.response ? error.response.data : error.message
    );
    return undefined;
  }
};

export const saveInterviewQuestions = (categoryName, questions) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_CATEGORY;
    const response = apiClient.post(endpoint, { categoryName, questions });

    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.error(
      "Error while saveing interview: ",
      error.response ? error.response.data : error.message
    );

    return false;
  }
};
