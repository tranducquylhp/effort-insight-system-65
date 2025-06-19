
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet } from "lucide-react";

interface ImportedData {
  id: number;
  costType: string;
  applicationTime: string;
  fileName: string;
  data: any[];
}

const CostManagement = () => {
  const [costType, setCostType] = useState('');
  const [applicationTime, setApplicationTime] = useState('');
  const [importedFiles, setImportedFiles] = useState<ImportedData[]>([
    {
      id: 1,
      costType: 'Chi phí lương',
      applicationTime: '2024-01',
      fileName: 'salary_202401.xlsx',
      data: [
        { employee: 'Nguyễn Văn A', salary: 15000000 },
        { employee: 'Trần Thị B', salary: 12000000 },
      ]
    },
    {
      id: 2,
      costType: 'Chi phí overhead',
      applicationTime: '2024-01',
      fileName: 'overhead_202401.xlsx',
      data: [
        { employee: 'Nguyễn Văn A', overhead: 3000000 },
        { employee: 'Trần Thị B', overhead: 2400000 },
      ]
    }
  ]);
  const [selectedFile, setSelectedFile] = useState<ImportedData | null>(null);

  const handleImport = () => {
    if (!costType || !applicationTime) {
      alert('Vui lòng chọn đầy đủ thông tin');
      return;
    }

    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Simulate import process
        const newImport: ImportedData = {
          id: Math.max(...importedFiles.map(f => f.id), 0) + 1,
          costType,
          applicationTime,
          fileName: file.name,
          data: [
            { employee: 'Nhân viên mẫu', amount: 10000000 }
          ]
        };
        setImportedFiles([...importedFiles, newImport]);
        setCostType('');
        setApplicationTime('');
        alert('Import thành công!');
      }
    };
    input.click();
  };

  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quản lý chi phí lương và chi phí overhead</h1>

      <Card>
        <CardHeader>
          <CardTitle>Import file excel Chi phí lương/overhead</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="costType">Loại chi phí *</Label>
              <Select value={costType} onValueChange={setCostType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại chi phí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chi phí lương">Chi phí lương</SelectItem>
                  <SelectItem value="Chi phí overhead">Chi phí overhead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="applicationTime">Thời gian áp dụng *</Label>
              <Input
                id="applicationTime"
                type="month"
                value={applicationTime}
                onChange={(e) => setApplicationTime(e.target.value)}
                defaultValue={getCurrentMonthYear()}
              />
            </div>
          </div>
          <Button onClick={handleImport} disabled={!costType || !applicationTime}>
            <Upload className="mr-2 h-4 w-4" />
            Import excel
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dữ liệu đã import</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Loại chi phí</TableHead>
                <TableHead>Thời gian áp dụng</TableHead>
                <TableHead>Tên file</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importedFiles.map((file, index) => (
                <TableRow 
                  key={file.id}
                  className={selectedFile?.id === file.id ? 'bg-blue-50' : ''}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{file.costType}</TableCell>
                  <TableCell>{file.applicationTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      {file.fileName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)}
                    >
                      {selectedFile?.id === file.id ? 'Ẩn' : 'Xem chi tiết'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết dữ liệu: {selectedFile.fileName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhân viên</TableHead>
                  <TableHead>Số tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedFile.data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.employee}</TableCell>
                    <TableCell>
                      {(row.salary || row.overhead || row.amount || 0).toLocaleString()} VND
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CostManagement;
