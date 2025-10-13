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
      <div className="flex-1 min-h-0 px-2">
        <div className="border border-border rounded-lg overflow-auto h-full">
          <table className="w-full text-sm">
            <thead className="bg-card sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-foreground shadow-[inset_0_-1px_0_var(--color-border)]">
                  ID
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground shadow-[inset_0_-1px_0_var(--color-border)]">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground shadow-[inset_0_-1px_0_var(--color-border)]">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground shadow-[inset_0_-1px_0_var(--color-border)]">
                  Order Count
                </th>
                <th className="px-4 py-2 text-left font-medium text-foreground shadow-[inset_0_-1px_0_var(--color-border)]">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 50 }, (_, i) => (
                <tr key={i}>
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
      <div className="flex items-center justify-between p-2">
        <div className="pl-2 text-sm text-muted-foreground">{`1 - 100 of 1000`}</div>
        <div className="flex gap-1 items-center">
          <Button variant="ghost">Previous</Button>
          <Button variant="ghost">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
