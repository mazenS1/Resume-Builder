# ResumeArab

A free, open-source resume builder with full Arabic and English support. Create professional, ATS-friendly resumes that work entirely offline.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.4-blue.svg)

## ✨ Features

- **🌍 Bilingual Support** - Full Arabic (RTL) and English (LTR) support
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🔒 Privacy First** - All data stays in your browser (localStorage)
- **📄 Multiple Export Formats** - Export to PDF and DOCX
- **🎨 Customizable Themes** - Light/dark mode with customizable colors and fonts
- **📝 ATS-Friendly** - Clean, parseable resume format that passes ATS systems
- **🔄 Drag & Drop** - Reorder sections and entries easily
- **💾 Auto-Save** - Never lose your work
- **📥 Import/Export JSON** - Backup and restore your resume data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resumearab.git
cd resumearab

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:5174`

### Build for Production

```bash
# Build the app
pnpm build

# Preview the production build
pnpm preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React PDF** - PDF generation
- **docx** - Word document generation
- **dnd-kit** - Drag and drop
- **Radix UI** - Accessible components

## 📁 Project Structure

```
src/
├── components/
│   ├── common/      # Shared components (ThemeToggle, LanguageToggle, etc.)
│   ├── resume/      # Resume builder components
│   │   ├── sections/  # Form sections (BasicInfo, Experience, etc.)
│   │   └── ...
│   ├── ui/          # Base UI components (Button, Input, Dialog, etc.)
│   └── welcome/     # Welcome/onboarding screen
├── data/            # Sample resume data
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── store/           # Zustand stores
└── types/           # TypeScript type definitions
```

## 🎨 Customization

### Fonts

The app uses:

- **EB Garamond** - For English content
- **IBM Plex Sans Arabic** - For Arabic content

You can customize fonts in the Theme Settings dialog.

### Colors

Customize accent colors and primary colors through the Theme Settings.

## 🌐 Deployment

The app is a static site that can be deployed to any hosting service:

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the app
pnpm build

# Deploy the 'dist' folder to Netlify
```

### GitHub Pages

1. Build the app: `pnpm build`
2. Push the `dist` folder to your `gh-pages` branch
3. Enable GitHub Pages in your repository settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

Made with ❤️ for the Arabic-speaking community and beyond.
