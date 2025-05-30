
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const RequestManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const requests = [
    {
      id: 'REQ-001',
      facility: 'General Hospital',
      location: 'Downtown',
      provider: 'Dr. Sarah Johnson',
      type: 'Emergency',
      status: 'pending',
      priority: 'high',
      created: '2024-01-15 09:30',
      estimated: '2024-01-15 11:00'
    },
    {
      id: 'REQ-002',
      facility: 'Care Center North',
      location: 'Northside',
      provider: 'Dr. Michael Chen',
      type: 'Routine',
      status: 'assigned',
      priority: 'medium',
      created: '2024-01-15 08:45',
      estimated: '2024-01-15 14:00'
    },
    {
      id: 'REQ-003',
      facility: 'Wellness Clinic',
      location: 'Westside',
      provider: 'Dr. Emily Davis',
      type: 'Consultation',
      status: 'in-progress',
      priority: 'low',
      created: '2024-01-15 07:20',
      estimated: '2024-01-15 10:30'
    },
    {
      id: 'REQ-004',
      facility: 'Metro Health Center',
      location: 'Central',
      provider: 'Unassigned',
      type: 'Emergency',
      status: 'pending',
      priority: 'high',
      created: '2024-01-15 09:45',
      estimated: '2024-01-15 11:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || request.location === selectedLocation;
    const matchesProvider = selectedProvider === 'all' || request.provider === selectedProvider;
    
    return matchesSearch && matchesStatus && matchesLocation && matchesProvider;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Filter Requests</CardTitle>
          <CardDescription>Use filters to find specific requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Northside">Northside</SelectItem>
                <SelectItem value="Westside">Westside</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
              </SelectContent>
            </Select>

            {/* Provider Filter */}
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                <SelectItem value="Dr. Emily Davis">Dr. Emily Davis</SelectItem>
                <SelectItem value="Unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Request List */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Requests ({filteredRequests.length})
          </CardTitle>
          <CardDescription>Manage and track all support requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <p className="font-medium text-gray-900">{request.id}</p>
                      <p className="text-sm text-gray-600">{request.facility}</p>
                      <p className="text-xs text-gray-500">{request.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{request.type}</p>
                      <p className="text-sm text-gray-600">{request.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created: {request.created}</p>
                      <p className="text-xs text-gray-500">Estimated: {request.estimated}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestManagement;
