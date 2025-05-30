
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Filter } from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Total Requests',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Calendar,
      description: 'This month'
    },
    {
      title: 'Pending Requests',
      value: '23',
      change: '-8%',
      changeType: 'decrease',
      icon: Clock,
      description: 'Awaiting assignment'
    },
    {
      title: 'Active Providers',
      value: '156',
      change: '+3%',
      changeType: 'increase',
      icon: Users,
      description: 'Currently available'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      change: '-15%',
      changeType: 'decrease',
      icon: Filter,
      description: 'Last 7 days'
    }
  ];

  const recentRequests = [
    {
      id: 'REQ-001',
      facility: 'General Hospital',
      location: 'Downtown',
      type: 'Emergency',
      status: 'pending',
      priority: 'high',
      time: '2 min ago'
    },
    {
      id: 'REQ-002',
      facility: 'Care Center North',
      location: 'Northside',
      type: 'Routine',
      status: 'assigned',
      priority: 'medium',
      time: '15 min ago'
    },
    {
      id: 'REQ-003',
      facility: 'Wellness Clinic',
      location: 'Westside',
      type: 'Consultation',
      status: 'completed',
      priority: 'low',
      time: '1 hour ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
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

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Requests */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Requests</CardTitle>
          <CardDescription>Latest support requests requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-gray-900">{request.id}</p>
                    <p className="text-sm text-gray-600">{request.facility}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{request.location}</p>
                    <p>{request.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{request.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
