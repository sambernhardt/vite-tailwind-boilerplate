import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { generateChatResponse } from "@/lib/openai";
import type { CoreMessage } from "ai";
import { Message, MessageRenderer } from "./MessageComponents";

// Convert our Message type to CoreMessage for AI SDK
const convertToCoreMessage = (message: Message): CoreMessage => ({
  role: message.role === "system" ? "system" : message.role,
  content: message.content,
});

const defaultMessages: Message[] = [
  {
    id: 1,
    content: "How can I help you with your SQL queries today?",
    role: "assistant",
  },
  {
    id: 2,
    content: "I have a question about the data in the database.",
    role: "user",
  },
  {
    id: 3,
    content: "I need to know the total sales for the month of January.",
    role: "user",
  },
  {
    id: 4,
    content: "Let me help you with that.",
    role: "assistant",
  },
];

const handleAIResponse = async (
  messages: Message[],
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  // Add thinking message
  setMessages((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      content: "Thinking",
      thinking: true,
      role: "system",
    },
  ]);

  try {
    // Convert messages to CoreMessage format, excluding system messages with thinking/component flags
    const coreMessages: CoreMessage[] = messages
      .filter(
        (msg) => !(msg.role === "system" && (msg.thinking || msg.component))
      )
      .map(convertToCoreMessage);

    const response = await generateChatResponse(coreMessages);

    if (response.success && response.text) {
      // Remove thinking message and add AI response
      setMessages((prev) => {
        const withoutThinking = prev.filter(
          (msg) => !(msg.thinking && msg.role === "system")
        );
        return [
          ...withoutThinking,
          {
            id: withoutThinking.length + 1,
            content: response.text,
            role: "assistant",
          },
        ];
      });
    } else {
      // Remove thinking message and add error message
      setMessages((prev) => {
        const withoutThinking = prev.filter(
          (msg) => !(msg.thinking && msg.role === "system")
        );
        return [
          ...withoutThinking,
          {
            id: withoutThinking.length + 1,
            content: `Error: ${response.error || "Failed to generate response"}`,
            role: "system",
          },
        ];
      });
    }
  } catch (error) {
    // Remove thinking message and add error message
    setMessages((prev) => {
      const withoutThinking = prev.filter(
        (msg) => !(msg.thinking && msg.role === "system")
      );
      return [
        ...withoutThinking,
        {
          id: withoutThinking.length + 1,
          content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
          role: "system",
        },
      ];
    });
  }
};

const ChatContent = () => {
  const enableAnimationRef = useRef(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    enableAnimationRef.current = true;
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message || isLoading) return;

      setInput("");
      setIsLoading(true);

      const newMessages = [
        ...messages,
        { id: messages.length + 1, content: message, role: "user" as const },
      ];

      setMessages(newMessages);

      try {
        await handleAIResponse(newMessages, setMessages);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="p-2 flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <MessageRenderer
            key={message.id}
            message={message}
            index={index}
            totalMessages={messages.length}
            enableAnimationRef={enableAnimationRef}
          />
        ))}
      </div>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Ask or chat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey) {
              e.preventDefault();
              await sendMessage(input);
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
          {/* <InputGroupText className="ml-auto">52% used</InputGroupText> */}
          {/* <Separator orientation="vertical" className="!h-4" /> */}
          <InputGroupButton
            variant="default"
            className="rounded-full ml-auto"
            size="icon-xs"
            disabled={!input || isLoading}
            onClick={() => sendMessage(input)}
          >
            {isLoading ? <Spinner className="size-3" /> : <ArrowUpIcon />}
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatContent;
