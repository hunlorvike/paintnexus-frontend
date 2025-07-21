# Áp dụng Domain-Driven Design (DDD) cho Frontend React (Remix)

## 1. Giới thiệu

Domain-Driven Design (DDD) không chỉ là một phương pháp thiết kế backend mà còn có thể được áp dụng hiệu quả cho frontend để tạo ra các ứng dụng có cấu trúc rõ ràng, dễ bảo trì và mở rộng.

### Tại sao áp dụng DDD cho Frontend?

- **Cấu trúc nhất quán**: Đồng bộ tư duy giữa frontend và backend
- **Tách biệt rõ ràng**: Phân chia trách nhiệm giữa các layer
- **Dễ bảo trì**: Code được tổ chức logic theo domain
- **Khả năng mở rộng**: Thêm tính năng mới không ảnh hưởng đến code cũ
- **Testability**: Từng layer có thể được test độc lập

## 2. Mapping các khái niệm DDD sang Frontend

### 2.1. Bảng tương quan khái niệm

| Khái niệm DDD (Backend)  | Tương đương Frontend React          | Mô tả & Ví dụ                                                              |
| :----------------------- | :---------------------------------- | :------------------------------------------------------------------------- |
| **Bounded Contexts**     | **Feature Modules**                 | Các module tính năng độc lập (e.g., `user-management`, `paint-calculator`) |
| **Domain Model**         | **TypeScript Types/Interfaces**     | Định nghĩa cấu trúc dữ liệu nghiệp vụ                                      |
| **Entities**             | **Domain Objects**                  | Các đối tượng có identity (User, Order, Project)                           |
| **Value Objects**        | **Immutable Types**                 | Các giá trị không thay đổi (Money, Address, DateRange)                     |
| **Repositories**         | **API Services & Custom Hooks**     | Trừu tượng hóa việc truy cập dữ liệu                                       |
| **Domain Services**      | **Business Logic Functions**        | Logic nghiệp vụ không thuộc về entity cụ thể                               |
| **Application Services** | **Container Components & Hooks**    | Điều phối luồng dữ liệu và business logic                                  |
| **Infrastructure**       | **API Clients & External Services** | Tương tác với external systems                                             |
| **UI Layer**             | **Presentational Components**       | Chỉ chịu tr책nhiệm hiển thị UI                                             |

### 2.2. Kiến trúc Layer trong Frontend

```
┌─────────────────────────────────────┐
│         UI Layer                    │
│    (Presentational Components)      │
├─────────────────────────────────────┤
│      Application Layer              │
│  (Container Components & Hooks)     │
├─────────────────────────────────────┤
│        Domain Layer                 │
│  (Business Logic & Domain Models)   │
├─────────────────────────────────────┤
│     Infrastructure Layer            │
│     (API Services & External)       │
└─────────────────────────────────────┘
```

## 3. Cấu trúc thư mục theo DDD

### 3.1. Cấu trúc tổng quan

```
app/
├── shared/                     # Shared kernel - code dùng chung
│   ├── components/            # UI components dùng chung
│   ├── hooks/                 # Custom hooks dùng chung
│   ├── utils/                 # Utility functions
│   ├── types/                 # Common types
│   └── services/              # Shared services
├── features/                   # Bounded contexts
│   ├── user-management/
│   ├── paint-calculator/
│   └── dashboard/
└── infrastructure/             # Infrastructure concerns
    ├── api/                   # API configuration
    ├── auth/                  # Authentication
    └── storage/               # Local storage, cache
```

### 3.2. Cấu trúc chi tiết trong mỗi Feature

```
app/features/paint-calculator/
├── components/                 # UI Layer
│   ├── BuildingSpecifications.tsx
│   ├── MaterialSelector.tsx
│   ├── ResultsPanel.tsx
│   └── index.ts               # Export tất cả components
├── containers/                 # Application Layer
│   ├── PaintCalculatorContainer.tsx
│   └── index.ts
├── hooks/                      # Application Layer
│   ├── usePaintCalculation.ts
│   ├── usePaintMaterials.ts
│   └── index.ts
├── domain/                     # Domain Layer
│   ├── models/                # Domain models
│   │   ├── PaintJob.ts
│   │   ├── Building.ts
│   │   └── index.ts
│   ├── services/              # Domain services
│   │   ├── paintCalculationService.ts
│   │   ├── priceCalculationService.ts
│   │   └── index.ts
│   ├── types/                 # Domain types
│   │   ├── interfaces.ts
│   │   ├── enums.ts
│   │   └── index.ts
│   └── validations/           # Domain validations
│       ├── buildingValidation.ts
│       └── index.ts
├── services/                   # Infrastructure Layer
│   ├── paintCalculatorApi.ts
│   ├── materialApi.ts
│   └── index.ts
└── index.tsx                  # Feature entry point
```

