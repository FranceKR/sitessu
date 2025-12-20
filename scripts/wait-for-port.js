#!/usr/bin/env node

import { createConnection } from 'net';

const port = parseInt(process.argv[2]) || 8788;
const maxAttempts = 90; // Increased to 90 seconds (to account for DB initialization)
const delay = 1000;
const initialDelay = 5000; // Wait 5 seconds before starting to check (gives DB init time)

function checkPort(attempt = 0) {
  return new Promise((resolve, reject) => {
    if (attempt === 0) {
      console.log(`⏳ Waiting ${initialDelay/1000}s for database initialization, then checking port ${port}...`);
      setTimeout(() => {
        console.log(`⏳ Now checking if server is ready on port ${port}...`);
        checkPort(1).then(resolve).catch(reject);
      }, initialDelay);
      return;
    }
    
    const client = createConnection({ port, host: '127.0.0.1' }, () => {
      client.destroy();
      console.log(`✅ Port ${port} is ready!`);
      resolve();
    });

    client.on('error', (error) => {
      client.destroy();
      // ECONNREFUSED means server isn't ready yet, keep trying
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        if (attempt >= maxAttempts) {
          reject(new Error(`Port ${port} not ready after ${maxAttempts} attempts (${maxAttempts}s)`));
        } else {
          // Show progress every 5 attempts
          if (attempt % 5 === 0 && attempt > 0) {
            process.stdout.write(`⏳ Still waiting for port ${port}... (${attempt}s)\n`);
          }
          setTimeout(() => checkPort(attempt + 1).then(resolve).catch(reject), delay);
        }
      } else {
        // Other errors might mean port is in use or other issue
        reject(new Error(`Error checking port ${port}: ${error.code || error.message}`));
      }
    });
  });
}

checkPort()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  });

