import { X } from "lucide-react";
import ChatContent from "./ChatContent";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function RightSidebar({ handleClose }: { handleClose: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border py-3 pl-4 pr-2 h-toolbar-header flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Chat</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
              onClick={handleClose}
            >
              <X />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close chat</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex-1 overflow-hidden px-2 pb-2">
        <ChatContent />
      </div>
    </div>
  );
}

export default RightSidebar;
