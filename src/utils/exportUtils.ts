import jsPDF from "jspdf";
import { Message } from "@/types";

export const exportToTxt = (messages: Message[], personality: string) => {
  const content = messages
    .map((message) => {
      const timestamp = message.timestamp.toLocaleString();
      const sender = message.isUser
        ? "User"
        : `AI (${message.personality || personality})`;
      return `[${timestamp}] ${sender}: ${message.text}`;
    })
    .join("\n\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ai-chat-${new Date().toISOString().split("T")[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToPdf = (messages: Message[], personality: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;

  let yPosition = 30;

  // Add title
  pdf.setFontSize(18);
  pdf.text("AI Chat Conversation", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 20;

  // Add export date
  pdf.setFontSize(10);
  pdf.text(
    `Exported on: ${new Date().toLocaleString()}`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 15;

  // Add messages
  pdf.setFontSize(11);

  messages.forEach((message) => {
    if (yPosition > pdf.internal.pageSize.getHeight() - 30) {
      pdf.addPage();
      yPosition = 20;
    }

    const timestamp = message.timestamp.toLocaleString();
    const sender = message.isUser
      ? "User"
      : `AI (${message.personality || personality})`;
    const header = `[${timestamp}] ${sender}:`;

    // Add header
    pdf.setFont("helvetica", "bold");
    pdf.text(header, margin, yPosition);
    yPosition += 7;

    // Add message text
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(message.text, maxWidth);
    lines.forEach((line: string) => {
      if (yPosition > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });

    yPosition += 10; // Space between messages
  });

  pdf.save(`ai-chat-${new Date().toISOString().split("T")[0]}.pdf`);
};
