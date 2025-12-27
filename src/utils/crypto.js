// src/utils/crypto.js

// --- 1. KEY GENERATION ---

// Generate a random key (for no-password uploads)
export async function generateRandomKey() {
  return await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// Derive a key from a password (PBKDF2)
export async function deriveKeyFromPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// --- 2. ENCRYPTION ---

export async function encryptFile(fileBuffer, key) {
  // 1. Generate IV (12 bytes)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // 2. Encrypt
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    fileBuffer
  );

  return { ciphertext, iv };
}

// --- 3. DECRYPTION ---

export async function decryptFile(encryptedBuffer, key, iv) {
  return await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encryptedBuffer
  );
}

// --- 4. UTILS ---

export async function exportKeyToBase64(key) {
  const exported = await window.crypto.subtle.exportKey("raw", key);
  let binary = "";
  const bytes = new Uint8Array(exported);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export async function importKeyFromBase64(base64Key) {
  const binaryString = window.atob(base64Key);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return await window.crypto.subtle.importKey(
    "raw",
    bytes.buffer,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}
