# BanterBox

**BanterBox** is an AI-powered chat interface built with Next.js. It features multiple personalities, each providing unique responses ("bants") based on your selection. Enjoy friendly, sarcastic, formal, or random banter, with a beautiful UI, voice input/output, and conversation export capabilities.

---

## Features

- 🧑‍🎤 **Multiple Personalities:** Choose from Friendly, Sarcastic, Formal, or Random for varied AI responses.
- 💬 **Dynamic Bants:** The AI adapts its tone and style based on the selected personality.
- 🎙️ **Voice Input/Output:** Speak to BanterBox and hear its replies (if enabled).
- 📤 **Export Conversations:** Download your chat history as `.txt`, `.pdf`, or `.md`.
- 🌗 **Theme Toggle:** Switch between light and dark modes.
- 📱 **Responsive Design:** Optimized for mobile and desktop.

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open BanterBox:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Select Personality:** Use the dropdown in the header to choose your AI's personality.
- **Chat:** Type or speak your message. The AI will respond in the chosen style.
- **Export:** Click the export button to save your conversation.
- **Theme:** Toggle between light and dark mode for your preferred look.

---

## Project Structure

- `src/app/` — Next.js app directory
- `src/components/` — UI components (Header, Chat, Personality Selector, etc.)
- `src/types/` — TypeScript types for personalities, themes, etc.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select)

---

## Deploy

Deploy BanterBox easily on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---

## License

MIT

---

**Enjoy the banter!**