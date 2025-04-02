
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Edit, Plus, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockUsers = [
  { id: "1", name: "John Doe", phone: "1234567890", height: 175, weight: 70, attendance: ["2023-09-01", "2023-09-03", "2023-09-05"] },
  { id: "2", name: "Jane Smith", phone: "2345678901", height: 165, weight: 60, attendance: ["2023-09-02", "2023-09-04", "2023-09-06"] },
  { id: "3", name: "Mike Johnson", phone: "3456789012", height: 180, weight: 85, attendance: ["2023-09-01", "2023-09-02"] },
  { id: "4", name: "Sarah Williams", phone: "4567890123", height: 160, weight: 55, attendance: ["2023-09-03", "2023-09-05"] },
  { id: "5", name: "David Brown", phone: "5678901234", height: 185, weight: 90, attendance: ["2023-09-01", "2023-09-04"] },
];

interface User {
  id: string;
  name: string;
  phone: string;
  height: number;
  weight: number;
  attendance: string[];
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    height: 0,
    weight: 0,
  });
  const [editedValues, setEditedValues] = useState({
    name: "",
    phone: "",
    height: 0,
    weight: 0,
  });
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );
  
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditedValues({
      name: user.name,
      phone: user.phone,
      height: user.height,
      weight: user.weight,
    });
  };
  
  const handleSaveEdit = () => {
    if (editingUser) {
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...editedValues } 
          : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      toast.success("User updated successfully");
    }
  };
  
  const handleAddAttendance = (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, attendance: [...user.attendance, today] } 
        : user
    );
    setUsers(updatedUsers);
    toast.success("Attendance marked for today");
  };
  
  const handleRemoveAttendance = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            attendance: user.attendance.filter(date => 
              date !== new Date().toISOString().split('T')[0]
            ) 
          } 
        : user
    );
    setUsers(updatedUsers);
    toast.info("Attendance removed for today");
  };

  const handleAddUser = () => {
    // Validation
    if (!newUser.name.trim() || !newUser.phone.trim() || newUser.height <= 0 || newUser.weight <= 0) {
      toast.error("Please fill all required fields with valid values");
      return;
    }

    // Generate a new ID
    const maxId = Math.max(...users.map(user => parseInt(user.id)), 0);
    const newId = (maxId + 1).toString();

    // Create new user object
    const userToAdd: User = {
      id: newId,
      name: newUser.name,
      phone: newUser.phone,
      height: newUser.height,
      weight: newUser.weight,
      attendance: [], // Start with empty attendance
    };

    // Add to users array
    setUsers([...users, userToAdd]);
    
    // Reset form and close dialog
    setNewUser({
      name: "",
      phone: "",
      height: 0,
      weight: 0,
    });
    setIsAddUserOpen(false);
    toast.success("New user added successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Manage Users</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-800 text-white border-gray-700"
            />
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-redblack-primary hover:bg-redblack-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add New User</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the details of the new gym member.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-name" className="text-right text-white">
                    Name
                  </Label>
                  <Input
                    id="new-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3 bg-gray-700 text-white border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-phone" className="text-right text-white">
                    Phone
                  </Label>
                  <Input
                    id="new-phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="col-span-3 bg-gray-700 text-white border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-height" className="text-right text-white">
                    Height (cm)
                  </Label>
                  <Input
                    id="new-height"
                    type="number"
                    value={newUser.height === 0 ? '' : newUser.height}
                    onChange={(e) => setNewUser({ ...newUser, height: Number(e.target.value) })}
                    className="col-span-3 bg-gray-700 text-white border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-weight" className="text-right text-white">
                    Weight (kg)
                  </Label>
                  <Input
                    id="new-weight"
                    type="number"
                    value={newUser.weight === 0 ? '' : newUser.weight}
                    onChange={(e) => setNewUser({ ...newUser, weight: Number(e.target.value) })}
                    className="col-span-3 bg-gray-700 text-white border-gray-600"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="text-white border-gray-600 hover:bg-gray-700">
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-redblack-primary hover:bg-redblack-secondary">
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="border rounded-md border-gray-700 bg-gray-800">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Phone</TableHead>
              <TableHead className="text-gray-300">Height (cm)</TableHead>
              <TableHead className="text-gray-300">Weight (kg)</TableHead>
              <TableHead className="text-gray-300">Attendance</TableHead>
              <TableHead className="text-gray-300">Today's Status</TableHead>
              <TableHead className="text-right text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700">
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.phone}</TableCell>
                  <TableCell className="text-gray-300">{user.height}</TableCell>
                  <TableCell className="text-gray-300">{user.weight}</TableCell>
                  <TableCell className="text-gray-300">{user.attendance.length} days</TableCell>
                  <TableCell>
                    {user.attendance.includes(new Date().toISOString().split('T')[0]) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                        Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        Absent
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEditClick(user)}
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4 text-redblack-primary" />
                      </Button>
                      
                      {user.attendance.includes(new Date().toISOString().split('T')[0]) ? (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-red-900 text-red-500 hover:text-red-400 hover:bg-red-900/30"
                          onClick={() => handleRemoveAttendance(user.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-green-900 text-green-500 hover:text-green-400 hover:bg-green-900/30"
                          onClick={() => handleAddAttendance(user.id)}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the user profile here.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editedValues.name}
                  onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white border-gray-600"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-white">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={editedValues.phone}
                  onChange={(e) => setEditedValues({ ...editedValues, phone: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white border-gray-600"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-right text-white">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={editedValues.height}
                  onChange={(e) => setEditedValues({ ...editedValues, height: Number(e.target.value) })}
                  className="col-span-3 bg-gray-700 text-white border-gray-600"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right text-white">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={editedValues.weight}
                  onChange={(e) => setEditedValues({ ...editedValues, weight: Number(e.target.value) })}
                  className="col-span-3 bg-gray-700 text-white border-gray-600"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditingUser(null)}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit} 
              className="bg-redblack-primary hover:bg-redblack-secondary"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
