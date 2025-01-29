export default function VideoPlayer() {
    const videoUrl = "https://pub-1940a3f06c164501aeb26d4bb7b4098d.r2.dev/js_hindi.mp4";
    

    return (
      <div className="video-container">
        <video controls width="100%" height="auto">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  