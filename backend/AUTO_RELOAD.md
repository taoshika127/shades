# Auto-Reload Guide

## How Auto-Reload Works

Your backend server uses `ts-node-dev` with the `--respawn` flag, which means **most changes will automatically reload the server** without a manual restart.

## When Auto-Reload Works ✅

You **DON'T need to manually restart** for:

- ✅ Route handler changes (GET, POST, PUT, DELETE endpoints)
- ✅ Business logic changes
- ✅ API response modifications
- ✅ TypeScript code changes in route handlers
- ✅ Database query changes
- ✅ New route additions
- ✅ Middleware changes

The server will detect file changes and automatically restart.

## When Manual Restart is Required 🔄

You **DO need to manually restart** for:

1. **Database initialization changes** (`database.ts` initialization code)
   - Changes to `initialCategories` won't affect existing databases
   - Database is only initialized once when empty
   - **Solution**: Delete the database file to reinitialize, or manually update records

2. **Environment variable changes** (`.env` file)
   - The `.env` file is loaded once at startup
   - **Solution**: Restart the server

3. **Port changes** (in `index.ts`)
   - Server needs to restart to bind to a new port
   - **Solution**: Restart the server

4. **Static file serving changes** (adding new routes like `/assets`)
   - Express middleware is set up at startup
   - **Solution**: Restart the server

5. **Package.json changes** (new dependencies)
   - New packages need to be installed
   - **Solution**: Stop server, run `npm install`, restart server

## Checking if Auto-Reload is Working

When you save a file, you should see output like:
```
[INFO] File change detected. Restarting...
[INFO] Server is running on port 5001
```

## Troubleshooting Auto-Reload

If auto-reload isn't working:

1. **Check the terminal** - Look for file change detection messages
2. **Save the file again** - Sometimes the first save doesn't trigger
3. **Check file extensions** - Make sure you're editing `.ts` files in `src/`
4. **Manual restart** - Press `Ctrl+C` to stop, then run `npm run dev` again

## For Database Initial Changes

If you modified `initialCategories` in `database.ts` and want to apply it:

### Option 1: Reset Database (Easiest)
```bash
# Stop the server (Ctrl+C)
rm backend/data/categories.db
# Restart the server
npm run dev:backend
```

### Option 2: Update Existing Records
Use SQL or the API to update existing categories instead of reinitializing.

## Pro Tip 💡

You can also use **nodemon** for more reliable file watching, but `ts-node-dev` with `--respawn` should work fine for most cases. If you experience issues, consider switching to `nodemon` with `ts-node`.

