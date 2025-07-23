export enum CalculationTab {
  DETAILED = 'detailed',
  QUICK = 'quick',
}

export enum HouseType {
  CAP_4 = 'cap4',
  NHA_ONG = 'nha_ong',
  BIET_THU = 'biet_thu',
  CHUNG_CU = 'chung_cu',
  NHA_LIEN_KE = 'nha_lien_ke',
  NHA_TRO = 'nha_tro',
}

export const HOUSE_TYPE_LABELS: Record<HouseType, string> = {
  [HouseType.CAP_4]: 'Nhà Cấp 4',
  [HouseType.NHA_ONG]: 'Nhà Ống (Nhà Phố)',
  [HouseType.BIET_THU]: 'Nhà Biệt Thự',
  [HouseType.CHUNG_CU]: 'Chung Cư (Căn Hộ)',
  [HouseType.NHA_LIEN_KE]: 'Nhà Liền Kề',
  [HouseType.NHA_TRO]: 'Nhà Trọ/Phòng Trọ',
};

// Standard door/window/balcony door areas
export const STANDARD_DOOR_AREA = 1.6; // 2.0m x 0.8m
export const STANDARD_WINDOW_AREA = 1.2; // 1.2m x 1.0m
export const STANDARD_BALCONY_DOOR_AREA = 3.15; // 2.1m x 1.5m

// Performance of paint usage (m²/liter)
export const PRIMER_COVERAGE_PER_LITER = 10; // 10 m²/lít sơn lót
export const FINISH_PAINT_COVERAGE_PER_LITER = 14; // 14 m²/lít sơn phủ mỗi lớp

// Default coefficients based on CONG_THUC_TINH_SON.MD
export const DEFAULT_COEFFICIENTS = {
  [HouseType.CAP_4]: {
    wallCoefficient: 1.2,
    surfaceCoefficient: 1.05,
    ceilingCoefficient: 1.05,
    complexDesignCoefficient: 0, // Not applicable
    staircaseCoefficient: 0, // Not applicable
    sharedWallCoefficient: 0, // Not applicable
    balconyCoefficient: 0, // Not applicable
    economicCoefficient: 0, // Not applicable
    wastageFactor: 0.15,
    quickCalcMultiplier: 2.1,
    quickCalcDeduction: 6,
  },
  [HouseType.NHA_ONG]: {
    wallCoefficient: 1.6,
    surfaceCoefficient: 1.0,
    ceilingCoefficient: 1.05, // Assumed, not explicitly stated for Nha Ong but common
    complexDesignCoefficient: 0, // Not applicable
    staircaseCoefficient: 1.3,
    sharedWallCoefficient: 0, // Not applicable
    balconyCoefficient: 0, // Not applicable
    economicCoefficient: 0, // Not applicable
    wastageFactor: 0.18,
    quickCalcMultiplier: 3.5,
    quickCalcDeduction: 8,
  },
  [HouseType.BIET_THU]: {
    wallCoefficient: 1.4,
    surfaceCoefficient: 1.0,
    ceilingCoefficient: 1.05,
    complexDesignCoefficient: 1.1,
    staircaseCoefficient: 0, // Not explicitly stated in example calculation, but could be present
    sharedWallCoefficient: 0, // Not applicable
    balconyCoefficient: 0, // Not explicitly stated in example calculation, but could be present
    economicCoefficient: 0, // Not applicable
    wastageFactor: 0.2,
    quickCalcMultiplier: 2.8,
    quickCalcDeduction: 25,
  },
  [HouseType.CHUNG_CU]: {
    wallCoefficient: 1.1,
    surfaceCoefficient: 1.0,
    ceilingCoefficient: 1.05, // Assumed, not explicitly stated for Chung Cu but common
    complexDesignCoefficient: 0, // Not applicable
    staircaseCoefficient: 0, // Not applicable
    sharedWallCoefficient: 0, // Not applicable
    balconyCoefficient: 0.7,
    economicCoefficient: 0, // Not applicable
    wastageFactor: 0.12,
    quickCalcMultiplier: 1.5,
    quickCalcDeduction: 4,
  },
  [HouseType.NHA_LIEN_KE]: {
    wallCoefficient: 1.3,
    surfaceCoefficient: 1.0,
    ceilingCoefficient: 1.05, // Assumed, not explicitly stated for Nha Lien Ke but common
    complexDesignCoefficient: 0, // Not applicable
    staircaseCoefficient: 0, // Not explicitly stated in example calculation, but could be present
    sharedWallCoefficient: 0.85,
    balconyCoefficient: 0, // Not explicitly stated in example calculation, but could be present
    economicCoefficient: 0, // Not applicable
    wastageFactor: 0.15,
    quickCalcMultiplier: 3.2,
    quickCalcDeduction: 6,
  },
  [HouseType.NHA_TRO]: {
    wallCoefficient: 1.8,
    surfaceCoefficient: 1.1,
    ceilingCoefficient: 1.05, // Assumed, not explicitly stated for Nha Tro but common
    complexDesignCoefficient: 0, // Not applicable
    staircaseCoefficient: 0, // Not applicable
    sharedWallCoefficient: 0, // Not applicable
    balconyCoefficient: 0, // Not applicable
    economicCoefficient: 0.9,
    wastageFactor: 0.1,
    quickCalcMultiplier: 50, // This is for 'Số phòng'
    quickCalcDeduction: 20, // This is for 'Số phòng'
  },
};

export const DAILY_WORK_HOURS = 8;
