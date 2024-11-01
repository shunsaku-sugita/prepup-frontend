import axios from "axios";
import * as SecureStore from "expo-secure-store";
import apiClient from "./apiClient";
import {
  BASE_URL,
  PATH_INTERVIEW,
  PATH_PROFILE,
  PATH_JOBFINDER,
  PATH_STATMASTER,
  TYPE_CATEGORY,
  TYPE_GENERATE_QUESTION,
  TYPE_ANALYZE_ANSWERS,
  PATH_AUTH,
  TYPE_SIGNIN,
  TYPE_SIGNUP,
  TYPE_OTP,
  SUB_PATH_FORGOT_PASSWORD,
  TYPE_RESET,
  TYPE_SIGNIN_WITH_GOOGLE,
} from "../../config/apiConfig";
import { socket } from "./socket";

const storeTokenSecurely = async (token) => {
  try {
    await SecureStore.setItemAsync("authToken", token);
  } catch (error) {
    console.error("Error storing token securely:", error.message);
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
    return [];
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
    return [];
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
    return undefined;
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
    return undefined;
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
    return [];
  }
};

// Interview Simulator APIs(original)
// export const generateQuestionByJobDescription = async (
//   adzunaJobId,
//   setProgressUpdate
// ) => {
//   try {
//     const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_GENERATE_QUESTION;
//     const data = { adzunaJobId: adzunaJobId, categoryName: "test" }; // TODO : REMOVE CATEGORY NAME FROM HERE - Khushal @ 18th Oct

//     apiClient.post(endpoint, data).then((response) => {
//       if (response.status == 200) {
//         const progressTrackingId = response.data.trackingId;

//         socket.on("connect", () => {
//           console.log("Connected to Socket.IO server");
//         });
//         socket.emit("job-status", progressTrackingId);

//         socket.on(progressTrackingId, (data) => {
//           console.log(`Job Status Update for ${jobId}:`, data);
//           setProgressUpdate(data);
//         });
//       }
//     });
//   } catch (error) {
//     console.error(
//       "Error Generating Questions : ",
//       error.response ? error.response.data : error.message
//     );

//     socket.on("disconnect", () => {
//       console.log("Disconnected from Socket.IO server");
//     });
//   }
// };

