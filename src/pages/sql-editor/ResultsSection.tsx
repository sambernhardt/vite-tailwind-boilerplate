import { Button } from "@/components/ui/button";

const ResultsSection = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-1 items-center">
          <Button variant="secondary">Results</Button>
          <Button variant="ghost">Chart</Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-2 pb-2">
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
                  className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
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
  );
};

export default ResultsSection;
