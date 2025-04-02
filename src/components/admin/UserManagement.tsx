
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Manage Users</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button className="bg-fitness-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Height (cm)</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Today's Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.height}</TableCell>
                  <TableCell>{user.weight}</TableCell>
                  <TableCell>{user.attendance.length} days</TableCell>
                  <TableCell>
                    {user.attendance.includes(new Date().toISOString().split('T')[0]) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
                      >
                        <Edit className="h-4 w-4 text-fitness-primary" />
                      </Button>
                      
                      {user.attendance.includes(new Date().toISOString().split('T')[0]) ? (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-red-200 text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveAttendance(user.id)}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-green-200 text-green-500 hover:text-green-600"
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
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user profile here.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editedValues.name}
                  onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={editedValues.phone}
                  onChange={(e) => setEditedValues({ ...editedValues, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="height" className="text-right">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={editedValues.height}
                  onChange={(e) => setEditedValues({ ...editedValues, height: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={editedValues.weight}
                  onChange={(e) => setEditedValues({ ...editedValues, weight: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-fitness-primary">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
