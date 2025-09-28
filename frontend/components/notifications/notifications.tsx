"use client"

import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock, Trash2, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth-context';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'deadline';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
}

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'deadline',
      title: 'Report Deadline Approaching',
      message: 'Q3 2024 action plan report is due in 3 days. Please submit your progress data.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'success',
      title: 'Action Plan Approved',
      message: 'Your Gender Equality Initiative 2024 action plan has been approved by the Sub-Cluster Focal Person.',
      timestamp: '2024-01-14T14:20:00Z',
      isRead: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Comment on Report',
      message: 'Sarah Johnson commented on your Q2 2024 progress report: "Great work on achieving 95% of planned targets."',
      timestamp: '2024-01-14T09:15:00Z',
      isRead: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'KPI Target Behind Schedule',
      message: 'Women Leadership Training program is currently at 60% of planned target. Consider reviewing implementation strategy.',
      timestamp: '2024-01-13T16:45:00Z',
      isRead: true
    },
    {
      id: '5',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'The platform will undergo scheduled maintenance on January 20th from 2:00 AM to 4:00 AM EAT.',
      timestamp: '2024-01-12T11:00:00Z',
      isRead: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-destructive" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'deadline':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (activeTab) {
      case 'unread':
        return !notif.isRead;
      case 'action-required':
        return notif.actionRequired;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with important information and deadlines</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
              <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive font-semibold">{unreadCount}</span>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Action Required</p>
              <p className="text-2xl font-bold text-foreground">{actionRequiredCount}</p>
            </div>
            <Clock className="h-8 w-8 text-warning" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="action-required" className="flex items-center gap-2">Action Required ({actionRequiredCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <NotificationList 
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              formatTimestamp={formatTimestamp}
              getNotificationIcon={getNotificationIcon}
              getNotificationTypeColor={getNotificationTypeColor}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <NotificationList 
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              formatTimestamp={formatTimestamp}
              getNotificationIcon={getNotificationIcon}
              getNotificationTypeColor={getNotificationTypeColor}
            />
          </TabsContent>

          <TabsContent value="action-required" className="mt-6">
            <NotificationList 
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              formatTimestamp={formatTimestamp}
              getNotificationIcon={getNotificationIcon}
              getNotificationTypeColor={getNotificationTypeColor}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  formatTimestamp: (timestamp: string) => string;
  getNotificationIcon: (type: string) => React.ReactNode;
  getNotificationTypeColor: (type: string) => string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onDelete,
  formatTimestamp,
  getNotificationIcon,
  getNotificationTypeColor
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No notifications to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className={`p-4 transition-all duration-200 hover:shadow-md ${
            !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3 flex-1">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{notification.title}</h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getNotificationTypeColor(notification.type)}`}
                  >
                    {notification.type.replace('-', ' ').toUpperCase()}
                  </Badge>
                  {notification.actionRequired && (
                    <Badge variant="destructive" className="text-xs">ACTION REQUIRED</Badge>
                  )}
                  {!notification.isRead && (
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="h-8 w-8 p-0"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(notification.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;
