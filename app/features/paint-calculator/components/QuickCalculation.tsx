import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type { QuickCalculationProps } from '../components/types';

export const QuickCalculation: React.FC<QuickCalculationProps> = ({
  inputs,
  setInputs,
}) => {
  const handleFloorAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputs((prev) => ({
      ...prev,
      floorArea: isNaN(value) ? 0 : value,
    }));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Tính nhanh diện tích sơn
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ước tính nhanh chi phí dựa trên tổng diện tích sàn.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="floorArea">Diện tích sàn (m²)</Label>
          <Input
            id="floorArea"
            type="number"
            value={inputs.floorArea}
            onChange={handleFloorAreaChange}
            placeholder="Ví dụ: 100"
            min="0"
            className="h-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};
