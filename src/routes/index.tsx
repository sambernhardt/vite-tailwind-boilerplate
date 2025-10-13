import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeTab, setActiveTab] = useState<"explore" | "chat">("explore");

  return (
    <div className="w-screen h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
          <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-sidebar-border">
              <button
                onClick={() => setActiveTab("explore")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "explore"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-b-2 border-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "chat"
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-b-2 border-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                Chat
              </button>
            </div>

            {/* Tab Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === "explore" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-sidebar-foreground">
                    Explore
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-sidebar-accent rounded-lg">
                      <h4 className="font-medium text-sidebar-accent-foreground">
                        Database Tables
                      </h4>
                      <p className="text-sm text-sidebar-foreground/70 mt-1">
                        Browse your database schema
                      </p>
                    </div>
                    <div className="p-3 bg-sidebar-accent rounded-lg">
                      <h4 className="font-medium text-sidebar-accent-foreground">
                        Saved Queries
                      </h4>
                      <p className="text-sm text-sidebar-foreground/70 mt-1">
                        Access your saved SQL queries
                      </p>
                    </div>
                    <div className="p-3 bg-sidebar-accent rounded-lg">
                      <h4 className="font-medium text-sidebar-accent-foreground">
                        Recent Activity
                      </h4>
                      <p className="text-sm text-sidebar-foreground/70 mt-1">
                        View recent database operations
                      </p>
                    </div>
                    {/* Add more items to demonstrate scrolling */}
                    {Array.from({ length: 10 }, (_, i) => (
                      <div key={i} className="p-3 bg-sidebar-accent rounded-lg">
                        <h4 className="font-medium text-sidebar-accent-foreground">
                          Item {i + 4}
                        </h4>
                        <p className="text-sm text-sidebar-foreground/70 mt-1">
                          Sample content for scrolling demo
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-sidebar-foreground">
                    Chat
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-sidebar-accent rounded-lg">
                      <p className="text-sm text-sidebar-accent-foreground">
                        How can I help you with your SQL queries today?
                      </p>
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg ${i % 2 === 0 ? "bg-sidebar-accent ml-4" : "bg-sidebar-primary text-sidebar-primary-foreground mr-4"}`}
                        >
                          <p className="text-sm">
                            {i % 2 === 0
                              ? `User message ${i + 1}`
                              : `AI response ${i + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Content Area */}
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* SQL Editor - Top Half */}
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="px-4 py-2 bg-muted border-b border-border">
                  <h2 className="text-sm font-medium text-foreground">
                    SQL Editor
                  </h2>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="bg-card border border-border rounded-lg p-4 text-sm font-mono text-card-foreground overflow-auto">
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
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Results Table - Bottom Half */}
            <ResizablePanel defaultSize={50} minSize={20}>
              <div className="h-full flex flex-col">
                <div className="px-4 py-2 bg-muted border-b border-border">
                  <h2 className="text-sm font-medium text-foreground">
                    Query Results
                  </h2>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-foreground border-b border-border">
                            ID
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-foreground border-b border-border">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-foreground border-b border-border">
                            Email
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-foreground border-b border-border">
                            Order Count
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-foreground border-b border-border">
                            Total Spent
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 50 }, (_, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 0 ? "bg-background" : "bg-muted/30"
                            }
                          >
                            <td className="px-4 py-2 text-foreground border-b border-border/50">
                              {1000 + i}
                            </td>
                            <td className="px-4 py-2 text-foreground border-b border-border/50">
                              User {i + 1}
                            </td>
                            <td className="px-4 py-2 text-foreground border-b border-border/50">
                              user{i + 1}@example.com
                            </td>
                            <td className="px-4 py-2 text-foreground border-b border-border/50">
                              {Math.floor(Math.random() * 20) + 1}
                            </td>
                            <td className="px-4 py-2 text-foreground border-b border-border/50">
                              ${(Math.random() * 5000 + 100).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
