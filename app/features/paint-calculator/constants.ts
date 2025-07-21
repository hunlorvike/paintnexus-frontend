export enum HouseType {
  ONE_ROOM = 1,
  TWO_THREE_ROOMS = 2,
  FOUR_FIVE_ROOMS = 3,
  MORE_THAN_FIVE_ROOMS = 4,
  COMPLEX = 5,
}

export const HOUSE_TYPE_LABELS: Record<HouseType, string> = {
  [HouseType.ONE_ROOM]: '1 phòng',
  [HouseType.TWO_THREE_ROOMS]: '2-3 phòng',
  [HouseType.FOUR_FIVE_ROOMS]: '4-5 phòng',
  [HouseType.MORE_THAN_FIVE_ROOMS]: '>5 phòng',
  [HouseType.COMPLEX]: 'Phức tạp',
};

export enum WallSurfaceType {
  FLAT = 1,
  ROUGH_BRICK = 2,
  CURVED_ANGLED = 3,
}

export const WALL_SURFACE_TYPE_LABELS: Record<WallSurfaceType, string> = {
  [WallSurfaceType.FLAT]: 'Tường phẳng',
  [WallSurfaceType.ROUGH_BRICK]: 'Gạch thô',
  [WallSurfaceType.CURVED_ANGLED]: 'Tường có cong, góc',
};

export enum CalculationTab {
  DETAILED = 'detailed',
  QUICK = 'quick',
}

export const WALL_COEFFICIENTS: Record<HouseType, number> = {
  [HouseType.ONE_ROOM]: 1.0,
  [HouseType.TWO_THREE_ROOMS]: 1.3,
  [HouseType.FOUR_FIVE_ROOMS]: 1.5,
  [HouseType.MORE_THAN_FIVE_ROOMS]: 1.7,
  [HouseType.COMPLEX]: 1.9,
};

export const WALL_SURFACE_COEFFICIENTS: Record<WallSurfaceType, number> = {
  [WallSurfaceType.FLAT]: 1.0,
  [WallSurfaceType.ROUGH_BRICK]: 1.05,
  [WallSurfaceType.CURVED_ANGLED]: 1.1,
};

export const DOOR_STANDARD_WIDTH = 0.8;
export const DOOR_STANDARD_HEIGHT = 1.8;
export const WINDOW_STANDARD_WIDTH = 1.0;
export const WINDOW_STANDARD_HEIGHT = 1.2;

export const WASTAGE_FACTOR = 1.15;

export const QUICK_CALC_FLOOR_AREA_MULTIPLIER = 3.2;
export const QUICK_CALC_DEDUCTION = 8;

export const DAILY_WORK_HOURS = 8;
