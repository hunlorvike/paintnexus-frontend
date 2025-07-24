import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Dashboard - PaintNexus' },
    {
      name: 'description',
      content: 'Tổng quan các dự án và công cụ tính toán sơn.',
    },
  ];
};
function DashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Đây là nội dung của trang Dashboard chính. Bạn có thể thêm các widget,
          biểu đồ, và thông tin tổng quan tại đây.
        </p>
      </CardContent>
    </Card>
  );
}

export default DashboardPage;
