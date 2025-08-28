import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  Calendar, 
  PlayCircle, 
  Users, 
  AlertTriangle,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { mockVideos, mockUsers, Video } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const TempAccessManager = () => {
  const { toast } = useToast();
  const [videos] = useState<Video[]>(mockVideos);
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>(
    mockVideos.filter(v => v.tempAccess).map(v => v.id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelectedVideoIds, setModalSelectedVideoIds] = useState<number[]>([]);

  const temporaryUsers = mockUsers.filter(user => user.role === 'temporary');
  const allVideos = videos;
  const currentlySelected = videos.filter(v => selectedVideoIds.includes(v.id));

  const handleVideoToggle = (videoId: number, checked: boolean) => {
    if (checked) {
      setSelectedVideoIds([...selectedVideoIds, videoId]);
    } else {
      setSelectedVideoIds(selectedVideoIds.filter(id => id !== videoId));
    }
  };

  const handleModalVideoToggle = (videoId: number, checked: boolean) => {
    if (checked) {
      setModalSelectedVideoIds([...modalSelectedVideoIds, videoId]);
    } else {
      setModalSelectedVideoIds(modalSelectedVideoIds.filter(id => id !== videoId));
    }
  };

  const handleModalOpen = (open: boolean) => {
    if (open) {
      setModalSelectedVideoIds([...selectedVideoIds]);
    }
    setIsModalOpen(open);
  };

  const handleSaveModalChanges = () => {
    setSelectedVideoIds([...modalSelectedVideoIds]);
    setIsModalOpen(false);
    toast({
      title: "Selection updated",
      description: `${modalSelectedVideoIds.length} videos are now available to temporary users.`,
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: `Updated temporary access videos. ${selectedVideoIds.length} videos are now available to temporary users.`,
    });
  };

  const hasChanges = () => {
    const originalSelection = mockVideos.filter(v => v.tempAccess).map(v => v.id);
    return JSON.stringify(selectedVideoIds.sort()) !== JSON.stringify(originalSelection.sort());
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Temporary Access Management</h1>
          <p className="text-muted-foreground">
            Select which videos temporary users can access (maximum 5)
          </p>
        </div>
        <Button 
          onClick={handleSaveChanges}
          disabled={!hasChanges()}
          className="bg-primary hover:bg-primary/90"
        >
          Save Changes
        </Button>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Temporary Users</p>
                <p className="text-2xl font-bold text-warning">{temporaryUsers.length}</p>
              </div>
              <Users className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selected Videos</p>
                <p className="text-2xl font-bold text-primary">{selectedVideoIds.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Videos</p>
                <p className="text-2xl font-bold text-success">{allVideos.length}</p>
              </div>
              <PlayCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-secondary">
                  {currentlySelected.reduce((sum, v) => sum + v.views, 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selection Limit Warning */}

      <div className="space-y-6">
        {/* Currently Selected Videos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <CheckCircle className="w-5 h-5 mr-2" />
              Selected for Temporary Access ({selectedVideoIds.length})
            </CardTitle>
            <CardDescription>
              These videos are currently available to temporary users
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentlySelected.length === 0 ? (
              <div className="text-center py-8">
                <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No videos selected for temporary access</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use the "Manage Video List" button to select videos
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentlySelected.map((video) => (
                  <div key={video.id} className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                    <Checkbox
                      checked={true}
                      onCheckedChange={(checked) => handleVideoToggle(video.id, checked as boolean)}
                    />
                    <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-primary line-clamp-1">{video.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="capitalize">{video.category}</span>
                        <span>{video.duration}</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Selected
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manage Video List Button and Modal */}
        <div className="flex justify-center">
          <Dialog open={isModalOpen} onOpenChange={handleModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                Manage Video List
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle>Manage Video List</DialogTitle>
                <DialogDescription>
                  Select which videos should be available to temporary users
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-3">
                  {allVideos.map((video) => (
                    <div key={video.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        checked={modalSelectedVideoIds.includes(video.id)}
                        onCheckedChange={(checked) => handleModalVideoToggle(video.id, checked as boolean)}
                      />
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-primary line-clamp-1">{video.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="capitalize">{video.category}</span>
                          <span>{video.duration}</span>
                          <span>{video.views} views</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {selectedVideoIds.includes(video.id) && (
                          <Badge className="bg-success text-success-foreground">
                            Currently Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveModalChanges}>
                  Save Changes ({modalSelectedVideoIds.length} selected)
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Temporary Users Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Temporary Users</CardTitle>
          <CardDescription>
            Users who will have access to the selected videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {temporaryUsers.length === 0 ? (
            <div className="text-center py-6">
              <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No temporary users currently active</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {temporaryUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
                      <span className="text-warning-foreground font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-primary">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">
                      <Clock className="w-3 h-3 mr-1" />
                      Expires {user.expiresAt}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {user.createdAt}
                    </p>
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

export default TempAccessManager;