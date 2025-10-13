import {
  Dispatch,
  memo,
  RefObject,
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
import GeneratingQueryMessageContent from "./GeneratingQueryMessageContent";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type Message = {
  id: number;
  content: string;
  component?: "generating-query";
  thinking?: boolean;
  role: "user" | "assistant" | "system";
};

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

const defaultMessagesWithFakeResponse: Message[] = [
  ...defaultMessages,
  {
    id: 5,
    content: "Thinking",
    role: "system",
    thinking: true,
  },
  {
    id: 6,
    content: "Analyzing the data",
    role: "system",
    thinking: true,
  },
  {
    id: 7,
    content: "Writing SQL",
    role: "system",
    component: "generating-query",
  },
  // {
  //   id: 8,
  //   content: "Validating query",
  //   thinking: true,
  //   role: "assistant",
  // },
];

const UserMessageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      data-role="user"
      className="flex justify-end ml-4 mt-3 [[data-role=user]_+_&]:mt-1 first:mt-0"
    >
      {children}
    </div>
  );
};

const SystemMessageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      data-role="system"
      className={cn(
        "flex mt-3 [[data-role=system]_+_&]:mt-1 first:mt-0",
        className
      )}
    >
      {children}
    </div>
  );
};

const UserMessage = memo(
  ({
    content,
    enableAnimationRef,
  }: {
    content: string;
    enableAnimationRef: RefObject<boolean>;
  }) => {
    return (
      <UserMessageWrapper>
        <p
          className={cn(
            "text-[13px] px-3 py-2 rounded-lg bg-accent ",
            enableAnimationRef.current && "fade-in-up"
          )}
        >
          {content}
        </p>
      </UserMessageWrapper>
    );
  }
);

const AssistantMessage = memo(
  ({
    content,
    enableAnimationRef,
  }: {
    content: string;
    enableAnimationRef: RefObject<boolean>;
  }) => {
    return (
      <SystemMessageWrapper
        className={cn(enableAnimationRef.current && "fade-in-up")}
      >
        <p className="text-[13px]">{content}</p>
      </SystemMessageWrapper>
    );
  }
);

const SystemMessage = memo(
  ({
    content,
    thinking,
    enableAnimationRef,
  }: {
    content: string;
    thinking?: boolean;
    enableAnimationRef: RefObject<boolean>;
  }) => {
    return (
      <SystemMessageWrapper
        className={cn(enableAnimationRef.current && "fade-in-up")}
      >
        <div className="flex gap-2 items-center">
          <p className="text-xs text-muted-foreground">{content}</p>
          {thinking && <Spinner className="size-3" />}
        </div>
      </SystemMessageWrapper>
    );
  }
);

const GeneratingQueryMessage = memo(
  ({
    content,
    enableAnimationRef,
  }: {
    content: string;
    enableAnimationRef: RefObject<boolean>;
  }) => {
    return (
      <SystemMessageWrapper
        className={cn(
          "w-full flex flex-col gap-1",
          enableAnimationRef.current && "fade-in-up"
        )}
      >
        <p className="text-xs text-muted-foreground">{content}</p>
        <GeneratingQueryMessageContent content={content} />
      </SystemMessageWrapper>
    );
  }
);

const handleFakeResponse = async (
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  // First send a "Thinking" message

  await new Promise((resolve) => setTimeout(resolve, 300));

  setMessages((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      content: "Thinking",
      thinking: true,
      role: "system",
    },
  ]);

  // Then send another message about analyzing the data
  await new Promise((resolve) => setTimeout(resolve, 3000));
  setMessages((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      content: "Analyzing the data",
      thinking: true,
      role: "system",
    },
  ]);

  // Then we'll send one that's like "Writing SQL and we'll include a custom content snippet so we can render a custom react component"
  await new Promise((resolve) => setTimeout(resolve, 5000));
  setMessages((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      content: "Writing SQL",
      role: "system",
      component: "generating-query",
    },
  ]);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  setMessages((prev) => [
    ...prev,
    {
      id: prev.length + 1,
      content: "Query generated successfully.",
      role: "assistant",
    },
  ]);
};

const ChatContent = () => {
  const enableAnimationRef = useRef(false);
  const [messages, setMessages] = useState<Message[]>(
    defaultMessages
    // defaultMessagesWithFakeResponse
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    enableAnimationRef.current = true;
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!message) return;

      setInput("");
      setMessages([
        ...messages,
        { id: messages.length + 1, content: message, role: "user" },
      ]);
      handleFakeResponse(setMessages);
    },
    [messages]
  );

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="p-2 flex-1 overflow-y-auto">
        {messages.map((message, index) => {
          const isMostRecentMessage = index === messages.length - 1;

          if (message.component === "generating-query" && isMostRecentMessage) {
            return (
              <GeneratingQueryMessage
                key={message.id}
                content={message.content}
                enableAnimationRef={enableAnimationRef}
              />
            );
          } else if (
            message.component === "generating-query" &&
            !isMostRecentMessage
          ) {
            return (
              <SystemMessage
                key={message.id}
                content={message.content}
                enableAnimationRef={enableAnimationRef}
              />
            );
          } else if (message.role === "system") {
            return (
              <SystemMessage
                key={message.id}
                content={message.content}
                thinking={message.thinking && isMostRecentMessage}
                enableAnimationRef={enableAnimationRef}
              />
            );
          } else if (message.role === "assistant") {
            return (
              <AssistantMessage
                key={message.id}
                content={message.content}
                enableAnimationRef={enableAnimationRef}
              />
            );
          } else {
            return (
              <UserMessage
                key={message.id}
                content={message.content}
                enableAnimationRef={enableAnimationRef}
              />
            );
          }
        })}
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
