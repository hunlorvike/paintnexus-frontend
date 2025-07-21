import type { CalculatorHeaderProps } from '../components/types';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { CalculationTab } from '../constants';

export const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({
  activeTab,
  setActiveTab,
}) => (
  <div className="flex flex-col gap-3 sm:gap-4">
    <div className="space-y-2">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
        Công Cụ Ước Tính Chi Phí Sơn Nhà
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Nhập thông số để nhận báo giá và kế hoạch chi tiết cho dự án sơn nhà của
        bạn.
      </p>
    </div>
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as CalculationTab)}
      className="w-fit sm:w-auto"
    >
      <TabsList>
        <TabsTrigger value={CalculationTab.DETAILED}>Tính chi tiết</TabsTrigger>
        <TabsTrigger value={CalculationTab.QUICK}>Tính nhanh</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);
