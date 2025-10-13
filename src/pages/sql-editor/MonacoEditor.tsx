import { Button } from "@/components/ui/button";
import { PlusIcon, X, RefreshCw, Sparkles, SidebarClose } from "lucide-react";

const MonacoEditor = ({
  isLeftSidebarOpen,
  handleExpandLeftSidebar,
}: {
  isLeftSidebarOpen: boolean;
  handleExpandLeftSidebar: () => void;
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1 px-2 py-2 border-b border-border h-toolbar-header">
        {!isLeftSidebarOpen && (
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground"
            onClick={handleExpandLeftSidebar}
          >
            <SidebarClose />
          </Button>
        )}
        <Button variant="ghost">
          Query 1
          <X className="text-muted-foreground" />
        </Button>
        <Button size="icon" variant="ghost">
          <PlusIcon />
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
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
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground pl-2">
          <Sparkles className="w-3 h-3 fill-current" />
          <span className="text-xs">Press ⌘I to edit with a prompt</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Estimated usage 20.11 MB
          </span>
          <Button variant="outline" size="sm" className="border-dashed">
            <RefreshCw className="!w-3 !h-3" />
            Add refresh
          </Button>
          <Button size="sm">Run query</Button>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
