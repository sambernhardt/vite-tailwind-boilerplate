import ChatContent from "./ChatContent";

function RightSidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-2 pl-4 h-toolbar-header flex items-center">
        <h2 className="text-sm font-medium text-foreground">Chat</h2>
      </div>
      <div className="flex-1 overflow-hidden px-2 pb-2">
        <ChatContent />
      </div>
    </div>
  );
}

export default RightSidebar;
