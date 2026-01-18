# 📚 Word a Day

> _Learn English vocabulary one word at a time_

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://word-a-day-app.netlify.app/)

A simple and interactive web application designed to help users learn and practice English vocabulary through daily word discovery. Built with vanilla JavaScript and powered by modern APIs for dynamic, engaging content.

## ✨ Features

- 🎲 **Random Word Generator** - Discover new words every day
- 🔍 **Word Search** - Look up any word for detailed definitions
- 📖 **Multiple Definitions** - Get comprehensive explanations and usage examples
- 🖼️ **Visual Learning** - Beautiful images to help memorize words
- 📱 **Responsive Design** - Perfect for desktop and mobile devices
- 🎨 **Clean UI** - Minimalist interface for distraction-free learning

## 🌐 Live Demo

**Try the app online:** [https://word-a-day-app.netlify.app/](https://word-a-day-app.netlify.app/)

## 💡 The Philosophy

**Trying to learn English fast?**

We often overestimate what can be done in a single day, but underestimate what consistent effort achieves over time. Learning one word a day may seem small, but over time it leads to remarkable results.

_Here, you can learn at your own pace — one word a day or as many as you want. Ready to start your vocabulary journey?_

## 🚀 Getting Started

### Prerequisites

- Modern web browser with ES6 support
- Internet connection (for API calls)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/HannaInIT/word-a-day.git
   cd word-a-day
   ```

2. **Install dependencies** (for development tools)

   ```bash
   npm install
   ```

3. **Open locally**

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"
   ```

4. **Visit** `http://localhost:8000` in your browser

## 🏗️ Project Structure

```
word-a-day/
├── 📄 index.html          # Main HTML file
├── 📁 public/             # Static assets
│   ├── 🎨 style.css       # Styles
│   ├── 🔄 _redirects      # Netlify redirects config
│   └── 🖼️ images/         # Image assets
├── 📁 src/                # Source code
│   ├── ⚡ app.js           # Main application
│   ├── 🔧 constants.js    # App constants
│   ├── ⚙️ config.js       # Environment configuration
│   ├── 📁 pages/          # Page controllers
│   ├── 📁 services/       # API services
│   └── 📁 views/          # UI components
├── 📁 data/               # Static data
│   └── 📋 english_words.json
├── 📄 .env.example        # Environment variables template
├── 🚫 .env               # Your API keys (not in git)
├── 🚫 .gitignore         # Git ignore rules
└── 📄 package.json        # Dependencies
```

## 🔌 API Integration

### Dictionary API

- **Service**: [Dictionary API](https://dictionaryapi.dev/)
- **Purpose**: Fetch word definitions, pronunciations, and examples
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Rate Limit**: No rate limit (free service)

### Unsplash API

- **Service**: [Unsplash API](https://unsplash.com/developers)
- **Purpose**: Dynamic image fetching for visual word association
- **Endpoint**: `https://api.unsplash.com/search/photos`
- **Rate Limit**: 50 requests/hour (demo mode)

## 🔐 API Configuration

### Environment Variables Setup

1. **Copy environment template**:

   ```bash
   cp .env.example .env
   ```

2. **Get Unsplash API Key**:
   - Register at [Unsplash Developers](https://unsplash.com/developers)
   - Create a new application
   - Copy your Access Key

3. **Update your `.env` file**:
   ```bash
   UNSPLASH_ACCESS_KEY=your_actual_key_here
   ```

### For Production Deployment

**Netlify**: Add environment variables in Site Settings → Environment Variables
**Other hosts**: Set `VITE_UNSPLASH_ACCESS_KEY` in your hosting platform

> **Note**: The project includes a fallback demo key for testing, but it has rate limits.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **APIs**: Dictionary API, Unsplash API
- **Deployment**: Netlify
- **Development**: Prettier (code formatting)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. 🍴 Fork the project
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔀 Open a Pull Request

_Built with ❤️ for English language learners_
