import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  PlayCircle, 
  MessageCircle, 
  Send,
  Calendar,
  Eye,
  Clock,
  ThumbsUp
} from "lucide-react";
import { getVideoById, getCommentsByVideoId, addComment, updateVideoLikes, Comment } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface VideoDetailProps {
  currentUser?: {
    id: number;
    name: string;
  };
}

const VideoDetail = ({ currentUser = { id: 1, name: 'Current User' } }: VideoDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const videoId = parseInt(id);
      const foundVideo = getVideoById(videoId);
      const videoComments = getCommentsByVideoId(videoId);
      
      setVideo(foundVideo);
      setComments(videoComments);
    }
  }, [id]);

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleLikeClick = () => {
    if (!video) return;
    
    const updatedVideo = updateVideoLikes(video.id, !hasLiked);
    
    if (updatedVideo) {
      setVideo(updatedVideo);
      setHasLiked(!hasLiked);
      
      toast({
        title: hasLiked ? "Like removed" : "Video liked!",
        description: hasLiked ? "You unliked this video." : "Thanks for liking this video!",
      });
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const comment = addComment({
        videoId: parseInt(id!),
        userId: currentUser.id,
        userName: currentUser.name,
        text: newComment.trim()
      });
      
      setComments([...comments, comment]);
      setNewComment('');
      
      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error posting comment",
        description: "There was a problem posting your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <PlayCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Video not found</p>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const youtubeId = extractYouTubeId(video.youtubeUrl);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-primary">Training Video</h1>
              <p className="text-sm text-muted-foreground">Bounce Boom Academy</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Video Player */}
        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="aspect-video bg-black rounded-t-lg overflow-hidden">
              {youtubeId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="opacity-75">Video player unavailable</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-primary mb-2">{video.title}</h1>
                  <p className="text-muted-foreground mb-4">{video.description}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className={`ml-4 ${
                    hasLiked 
                      ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={handleLikeClick}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  <span>{video.likes}</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{video.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{video.uploadDate}</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {video.category}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Comments ({comments.length})
            </CardTitle>
            <CardDescription>
              Share your thoughts and questions about this training video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="resize-none border-input focus:border-primary"
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !newComment.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No comments yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to share your thoughts!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-sm font-semibold">
                          {comment.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-primary text-sm">
                            {comment.userName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoDetail;