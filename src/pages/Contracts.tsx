
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Contract {
  id: number;
  projectCode: string;
  projectName: string;
  contractNumber: string;
  unitPrice: number;
  validFrom: string;
  validTo: string;
  status: string;
}

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 1,
      projectCode: "PRJ001",
      projectName: "Dự án A",
      contractNumber: "HD001",
      unitPrice: 50000000,
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      status: "Hiệu lực"
    },
    {
      id: 2,
      projectCode: "PRJ002",
      projectName: "Dự án B",
      contractNumber: "HD002",
      unitPrice: 75000000,
      validFrom: "2024-02-01",
      validTo: "2025-01-31",
      status: "Hiệu lực"
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectCode: '',
    projectName: '',
    contractNumber: '',
    unitPrice: '',
    validFrom: '',
    validTo: ''
  });

  const handleCreate = () => {
    setSelectedContract(null);
    setFormData({
      projectCode: '',
      projectName: '',
      contractNumber: '',
      unitPrice: '',
      validFrom: '',
      validTo: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (contract: Contract) => {
    setSelectedContract(contract);
    setFormData({
      projectCode: contract.projectCode,
      projectName: contract.projectName,
      contractNumber: contract.contractNumber,
      unitPrice: contract.unitPrice.toString(),
      validFrom: contract.validFrom,
      validTo: contract.validTo
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setContracts(contracts.filter(c => c.id !== id));
  };

  const handleSave = () => {
    if (selectedContract) {
      // Update existing contract
      setContracts(contracts.map(c => 
        c.id === selectedContract.id 
          ? {
              ...c,
              projectCode: formData.projectCode,
              projectName: formData.projectName,
              contractNumber: formData.contractNumber,
              unitPrice: Number(formData.unitPrice),
              validFrom: formData.validFrom,
              validTo: formData.validTo
            }
          : c
      ));
    } else {
      // Create new contract
      const newContract: Contract = {
        id: Math.max(...contracts.map(c => c.id), 0) + 1,
        projectCode: formData.projectCode,
        projectName: formData.projectName,
        contractNumber: formData.contractNumber,
        unitPrice: Number(formData.unitPrice),
        validFrom: formData.validFrom,
        validTo: formData.validTo,
        status: "Hiệu lực"
      };
      setContracts([...contracts, newContract]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý hợp đồng</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Tạo hợp đồng mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedContract ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectCode">Mã dự án</Label>
                <Input
                  id="projectCode"
                  value={formData.projectCode}
                  onChange={(e) => setFormData({...formData, projectCode: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="projectName">Tên dự án</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contractNumber">Số hợp đồng</Label>
                <Input
                  id="contractNumber"
                  value={formData.contractNumber}
                  onChange={(e) => setFormData({...formData, contractNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Đơn giá</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="validFrom">Từ ngày</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="validTo">Đến ngày</Label>
                <Input
                  id="validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({...formData, validTo: e.target.value})}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {selectedContract ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hợp đồng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã dự án</TableHead>
                <TableHead>Tên dự án</TableHead>
                <TableHead>Số hợp đồng</TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead>Thời gian hiệu lực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract, index) => (
                <TableRow key={contract.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{contract.projectCode}</TableCell>
                  <TableCell>{contract.projectName}</TableCell>
                  <TableCell>{contract.contractNumber}</TableCell>
                  <TableCell>{contract.unitPrice.toLocaleString()} VND</TableCell>
                  <TableCell>{contract.validFrom} - {contract.validTo}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      contract.status === 'Hiệu lực' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {contract.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(contract)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(contract.id)}>
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

export default Contracts;
