const ExplorerContent = () => {
  return (
    <div className="space-y-4 p-2">
      <h3 className="text-lg font-medium">Explore</h3>
      <div className="space-y-2">
        <div className="p-3 rounded-lg border border-border">
          <h4 className="font-medium">Database Tables</h4>
          <p className="text-sm mt-1">Browse your database schema</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <h4 className="font-medium">Saved Queries</h4>
          <p className="text-sm mt-1">Access your saved SQL queries</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <h4 className="font-medium">Recent Activity</h4>
          <p className="text-sm mt-1">View recent database operations</p>
        </div>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="p-3 rounded-lg border border-border">
            <h4 className="font-medium">Item {i + 4}</h4>
            <p className="text-sm mt-1">Sample content for scrolling demo</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorerContent;
