import DashboardHeader from '@/app/admin/components/dashboardHeader';
import { StatsGrid } from '@/app/admin/components/dashboardGrid';
import QuickActions from '@/app/admin/components/quickActions';
import { fetchDashboardStats } from '@/app/_lib/services';
import type { StatCardProps } from '@/app/admin/components/dashboardGrid';
import { Users, BedDouble, Calendar, DollarSign, TrendingUp, Home, Bed } from 'lucide-react';

const Dashboard = async () => {
  const statsData = await fetchDashboardStats();

  const stats: StatCardProps[] = [
    {
      title: 'Total Users',
      value: statsData.totalUsers,
      icon: Users,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-800',
    },
    {
      title: 'Total Rooms',
      value: statsData.totalRooms,
      icon: BedDouble,
      color: 'bg-primary-600',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-900',
    },
    {
      title: 'Total Reservations',
      value: statsData.totalBookings,
      icon: Calendar,
      color: 'bg-accent-500',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-800',
    },
    {
      title: 'Total Revenue',
      value: `$${statsData.monthlyRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'bg-accent-600',
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-900',
    },
    {
      title: 'Available Rooms',
      value: statsData.availableRooms,
      icon: Bed,
      color: 'bg-primary-400',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700',
    },
    {
      title: 'Paid Bookings',
      value: statsData.monthlyRevenue,
      icon: DollarSign,
      color: 'bg-accent-700',
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-950',
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <QuickActions />
    </div>
  );
};

export default Dashboard;
