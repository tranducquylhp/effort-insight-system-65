
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Calendar, Calculator, DollarSign, MapPin, BarChart3, TrendingUp, Users, Target } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Quản lý hợp đồng",
      description: "Quản lý hợp đồng và đơn giá theo dự án",
      icon: FileText,
      link: "/contracts",
      color: "bg-blue-500"
    },
    {
      title: "Quản lý lịch sản xuất",
      description: "Quản lý lịch sản xuất theo tháng và iteration",
      icon: Calendar,
      link: "/production-schedule",
      color: "bg-green-500"
    },
    {
      title: "Tính toán phân bổ nỗ lực",
      description: "Phân bổ nỗ lực nhân viên theo dự án",
      icon: Calculator,
      link: "/effort-allocation",
      color: "bg-purple-500"
    },
    {
      title: "Quản lý chi phí lương",
      description: "Import và quản lý chi phí lương, overhead",
      icon: DollarSign,
      link: "/cost-management",
      color: "bg-orange-500"
    },
    {
      title: "Quản lý phụ cấp onsite",
      description: "Quản lý phụ cấp onsite theo dự án",
      icon: MapPin,
      link: "/onsite-allowance",
      color: "bg-red-500"
    },
    {
      title: "Bảng tính P&L",
      description: "Phân tích lợi nhuận và thua lỗ",
      icon: BarChart3,
      link: "/pnl-report",
      color: "bg-indigo-500"
    }
  ];

  const stats = [
    {
      title: "Tổng dự án",
      value: "12",
      icon: Target,
      change: "+2 tháng này"
    },
    {
      title: "Tổng nhân viên",
      value: "45",
      icon: Users,
      change: "+5 tháng này"
    },
    {
      title: "Lợi nhuận trung bình",
      value: "25%",
      icon: TrendingUp,
      change: "+3% so với tháng trước"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hệ thống quản lý P&L
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Giải pháp toàn diện cho việc quản lý chi phí, phân bổ nỗ lực và phân tích lợi nhuận
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Chức năng chính</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`${feature.color} p-2 rounded-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <Button className="w-full">
                    Truy cập
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/contracts">
              <Button variant="outline" className="w-full">
                Tạo hợp đồng mới
              </Button>
            </Link>
            <Link to="/cost-management">
              <Button variant="outline" className="w-full">
                Import chi phí
              </Button>
            </Link>
            <Link to="/effort-allocation">
              <Button variant="outline" className="w-full">
                Phân bổ nỗ lực
              </Button>
            </Link>
            <Link to="/pnl-report">
              <Button variant="outline" className="w-full">
                Xem báo cáo P&L
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
