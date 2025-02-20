function DownloadButton({ imageUrl, fileName }) {
  const downloadImage = () => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName.replace(/\s+/g, "_") + ".jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  return (
    <button className="download-button" onClick={downloadImage}>
      Download Image
    </button>
  );
}

export default DownloadButton;
