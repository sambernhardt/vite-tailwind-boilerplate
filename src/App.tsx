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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <div className="h-full border-r border-border flex flex-col p-2">
              {/* Tab Navigation */}
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="account">Explore</TabsTrigger>
                  <TabsTrigger value="password">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="space-y-4 p-4">
                    <h3 className="text-lg font-semibold text-sidebar-foreground">
                      Explore
                    </h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg">
                        <h4 className="font-medium text-sidebar-accent-foreground">
                          Database Tables
                        </h4>
                        <p className="text-sm text-sidebar-foreground/70 mt-1">
                          Browse your database schema
                        </p>
                      </div>
                      <div className="p-3 rounded-lg">
                        <h4 className="font-medium text-sidebar-accent-foreground">
                          Saved Queries
                        </h4>
                        <p className="text-sm text-sidebar-foreground/70 mt-1">
                          Access your saved SQL queries
                        </p>
                      </div>
                      <div className="p-3 rounded-lg">
                        <h4 className="font-medium text-sidebar-accent-foreground">
                          Recent Activity
                        </h4>
                        <p className="text-sm text-sidebar-foreground/70 mt-1">
                          View recent database operations
                        </p>
                      </div>
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="p-3 rounded-lg">
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
                </TabsContent>
                <TabsContent value="password">
                  <div className="space-y-4 p-4">
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
                            className={`p-3 rounded-lg ${
                              i % 2 === 0
                                ? "bg-sidebar-accent ml-4"
                                : "bg-sidebar-primary text-sidebar-primary-foreground mr-4"
                            }`}
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
                </TabsContent>
              </Tabs>
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
    </div>
  );
}

export default App;
