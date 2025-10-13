import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExplorerContent from "./ExplorerContent";
import ChatContent from "./ChatContent";

function Sidebar() {
  return (
    <div className="h-full flex flex-col p-2">
      {/* Tab Navigation */}
      <Tabs defaultValue="explore" className="w-full h-full">
        <TabsList className="w-full">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <ExplorerContent />
        </TabsContent>
        <TabsContent value="chat">
          <ChatContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Sidebar;
