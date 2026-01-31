# Setup Notion Automation

## 🚀 GitHub Actions Workflow Created!

I've created an automated workflow that will create Notion tickets from your GitHub commits.

## 📋 Setup Instructions:

### 1. Add Notion API Key to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name it: `NOTION_API_KEY`
5. Value: `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`

### 2. Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**

### 3. Test the Workflow

1. Go to **Actions** tab in your repository
2. Select "Create Notion Tickets from Commits" workflow
3. Click **Run workflow** → **Run workflow**

## 🎯 What the Automation Does:

### **Triggers:**
- ✅ Every push to `main`, `master`, or `pipeline` branches
- ✅ Manual trigger available

### **Features:**
- 🔄 **Smart commit parsing** - Extracts clean titles from commit messages
- 🎯 **Priority detection** - Based on commit patterns (feat/fix/urgent)
- 🏗️ **Stack assignment** - Auto-detects Backend/Frontend/Mobile/Dashboard
- 👤 **User assignment** - Maps GitHub emails to Notion users
- 🚫 **Duplicate prevention** - Skips commits that already have tickets
- 📅 **Date tracking** - Sets start date to current date

### **Commit Pattern Recognition:**
- **High Priority**: `urgent`, `critical`, `hotfix`, `feat`, `feature`, `add`
- **Medium Priority**: Everything else (default)
- **Backend**: `api`, `server`, `backend`
- **Web Editor**: `frontend`, `client`, `ui`
- **Mobile App**: `mobile`, `app`
- **Dashboard**: `dashboard`

## 🔧 User Mapping:

The automation maps GitHub emails to Notion user IDs:
- `hey@alihammad.net` → Ali (you)
- `hassan.21.adnan@gmail.com` → Hasan Adnan

## 📊 Example Output:

For a commit like:
```
feat: Integrate Cloudflare R2 storage for file uploads
```

It will create a Notion ticket with:
- **Title**: "Integrate cloudflare r2 storage for file uploads"
- **Status**: In progress
- **Priority**: High
- **Stack**: Backend
- **Assignee**: Ali (default)
- **Date**: Today

## 🎉 Benefits:

- ⚡ **Automatic** - No manual ticket creation needed
- 📈 **Consistent** - Standardized ticket format
- 🎯 **Smart** - Intelligent categorization
- 🔗 **Connected** - Links Git work to project tracking
- ⏰ **Real-time** - Tickets created on every push

## 🚀 Ready to Go!

Once you add the Notion API key as a GitHub secret, the automation will start working automatically on your next push!
