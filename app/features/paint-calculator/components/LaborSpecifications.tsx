import { Wrench } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type React from 'react';
import type { LaborSpecificationsProps } from './types';

export const LaborSpecifications: React.FC<LaborSpecificationsProps> = ({
  laborSpecs,
  setLaborSpecs,
}) => (
  <Card>
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
        <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
        Định Mức & Đơn Giá Nhân Công
      </CardTitle>
      <CardDescription className="text-sm">
        Cấu hình chi phí nhân công và các chi phí khác
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="laborCostPerM2"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Giá nhân công (VND/m²)
          </Label>
          <Input
            id="laborCostPerM2"
            type="number"
            value={laborSpecs.laborCostPerM2}
            onChange={(e) =>
              setLaborSpecs((s) => ({
                ...s,
                laborCostPerM2: Number.parseFloat(e.target.value) || 0,
              }))
            }
            className="h-10"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="timePerM2"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Thời gian thi công (giờ/m²)
          </Label>
          <Input
            id="timePerM2"
            type="number"
            step="0.1"
            value={laborSpecs.timePerM2}
            onChange={(e) =>
              setLaborSpecs((s) => ({
                ...s,
                timePerM2: Number.parseFloat(e.target.value) || 0,
              }))
            }
            className="h-10"
            min="0"
          />
        </div>
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <Label
            htmlFor="otherCosts"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Chi phí khác (dụng cụ, đi lại, etc.)
          </Label>
          <Input
            id="otherCosts"
            type="number"
            value={laborSpecs.otherCosts}
            onChange={(e) =>
              setLaborSpecs((s) => ({
                ...s,
                otherCosts: Number.parseFloat(e.target.value) || 0,
              }))
            }
            className="h-10"
            min="0"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
