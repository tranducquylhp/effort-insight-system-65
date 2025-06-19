
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

interface MonthlySchedule {
  id: number;
  month: number;
  year: number;
  workingDays: number;
}

interface IterationSchedule {
  id: number;
  iterationName: string;
  startDate: string;
  endDate: string;
  workingDays: number;
}

const ProductionSchedule = () => {
  const [monthlySchedules, setMonthlySchedules] = useState<MonthlySchedule[]>([
    { id: 1, month: 1, year: 2024, workingDays: 22 },
    { id: 2, month: 2, year: 2024, workingDays: 20 },
    { id: 3, month: 3, year: 2024, workingDays: 21 }
  ]);

  const [iterationSchedules, setIterationSchedules] = useState<IterationSchedule[]>([
    {
      id: 1,
      iterationName: "Sprint 1",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      workingDays: 11
    },
    {
      id: 2,
      iterationName: "Sprint 2",
      startDate: "2024-01-16",
      endDate: "2024-01-31",
      workingDays: 11
    }
  ]);

  const [monthlyDialogOpen, setMonthlyDialogOpen] = useState(false);
  const [iterationDialogOpen, setIterationDialogOpen] = useState(false);
  
  const [selectedMonthly, setSelectedMonthly] = useState<MonthlySchedule | null>(null);
  const [selectedIteration, setSelectedIteration] = useState<IterationSchedule | null>(null);

  const [monthlyForm, setMonthlyForm] = useState({
    month: '',
    year: '',
    workingDays: ''
  });

  const [iterationForm, setIterationForm] = useState({
    iterationName: '',
    startDate: '',
    endDate: '',
    workingDays: ''
  });

  const handleCreateMonthly = () => {
    setSelectedMonthly(null);
    setMonthlyForm({ month: '', year: '', workingDays: '' });
    setMonthlyDialogOpen(true);
  };

  const handleEditMonthly = (schedule: MonthlySchedule) => {
    setSelectedMonthly(schedule);
    setMonthlyForm({
      month: schedule.month.toString(),
      year: schedule.year.toString(),
      workingDays: schedule.workingDays.toString()
    });
    setMonthlyDialogOpen(true);
  };

  const handleSaveMonthly = () => {
    if (selectedMonthly) {
      setMonthlySchedules(monthlySchedules.map(s => 
        s.id === selectedMonthly.id 
          ? {
              ...s,
              month: Number(monthlyForm.month),
              year: Number(monthlyForm.year),
              workingDays: Number(monthlyForm.workingDays)
            }
          : s
      ));
    } else {
      const newSchedule: MonthlySchedule = {
        id: Math.max(...monthlySchedules.map(s => s.id), 0) + 1,
        month: Number(monthlyForm.month),
        year: Number(monthlyForm.year),
        workingDays: Number(monthlyForm.workingDays)
      };
      setMonthlySchedules([...monthlySchedules, newSchedule]);
    }
    setMonthlyDialogOpen(false);
  };

  const handleCreateIteration = () => {
    setSelectedIteration(null);
    setIterationForm({ iterationName: '', startDate: '', endDate: '', workingDays: '' });
    setIterationDialogOpen(true);
  };

  const handleEditIteration = (schedule: IterationSchedule) => {
    setSelectedIteration(schedule);
    setIterationForm({
      iterationName: schedule.iterationName,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      workingDays: schedule.workingDays.toString()
    });
    setIterationDialogOpen(true);
  };

  const handleSaveIteration = () => {
    if (selectedIteration) {
      setIterationSchedules(iterationSchedules.map(s => 
        s.id === selectedIteration.id 
          ? {
              ...s,
              iterationName: iterationForm.iterationName,
              startDate: iterationForm.startDate,
              endDate: iterationForm.endDate,
              workingDays: Number(iterationForm.workingDays)
            }
          : s
      ));
    } else {
      const newSchedule: IterationSchedule = {
        id: Math.max(...iterationSchedules.map(s => s.id), 0) + 1,
        iterationName: iterationForm.iterationName,
        startDate: iterationForm.startDate,
        endDate: iterationForm.endDate,
        workingDays: Number(iterationForm.workingDays)
      };
      setIterationSchedules([...iterationSchedules, newSchedule]);
    }
    setIterationDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quản lý lịch sản xuất</h1>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList>
          <TabsTrigger value="monthly">Lịch theo tháng</TabsTrigger>
          <TabsTrigger value="iteration">Lịch theo Iteration</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Quản lý lịch sản xuất theo tháng</h2>
            <Dialog open={monthlyDialogOpen} onOpenChange={setMonthlyDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreateMonthly}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm lịch tháng
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedMonthly ? 'Chỉnh sửa lịch tháng' : 'Thêm lịch tháng'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="month">Tháng</Label>
                    <Input
                      id="month"
                      type="number"
                      min="1"
                      max="12"
                      value={monthlyForm.month}
                      onChange={(e) => setMonthlyForm({...monthlyForm, month: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Năm</Label>
                    <Input
                      id="year"
                      type="number"
                      value={monthlyForm.year}
                      onChange={(e) => setMonthlyForm({...monthlyForm, year: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workingDays">Số ngày làm việc</Label>
                    <Input
                      id="workingDays"
                      type="number"
                      value={monthlyForm.workingDays}
                      onChange={(e) => setMonthlyForm({...monthlyForm, workingDays: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleSaveMonthly} className="w-full">
                    {selectedMonthly ? 'Cập nhật' : 'Thêm mới'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tháng</TableHead>
                    <TableHead>Năm</TableHead>
                    <TableHead>Số ngày làm việc</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlySchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.month}</TableCell>
                      <TableCell>{schedule.year}</TableCell>
                      <TableCell>{schedule.workingDays}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleEditMonthly(schedule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iteration" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Quản lý lịch sản xuất theo Iteration</h2>
            <Dialog open={iterationDialogOpen} onOpenChange={setIterationDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreateIteration}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm Iteration
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedIteration ? 'Chỉnh sửa Iteration' : 'Thêm Iteration'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="iterationName">Tên Iteration</Label>
                    <Input
                      id="iterationName"
                      value={iterationForm.iterationName}
                      onChange={(e) => setIterationForm({...iterationForm, iterationName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={iterationForm.startDate}
                      onChange={(e) => setIterationForm({...iterationForm, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Ngày kết thúc</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={iterationForm.endDate}
                      onChange={(e) => setIterationForm({...iterationForm, endDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workingDaysIter">Số ngày làm việc</Label>
                    <Input
                      id="workingDaysIter"
                      type="number"
                      value={iterationForm.workingDays}
                      onChange={(e) => setIterationForm({...iterationForm, workingDays: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleSaveIteration} className="w-full">
                    {selectedIteration ? 'Cập nhật' : 'Thêm mới'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên Iteration</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Ngày kết thúc</TableHead>
                    <TableHead>Số ngày làm việc</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {iterationSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.iterationName}</TableCell>
                      <TableCell>{schedule.startDate}</TableCell>
                      <TableCell>{schedule.endDate}</TableCell>
                      <TableCell>{schedule.workingDays}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleEditIteration(schedule)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductionSchedule;
