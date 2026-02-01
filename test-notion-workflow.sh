#!/bin/bash

# Local test for Notion ticket workflow
# Usage: ./test-notion-workflow.sh [commit_hash]
# If no commit hash provided, uses HEAD

# Load environment variables
if [ -f .env ]; then
  export $(grep -E '^(NOTION_API_KEY|DEEPSEEK_API_KEY)=' .env | xargs)
fi

# Check required keys
if [ -z "$NOTION_API_KEY" ]; then
  echo "❌ NOTION_API_KEY not set. Add it to .env file."
  exit 1
fi

if [ -z "$DEEPSEEK_API_KEY" ]; then
  echo "❌ DEEPSEEK_API_KEY not set. Add it to .env file."
  exit 1
fi

# Get commit to test
COMMIT_HASH="${1:-HEAD}"
COMMIT_INFO=$(git log -1 --pretty=format:"%H|%s|%an|%ae" "$COMMIT_HASH")

IFS='|' read -r commit_hash commit_message author_name author_email <<< "$COMMIT_INFO"

echo "🧪 Testing Notion workflow locally"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Commit: ${commit_hash:0:8}"
echo "Message: $commit_message"
echo "Author: $author_name <$author_email>"
echo ""

# Get changed files
changed_files=$(git diff-tree --no-commit-id --name-only -r "$commit_hash" 2>/dev/null | head -20 | tr '\n' ', ')
echo "Changed files: $changed_files"
echo ""

# Escape for JSON
escaped_message=$(echo "$commit_message" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed 's/\t/\\t/g' | tr '\n' ' ')
escaped_files=$(echo "$changed_files" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g')

echo "🤖 Calling DeepSeek API..."
echo ""

# Call DeepSeek API
ai_response=$(curl -s -X POST "https://api.deepseek.com/chat/completions" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {
        "role": "system",
        "content": "You analyze git commits and generate Notion ticket data. Return ONLY valid JSON with no markdown. The tickets array can have 1-3 items if the commit does multiple things, otherwise just 1 ticket. Each ticket has: title (clear task description, max 80 chars), description (detailed explanation), priority (High/Medium/Low), stack (Backend/Web Editor/Mobile App/Dashboard), estimated_hours (1-8)."
      },
      {
        "role": "user",
        "content": "Commit: '"$escaped_message"'\nChanged files: '"$escaped_files"'\n\nGenerate ticket(s) as JSON: {\"tickets\": [{\"title\": \"\", \"description\": \"\", \"priority\": \"\", \"stack\": \"\", \"estimated_hours\": 0}]}"
      }
    ],
    "temperature": 0.3,
    "max_tokens": 1000
  }')

# Extract content
content=$(echo "$ai_response" | jq -r '.choices[0].message.content // empty' 2>/dev/null)

if [ -z "$content" ]; then
  echo "❌ DeepSeek API error:"
  echo "$ai_response" | jq .
  exit 1
fi

echo "📝 DeepSeek Response:"
echo "$content" | jq .
echo ""

# Parse tickets
ticket_count=$(echo "$content" | jq -r '.tickets | length' 2>/dev/null)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Generated $ticket_count ticket(s):"
echo ""

for i in $(seq 0 $((ticket_count - 1))); do
  title=$(echo "$content" | jq -r ".tickets[$i].title")
  description=$(echo "$content" | jq -r ".tickets[$i].description")
  priority=$(echo "$content" | jq -r ".tickets[$i].priority")
  stack=$(echo "$content" | jq -r ".tickets[$i].stack")
  hours=$(echo "$content" | jq -r ".tickets[$i].estimated_hours")
  
  echo "Ticket $((i + 1)):"
  echo "  Title: $title"
  echo "  Description: $description"
  echo "  Priority: $priority"
  echo "  Stack: $stack"
  echo "  Hours: $hours"
  echo ""
done

# Ask if user wants to create tickets
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
read -p "Create these tickets in Notion? (y/N): " confirm

if [[ "$confirm" =~ ^[Yy]$ ]]; then
  echo ""
  echo "🚀 Creating tickets in Notion..."
  
  for i in $(seq 0 $((ticket_count - 1))); do
    title=$(echo "$content" | jq -r ".tickets[$i].title" | sed 's/"/\\"/g' | cut -c1-80)
    description=$(echo "$content" | jq -r ".tickets[$i].description" | sed 's/"/\\"/g')
    priority=$(echo "$content" | jq -r ".tickets[$i].priority")
    stack=$(echo "$content" | jq -r ".tickets[$i].stack")
    
    # Validate
    [[ "$priority" != "High" && "$priority" != "Medium" && "$priority" != "Low" ]] && priority="Medium"
    [[ "$stack" != "Backend" && "$stack" != "Web Editor" && "$stack" != "Mobile App" && "$stack" != "Dashboard" ]] && stack="Backend"
    
    user_id="18ed872b-594c-81c7-85d8-00024f4f0dab"
    
    page_data='{"parent": {"database_id": "2cfac610-a640-8002-9365-d99a2c917326"}, "properties": {"Project name": {"title": [{"text": {"content": "'"$title"'"}}]}, "Status": {"status": {"name": "In progress"}}, "Priority": {"select": {"name": "'"$priority"'"}}, "Stack": {"select": {"name": "'"$stack"'"}}, "Start date": {"date": {"start": "'$(date +%Y-%m-%d)'"}}, "Assignee": {"people": [{"id": "'"$user_id"'"}]}}, "children": [{"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": "'"$description"'"}}]}}, {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": "Commit: '"${commit_hash:0:8}"'"}}]}}]}'
    
    response=$(curl -s -X POST "https://api.notion.com/v1/pages" \
      -H "Authorization: Bearer $NOTION_API_KEY" \
      -H "Content-Type: application/json" \
      -H "Notion-Version: 2022-06-28" \
      -d "$page_data")
    
    if echo "$response" | grep -q '"object":"page"'; then
      url=$(echo "$response" | grep -o '"url":"[^"]*' | cut -d'"' -f4)
      echo "✅ Created: $title"
      echo "   $url"
    else
      echo "❌ Failed: $title"
      echo "$response" | jq .
    fi
  done
else
  echo "Skipped creating tickets."
fi

echo ""
echo "✨ Test complete!"
