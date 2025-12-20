#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, relative, resolve } from 'path';
import { cwd } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_NAME = 'francekhalil-db';
const TEMP_SQL_FILE = join(__dirname, '../temp_sync.sql');
const EXPORT_SQL_FILE = join(__dirname, '../temp_remote_export.sql');

console.log('🔄 Syncing data from remote Cloudflare D1 database to local...\n');

try {
  // Step 1: Export data from remote database using wrangler d1 export
  console.log('📥 Exporting data from remote database...');
  
  try {
    // Export only data (no schema) from remote database
    execSync(
      `wrangler d1 export ${DB_NAME} --remote --output "${EXPORT_SQL_FILE}" --table articles --no-schema`,
      { encoding: 'utf-8', stdio: 'inherit' }
    );
    console.log('✅ Export completed\n');
  } catch (error) {
    console.error('❌ Error exporting from remote database:', error.message);
    console.log('\n💡 Make sure you are authenticated: wrangler login');
    process.exit(1);
  }

  // Check if export file was created and has content
  if (!existsSync(EXPORT_SQL_FILE)) {
    console.log('⚠️  Export file was not created. Remote database might be empty.');
    process.exit(0);
  }

  const exportContent = readFileSync(EXPORT_SQL_FILE, 'utf-8');
  if (!exportContent || exportContent.trim().length === 0) {
    console.log('ℹ️  No data found in remote database (export file is empty)');
    // Clean up empty file
    unlinkSync(EXPORT_SQL_FILE);
    process.exit(0);
  }

  // Count INSERT statements to show progress
  const insertMatches = exportContent.match(/INSERT INTO articles/gi);
  const articleCount = insertMatches ? insertMatches.length : 0;
  console.log(`✅ Found ${articleCount} articles in remote database\n`);

  // Step 2: Initialize local database schema if needed
  console.log('🔧 Ensuring local database schema is initialized...');
  try {
    execSync(`wrangler d1 execute ${DB_NAME} --local --file=./db/schema.sql`, { stdio: 'pipe' });
  } catch (error) {
    // Schema might already exist, that's okay
  }

  // Step 3: Prepare SQL file for import
  console.log('📝 Preparing SQL file for import...');
  
  // Read the exported SQL and add transaction wrapper
  let importSql = readFileSync(EXPORT_SQL_FILE, 'utf-8');
  
  // Add transaction wrapper for better performance and rollback on error
  const wrappedSql = `BEGIN TRANSACTION;\nDELETE FROM articles;\n${importSql}\nCOMMIT;`;
  
  // Write to temporary SQL file for import
  writeFileSync(TEMP_SQL_FILE, wrappedSql, 'utf-8');
  console.log(`✅ Prepared SQL file with ${articleCount} articles\n`);

  // Step 4: Import into local database
  console.log('📤 Importing data into local database...');
  try {
    // Use relative path to avoid issues with spaces in absolute paths on Windows
    const relativePath = relative(cwd(), TEMP_SQL_FILE);
    const filePath = relativePath || TEMP_SQL_FILE;
    
    // Properly quote the file path for Windows/PowerShell
    // Use double quotes around the path value
    const command = `wrangler d1 execute ${DB_NAME} --local --file="${filePath}"`;
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: cwd()
    });
    console.log('\n✅ Sync complete!');
    console.log(`   📊 Synced ${articleCount} articles from remote to local`);
    console.log(`\n💡 Run 'npm run db:verify' to verify local database`);
  } catch (error) {
    console.error('\n❌ Error importing data:', error.message);
    console.error(`   File path was: ${TEMP_SQL_FILE}`);
    
    // Try alternative: use absolute path with forward slashes
    console.log('\n🔄 Trying alternative method with absolute path...');
    try {
      const absPath = resolve(TEMP_SQL_FILE).replace(/\\/g, '/');
      execSync(`wrangler d1 execute ${DB_NAME} --local --file="${absPath}"`, { 
        stdio: 'inherit', 
        cwd: cwd() 
      });
      console.log('\n✅ Sync complete (using alternative method)!');
      console.log(`   📊 Synced ${articleCount} articles from remote to local`);
      console.log(`\n💡 Run 'npm run db:verify' to verify local database`);
    } catch (altError) {
      console.error('❌ Alternative method also failed:', altError.message);
      throw error; // Throw original error
    }
  } finally {
    // Clean up temporary files
    if (existsSync(TEMP_SQL_FILE)) {
      unlinkSync(TEMP_SQL_FILE);
    }
    if (existsSync(EXPORT_SQL_FILE)) {
      unlinkSync(EXPORT_SQL_FILE);
    }
  }

} catch (error) {
  console.error('\n❌ Sync failed:', error.message);
  
  // Clean up on error
  if (existsSync(TEMP_SQL_FILE)) {
    unlinkSync(TEMP_SQL_FILE);
  }
  if (existsSync(EXPORT_SQL_FILE)) {
    unlinkSync(EXPORT_SQL_FILE);
  }
  
  process.exit(1);
}

