export const extractErrorMessage = (htmlResponse) => {
    // Regular expression to match the error message within <pre> tags
    const regex = /<pre>(.*?)<\/pre>/s;
    // Extracting the error message using the regex
    const match = htmlResponse.match(regex);
    // If match is found, extract message after <br> tag and trim whitespace
    if (match) {
      const errorMessage = match[1];
      // Remove content after the first <br> tag
      const messageParts = errorMessage.split("<br>");
      // Get the message part excluding the first part
      const extractedMessage = messageParts[0].trim();
      return extractedMessage;
    } else {
      return "An error occurred.";
    }
  };