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
import Sidebar from "./pages/sql-editor/Sidebar/Sidebar";
import MonacoEditor from "./pages/sql-editor/MonacoEditor";
import ResultsSection from "./pages/sql-editor/ResultsSection";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 py-2">
        <div className="text-base font-medium">Studio</div>
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
          <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
            <Sidebar />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Content Area */}
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* SQL Editor - Top Half */}
              <ResizablePanel defaultSize={50} minSize={20}>
                <MonacoEditor />
              </ResizablePanel>

              <ResizableHandle />

              {/* Results Table - Bottom Half */}
              <ResizablePanel defaultSize={50} minSize={20}>
                <ResultsSection />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default App;
