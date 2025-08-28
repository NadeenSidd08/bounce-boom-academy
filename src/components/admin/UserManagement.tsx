import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Trash2, 
  Key, 
  Calendar,
  AlertTriangle,
  SortAsc,
  SortDesc,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUsers, User, getUsersByRole, searchUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type SortField = 'name' | 'role' | 'createdAt' | 'lastLogin';
type SortOrder = 'asc' | 'desc';

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'createdAt' || sortField === 'lastLogin') {
        const aTime = new Date(aValue as string).getTime();
        const bTime = new Date(bValue as string).getTime();
        if (aTime < bTime) return sortOrder === 'asc' ? -1 : 1;
        if (aTime > bTime) return sortOrder === 'asc' ? 1 : -1;
      } else {
        const aStr = String(aValue);
        const bStr = String(bValue);
        if (aStr < bStr) return sortOrder === 'asc' ? -1 : 1;
        if (aStr > bStr) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'administrator':
        return <Badge className="bg-primary text-primary-foreground">Administrator</Badge>;
      case 'employee':
        return <Badge variant="secondary">Coach</Badge>;
      case 'temporary':
        return <Badge variant="destructive">Temporary Access</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    );
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      toast({
        title: "User deleted",
        description: `${userToDelete.name} has been removed from the platform.`,
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleResetPassword = (user: User) => {
    toast({
      title: "Password reset sent",
      description: `Password reset email sent to ${user.email}`,
    });
  };

  const handleExtendAccess = (user: User) => {
    if (user.role === 'temporary') {
      const newExpirationDate = new Date();
      newExpirationDate.setDate(newExpirationDate.getDate() + 7);
      
      setUsers(users.map(u => 
        u.id === user.id 
          ? { ...u, expiresAt: newExpirationDate.toISOString().split('T')[0] }
          : u
      ));
      
      toast({
        title: "Access extended",
        description: `${user.name}'s access has been extended by 7 days.`,
      });
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm" 
      onClick={() => handleSort(field)}
      className="h-auto p-1 font-medium text-left justify-start"
    >
      {children}
      {sortField === field && (
        sortOrder === 'asc' ? <SortAsc className="w-3 h-3 ml-1" /> : <SortDesc className="w-3 h-3 ml-1" />
      )}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => navigate('/admin/add-user')}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users by name, email, or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            All Users ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            Manage employee access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-2 border-b text-sm font-medium text-muted-foreground">
                <div className="col-span-3">
                  <SortButton field="name">User</SortButton>
                </div>
                <div className="col-span-2">
                  <SortButton field="role">Role</SortButton>
                </div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">
                  <SortButton field="createdAt">Created</SortButton>
                </div>
                <div className="col-span-2">
                  <SortButton field="lastLogin">Last Login</SortButton>
                </div>
                <div className="col-span-2">Actions</div>
              </div>

              {/* User Rows */}
              {filteredUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    {getRoleBadge(user.role)}
                  </div>
                  
                  <div className="col-span-1">
                    {getStatusBadge(user.status)}
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-sm">{user.createdAt}</p>
                    {user.role === 'temporary' && user.expiresAt && (
                      <div className="flex items-center mt-1">
                        <AlertTriangle className="w-3 h-3 text-warning mr-1" />
                        <span className="text-xs text-warning">Expires {user.expiresAt}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-sm">{user.lastLogin}</p>
                  </div>
                  
                  <div className="col-span-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                          <Key className="w-4 h-4 mr-2" />
                          Reset Password
                        </DropdownMenuItem>
                        {user.role === 'temporary' && (
                          <DropdownMenuItem onClick={() => handleExtendAccess(user)}>
                            <Calendar className="w-4 h-4 mr-2" />
                            Extend Access
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              The user will lose access to all training materials and their progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;