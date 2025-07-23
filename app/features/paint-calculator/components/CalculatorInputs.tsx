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
import { Separator } from '@/shared/components/ui/separator';
import type {
  CalculatorInputsProps,
  PaintCalculationInputs,
} from '../components/types';
import { HouseType, HOUSE_TYPE_LABELS } from '../constants';

export const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
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

  const handleNestedInputChange = (
    key: keyof PaintCalculationInputs,
    nestedKey: string,
    value: number,
    index: number = 0,
  ) => {
    setInputs((prev) => {
      if (key === 'mainFloorDimensions') {
        const newDimensions = [...(prev.mainFloorDimensions || [])];
        if (!newDimensions[index]) {
          newDimensions[index] = { length: 0, width: 0 };
        }
        newDimensions[index] = { ...newDimensions[index], [nestedKey]: value };
        return { ...prev, [key]: newDimensions };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleSelectChange = (id: string, value: string) => {
    setInputs((prev) => {
      if (id === 'houseType') {
        const newInputs: PaintCalculationInputs = {
          houseType: value as HouseType,
          ceilingHeight: prev.ceilingHeight,
          numDoors: prev.numDoors,
          numWindows: prev.numWindows,
          mainFloorDimensions: undefined,
          numFloors: undefined,
          totalFloorArea: undefined,
          numBalconyDoors: undefined,
          staircaseLength: undefined,
          balconyLength: undefined,
          numRooms: undefined,
        };
        return newInputs;
      }
      return { ...prev, [id]: value };
    });
  };

  const renderHouseTypeSpecificInputs = () => {
    switch (inputs.houseType) {
      case HouseType.CAP_4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mainFloorDimensions[0].length">
                <span>Chiều dài sàn (m)</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Chiều dài của diện tích sàn nhà cấp 4.
                </p>
              </Label>
              <Input
                id="mainFloorDimensions[0].length"
                type="number"
                value={inputs.mainFloorDimensions?.[0]?.length || ''}
                onChange={(e) =>
                  handleNestedInputChange(
                    'mainFloorDimensions',
                    'length',
                    parseFloat(e.target.value) || 0,
                  )
                }
                placeholder="Dài"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainFloorDimensions[0].width">
                <span>Chiều rộng sàn (m)</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Chiều rộng của diện tích sàn nhà cấp 4.
                </p>
              </Label>
              <Input
                id="mainFloorDimensions[0].width"
                type="number"
                value={inputs.mainFloorDimensions?.[0]?.width || ''}
                onChange={(e) =>
                  handleNestedInputChange(
                    'mainFloorDimensions',
                    'width',
                    parseFloat(e.target.value) || 0,
                  )
                }
                placeholder="Rộng"
                min="0"
              />
            </div>
          </div>
        );
      case HouseType.NHA_ONG:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].length">
                  <span>Chiều dài sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài của một tầng điển hình trong nhà ống.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].length"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.length || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].width">
                  <span>Chiều rộng sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều rộng của một tầng điển hình trong nhà ống.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].width"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.width || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numFloors">
                  <span>Số tầng</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tổng số tầng của ngôi nhà ống (ví dụ: 3 tầng).
                  </p>
                </Label>
                <Input
                  id="numFloors"
                  type="number"
                  value={inputs.numFloors || ''}
                  onChange={handleInputChange}
                  placeholder="Số tầng"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staircaseLength">
                  <span>Chiều dài cầu thang (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài ước tính của khu vực cầu thang cần sơn.
                  </p>
                </Label>
                <Input
                  id="staircaseLength"
                  type="number"
                  value={inputs.staircaseLength || ''}
                  onChange={handleInputChange}
                  placeholder="Chiều dài cầu thang"
                  min="0"
                />
              </div>
            </div>
          </div>
        );
      case HouseType.BIET_THU:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].length">
                  <span>Chiều dài sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài của một tầng điển hình trong biệt thự.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].length"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.length || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].width">
                  <span>Chiều rộng sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều rộng của một tầng điển hình trong biệt thự.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].width"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.width || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numFloors">
                  <span>Số tầng</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tổng số tầng của căn biệt thự.
                  </p>
                </Label>
                <Input
                  id="numFloors"
                  type="number"
                  value={inputs.numFloors || ''}
                  onChange={handleInputChange}
                  placeholder="Số tầng"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numBalconyDoors">
                  <span>Số cửa ban công</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tổng số lượng cửa dẫn ra ban công của biệt thự.
                  </p>
                </Label>
                <Input
                  id="numBalconyDoors"
                  type="number"
                  value={inputs.numBalconyDoors || ''}
                  onChange={handleInputChange}
                  placeholder="Số cửa ban công"
                  min="0"
                />
              </div>
            </div>
          </div>
        );
      case HouseType.CHUNG_CU:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].length">
                  <span>Chiều dài căn hộ (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài của căn hộ chung cư.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].length"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.length || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].width">
                  <span>Chiều rộng căn hộ (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều rộng của căn hộ chung cư.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].width"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.width || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="balconyLength">
                  <span>Chiều dài ban công (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài phần ban công cần sơn ngoại thất.
                  </p>
                </Label>
                <Input
                  id="balconyLength"
                  type="number"
                  value={inputs.balconyLength || ''}
                  onChange={handleInputChange}
                  placeholder="Chiều dài ban công"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numBalconyDoors">
                  <span>Số cửa ban công</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Số lượng cửa dẫn ra ban công trong căn hộ.
                  </p>
                </Label>
                <Input
                  id="numBalconyDoors"
                  type="number"
                  value={inputs.numBalconyDoors || ''}
                  onChange={handleInputChange}
                  placeholder="Số cửa ban công"
                  min="0"
                />
              </div>
            </div>
          </div>
        );
      case HouseType.NHA_LIEN_KE:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].length">
                  <span>Chiều dài sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài của một tầng điển hình trong nhà liền kề.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].length"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.length || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].width">
                  <span>Chiều rộng sàn điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều rộng của một tầng điển hình trong nhà liền kề.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].width"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.width || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numFloors">
                <span>Số tầng</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Tổng số tầng của ngôi nhà liền kề.
                </p>
              </Label>
              <Input
                id="numFloors"
                type="number"
                value={inputs.numFloors || ''}
                onChange={handleInputChange}
                placeholder="Số tầng"
                min="1"
              />
            </div>
          </div>
        );
      case HouseType.NHA_TRO:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].length">
                  <span>Chiều dài phòng điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều dài của một phòng trọ điển hình.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].length"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.length || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'length',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Dài"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainFloorDimensions[0].width">
                  <span>Chiều rộng phòng điển hình (m)</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiều rộng của một phòng trọ điển hình.
                  </p>
                </Label>
                <Input
                  id="mainFloorDimensions[0].width"
                  type="number"
                  value={inputs.mainFloorDimensions?.[0]?.width || ''}
                  onChange={(e) =>
                    handleNestedInputChange(
                      'mainFloorDimensions',
                      'width',
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Rộng"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numRooms">
                <span>Số lượng phòng trọ</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Tổng số phòng trọ trong dãy nhà trọ.
                </p>
              </Label>
              <Input
                id="numRooms"
                type="number"
                value={inputs.numRooms || ''}
                onChange={handleInputChange}
                placeholder="Số lượng phòng"
                min="1"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông số công trình</CardTitle>
        <p className="text-sm text-muted-foreground">
          Nhập các thông số chi tiết của ngôi nhà hoặc căn phòng bạn muốn sơn.
          Các hệ số tường và bề mặt đã được tự động áp dụng tùy theo loại nhà.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="houseType">
              <span>Loại nhà</span>
              <p className="text-xs text-muted-foreground mt-1">
                Chọn loại hình nhà ở của bạn để áp dụng các hệ số tính toán phù
                hợp.
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
          <div className="space-y-2">
            <Label htmlFor="ceilingHeight">
              <span>Chiều cao trần (m)</span>
              <p className="text-xs text-muted-foreground mt-1">
                Chiều cao từ sàn đến trần nhà. Đây là yếu tố quan trọng ảnh
                hưởng đến diện tích tường.
              </p>
            </Label>
            <Input
              id="ceilingHeight"
              type="number"
              value={inputs.ceilingHeight}
              onChange={handleInputChange}
              placeholder="Cao trần"
              min="0"
            />
          </div>
        </div>

        {renderHouseTypeSpecificInputs()}

        <Separator className="my-6" />

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              Thông tin cửa
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Tổng diện tích các cửa sẽ được trừ khỏi diện tích sơn.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numDoors">
                  <span>Số cửa ra vào</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Số lượng cửa ra vào thông thường (diện tích 1.6 m² mỗi cửa).
                  </p>
                </Label>
                <Input
                  id="numDoors"
                  type="number"
                  value={inputs.numDoors || ''}
                  onChange={handleInputChange}
                  placeholder="Số cửa ra vào"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numWindows">
                  <span>Số cửa sổ</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Số lượng cửa sổ thông thường (diện tích 1.2 m² mỗi cửa).
                  </p>
                </Label>
                <Input
                  id="numWindows"
                  type="number"
                  value={inputs.numWindows || ''}
                  onChange={handleInputChange}
                  placeholder="Số cửa sổ"
                  min="0"
                />
              </div>
              {(inputs.houseType === HouseType.BIET_THU ||
                inputs.houseType === HouseType.CHUNG_CU) && (
                <div className="space-y-2">
                  <Label htmlFor="numBalconyDoors">
                    <span>Số cửa ban công</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Số lượng cửa ban công (diện tích 3.15 m² mỗi cửa).
                    </p>
                  </Label>
                  <Input
                    id="numBalconyDoors"
                    type="number"
                    value={inputs.numBalconyDoors || ''}
                    onChange={handleInputChange}
                    placeholder="Số cửa ban công"
                    min="0"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
