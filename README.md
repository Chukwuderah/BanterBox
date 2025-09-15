# BanterBox

**BanterBox** is an AI-powered chat interface built with Next.js. It now integrates with Google Gemini AI for smarter, more dynamic responses—while still falling back to the classic local banter library if Gemini is slow or unavailable. Choose your AI’s personality and enjoy witty, sarcastic, formal, or totally random conversations.

---

## Features

- **Multiple Personalities:** Friendly, Sarcastic, Formal, or Random—each with unique banter styles.

- **Gemini-Powered Responses:** Smarter AI responses from Google Gemini.

- **Fallback Mode:** If Gemini times out, BanterBox falls back to the local banter library—complete with toast notifications so you know what’s happening.

- **Voice Input/Output:** Talk to BanterBox and hear its replies (optional).

- **Export Conversations:** Save chats as .txt or .pdf.

- **Theme Toggle:** Light and dark mode ready.

- **Responsive Design:** Optimized for mobile and desktop.

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

2. **Set up environment variables:**

   Create a `.env.local` file and add your Gemini API key:

   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open BanterBox:**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Select Personality:** Use the dropdown in the header to choose your AI's personality.
- **Chat:** Type or speak your message. The AI will respond in the chosen style.
- **Fallback:** If Gemini takes too long, BanterBox switches to local banter and shows you a toast.
- **Export:** Click the export button to save your conversation.
- **Theme:** Toggle between light and dark mode for your preferred look.

---

## Project Structure

- `src/app/` — Next.js app directory
- `src/components/` — UI components (Header, ChatWindow, InputBar, etc.)
- `src/utils/` — AI response handling, fallback logic, export tools
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

**Enjoy the banter—now turbocharged with Gemini!!**