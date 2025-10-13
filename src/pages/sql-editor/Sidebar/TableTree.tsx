import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  Database,
  Table,
  BarChart3,
  Blocks,
  FileCode,
} from "lucide-react";
import { Fragment, useState } from "react";

export type TableItem = {
  id: string;
  name: string;
  children?: TableItem[];
};

const ITEM_HEIGHT = 38;

interface TableTreeProps {
  tables: TableItem[];
}

const TableTree = ({ tables }: TableTreeProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["metrics.metrics", "metrics"])
  );

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getIcon = (name: string) => {
    if (name.includes("blockchain"))
      return <Database size={12} className="text-muted-foreground" />;
    if (name.includes("contracts"))
      return <FileCode size={12} className="text-muted-foreground" />;
    if (name.includes("primitives"))
      return <Blocks size={12} className="text-muted-foreground" />;
    if (name.includes("metrics"))
      return <BarChart3 size={12} className="text-muted-foreground" />;
    return <Table size={12} className="text-muted-foreground" />;
  };

  const renderTree = (items: TableItem[], level = 0) => {
    return items.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const paddingLeft = level * 16 + 8;

      let top;
      if (level === 0) {
        top = -12;
      } else if (level === 1) {
        top = -12 + ITEM_HEIGHT;
      }

      return (
        <Fragment key={item.id || item.name}>
          <div
            className={cn(
              hasChildren && isExpanded && "sticky",
              "collapsible-group-header",
              "flex items-center gap-2 py-2 px-2 bg-card hover:bg-muted dark:hover:bg-popover cursor-pointer border-b border-border",
              "[[data-tree-root]>&:first-child]:rounded-t-md",
              "[[data-tree-root]>&:last-child]:rounded-b-md",
              "[[data-tree-root]>&:last-child]:border-b-0"
            )}
            style={{
              height: `${ITEM_HEIGHT}px`,
              paddingLeft: `${paddingLeft}px`,
              top: `${top}px`,
            }}
            onClick={() => hasChildren && toggleExpanded(item.id)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown size={14} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={14} className="text-muted-foreground" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
              {getIcon(item.name)}
              <span className="text-sm truncate flex-1">{item.name}</span>
            </div>
            {item.children && (
              <span className="text-xs text-muted-foreground pr-1">
                {item.children.length}
              </span>
            )}
          </div>
          {hasChildren && isExpanded && item.children && (
            <>{renderTree(item.children, level + 1)}</>
          )}
        </Fragment>
      );
    });
  };

  return (
    <div data-tree-root className="border border-border rounded-md">
      {renderTree(tables)}
    </div>
  );
};

export default TableTree;
