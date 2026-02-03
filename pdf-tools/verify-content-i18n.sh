#!/bin/bash

echo "Testing content pages i18n..."
echo "================================"
locales=(zh zh-tw es fr de ar pt ja ko)
pages=(about contact privacy terms cookies)

failed=0
passed=0

for locale in "${locales[@]}"; do
  for page in "${pages[@]}"; do
    echo "Testing /$locale/$page"
    # Try to curl the page (check if server is running first)
    if curl -s "http://localhost:3000/$locale/$page" | grep -q "404"; then
      echo "  ❌ FAILED - 404 Not Found"
      ((failed++))
    elif curl -s "http://localhost:3000/$locale/$page" | grep -q "DOCTYPE"; then
      echo "  ✅ OK - Page loads successfully"
      ((passed++))
    else
      echo "  ⚠️  WARNING - Server may not be running"
    fi
  done
done

echo ""
echo "================================"
echo "Summary:"
echo "  Passed: $passed"
echo "  Failed: $failed"
echo ""
echo "Note: Make sure dev server is running with 'npm run dev' before using this script"
