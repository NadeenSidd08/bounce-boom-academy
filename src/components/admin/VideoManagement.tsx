import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  PlayCircle, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Upload,
  Star,
  Eye,
  Calendar
} from "lucide-react";
import { mockVideos, mockCategories, Video, getVideosByCategory, searchVideos } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const videoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  youtubeUrl: z.string().url("Please enter a valid YouTube URL").includes("youtube", { message: "Must be a YouTube URL" }),
  category: z.string().min(1, "Please select a category"),
  featured: z.boolean().default(false),
  tempAccess: z.boolean().default(false),
});

type VideoFormData = z.infer<typeof videoSchema>;

const VideoManagement = () => {
  const { toast } = useToast();
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      featured: false,
      tempAccess: false,
    }
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const onSubmit = (data: VideoFormData) => {
    if (editingVideo) {
      // Update existing video
      setVideos(videos.map(v => 
        v.id === editingVideo.id 
          ? { ...v, ...data }
          : v
      ));
      toast({
        title: "Video updated",
        description: `${data.title} has been updated successfully.`,
      });
      setEditingVideo(null);
    } else {
      // Add new video
      const newVideo: Video = {
        id: Math.max(...videos.map(v => v.id)) + 1,
        title: data.title,
        description: data.description,
        category: data.category,
        youtubeUrl: data.youtubeUrl,
        featured: data.featured,
        tempAccess: data.tempAccess,
        uploadDate: new Date().toISOString().split('T')[0],
        views: 0,
        duration: "0:00", // Would be fetched from YouTube API in real implementation
      };
      setVideos([...videos, newVideo]);
      toast({
        title: "Video added",
        description: `${data.title} has been added to the library.`,
      });
    }
    
    reset();
    setAddDialogOpen(false);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setValue('title', video.title);
    setValue('description', video.description);
    setValue('youtubeUrl', video.youtubeUrl);
    setValue('category', video.category);
    setValue('featured', video.featured);
    setValue('tempAccess', video.tempAccess);
    setAddDialogOpen(true);
  };

  const handleDelete = (video: Video) => {
    setVideos(videos.filter(v => v.id !== video.id));
    toast({
      title: "Video deleted",
      description: `${video.title} has been removed from the library.`,
    });
  };

  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const tempAccessCount = videos.filter(v => v.tempAccess).length;
  const featuredCount = videos.filter(v => v.featured).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Video Management</h1>
          <p className="text-muted-foreground">Upload and manage training videos</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingVideo(null); reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingVideo ? 'Edit Video' : 'Add New Video'}
              </DialogTitle>
              <DialogDescription>
                {editingVideo ? 'Update video information' : 'Add a new training video from YouTube'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Video Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Tennis Serve Technique"
                    {...register('title')}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setValue('category', value)}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  {...register('youtubeUrl')}
                  className={errors.youtubeUrl ? "border-destructive" : ""}
                />
                {errors.youtubeUrl && (
                  <p className="text-sm text-destructive">{errors.youtubeUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this video covers..."
                  {...register('description')}
                  className={errors.description ? "border-destructive" : ""}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    {...register('featured')}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Featured Video</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="tempAccess"
                    {...register('tempAccess')}
                    className="rounded"
                  />
                  <Label htmlFor="tempAccess">Available for Temporary Users</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold text-primary">{videos.length}</p>
              </div>
              <PlayCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-success">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold text-secondary">{featuredCount}</p>
              </div>
              <Star className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temp Access</p>
                <p className="text-2xl font-bold text-warning">{tempAccessCount}</p>
              </div>
              <Calendar className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videos List */}
      <Card>
        <CardHeader>
          <CardTitle>Video Library ({filteredVideos.length})</CardTitle>
          <CardDescription>
            Manage training videos and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVideos.length === 0 ? (
            <div className="text-center py-8">
              <PlayCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No videos found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                      <PlayCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="capitalize">{video.category}</span>
                        <span>{video.duration}</span>
                        <span>{video.views} views</span>
                        <span>Uploaded: {video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col space-y-1">
                      {video.featured && (
                        <Badge className="bg-secondary text-secondary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {video.tempAccess ? (
                        <Badge className="bg-success text-success-foreground">Temp Access</Badge>
                      ) : (
                        <Badge variant="outline">Full Only</Badge>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(video)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Video
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(video)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Video
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoManagement;