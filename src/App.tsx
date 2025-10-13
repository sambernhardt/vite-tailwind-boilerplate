import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LeftSidebar from "./pages/sql-editor/Sidebar/LeftSidebar";
import RightSidebar from "./pages/sql-editor/Sidebar/RightSidebar";
import MonacoEditor from "./pages/sql-editor/MonacoEditor";
import ResultsSection from "./pages/sql-editor/ResultsSection";
import Logo from "./Logo";
import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

function App() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const leftSidebarRef = useRef<ImperativePanelHandle>(null!);
  const rightSidebarRef = useRef<ImperativePanelHandle>(null!);

  const collapseLeftSidebar = () => {
    const panel = leftSidebarRef.current;
    if (panel) {
      panel.collapse();
      setIsLeftSidebarOpen(false);
    }
  };

  const expandLeftSidebar = () => {
    const panel = leftSidebarRef.current;
    if (panel) {
      panel.expand();
      setIsLeftSidebarOpen(true);
    }
  };

  const collapseRightSidebar = () => {
    const panel = rightSidebarRef.current;
    if (panel) {
      panel.collapse();
      setIsRightSidebarOpen(false);
    }
  };

  const expandRightSidebar = () => {
    const panel = rightSidebarRef.current;
    if (panel) {
      panel.expand();
      setIsRightSidebarOpen(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 py-2">
        <div className="flex gap-2 items-center">
          <Logo />
          <div className="text-[15px] mb-0.5">Queries</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Avatar className="w-4 h-4">
                <AvatarImage
                  src="https://github.com/sambernhardt.png"
                  alt="User Avatar"
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground">sambernhardt</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex-1 min-h-0 px-4 pb-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full border border-border rounded-xl bg-card"
        >
          {/* Left Sidebar */}
          <ResizablePanel
            ref={leftSidebarRef}
            defaultSize={20}
            minSize={15}
            maxSize={35}
            collapsible
          >
            <LeftSidebar handleClose={collapseLeftSidebar} />
          </ResizablePanel>

          <ResizableHandle className={isLeftSidebarOpen ? "" : "opacity-0"} />

          {/* Middle Content Area */}
          <ResizablePanel defaultSize={60} minSize={30} className="-ml-px">
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* SQL Editor - Top Half */}
              <ResizablePanel defaultSize={50} minSize={20}>
                <MonacoEditor
                  isLeftSidebarOpen={isLeftSidebarOpen}
                  handleExpandLeftSidebar={expandLeftSidebar}
                  isRightSidebarOpen={isRightSidebarOpen}
                  handleExpandRightSidebar={expandRightSidebar}
                />
              </ResizablePanel>

              <ResizableHandle />

              {/* Results Table - Bottom Half */}
              <ResizablePanel defaultSize={50} minSize={20}>
                <ResultsSection />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className={isRightSidebarOpen ? "" : "opacity-0"} />

          {/* Right Sidebar */}
          <ResizablePanel
            ref={rightSidebarRef}
            defaultSize={20}
            minSize={15}
            maxSize={35}
            collapsible
          >
            <RightSidebar handleClose={collapseRightSidebar} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default App;
