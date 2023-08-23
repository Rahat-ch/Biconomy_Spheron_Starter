import React, { useRef, useState } from "react";
import { upload } from "@spheron/browser-upload";
import styles from "@/styles/Upload.module.css";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLink, setUploadLink] = useState("");
  const [dynamicLink, setDynamicLink] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setUploadLink("");
    setDynamicLink("");
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/upload");
      const responseJson = await response.json();
      const uploadResult = await upload([file], {
        token: responseJson.uploadToken,
      });

      setUploadLink(uploadResult.protocolLink);
      setDynamicLink(uploadResult.dynamicLinks[0]);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
        {isLoading ? (
          <p className={styles.title}>Uploading...</p>
        ) : (
          <>
            <p className={styles.title}>Upload Content to IPFS</p>
            <div className={styles.uploadArea}>
              <div>
                <button
                  onClick={handleSelectFile}
                  className={styles.actionButton}
                >
                  Select File
                </button>
                <input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.hiddenInput}
                    // style={{ display: "none" }}
                />
              </div>
              <div className={styles.fileName}>
                {file ? file?.name : "No file selected"}
              </div>
              <button
                  onClick={handleUpload}
                  className={styles.actionButton}
              >
                Upload
              </button>
            </div>
            {uploadLink && (
              <a
                className={styles.link}
                href={`${uploadLink}/${file?.name}`}
                target="__blank" rel="noopener noreferrer"
              >
                File Link
              </a>
            )}
          </>
        )}
    </div>
  );
}

export default Upload;
