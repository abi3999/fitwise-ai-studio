
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Calendar as CalendarIcon, User, Users, BarChart as ChartIcon, Download } from "lucide-react";

// Mock data for demonstration
const mockAttendanceData = [
  { date: "2023-09-01", count: 18 },
  { date: "2023-09-02", count: 15 },
  { date: "2023-09-03", count: 12 },
  { date: "2023-09-04", count: 20 },
  { date: "2023-09-05", count: 22 },
  { date: "2023-09-06", count: 19 },
  { date: "2023-09-07", count: 23 },
  { date: "2023-09-08", count: 25 },
  { date: "2023-09-09", count: 20 },
  { date: "2023-09-10", count: 15 },
  { date: "2023-09-11", count: 17 },
  { date: "2023-09-12", count: 19 },
  { date: "2023-09-13", count: 21 },
  { date: "2023-09-14", count: 22 },
];

const mockHourlyData = [
  { hour: "6 AM", count: 5 },
  { hour: "7 AM", count: 8 },
  { hour: "8 AM", count: 12 },
  { hour: "9 AM", count: 9 },
  { hour: "10 AM", count: 6 },
  { hour: "11 AM", count: 4 },
  { hour: "12 PM", count: 7 },
  { hour: "1 PM", count: 10 },
  { hour: "2 PM", count: 8 },
  { hour: "3 PM", count: 6 },
  { hour: "4 PM", count: 9 },
  { hour: "5 PM", count: 14 },
  { hour: "6 PM", count: 18 },
  { hour: "7 PM", count: 15 },
  { hour: "8 PM", count: 10 },
  { hour: "9 PM", count: 7 },
];

const mockLogEntries = [
  { id: "1", name: "John Doe", time: "07:30 AM", date: "2023-09-14" },
  { id: "2", name: "Jane Smith", time: "08:15 AM", date: "2023-09-14" },
  { id: "3", name: "Mike Johnson", time: "09:00 AM", date: "2023-09-14" },
  { id: "4", name: "Sarah Williams", time: "10:20 AM", date: "2023-09-14" },
  { id: "5", name: "David Brown", time: "04:45 PM", date: "2023-09-14" },
  { id: "6", name: "Emily Taylor", time: "05:30 PM", date: "2023-09-14" },
  { id: "7", name: "Alex Martinez", time: "06:15 PM", date: "2023-09-14" },
  { id: "8", name: "Lisa Anderson", time: "07:00 PM", date: "2023-09-14" },
  { id: "9", name: "Robert Wilson", time: "07:45 PM", date: "2023-09-14" },
  { id: "10", name: "Jennifer Garcia", time: "08:30 PM", date: "2023-09-14" },
];

const AttendanceLog: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState("last14days");
  
  // Calculate summary stats
  const todayAttendance = mockAttendanceData[mockAttendanceData.length - 1].count;
  const yesterdayAttendance = mockAttendanceData[mockAttendanceData.length - 2].count;
  const weekAttendance = mockAttendanceData.slice(-7).reduce((sum, day) => sum + day.count, 0);
  const percentChange = Math.round(((todayAttendance - yesterdayAttendance) / yesterdayAttendance) * 100);
  
  // Format data for charts
  const formattedAttendanceData = mockAttendanceData.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-fitness-primary" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-2">
              <div className="text-3xl font-bold">{todayAttendance}</div>
              <div className={`text-sm pb-1 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {percentChange >= 0 ? '+' : ''}{percentChange}% from yesterday
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-fitness-primary" />
              Weekly Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{weekAttendance}</div>
            <div className="text-sm text-gray-500">Last 7 days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ChartIcon className="h-4 w-4 mr-2 text-fitness-primary" />
              Peak Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6-7 PM</div>
            <div className="text-sm text-gray-500">18 members on average</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Attendance Trends</CardTitle>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last14days">Last 14 Days</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formattedAttendanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#0284c7" 
                    strokeWidth={2}
                    name="Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hourly Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockHourlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill="#0284c7" 
                    name="Members"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-fitness-primary" />
            Daily Log
          </CardTitle>
          <div className="flex space-x-2">
            <div className="border rounded-md p-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-0"
              />
            </div>
            <Button className="bg-fitness-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLogEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceLog;
