
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManualControls = () => {
  const { toast } = useToast();
  const [autoMatchingEnabled, setAutoMatchingEnabled] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');

  const pendingRequests = [
    { id: 'REQ-001', facility: 'General Hospital', type: 'Emergency', priority: 'high' },
    { id: 'REQ-004', facility: 'Metro Health Center', type: 'Emergency', priority: 'high' },
    { id: 'REQ-007', facility: 'City Clinic', type: 'Routine', priority: 'medium' }
  ];

  const availableProviders = [
    { id: 'PRV-001', name: 'Dr. Sarah Johnson', specialty: 'Emergency Medicine', status: 'available', location: 'Downtown' },
    { id: 'PRV-002', name: 'Dr. Michael Chen', specialty: 'Internal Medicine', status: 'available', location: 'Northside' },
    { id: 'PRV-003', name: 'Dr. Emily Davis', specialty: 'Family Medicine', status: 'busy', location: 'Westside' },
    { id: 'PRV-004', name: 'Dr. Robert Wilson', specialty: 'Emergency Medicine', status: 'available', location: 'Central' }
  ];

  const handleReassignRequest = () => {
    if (!selectedRequest || !selectedProvider) {
      toast({
        title: "Selection Required",
        description: "Please select both a request and provider to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Reassigned",
      description: `Successfully reassigned ${selectedRequest} to ${selectedProvider}`,
    });

    setSelectedRequest('');
    setSelectedProvider('');
  };

  const handleProviderAvailability = (providerId: string, available: boolean) => {
    toast({
      title: "Availability Updated",
      description: `Provider availability has been ${available ? 'enabled' : 'disabled'}`,
    });
  };

  const handleAutoMatchingToggle = (enabled: boolean) => {
    setAutoMatchingEnabled(enabled);
    toast({
      title: "Auto-matching Updated",
      description: `Auto-matching has been ${enabled ? 'enabled' : 'disabled'}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reassign" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
          <TabsTrigger value="reassign" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Reassign Requests</span>
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Provider Availability</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>System Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reassign" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Manual Request Assignment</CardTitle>
              <CardDescription>Manually assign pending requests to available providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Requests */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Request</Label>
                  <div className="space-y-2">
                    {pendingRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedRequest === request.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedRequest(request.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{request.id}</p>
                            <p className="text-sm text-gray-600">{request.facility}</p>
                            <p className="text-xs text-gray-500">{request.type}</p>
                          </div>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Providers */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Provider</Label>
                  <div className="space-y-2">
                    {availableProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedProvider === provider.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${provider.status !== 'available' ? 'opacity-50' : ''}`}
                        onClick={() => provider.status === 'available' && setSelectedProvider(provider.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{provider.name}</p>
                            <p className="text-sm text-gray-600">{provider.specialty}</p>
                            <p className="text-xs text-gray-500">{provider.location}</p>
                          </div>
                          <Badge className={getStatusColor(provider.status)}>
                            {provider.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleReassignRequest}
                  disabled={!selectedRequest || !selectedProvider}
                  className="px-6"
                >
                  Assign Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Provider Availability Management</CardTitle>
              <CardDescription>Update provider availability and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableProviders.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-gray-900">{provider.name}</p>
                          <p className="text-sm text-gray-600">{provider.specialty}</p>
                          <p className="text-xs text-gray-500">{provider.location}</p>
                        </div>
                        <Badge className={getStatusColor(provider.status)}>
                          {provider.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`availability-${provider.id}`} className="text-sm">
                          Available
                        </Label>
                        <Switch
                          id={`availability-${provider.id}`}
                          checked={provider.status === 'available'}
                          onCheckedChange={(checked) => handleProviderAvailability(provider.id, checked)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">System Configuration</CardTitle>
              <CardDescription>Configure auto-matching and system behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <Label className="text-base font-medium text-gray-900">Auto-matching System</Label>
                  <p className="text-sm text-gray-600">Automatically assign requests to best available providers</p>
                </div>
                <Switch
                  checked={autoMatchingEnabled}
                  onCheckedChange={handleAutoMatchingToggle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="response-time">Maximum Response Time (hours)</Label>
                  <Input id="response-time" type="number" defaultValue="4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-distance">Maximum Distance (miles)</Label>
                  <Input id="max-distance" type="number" defaultValue="25" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority-weights">Priority Weighting</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority weighting" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="emergency-first">Emergency First</SelectItem>
                    <SelectItem value="distance-optimized">Distance Optimized</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManualControls;
