
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

interface PnLData {
  revenue: number;
  directCost: number;
  grossProfit: number;
  indirectCost: number;
  netProfit: number;
  grossMargin: number;
  netMargin: number;
}

const PnLReport = () => {
  const [projectCode, setProjectCode] = useState('');
  const [iteration, setIteration] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [pnlData, setPnlData] = useState<PnLData | null>(null);

  const projects = [
    { code: 'PRJ001', name: 'Dự án A' },
    { code: 'PRJ002', name: 'Dự án B' },
    { code: 'PRJ003', name: 'Dự án C' },
  ];

  const iterations = [
    { id: 'sprint1', name: 'Sprint 1' },
    { id: 'sprint2', name: 'Sprint 2' },
    { id: 'sprint3', name: 'Sprint 3' },
  ];

  const handleSearch = () => {
    if (projectCode && iteration) {
      // Simulate P&L calculation
      const mockPnLData: PnLData = {
        revenue: 100000000,
        directCost: 60000000,
        grossProfit: 40000000,
        indirectCost: 15000000,
        netProfit: 25000000,
        grossMargin: 40,
        netMargin: 25
      };
      setPnlData(mockPnLData);
      setShowResults(true);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bảng tính P&L</h1>

      <Card>
        <CardHeader>
          <CardTitle>Điều kiện tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectCode">Mã dự án</Label>
              <Select value={projectCode} onValueChange={setProjectCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dự án" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.code} value={project.code}>
                      {project.code} - {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="iteration">Iteration</Label>
              <Select value={iteration} onValueChange={setIteration}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn iteration" />
                </SelectTrigger>
                <SelectContent>
                  {iterations.map((iter) => (
                    <SelectItem key={iter.id} value={iter.id}>
                      {iter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} disabled={!projectCode || !iteration}>
            <Search className="mr-2 h-4 w-4" />
            Tìm kiếm
          </Button>
        </CardContent>
      </Card>

      {showResults && pnlData && (
        <Card>
          <CardHeader>
            <CardTitle>Kết quả phân tích P&L</CardTitle>
            <p className="text-sm text-muted-foreground">
              Dự án: {projectCode} | Iteration: {iteration}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bảng chi tiết P&L */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Chi tiết P&L</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Doanh thu (Revenue)</TableCell>
                      <TableCell className="text-right font-mono">
                        {pnlData.revenue.toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chi phí trực tiếp (Direct Cost)</TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        -{pnlData.directCost.toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-medium">Lợi nhuận gộp (Gross Profit)</TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {pnlData.grossProfit.toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chi phí gián tiếp (Indirect Cost)</TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        -{pnlData.indirectCost.toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-medium">Lợi nhuận ròng (Net Profit)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-green-600">
                        {pnlData.netProfit.toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Tỷ suất lợi nhuận */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tỷ suất lợi nhuận</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Tỷ suất lợi nhuận gộp</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {pnlData.grossMargin}%
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600">Tỷ suất lợi nhuận ròng</div>
                    <div className="text-2xl font-bold text-green-600">
                      {pnlData.netMargin}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng phân tích chi tiết */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Phân tích chi tiết chi phí</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại chi phí</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead className="text-right">% Doanh thu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Chi phí lương trực tiếp</TableCell>
                    <TableCell className="text-right">45,000,000 VND</TableCell>
                    <TableCell className="text-right">45%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chi phí vật liệu</TableCell>
                    <TableCell className="text-right">10,000,000 VND</TableCell>
                    <TableCell className="text-right">10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chi phí onsite</TableCell>
                    <TableCell className="text-right">5,000,000 VND</TableCell>
                    <TableCell className="text-right">5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chi phí overhead</TableCell>
                    <TableCell className="text-right">15,000,000 VND</TableCell>
                    <TableCell className="text-right">15%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PnLReport;
