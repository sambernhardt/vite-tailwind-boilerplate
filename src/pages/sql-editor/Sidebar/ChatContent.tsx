import { useCallback, useState } from "react";
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

const defaultMessages = [
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

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div data-role="user" className="px-3 py-2 rounded-lg bg-accent ml-4">
      <p className="text-sm">{content}</p>
    </div>
  );
};

const AssistantMessage = ({ content }: { content: string }) => {
  return (
    <div data-role="assistant">
      <p className="text-sm">{content}</p>
    </div>
  );
};

const ChatContent = () => {
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState("");

  const sendMessage = useCallback(
    (message: string) => {
      if (!message) return;

      setInput("");
      setMessages([
        ...messages,
        { id: messages.length + 1, content: message, role: "user" },
      ]);
    },
    [messages]
  );

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="p-2 space-y-3 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((message) =>
            message.role === "assistant" ? (
              <AssistantMessage key={message.id} content={message.content} />
            ) : (
              <UserMessage key={message.id} content={message.content} />
            )
          )}
        </div>
      </div>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Ask or chat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.altKey && !e.ctrlKey) {
              e.preventDefault();
              sendMessage(input);
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
            disabled={!input}
            onClick={() => sendMessage(input)}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatContent;