// THIS WORKS
export const generateQuestionByJobDescription = async (
  adzunaJobId,
  setProgressUpdate
) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_GENERATE_QUESTION;
    const data = { adzunaJobId: adzunaJobId, categoryName: "test" }; // Sending Adzuna Job ID and category

    // Log data for confirmation
    console.log("Data being sent to API:", data);

    // Make the API call to initiate question generation
    const response = await apiClient.post(endpoint, data);

    // Debugging: Log the full API response to verify the returned data
    console.log(
      "Full API Response from generateQuestionByJobDescription:",
      response
    );

    // Check if the response is successful and contains a tracking ID
    if (response.status === 200 && response.data && response.data.trackingId) {
      const progressTrackingId = response.data.trackingId;

      // Log the received tracking ID for confirmation
      console.log("Received tracking ID:", progressTrackingId);

      // Set up the socket connection and listeners
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      // Emit an event to start tracking the job status
      socket.emit("job-status", progressTrackingId);

      // Listen for updates using the tracking ID
      socket.on(progressTrackingId, (data) => {
        console.log(`Job Status Update for Job ID ${adzunaJobId}:`, data);

        // Update the progress state with the latest data using the provided callback
        setProgressUpdate(data);

        // Log the status for debugging
        if (data.status) {
          console.log("Job status:", data.status);
        }
      });

      // Return the tracking ID for further use if necessary
      return { trackingId: progressTrackingId };
    } else {
      // Handle missing tracking ID
      console.error(
        "Invalid API response, missing tracking ID:",
        response.data
      );
      throw new Error("No tracking ID received");
    }
  } catch (error) {
    // Log error details for debugging
    console.error(
      "Error Generating Questions in generateQuestionByJobDescription:",
      error.response ? error.response.data : error.message
    );

    // Ensure the socket disconnects on error to clean up
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    // Re-throw the error to be caught by the calling function
    throw error;
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

// export const updateProfile = async (data) => {
//   try {
//     const endpoint = "/" + PATH_PROFILE + "/";
//     const response = await apiClient.put(endpoint);

//     return response;
//   } catch (error) {
//     console.error(
//       "Error updating user profile : ",
//       error.response ? error.response.data : error.message
//     );
//     return error.response || { data: { message: error.message } };
//   }
// };

export const updateProfile = async (data) => {
  try {
    const endpoint = "/" + PATH_PROFILE + "/";
    console.log("Updating profile with data:", data); // Debugging line to confirm data structure

    const response = await apiClient.put(endpoint, data);

    if (response.status === 200) {
      console.log("Profile updated successfully:", response.data);
      return response.data;
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error(
      "Error updating user profile : ",
      error.response ? error.response.data : error.message
    );
    return error.response ? error.response.data : { error: error.message };
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

export const saveInterviewQuestions = async (categoryName, questions) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_CATEGORY;
    const response = await apiClient.post(endpoint, {
      categoryName,
      questions,
    });

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

export const deleteInterviewCategory = async (categoryId) => {
  try {
    const endpoint = "/" + PATH_INTERVIEW + "/" + TYPE_CATEGORY;
    const response = await apiClient.delete(endpoint, { categoryId });

    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.error(
      "Error while deleting Interview Category: ",
      error.response ? error.response.data : error.message
    );

    return false;
  }
};

// STAR Master APIs
export const getStarMasterQuestion = async () => {
  try {
    const endpoint = "/" + PATH_STATMASTER + "/question";
    const response = await apiClient.get(endpoint);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch questions");
    }
  } catch (error) {
    console.error(
      "Error while fetching a question: ",
      error.response ? error.response.data : error.message
    );
    return undefined;
  }
};

export const anayzeStarMasterAnsewers = async (question, answers) => {
  try {
    const endpoint = "/" + PATH_STATMASTER + "/analyze";
    const response = await apiClient.post(endpoint, { question, answers });

    if (response.status === 200) {
      console.log("WHAT IS DATA HERE ========> ");
      console.log(response.data);
      return response.data;
    } else {
      throw new Error("Failed to analyze answers");
    }
  } catch (error) {
    console.error(
      "Error while analyzing answers: ",
      error.response ? error.response.data : error.message
    );
    return undefined;
  }
};

export const getProfile = async () => {
  try {
    const endpoint = "/" + PATH_PROFILE + "/";
    const response = await apiClient.get(endpoint);

    if (response.status == 200) {
      return response.data.user;
    }
  } catch (error) {
    console.error(
      "Error while getting user profile : ",
      error.response ? error.response.data : error.message
    );
    return undefined;
  }
};

//  data = {
//     "email" : "test107@gmail.com",
//     "password" : "123@abs"
// }
export const login = async (email, password) => {
  try {
    const endpoint = "/" + PATH_AUTH + "/" + TYPE_SIGNIN;
    const response = await apiClient.post(endpoint, { email, password });

    if (response.status == 200) {
      const token = response.data.authorization;
      console.log(token);
      if (token) {
        await storeTokenSecurely(token);
        console.log("Token stored successfully");
      } else {
        console.error("Token not received");
      }
    }
    return response;
  } catch (error) {
    console.error(
      "Error while login : ",
      error.response ? error.response.data : error.message
    );

    return error;
  }
};

export const signup = async (
  email,
  password,
  givenName,
  familyName,
  userName
) => {
  const signupData = {
    email,
    password,
    givenName,
    familyName,
    userName,
  };

  try {
    const endpoint = "/" + PATH_AUTH + "/" + TYPE_SIGNUP;
    const response = await apiClient.get(endpoint, signupData);

    if (response.status == 201) {
      const token = response.data.authorization;

      if (token) {
        await storeTokenSecurely(token);
        console.log("Token stored successfully");
      } else {
        console.error("Token not received");
      }
    }

    return response;
  } catch (error) {
    console.error(
      "Error during signup:",
      error.response ? error.response.data : error.message
    );
  }
};

export const verifyEmail = async (email) => {
  try {
    const endpoint =
      "/" + PATH_AUTH + "/" + SUB_PATH_FORGOT_PASSWORD + "/" + TYPE_OTP;
    const response = await apiClient.get(endpoint, { email });

    // look for code 200
    return response;
  } catch (error) {
    console.error(
      "Error while verifyEmail : ",
      error.response ? error.response.data : error.message
    );

    return error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const endpoint =
      "/" + PATH_AUTH + "/" + SUB_PATH_FORGOT_PASSWORD + "/" + TYPE_OTP;
    const response = await apiClient.post(endpoint, { email, otp });

    // look for code 200
    return response;
  } catch (error) {
    console.error(
      "Error while verifyOTP : ",
      error.response ? error.response.data : error.message
    );

    return error;
  }
};

export const resetPassword = async (email, password) => {
  try {
    const endpoint =
      "/" + PATH_AUTH + "/" + SUB_PATH_FORGOT_PASSWORD + "/" + TYPE_RESET;
    const response = await apiClient.post(endpoint, { email, password });

    // look for code 200
    return response;
  } catch (error) {
    console.error(
      "Error while resetPassword : ",
      error.response ? error.response.data : error.message
    );

    return error;
  }
};

export const createPassword = async (password) => {
  try {
    const endpoint =
      "/" + PATH_AUTH + "/" + SUB_PATH_FORGOT_PASSWORD + "/" + TYPE_RESET;
    const response = await apiClient.post(endpoint, { email, password });

    if (response.status == 200) {
      return true;
    }
  } catch (error) {
    console.error(
      "Error while createPassword : ",
      error.response ? error.response.data : error.message
    );

    return false;
  }

}

export const signinWithGoogle = async (email, firstName, lastName) => {
  try {
    const endpoint = "/" + PATH_AUTH + "/" + TYPE_SIGNIN_WITH_GOOGLE;
    const response = await apiClient.post(endpoint, { email, firstName, lastName });

    if (response.status == 200 || response.status == 201) {
      const token = response.data.authorization;

      if (token) {
        await storeTokenSecurely(token);
        console.log("Token stored successfully");
      } else {
        console.error("Token not received");
      }
    }

    return response;

  } catch (error) {
    console.error(
      "Error while signinWithGoogle : ",
      error.response ? error.response.data : error.message
    );

    return error;
  }
}
