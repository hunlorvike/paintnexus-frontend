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
        Cấu hình chi phí nhân công và các chi phí khác liên quan đến việc thi
        công sơn.
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
            <p className="text-xs text-muted-foreground mt-1">
              Chi phí thuê thợ sơn tính trên mỗi mét vuông diện tích sơn.
            </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Thời gian ước tính để hoàn thành sơn một mét vuông (ví dụ: 0.25
              giờ/m²).
            </p>
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
        <div className="space-y-2">
          <Label
            htmlFor="numFinishPaintCoats"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Số lớp sơn phủ
            <p className="text-xs text-muted-foreground mt-1">
              Số lớp sơn màu bạn muốn sơn lên bề mặt (thường là 2 lớp).
            </p>
          </Label>
          <Input
            id="numFinishPaintCoats"
            type="number"
            value={laborSpecs.numFinishPaintCoats}
            onChange={(e) =>
              setLaborSpecs((s) => ({
                ...s,
                numFinishPaintCoats: Number.parseFloat(e.target.value) || 0,
              }))
            }
            className="h-10"
            min="1"
          />
        </div>
        <div className="space-y-2 sm:col-span-full lg:col-span-1">
          <Label
            htmlFor="otherCosts"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Chi phí khác (dụng cụ, đi lại, etc.)
            <p className="text-xs text-muted-foreground mt-1">
              Các khoản chi phí phụ trợ khác không thuộc vật tư hay nhân công
              trực tiếp.
            </p>
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