## 4. Triển khai từng Layer

### 4.1. Domain Layer - Trái tim của Feature

#### Domain Models (Entities & Value Objects)

```typescript
// app/features/paint-calculator/domain/models/Building.ts
export interface Building {
  readonly id: string;
  readonly name: string;
  readonly floors: Floor[];
  readonly totalArea: number;

  calculateTotalArea(): number;
  addFloor(floor: Floor): Building;
  removeFloor(floorId: string): Building;
}

// Value Object
export interface PaintSpecification {
  readonly brand: string;
  readonly type: PaintType;
  readonly coverage: number; // m²/liter
  readonly pricePerLiter: Money;
}

export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'VND',
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}
```

#### Domain Services

```typescript
// app/features/paint-calculator/domain/services/paintCalculationService.ts
import { Building, PaintSpecification } from '../models';
import { PaintCalculationResult } from '../types';

export class PaintCalculationService {
  static calculatePaintRequired(
    building: Building,
    paintSpec: PaintSpecification,
  ): number {
    const totalArea = building.calculateTotalArea();
    const coatsNeeded = this.determineCoatsNeeded(building, paintSpec);
    return (totalArea * coatsNeeded) / paintSpec.coverage;
  }

  static calculateTotalCost(
    building: Building,
    paintSpec: PaintSpecification,
    laborCostPerM2: Money,
  ): PaintCalculationResult {
    const paintRequired = this.calculatePaintRequired(building, paintSpec);
    const materialCost = new Money(
      paintRequired * paintSpec.pricePerLiter.amount,
    );
    const laborCost = new Money(building.totalArea * laborCostPerM2.amount);

    return {
      paintRequired,
      materialCost,
      laborCost,
      totalCost: materialCost.add(laborCost),
    };
  }

  private static determineCoatsNeeded(
    building: Building,
    paintSpec: PaintSpecification,
  ): number {
    // Business logic để xác định số lớp sơn cần thiết
    return paintSpec.type === 'primer' ? 1 : 2;
  }
}
```

### 4.2. Infrastructure Layer - API Services

