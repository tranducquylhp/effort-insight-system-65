
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

interface OnsiteAllowance {
  id: number;
  projectCode: string;
  projectName: string;
  allowanceAmount: number;
}

const OnsiteAllowance = () => {
  const [allowances, setAllowances] = useState<OnsiteAllowance[]>([
    {
      id: 1,
      projectCode: "PRJ001",
      projectName: "Dự án A",
      allowanceAmount: 5000000
    },
    {
      id: 2,
      projectCode: "PRJ002",
      projectName: "Dự án B",
      allowanceAmount: 7000000
    }
  ]);

  const [selectedAllowance, setSelectedAllowance] = useState<OnsiteAllowance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectCode: '',
    projectName: '',
    allowanceAmount: ''
  });

  const handleCreate = () => {
    setSelectedAllowance(null);
    setFormData({
      projectCode: '',
      projectName: '',
      allowanceAmount: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (allowance: OnsiteAllowance) => {
    setSelectedAllowance(allowance);
    setFormData({
      projectCode: allowance.projectCode,
      projectName: allowance.projectName,
      allowanceAmount: allowance.allowanceAmount.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa phụ cấp này?')) {
      setAllowances(allowances.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.projectCode || !formData.projectName || !formData.allowanceAmount) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (selectedAllowance) {
      // Update existing allowance
      setAllowances(allowances.map(a => 
        a.id === selectedAllowance.id 
          ? {
              ...a,
              projectCode: formData.projectCode,
              projectName: formData.projectName,
              allowanceAmount: Number(formData.allowanceAmount)
            }
          : a
      ));
    } else {
      // Create new allowance
      const newAllowance: OnsiteAllowance = {
        id: Math.max(...allowances.map(a => a.id), 0) + 1,
        projectCode: formData.projectCode,
        projectName: formData.projectName,
        allowanceAmount: Number(formData.allowanceAmount)
      };
      setAllowances([...allowances, newAllowance]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý phụ cấp onsite</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Tạo mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedAllowance ? 'Chỉnh sửa phụ cấp onsite' : 'Tạo phụ cấp onsite mới'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectCode">Mã dự án</Label>
                <Input
                  id="projectCode"
                  value={formData.projectCode}
                  onChange={(e) => setFormData({...formData, projectCode: e.target.value})}
                  placeholder="Nhập mã dự án"
                />
              </div>
              <div>
                <Label htmlFor="projectName">Tên dự án</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  placeholder="Nhập tên dự án"
                />
              </div>
              <div>
                <Label htmlFor="allowanceAmount">Số tiền phụ cấp/Tháng (VND)</Label>
                <Input
                  id="allowanceAmount"
                  type="number"
                  value={formData.allowanceAmount}
                  onChange={(e) => setFormData({...formData, allowanceAmount: e.target.value})}
                  placeholder="Nhập số tiền phụ cấp"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {selectedAllowance ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng quản lý phụ cấp onsite</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã dự án</TableHead>
                <TableHead>Tên dự án</TableHead>
                <TableHead>Số tiền phụ cấp/Tháng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allowances.map((allowance, index) => (
                <TableRow key={allowance.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{allowance.projectCode}</TableCell>
                  <TableCell>{allowance.projectName}</TableCell>
                  <TableCell>{allowance.allowanceAmount.toLocaleString()} VND</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(allowance)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(allowance.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnsiteAllowance;
