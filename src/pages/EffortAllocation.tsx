
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Edit, Trash2 } from "lucide-react";

interface EffortAllocation {
  id: number;
  project: string;
  allocationPercentage: number;
}

const EffortAllocation = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedIteration, setSelectedIteration] = useState('');
  const [allocations, setAllocations] = useState<EffortAllocation[]>([]);
  const [showResults, setShowResults] = useState(false);

  const employees = [
    { id: 'emp1', name: 'Nguyễn Văn A' },
    { id: 'emp2', name: 'Trần Thị B' },
    { id: 'emp3', name: 'Lê Văn C' },
  ];

  const iterations = [
    { id: 'sprint1', name: 'Sprint 1' },
    { id: 'sprint2', name: 'Sprint 2' },
    { id: 'sprint3', name: 'Sprint 3' },
  ];

  const handleSearch = () => {
    if (selectedEmployee && selectedIteration) {
      // Simulate search results
      const mockAllocations: EffortAllocation[] = [
        { id: 1, project: 'Dự án A', allocationPercentage: 60 },
        { id: 2, project: 'Dự án B', allocationPercentage: 30 },
        { id: 3, project: 'Dự án C', allocationPercentage: 10 },
      ];
      setAllocations(mockAllocations);
      setShowResults(true);
    }
  };

  const handleEdit = (id: number, newPercentage: number) => {
    setAllocations(allocations.map(allocation => 
      allocation.id === id 
        ? { ...allocation, allocationPercentage: newPercentage }
        : allocation
    ));
  };

  const handleDelete = (id: number) => {
    setAllocations(allocations.filter(allocation => allocation.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tính toán phân bổ nỗ lực</h1>

      <Card>
        <CardHeader>
          <CardTitle>Điều kiện tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employee">Nhân viên *</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="iteration">Iteration *</Label>
              <Select value={selectedIteration} onValueChange={setSelectedIteration}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn iteration" />
                </SelectTrigger>
                <SelectContent>
                  {iterations.map((iteration) => (
                    <SelectItem key={iteration.id} value={iteration.id}>
                      {iteration.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} disabled={!selectedEmployee || !selectedIteration}>
            <Search className="mr-2 h-4 w-4" />
            Tìm kiếm
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Kết quả phân bổ nỗ lực</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Dự án</TableHead>
                  <TableHead>% Phân bổ</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((allocation, index) => (
                  <TableRow key={allocation.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{allocation.project}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={allocation.allocationPercentage}
                        onChange={(e) => handleEdit(allocation.id, Number(e.target.value))}
                        className="w-20"
                        min="0"
                        max="100"
                      />
                      %
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(allocation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {allocations.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <p className="font-semibold">
                  Tổng phân bổ: {allocations.reduce((sum, a) => sum + a.allocationPercentage, 0)}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EffortAllocation;
