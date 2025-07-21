import { Calculator, DollarSign, Clock, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert';
import type React from 'react';
import type { ResultsPanelProps } from './types';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (value: number, decimalPlaces: number = 2): string => {
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  laborSpecs,
}) => (
  <div className="space-y-4 lg:space-y-6">
    <Card className="lg:sticky lg:top-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
          Báo Giá Ước Tính
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Labor */}
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <DollarSign className="w-4 h-4" />
              Nhân Công
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Chi phí nhân công (theo m²):
              </span>
              <span className="font-semibold text-base">
                {formatCurrency(results.totalArea * laborSpecs.laborCostPerM2)}{' '}
                ₫
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Chi phí khác:
              </span>
              <span className="font-semibold text-base">
                {formatCurrency(laborSpecs.otherCosts)} ₫
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">
                Tổng chi phí nhân công:
              </span>
              <span className="font-bold text-blue-700 dark:text-blue-300 text-base">
                {formatCurrency(results.laborCost)} ₫
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Time */}
        <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Clock className="w-4 h-4" />
              Thời Gian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Thời gian thi công:
              </span>
              <span className="font-semibold text-base">
                {formatNumber(results.workTime)} giờ
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tương đương khoảng {Math.ceil(results.workTime / 8)} ngày làm việc
              (8 giờ/ngày).
            </p>
          </CardContent>
        </Card>

        <Separator />

        {/* Total */}
        <div className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <span className="text-base sm:text-lg font-bold">TỔNG CỘNG</span>
            <span className="text-xl sm:text-2xl font-extrabold text-primary">
              {formatCurrency(results.totalCost)} ₫
            </span>
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm">Lưu Ý Quan Trọng</AlertTitle>
          <AlertDescription className="text-xs leading-relaxed">
            Các số liệu trên chỉ là ước tính. Nên mua dư 10-15% vật tư và tham
            khảo báo giá thực tế từ nhà thầu để có thông tin chính xác nhất.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  </div>
);
