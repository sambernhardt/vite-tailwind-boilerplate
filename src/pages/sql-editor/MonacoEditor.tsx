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
            Aave TVL by asset
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
        <pre className="h-full bg-background border border-border rounded-lg p-4 text-xs font-mono text-card-foreground overflow-auto">
          <code>{`-- Welcome to the SQL Editor
-- Write your SQL queries here

SELECT 
    users.id,
    users.name,
    users.email,
    COUNT(orders.id) as order_count,
    SUM(orders.total) as total_spent
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.created_at >= '2024-01-01'
GROUP BY users.id, users.name, users.email
HAVING COUNT(orders.id) > 0
ORDER BY total_spent DESC
LIMIT 100;

-- You can write multiple queries
-- Each query can be executed separately

SELECT * FROM products 
WHERE category = 'electronics' 
AND price BETWEEN 100 AND 1000
ORDER BY price ASC;

-- More sample content to demonstrate scrolling
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Another query example
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(total) as monthly_total
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
    month,
    monthly_total,
    LAG(monthly_total) OVER (ORDER BY month) as prev_month,
    ROUND(
        ((monthly_total - LAG(monthly_total) OVER (ORDER BY month)) / 
         LAG(monthly_total) OVER (ORDER BY month)) * 100, 2
    ) as growth_rate
FROM monthly_sales
ORDER BY month;`}</code>
        </pre>
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