```typescript
// app/features/paint-calculator/services/paintCalculatorApi.ts
import { ApiClient } from '@/infrastructure/api/client';
import type {
  PaintCalculationRequest,
  PaintCalculationResponse,
  PaintMaterial,
} from '../domain/types';

export class PaintCalculatorApiService {
  constructor(private apiClient: ApiClient) {}

  async calculatePaint(
    request: PaintCalculationRequest,
  ): Promise<PaintCalculationResponse> {
    try {
      const response = await this.apiClient.post<PaintCalculationResponse>(
        '/api/paint-calculator/calculate',
        request,
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to calculate paint: ${error.message}`);
    }
  }

  async getPaintMaterials(): Promise<PaintMaterial[]> {
    try {
      const response = await this.apiClient.get<PaintMaterial[]>(
        '/api/materials/paint',
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch paint materials: ${error.message}`);
    }
  }

  async savePaintJob(paintJob: PaintJob): Promise<void> {
    try {
      await this.apiClient.post('/api/paint-jobs', paintJob);
    } catch (error) {
      throw new Error(`Failed to save paint job: ${error.message}`);
    }
  }
}
```

### 4.3. Application Layer - Custom Hooks & Containers

#### Custom Hooks cho Data Fetching

```typescript
// app/features/paint-calculator/hooks/usePaintCalculation.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { paintCalculatorApi } from '../services';
import { PaintCalculationService } from '../domain/services';
import type { Building, PaintSpecification } from '../domain/types';

export const usePaintCalculation = () => {
  // Client-side calculation (Domain Service)
  const calculatePaint = (
    building: Building,
    paintSpec: PaintSpecification,
  ) => {
    return PaintCalculationService.calculateTotalCost(
      building,
      paintSpec,
      new Money(50000), // 50k VND per m²
    );
  };

  // Server-side calculation (nếu cần)
  const serverCalculation = useMutation({
    mutationFn: paintCalculatorApi.calculatePaint,
    onError: (error) => {
      console.error('Paint calculation failed:', error);
    },
  });

  return {
    calculatePaint,
    serverCalculation,
    isCalculating: serverCalculation.isPending,
  };
};
```

#### Container Component

```typescript
// app/features/paint-calculator/containers/PaintCalculatorContainer.tsx
import { useState } from 'react';
import { Building } from '../domain/models';
import { usePaintCalculation, usePaintMaterials } from '../hooks';
import {
  BuildingSpecifications,
  MaterialSelector,
  ResultsPanel
} from '../components';

export const PaintCalculatorContainer: React.FC = () => {
  const [building, setBuilding] = useState<Building | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<PaintSpecification | null>(null);

  const { calculatePaint } = usePaintCalculation();
  const { materials, isLoading: materialsLoading } = usePaintMaterials();

  const handleBuildingChange = (newBuilding: Building) => {
    setBuilding(newBuilding);
  };

  const handleMaterialSelect = (material: PaintSpecification) => {
    setSelectedMaterial(material);
  };

  const calculationResult = building && selectedMaterial
    ? calculatePaint(building, selectedMaterial)
    : null;

  return (
    <div className="paint-calculator">
      <BuildingSpecifications
        onBuildingChange={handleBuildingChange}
        building={building}
      />

      <MaterialSelector
        materials={materials}
        selectedMaterial={selectedMaterial}
        onMaterialSelect={handleMaterialSelect}
        isLoading={materialsLoading}
      />

      {calculationResult && (
        <ResultsPanel result={calculationResult} />
      )}
    </div>
  );
};
```

### 4.4. UI Layer - Presentational Components

```typescript
// app/features/paint-calculator/components/ResultsPanel.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PaintCalculationResult } from '../domain/types';
import { formatCurrency } from '@/shared/utils';

interface ResultsPanelProps {
  result: PaintCalculationResult;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Kết quả tính toán
          <Badge variant="secondary">Chi tiết</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Lượng sơn cần:</p>
            <p className="text-lg font-semibold">{result.paintRequired.toFixed(2)} lít</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Chi phí vật liệu:</p>
            <p className="text-lg font-semibold text-blue-600">
              {formatCurrency(result.materialCost.amount)}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Chi phí nhân công:</p>
            <p className="text-lg font-semibold text-green-600">
              {formatCurrency(result.laborCost.amount)}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tổng chi phí:</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(result.totalCost.amount)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

## 5. Patterns và Best Practices

### 5.1. Repository Pattern với React Query

```typescript
// app/shared/hooks/useRepository.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useRepository = <T, K = string>(
  resourceName: string,
  apiService: {
    getAll: () => Promise<T[]>;
    getById: (id: K) => Promise<T>;
    create: (item: Omit<T, 'id'>) => Promise<T>;
    update: (id: K, item: Partial<T>) => Promise<T>;
    delete: (id: K) => Promise<void>;
  },
) => {
  const queryClient = useQueryClient();
  const queryKey = [resourceName];

  const list = useQuery({
    queryKey,
    queryFn: apiService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const create = useMutation({
    mutationFn: apiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: K; data: Partial<T> }) =>
      apiService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const remove = useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    data: list.data,
    isLoading: list.isLoading,
    error: list.error,
    create,
    update,
    remove,
    refetch: list.refetch,
  };
};
```

### 5.2. Error Handling Strategy

```typescript
// app/shared/hooks/useErrorHandler.ts
import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useErrorHandler = () => {
  const handleError = useCallback((error: Error, context?: string) => {
    console.error(`Error in ${context}:`, error);

    // Domain-specific error handling
    if (error instanceof ValidationError) {
      toast({
        title: 'Lỗi xác thực',
        description: error.message,
        variant: 'destructive',
      });
    } else if (error instanceof NetworkError) {
      toast({
        title: 'Lỗi kết nối',
        description: 'Vui lòng kiểm tra kết nối internet',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Đã xảy ra lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, []);

  return { handleError };
};
```

### 5.3. Validation với Domain Rules

```typescript
// app/features/paint-calculator/domain/validations/buildingValidation.ts
import { z } from 'zod';
import { Building, Floor } from '../models';

export const floorSchema = z.object({
  id: z.string().min(1, 'ID không được để trống'),
  name: z.string().min(1, 'Tên tầng không được để trống'),
  area: z.number().min(1, 'Diện tích phải lớn hơn 0'),
  height: z.number().min(2, 'Chiều cao tối thiểu là 2m'),
});

export const buildingSchema = z.object({
  id: z.string().min(1, 'ID không được để trống'),
  name: z.string().min(1, 'Tên công trình không được để trống'),
  floors: z.array(floorSchema).min(1, 'Phải có ít nhất 1 tầng'),
});

export class BuildingValidation {
  static validateBuilding(building: Building): ValidationResult {
    try {
      buildingSchema.parse(building);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }
      throw error;
    }
  }

  static validateFloor(floor: Floor): ValidationResult {
    try {
      floorSchema.parse(floor);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        };
      }
      throw error;
    }
  }
}
```

## 6. Testing Strategy

### 6.1. Testing Domain Layer

```typescript
// app/features/paint-calculator/domain/services/__tests__/paintCalculationService.test.ts
import { describe, it, expect } from 'vitest';
import { PaintCalculationService } from '../paintCalculationService';
import { Building, PaintSpecification, Money } from '../../models';

describe('PaintCalculationService', () => {
  const mockBuilding: Building = {
    id: '1',
    name: 'Test Building',
    floors: [{ id: '1', name: 'Ground Floor', area: 100, height: 3 }],
    totalArea: 100,
    calculateTotalArea: () => 100,
  };

  const mockPaintSpec: PaintSpecification = {
    brand: 'Test Paint',
    type: 'interior',
    coverage: 10, // 10 m²/liter
    pricePerLiter: new Money(100000), // 100k VND
  };

  it('should calculate paint required correctly', () => {
    const result = PaintCalculationService.calculatePaintRequired(
      mockBuilding,
      mockPaintSpec,
    );

    // 100 m² * 2 coats / 10 m²/liter = 20 liters
    expect(result).toBe(20);
  });

  it('should calculate total cost correctly', () => {
    const laborCostPerM2 = new Money(50000);
    const result = PaintCalculationService.calculateTotalCost(
      mockBuilding,
      mockPaintSpec,
      laborCostPerM2,
    );

    expect(result.paintRequired).toBe(20);
    expect(result.materialCost.amount).toBe(2000000); // 20 * 100k
    expect(result.laborCost.amount).toBe(5000000); // 100 * 50k
    expect(result.totalCost.amount).toBe(7000000);
  });
});
```

### 6.2. Testing Components

```typescript
// app/features/paint-calculator/components/__tests__/ResultsPanel.test.tsx
import { render, screen } from '@testing-library/react';
import { ResultsPanel } from '../ResultsPanel';
import { Money } from '../../domain/models';

describe('ResultsPanel', () => {
  const mockResult = {
    paintRequired: 25.5,
    materialCost: new Money(2550000),
    laborCost: new Money(5000000),
    totalCost: new Money(7550000),
  };

  it('should display calculation results correctly', () => {
    render(<ResultsPanel result={mockResult} />);

    expect(screen.getByText('25.50 lít')).toBeInTheDocument();
    expect(screen.getByText('2.550.000 ₫')).toBeInTheDocument();
    expect(screen.getByText('5.000.000 ₫')).toBeInTheDocument();
    expect(screen.getByText('7.550.000 ₫')).toBeInTheDocument();
  });
});
```

## 7. Migration Strategy

### 7.1. Từng bước refactor

1. **Phase 1: Cấu trúc thư mục**
   - Tạo cấu trúc thư mục theo DDD
   - Di chuyển components hiện có

2. **Phase 2: Tách biệt Domain Logic**
   - Tạo domain models và services
   - Extract business logic từ components

3. **Phase 3: Implement Repository Pattern**
   - Tạo API services
   - Implement custom hooks với React Query

4. **Phase 4: Refactor Components**
   - Tách Container và Presentational components
   - Implement error handling và validation

### 7.2. Checklist cho mỗi Feature

- [ ] Domain models được định nghĩa rõ ràng
- [ ] Business logic được tách ra khỏi UI components
- [ ] API interactions được trừu tượng hóa
- [ ] Components được phân chia thành Container và Presentational
- [ ] Error handling được implement consistently
- [ ] Validation rules được áp dụng
- [ ] Tests được viết cho từng layer
- [ ] Documentation được cập nhật

## 8. Kết luận

Việc áp dụng DDD cho frontend React mang lại nhiều lợi ích:

### Lợi ích trực tiếp:

- **Code organization**: Cấu trúc rõ ràng, dễ navigate
- **Maintainability**: Dễ sửa đổi và mở rộng
- **Testability**: Từng layer có thể test độc lập
- **Reusability**: Domain logic có thể tái sử dụng
- **Consistency**: Đồng nhất với backend architecture

### Thách thức và cách giải quyết:

- **Learning curve**: Cần training team về DDD concepts
- **Over-engineering**: Áp dụng dần dần, không làm tất cả cùng lúc
- **Performance**: Cẩn thận với số lượng re-renders và bundle size

### Next Steps:

1. Chọn một feature để pilot implementation
2. Training team về DDD principles
3. Setup testing infrastructure
4. Triển khai từng phase một cách có hệ thống

Bằng cách áp dụng DDD một cách có hệ thống, frontend application sẽ trở nên robust, maintainable và scalable hơn, đồng thời đồng nhất với backend architecture.
