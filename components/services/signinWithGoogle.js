import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  isSuccessResponse
} from '@react-native-google-signin/google-signin';

export const signinWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();
    const response = hasPreviousSignIn
      ? await GoogleSignin.signInSilently()
      : await GoogleSignin.signIn();

    handleSignInResponse(response);
  } catch (error) {
    handleSignInError(error);
  }
};

const handleSignInResponse = (response) => {
  if (isSuccessResponse(response)) {
    console.log(response.data);
  } else {
    console.log("Sign-in cancelled by user");
  }
};

const handleSignInError = (error) => {
  console.error("Error during Google sign-in:", error);

  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.IN_PROGRESS:
        console.log("Sign-in already in progress.");
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        console.log("Google Play Services not available or outdated.");
        break;
      default:
        console.log("An unknown error occurred.");
    }
  } else {
    console.log("An unexpected error occurred.");
  }
};
