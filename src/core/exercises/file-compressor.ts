import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { createGunzip, createGzip } from "node:zlib";

const pipe = promisify(pipeline);

/**
 * Compresses a file using gzip.
 * @param inputFile - The path to the file to compress.
 * @param outputFile - The path where the compressed file will be saved.
 */
async function compressFile(inputFile: string, outputFile: string): Promise<void> {
  const gzip = createGzip();
  const source = createReadStream(inputFile);
  const destination = createWriteStream(outputFile);

  try {
    await pipe(source, gzip, destination);
    console.log(`File compressed to ${outputFile}`);
  } catch (error) {
    console.error("Compression failed:", error);
  }
}

/**
 * Decompresses a gzip-compressed file.
 * @param inputFile - The path to the compressed file.
 * @param outputFile - The path where the decompressed file will be saved.
 */
async function decompressFile(inputFile: string, outputFile: string): Promise<void> {
  const gunzip = createGunzip();
  const source = createReadStream(inputFile);
  const destination = createWriteStream(outputFile);

  try {
    await pipe(source, gunzip, destination);
    console.log(`File decompressed to ${outputFile}`);
  } catch (error) {
    console.error("Decompression failed:", error);
  }
}

// Example usage
const inputFile = "example.txt"; // Original text file to compress
const compressedFile = "example.txt.gz"; // Compressed file
const decompressedFile = "example-decompressed.txt"; // Decompressed file output

// Compress and then decompress the file
(async () => {
  await compressFile(inputFile, compressedFile);
  await decompressFile(compressedFile, decompressedFile);
})();
