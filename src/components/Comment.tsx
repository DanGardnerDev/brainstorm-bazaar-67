
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CommentAuthor {
  id: string;
  username: string;
}

export interface CommentType {
  id: string;
  text: string;
  author: CommentAuthor;
  createdAt: string;
}

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="mb-3">
      <CardHeader className="p-3 pb-1">
        <div className="flex items-center">
          <p className="font-medium text-sm">{comment.author.username}</p>
          <span className="mx-2 text-gray-400">•</span>
          <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-gray-700">{comment.text}</p>
      </CardContent>
    </Card>
  );
};
