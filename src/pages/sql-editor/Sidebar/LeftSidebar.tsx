import { SidebarClose } from "lucide-react";
import ExplorerContent from "./ExplorerContent";
import { Button } from "@/components/ui/button";

function LeftSidebar({ handleClose }: { handleClose: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border py-3 pl-4 pr-2 h-toolbar-header flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Explore</h2>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground"
          onClick={handleClose}
        >
          <SidebarClose />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <ExplorerContent />
      </div>
    </div>
  );
}

export default LeftSidebar;
