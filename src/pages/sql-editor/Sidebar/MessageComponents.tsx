import { memo, RefObject } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import GeneratingQueryMessageContent from "./GeneratingQueryMessageContent";

export type Message = {
  id: number;
  content: string;
  component?: "generating-query";
  thinking?: boolean;
  role: "user" | "assistant" | "system";
};

export const UserMessageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      data-role="user"
      className="flex justify-end ml-4 mt-3 [[data-role=user]_+_&]:mt-1 first:mt-0"
    >
      {children}
    </div>
  );
};

export const SystemMessageWrapper = ({
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

export const UserMessage = memo(
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

export const AssistantMessage = memo(
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

export const SystemMessage = memo(
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

export const GeneratingQueryMessage = memo(
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

// Message renderer component that handles all message types
export const MessageRenderer = memo(
  ({
    message,
    index,
    totalMessages,
    enableAnimationRef,
  }: {
    message: Message;
    index: number;
    totalMessages: number;
    enableAnimationRef: RefObject<boolean>;
  }) => {
    const isMostRecentMessage = index === totalMessages - 1;

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
  }
);
