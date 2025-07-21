import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Separator } from '@/shared/components/ui/separator';
import type { CalculatorInputsProps } from '../components/types';
import {
  HouseType,
  HOUSE_TYPE_LABELS,
  WallSurfaceType,
  WALL_SURFACE_TYPE_LABELS,
} from '../constants';

export const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  inputs,
  setInputs,
  addRoom,
  removeRoom,
  updateRoomDimension,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setInputs((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setInputs((prev) => {
      if (id === 'houseType') {
        return { ...prev, houseType: parseInt(value) as HouseType };
      } else if (id === 'wallSurfaceType') {
        return { ...prev, wallSurfaceType: parseInt(value) as WallSurfaceType };
      }
      return prev;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông số công trình</CardTitle>
        <p className="text-sm text-muted-foreground">
          Nhập các thông số chi tiết của ngôi nhà hoặc căn phòng bạn muốn sơn.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {inputs.roomLengths.map((_, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm space-y-4 mb-4"
          >
            <h4 className="font-semibold text-base text-gray-800 dark:text-gray-200">
              Phòng {index + 1}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor={`roomLength-${index}`}>Chiều dài (m)</Label>
                <Input
                  id={`roomLength-${index}`}
                  type="number"
                  value={inputs.roomLengths[index]}
                  onChange={(e) =>
                    updateRoomDimension(
                      index,
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`roomWidth-${index}`}>Chiều rộng (m)</Label>
                <Input
                  id={`roomWidth-${index}`}
                  type="number"
                  value={inputs.roomWidths[index]}
                  onChange={(e) =>
                    updateRoomDimension(
                      index,
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
              <div className="flex">
                {inputs.roomLengths.length > 1 && (
                  <Button
                    variant="destructive"
                    onClick={() => removeRoom(index)}
                    className="w-full"
                  >
                    Xóa phòng
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        <Button onClick={addRoom} className="w-full">
          Thêm phòng
        </Button>

        <Separator className="my-6" />

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              Thông tin chung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ceilingHeight">Chiều cao trần (m)</Label>
                <Input
                  id="ceilingHeight"
                  type="number"
                  value={inputs.ceilingHeight}
                  onChange={handleInputChange}
                  placeholder="Cao trần"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseType">Loại nhà</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange('houseType', value)
                  }
                  value={inputs.houseType.toString()}
                >
                  <SelectTrigger id="houseType">
                    <SelectValue placeholder="Chọn loại nhà" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(HouseType)
                      .filter((value) => typeof value === 'number')
                      .map((type) => (
                        <SelectItem key={type} value={type.toString()}>
                          {HOUSE_TYPE_LABELS[type as HouseType]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              Thông tin cửa và cửa sổ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numDoors">Số cửa ra vào</Label>
                <Input
                  id="numDoors"
                  type="number"
                  value={inputs.numDoors}
                  onChange={handleInputChange}
                  placeholder="Số cửa ra vào"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numWindows">Số cửa sổ</Label>
                <Input
                  id="numWindows"
                  type="number"
                  value={inputs.numWindows}
                  onChange={handleInputChange}
                  placeholder="Số cửa sổ"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherDoorArea">Diện tích cửa khác (m²)</Label>
                <Input
                  id="otherDoorArea"
                  type="number"
                  value={inputs.otherDoorArea}
                  onChange={handleInputChange}
                  placeholder="Diện tích khác"
                  min="0"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              Tùy chọn sơn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="paintCeiling"
                  checked={inputs.paintCeiling}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange('paintCeiling', checked)
                  }
                />
                <Label htmlFor="paintCeiling">Có sơn trần</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallSurfaceType">Loại bề mặt tường</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange('wallSurfaceType', value)
                  }
                  value={inputs.wallSurfaceType.toString()}
                >
                  <SelectTrigger id="wallSurfaceType">
                    <SelectValue placeholder="Chọn loại bề mặt" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(WallSurfaceType)
                      .filter((value) => typeof value === 'number')
                      .map((type) => (
                        <SelectItem key={type} value={type.toString()}>
                          {WALL_SURFACE_TYPE_LABELS[type as WallSurfaceType]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
