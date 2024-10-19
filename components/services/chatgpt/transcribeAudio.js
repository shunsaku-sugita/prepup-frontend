import { GPT_MODEL } from "../../../chatGptCred";

const transcribeAudio = async (audioUri) => {
  try {
    const { fileName, mimeType } = extractFileInfo(audioUri);

    const formData = new FormData();
    formData.append("file", {
      uri: audioUri,
      name: fileName, 
      type: mimeType, 
    });
    formData.append("model", GPT_MODEL); 

    const response = await chatGptAxios.post(formData);

    console.log("Transcription:", response.data.text);
    return response.data.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return null;
  }
};

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
      mimeType = "application/octet-stream"; // Fallback for unknown file types.
      break;
  }

  return { fileName, mimeType };
};
