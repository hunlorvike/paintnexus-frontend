import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type {
  QuickCalculationProps,
  QuickCalculationInputs,
} from '../components/types';
import { HouseType, HOUSE_TYPE_LABELS } from '../constants';

export const QuickCalculation: React.FC<QuickCalculationProps> = ({
  inputs,
  setInputs,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setInputs((prev) => {
      if (id === 'houseType') {
        // Reset other specific inputs when house type changes for quick calculation
        const newInputs: QuickCalculationInputs = {
          houseType: value as HouseType,
          totalFloorArea: undefined,
          numFloors: undefined,
          numRooms: undefined,
        };
        return newInputs;
      }
      return { ...prev, [id]: value };
    });
  };

  const renderQuickInputs = () => {
    switch (inputs.houseType) {
      case HouseType.CAP_4:
      case HouseType.CHUNG_CU:
        return (
          <div className="space-y-2">
            <Label htmlFor="totalFloorArea">
              <span>Tổng diện tích sàn (m²)</span>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">
                Tổng diện tích mặt sàn của ngôi nhà/căn hộ. (Ví dụ: 100m²)
              </p>
            </Label>
            <Input
              id="totalFloorArea"
              type="number"
              value={inputs.totalFloorArea || ''}
              onChange={handleInputChange}
              placeholder="Ví dụ: 100"
              min="0"
            />
          </div>
        );
      case HouseType.NHA_ONG:
      case HouseType.BIET_THU:
      case HouseType.NHA_LIEN_KE:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalFloorArea">
                <span>Tổng diện tích sàn (m²)</span>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  Tổng diện tích mặt sàn của tất cả các tầng. (Ví dụ: 144m²)
                </p>
              </Label>
              <Input
                id="totalFloorArea"
                type="number"
                value={inputs.totalFloorArea || ''}
                onChange={handleInputChange}
                placeholder="Ví dụ: 144"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numFloors">
                <span>Số tầng</span>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  Tổng số tầng của công trình. (Ví dụ: 3)
                </p>
              </Label>
              <Input
                id="numFloors"
                type="number"
                value={inputs.numFloors || ''}
                onChange={handleInputChange}
                placeholder="Ví dụ: 3"
                min="1"
              />
            </div>
          </div>
        );
      case HouseType.NHA_TRO:
        return (
          <div className="space-y-2">
            <Label htmlFor="numRooms">
              <span>Số lượng phòng trọ</span>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">
                Tổng số lượng phòng trọ trong dự án. (Ví dụ: 10)
              </p>
            </Label>
            <Input
              id="numRooms"
              type="number"
              value={inputs.numRooms || ''}
              onChange={handleInputChange}
              placeholder="Ví dụ: 10"
              min="1"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Tính nhanh diện tích sơn
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ước tính nhanh chi phí dựa trên các thông số tổng quan. Công thức ước
          lượng nhanh có thể có sai số lớn hơn công thức chi tiết.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="houseType">
            <span>Loại nhà</span>
            <p className="text-xs text-muted-foreground mt-1 leading-tight">
              Chọn loại hình nhà ở để áp dụng công thức ước lượng nhanh phù hợp.
            </p>
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange('houseType', value)}
            value={inputs.houseType}
          >
            <SelectTrigger id="houseType">
              <SelectValue placeholder="Chọn loại nhà" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(HouseType).map((type) => (
                <SelectItem key={type} value={type}>
                  {HOUSE_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {inputs.houseType && renderQuickInputs()}
      </CardContent>
    </Card>
  );
};
