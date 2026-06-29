// src/__mocks__/@react-pdf/renderer.js
module.exports = {
  Document: ({ children }) => children || null,
  Page: ({ children }) => children || null,
  Text: ({ children }) => children || null,
  View: ({ children }) => children || null,
  Image: () => null,
  StyleSheet: { create: (styles) => styles },
  PDFDownloadLink: ({ children }) =>
    typeof children === "function"
      ? children({ loading: false, error: null })
      : children,
};