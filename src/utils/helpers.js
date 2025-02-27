export function setButtonText(submitbtn, isLoading, defaultText, loadingText) {
  if (isLoading) {
    //loading
    submitbtn.textContent = loadingText;
  } else {
    //not loading
    submitbtn.textContent = defaultText;
  }
}
