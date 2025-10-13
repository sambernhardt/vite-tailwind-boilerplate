import { SidebarClose } from "lucide-react";
import ExplorerContent from "./ExplorerContent";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function LeftSidebar({ handleClose }: { handleClose: () => void }) {
  return (
    <div className="h-full flex flex-col ">
      <div className="border-b border-border py-3 pl-4 pr-2 h-toolbar-header flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Explore</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
              onClick={handleClose}
            >
              <SidebarClose />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close explorer</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <ExplorerContent />
      </div>
    </div>
  );
}

export default LeftSidebar;
