import   DOMPurify from "dompurify";

export function sanitizeInput(input: any): any {
  // Check the type of the input value
  if (typeof input === "string") {
    // Sanitize the string input using DOMPurify
    return DOMPurify.sanitize(input);
  } else {
    // Return the input value as is
    return input;
  }
}
