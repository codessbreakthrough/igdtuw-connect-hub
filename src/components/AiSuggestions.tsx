
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';

const AiSuggestions: React.FC = () => {
  return (
    <Card className="mb-6 border-primary/30 bg-accent/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Sparkles size={18} className="mr-2 text-primary" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is a placeholder for AI-powered features that will be implemented in the future.
          Potential features include:
        </p>
        <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5">
          <li>Personalized content recommendations</li>
          <li>Automated tagging suggestions</li>
          <li>Question answering based on previous posts</li>
          <li>Content summarization</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AiSuggestions;
