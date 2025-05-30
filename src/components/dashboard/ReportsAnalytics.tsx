
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Clock, Users, Filter } from 'lucide-react';

const ReportsAnalytics = () => {
  // Sample data for charts
  const requestVolumeData = [
    { month: 'Jan', requests: 120, completed: 115 },
    { month: 'Feb', requests: 135, completed: 128 },
    { month: 'Mar', requests: 148, completed: 142 },
    { month: 'Apr', requests: 162, completed: 155 },
    { month: 'May', requests: 171, completed: 168 },
    { month: 'Jun', requests: 185, completed: 179 }
  ];

  const responseTimeData = [
    { week: 'Week 1', avgTime: 2.8 },
    { week: 'Week 2', avgTime: 3.2 },
    { week: 'Week 3', avgTime: 2.5 },
    { week: 'Week 4', avgTime: 2.1 }
  ];

  const facilityUsageData = [
    { name: 'General Hospital', value: 35, color: '#3B82F6' },
    { name: 'Care Center North', value: 25, color: '#10B981' },
    { name: 'Wellness Clinic', value: 20, color: '#F59E0B' },
    { name: 'Metro Health', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const providerPerformance = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Emergency Medicine',
      completedRequests: 45,
      avgResponseTime: '1.8h',
      rating: 4.9,
      availability: '92%'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      completedRequests: 38,
      avgResponseTime: '2.1h',
      rating: 4.8,
      availability: '88%'
    },
    {
      name: 'Dr. Emily Davis',
      specialty: 'Family Medicine',
      completedRequests: 42,
      avgResponseTime: '2.4h',
      rating: 4.7,
      availability: '95%'
    },
    {
      name: 'Dr. Robert Wilson',
      specialty: 'Emergency Medicine',
      completedRequests: 35,
      avgResponseTime: '2.0h',
      rating: 4.8,
      availability: '85%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Report Configuration</CardTitle>
          <CardDescription>Customize your analytics view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="northside">Northside</SelectItem>
                <SelectItem value="westside">Westside</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">2.4h</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-xs text-red-600">-15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Provider Utilization</p>
                <p className="text-xs text-green-600">+3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Volume Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Request Volume Trend</CardTitle>
            <CardDescription>Monthly request and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3B82F6" name="Total Requests" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Average Response Time</CardTitle>
            <CardDescription>Weekly response time trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facility Usage Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Facility Usage Distribution</CardTitle>
            <CardDescription>Request distribution by facility</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={facilityUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {facilityUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Provider Performance */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Provider Performance</CardTitle>
            <CardDescription>Top performing providers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providerPerformance.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{provider.name}</p>
                    <p className="text-sm text-gray-600">{provider.specialty}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{provider.completedRequests}</p>
                      <p className="text-xs text-gray-500">Requests</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{provider.avgResponseTime}</p>
                      <p className="text-xs text-gray-500">Avg Time</p>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800">
                        {provider.rating}★
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
