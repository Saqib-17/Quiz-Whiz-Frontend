// src/firebase/firebaseErrors.js
const firebaseErrorMessages = {
  "auth/email-already-in-use": "This email is already registered. Please use a different email.",
  "auth/invalid-email": "The email address is invalid. Please enter a valid email.",
  "auth/weak-password": "Your password is too weak. Please choose a stronger password.",
  "auth/network-request-failed": "Network error. Please check your connection and try again.",
  "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
  "auth/user-not-found": "No user found with this email. Please check your credentials.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  default: "An unexpected error occurred. Please try again later.",
};

export const getFirebaseErrorMessage = (errorCode) => {
  return firebaseErrorMessages[errorCode] || firebaseErrorMessages.default;
};
