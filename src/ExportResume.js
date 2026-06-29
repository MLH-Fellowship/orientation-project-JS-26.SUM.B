//Export Resume to PDF button.
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

function ExportResume({ resumeData }) {
  var fileName =
    (resumeData.name || "resume").replace(/\s+/g, "_") + "_Resume.pdf";

  return React.createElement(
    PDFDownloadLink,
    {
      document: React.createElement(ResumePDF, { data: resumeData }),
      fileName: fileName,
    },
    function (props) {
      if (props.error) {
        return "Error generating PDF";
      }
      return props.loading ? "Preparing PDF..." : "Download Resume PDF";
    }
  );
}

export default ExportResume;
