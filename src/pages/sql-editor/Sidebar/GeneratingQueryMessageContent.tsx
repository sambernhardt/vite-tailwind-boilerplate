const GeneratingQueryMessageContent = ({ content }: { content: string }) => {
  return (
    <div className="border border-border rounded-lg p-2 w-full mt-1">
      <p className="text-[13px] text-muted-foreground">{content}</p>
    </div>
  );
};

export default GeneratingQueryMessageContent;
