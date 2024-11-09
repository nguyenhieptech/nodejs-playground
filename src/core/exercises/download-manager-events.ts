import { EventEmitter } from "node:events";

class DownloadManager extends EventEmitter {
  download(fileName: string): void {
    console.log(`Starting download for ${fileName}...`);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20; // Increase progress in steps
      this.emit("progress", progress);

      if (progress === 100) {
        clearInterval(interval);
        this.emit("completed", fileName);
      }
    }, 1000);
  }
}

// Instantiate the DownloadManager and add listeners
const downloadManager = new DownloadManager();

// Event listener for download progress
downloadManager.on("progress", (progress) => {
  console.log(`Download progress: ${progress}%`);
});

// Event listener for download completion
downloadManager.on("completed", (fileName) => {
  console.log(`Download of ${fileName} completed successfully!`);
});

// Start a download
downloadManager.download("sample-file.txt");
