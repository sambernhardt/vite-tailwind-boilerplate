import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  PlusIcon,
  X,
  RefreshCw,
  Sparkles,
  Sidebar,
  MessagesSquare,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAtomValue } from "jotai";
import { queryTitleAtom, querySqlAtom } from "@/lib/queryAtoms";
import Editor from "@monaco-editor/react";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

const MonacoEditor = ({
  isLeftSidebarOpen,
  handleExpandLeftSidebar,
  isRightSidebarOpen,
  handleExpandRightSidebar,
}: {
  isLeftSidebarOpen: boolean;
  handleExpandLeftSidebar: () => void;
  isRightSidebarOpen: boolean;
  handleExpandRightSidebar: () => void;
}) => {
  const queryTitle = useAtomValue(queryTitleAtom);
  const querySql = useAtomValue(querySqlAtom);
  const { theme } = useTheme();
  const [monacoTheme, setMonacoTheme] = useState<string>("vs-dark");

  useEffect(() => {
    const getMonacoTheme = () => {
      if (theme === "light") {
        return "light";
      } else if (theme === "dark") {
        return "vs-dark";
      } else {
        // system theme - check actual applied theme
        const isDark = document.documentElement.classList.contains("dark");
        return isDark ? "vs-dark" : "light";
      }
    };

    setMonacoTheme(getMonacoTheme());

    // Listen for system theme changes when theme is "system"
    if (theme === "system") {
      const observer = new MutationObserver(() => {
        setMonacoTheme(getMonacoTheme());
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, [theme]);
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border h-toolbar-header">
        <div className="flex gap-1 items-center">
          {!isLeftSidebarOpen && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={handleExpandLeftSidebar}
                >
                  <Sidebar />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open explorer</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Button variant="ghost">
            {queryTitle}
            <X className="text-muted-foreground" />
          </Button>
          {false && (
            <Button size="icon" variant="ghost">
              <PlusIcon />
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="default">Save</Button>
          {!isRightSidebarOpen && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={handleExpandRightSidebar}
                >
                  <MessagesSquare />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open chat</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pt-3 pb-2">
        <div className="h-full border border-border rounded-lg overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="sql"
            value={querySql}
            theme={monacoTheme}
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground pl-2">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs">
            Press <Kbd>Cmd + i</Kbd> to edit with a prompt
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Estimated usage 20.11 MB
          </span>
          <Button variant="outline" size="sm" className="border-dashed">
            <RefreshCw className="!w-3 !h-3" />
            Add refresh
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm">Run query</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>CMD + Enter</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
