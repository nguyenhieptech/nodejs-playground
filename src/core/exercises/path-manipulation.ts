import path from "node:path";

// Define a sample file path
const filePath = "/user/../user/docs/../projects/./nodejs/path-example.ts";

// Display the original path
console.log("Original Path:", filePath);

// Normalize the path (resolves '.', '..' segments)
const normalizedPath = path.normalize(filePath);
console.log("Normalized Path:", normalizedPath);

// Join two paths
const joinedPath = path.join("/user/projects", "nodejs", "path-example.ts");
console.log("Joined Path:", joinedPath);

// Resolve an absolute path from a sequence of paths
const resolvedPath = path.resolve("src", "utilities", "path-example.ts");
console.log("Resolved Path:", resolvedPath);

// Get the directory name of the path
const directoryName = path.dirname(filePath);
console.log("Directory Name:", directoryName);

// Get the base name (file name with extension)
const baseName = path.basename(filePath);
console.log("Base Name:", baseName);

// Get the file extension
const extension = path.extname(filePath);
console.log("Extension:", extension);

// Parse the path into an object
const parsedPath = path.parse(filePath);
console.log("Parsed Path:", parsedPath);

// Format a parsed path object back into a string
const formattedPath = path.format(parsedPath);
console.log("Formatted Path:", formattedPath);
