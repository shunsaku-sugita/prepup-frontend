import axios from "axios";
import chatGptAxios from "./chatGptAxios";
import { GPT_MODEL } from "@/chatGptCred";

// Function to transcribe audio using ChatGPT API
export const transcribeAudio = async (audioUri) => {
  try {
    // Validate the audioUri before proceeding
    if (!audioUri) {
      throw new Error("Audio URI is required");
    }

    // Extract file information from the URI
    const { fileName, mimeType } = extractFileInfo(audioUri);

    // Create FormData with the file and model information
    const formData = new FormData();
    formData.append("file", {
      uri: audioUri.startsWith("file://") ? audioUri : `file://${audioUri}`,
      name: fileName,
      type: mimeType,
    });
    formData.append("model", GPT_MODEL);
    formData.append("language", "en");

    // Send POST request to ChatGPT API for transcription
    const response = await chatGptAxios.post(
      "/v1/audio/transcriptions",
      formData
    );

    // Log and return the transcription text
    console.log("Transcription:", response.data.text);
    return response.data.text;
  } catch (error) {
    // Handle errors and return null if any error occurs
    console.error("Error transcribing audio:", error);
    return null;
  }
};

// Helper function to extract file name and MIME type from a URI
const extractFileInfo = (uri) => {
  const fileName = uri.split("/").pop();
  const fileExtension = fileName.split(".").pop();
  let mimeType = "";

  switch (fileExtension) {
    case "m4a":
      mimeType = "audio/m4a";
      break;
    case "mp3":
      mimeType = "audio/mpeg";
      break;
    case "wav":
      mimeType = "audio/wav";
      break;
    case "ogg":
      mimeType = "audio/ogg";
      break;
    default:
      mimeType = "application/octet-stream"; // Fallback for unknown file types
      break;
  }

  return { fileName, mimeType };
};
