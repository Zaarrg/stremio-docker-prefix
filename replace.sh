#!/bin/sh
echo "Starting replacement process"

# Backup the original server.js
cp server.js server.js.bak

# Use sed to delete the lines corresponding to the createApp function and replace them
sed -i '/function createApp() {/,/^    }/c\REPLACEMENT_MARKER' server.js

# Replace the marker with the content of createApp.js
sed -i '/REPLACEMENT_MARKER/r /tmp/createApp.js' server.js

# Remove the marker line
sed -i '/REPLACEMENT_MARKER/d' server.js

# Display the content of server.js after modification
echo "After modification:"
grep -n -C 5 "function createApp()" ./server.js

echo "Replacement complete"
