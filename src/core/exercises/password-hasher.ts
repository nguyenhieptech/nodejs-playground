import crypto from "node:crypto";

/**
 * Hashes a plain-text password.
 * @param password - The password to hash.
 * @returns The hashed password, combined with the salt, as a hex string.
 */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex"); // Generate a random salt
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString("hex"); // Hash the password
  return `${salt}:${hashedPassword}`; // Return salt and hash as a single string
}

/**
 * Verifies if a given password matches the stored hash.
 * @param password - The password to verify.
 * @param storedHash - The stored hash to compare against.
 * @returns True if the password matches, otherwise false.
 */
function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hashedPassword] = storedHash.split(":"); // Extract salt and hashed password
  const hashedBuffer = Buffer.from(String(hashedPassword), "hex");
  const inputHashBuffer = crypto.scryptSync(password, String(salt), 64);

  // Use timingSafeEqual to prevent timing attacks
  return crypto.timingSafeEqual(hashedBuffer, inputHashBuffer);
}

// Example usage
const password = "my_secure_password";
const storedHash = hashPassword(password);
console.log("Stored Hash:", storedHash);

const isMatch = verifyPassword("my_secure_password", storedHash);
console.log("Password Match:", isMatch ? "Yes" : "No");

const isWrongMatch = verifyPassword("wrong_password", storedHash);
console.log("Wrong Password Match:", isWrongMatch ? "Yes" : "No");
