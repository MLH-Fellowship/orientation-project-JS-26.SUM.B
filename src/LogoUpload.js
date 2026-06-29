import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function LogoUpload({ onLogoChange }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        onLogoChange(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onLogoChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  return (
    <div className="resumeSection">
      <h2>Logo</h2>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "dropzone-active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the logo here...</p>
        ) : (
          <p>Drag and drop a logo here, or click to select one</p>
        )}
      </div>

      {preview && (
        <div className="logo-preview">
          <img src={preview} alt="Logo preview" width="120" />
        </div>
      )}
    </div>
  );
}

export default LogoUpload;
