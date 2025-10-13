import { useEffect, useRef, useState, useCallback } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ArrowUpIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useAtomValue } from "jotai";
import { queryContextAtom } from "@/lib/queryAtoms";
import { streamChatResponse } from "@/lib/chatStream";
import { Streamdown } from "streamdown";
import type { ModelMessage } from "ai";

type UIMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  parts: Array<{ type: "text"; text: string }>;
};

const ChatContent = () => {
  const enableAnimationRef = useRef(false);
  const queryContext = useAtomValue(queryContextAtom);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: "1",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "How can I help you with your SQL queries today?",
        },
      ],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: UIMessage = {
        id: Date.now().toString(),
        role: "user",
        parts: [{ type: "text", text: content.trim() }],
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Convert messages to ModelMessage format
        const modelMessages: ModelMessage[] = [...messages, userMessage].map(
          (msg) => ({
            role: msg.role,
            content: msg.parts.map((part) => part.text).join(""),
          })
        );

        const response = await streamChatResponse(modelMessages, queryContext);

        // Add assistant message placeholder
        const assistantMessageId = (Date.now() + 1).toString();
        const assistantMessage: UIMessage = {
          id: assistantMessageId,
          role: "assistant",
          parts: [{ type: "text", text: "" }],
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            accumulatedContent += chunk;

            // Update the message in real-time
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? {
                      ...msg,
                      parts: [{ type: "text", text: accumulatedContent }],
                    }
                  : msg
              )
            );
          }
        }
      } catch (error) {
        console.error("Error in chat:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "system",
            parts: [
              {
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
              },
            ],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, queryContext, isLoading]
  );

  useEffect(() => {
    enableAnimationRef.current = true;
  }, []);

  // Helper function to get text content from message parts
  const getMessageText = (message: any) => {
    if (message.parts) {
      return message.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    }
    return message.content || "";
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="p-2 flex-1 overflow-y-auto">
        {messages.map((message, index) => {
          const isMostRecentMessage = index === messages.length - 1;
          const messageText = getMessageText(message);

          return (
            <div
              key={message.id}
              className={`mt-3 first:mt-0 ${
                message.role === "user" ? "flex justify-end ml-4" : "flex"
              } ${enableAnimationRef.current ? "fade-in-up" : ""}`}
            >
              {message.role === "user" ? (
                <div className="text-[13px] px-3 py-2 rounded-lg bg-accent">
                  {messageText}
                </div>
              ) : (
                <div className="text-[13px] w-full">
                  <Streamdown
                    isAnimating={isLoading && isMostRecentMessage}
                    className="w-full"
                  >
                    {messageText}
                  </Streamdown>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim() && !isLoading) {
            sendMessage(input.trim());
            setInput("");
          }
        }}
      >
        <InputGroup>
          <InputGroupTextarea
            placeholder="Ask or chat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  sendMessage(input.trim());
                  setInput("");
                }
              }
            }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="outline"
              className="rounded-full"
              size="icon-xs"
            >
              <IconPlus />
            </InputGroupButton>
            {false && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton variant="ghost">Auto</InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="[--radius:0.95rem]"
                >
                  <DropdownMenuItem>Auto</DropdownMenuItem>
                  <DropdownMenuItem>Agent</DropdownMenuItem>
                  <DropdownMenuItem>Manual</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <InputGroupButton
              type="submit"
              variant="default"
              className="rounded-full ml-auto"
              size="icon-xs"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Spinner className="size-3" /> : <ArrowUpIcon />}
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
};

export default ChatContent;
