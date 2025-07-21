import type { PaintCalculationInputs, LaborSpecs } from './components/types';
import {
  HouseType,
  WallSurfaceType,
  WALL_COEFFICIENTS,
  WALL_SURFACE_COEFFICIENTS,
  DOOR_STANDARD_WIDTH,
  DOOR_STANDARD_HEIGHT,
  WINDOW_STANDARD_WIDTH,
  WINDOW_STANDARD_HEIGHT,
  WASTAGE_FACTOR,
  QUICK_CALC_FLOOR_AREA_MULTIPLIER,
  QUICK_CALC_DEDUCTION,
} from './constants';

// Function for detailed paint area calculation
export const calculateDetailedPaintJob = (
  inputs: PaintCalculationInputs,
  laborSpecs: LaborSpecs,
) => {
  const {
    roomLengths,
    roomWidths,
    ceilingHeight,
    houseType,
    numDoors,
    numWindows,
    otherDoorArea,
    paintCeiling,
    wallSurfaceType,
  } = inputs;

  // Step 1: Calculate total perimeter and total floor area
  let totalPerimeter = 0;
  let totalFloorArea = 0;
  for (let i = 0; i < roomLengths.length; i++) {
    const roomLength = roomLengths[i] || 0;
    const roomWidth = roomWidths[i] || 0;
    const roomPerimeter = 2 * (roomLength + roomWidth);
    totalPerimeter += roomPerimeter;
    totalFloorArea += roomLength * roomWidth;
  }

  // Step 2: Determine wall coefficient 'k' using the enum and map
  const wallCoefficient_k =
    WALL_COEFFICIENTS[houseType] || WALL_COEFFICIENTS[HouseType.ONE_ROOM];

  // Step 3: Calculate wall area
  const wallArea = totalPerimeter * ceilingHeight * wallCoefficient_k;

  // Step 4: Calculate ceiling area (if painting ceiling)
  let ceilingArea = 0;
  if (paintCeiling) {
    ceilingArea = totalFloorArea;
  }

  // Step 5: Calculate exclusion area (doors and windows)
  const doorExclusionArea =
    numDoors * DOOR_STANDARD_HEIGHT * DOOR_STANDARD_WIDTH;
  const windowExclusionArea =
    numWindows * WINDOW_STANDARD_HEIGHT * WINDOW_STANDARD_WIDTH;
  const totalExclusionArea =
    doorExclusionArea + windowExclusionArea + otherDoorArea;

  // Step 6: Determine wall surface coefficient 'm' using the enum and map
  const wallSurfaceCoefficient_m =
    WALL_SURFACE_COEFFICIENTS[wallSurfaceType] ||
    WALL_SURFACE_COEFFICIENTS[WallSurfaceType.FLAT];

  // Step 7: Calculate final total area including wastage
  let effectiveArea =
    (wallArea + ceilingArea - totalExclusionArea) * wallSurfaceCoefficient_m;

  // Ensure effective area is not negative
  effectiveArea = Math.max(0, effectiveArea);

  const totalArea = effectiveArea * WASTAGE_FACTOR;

  // Calculate costs and work time
  const laborCost =
    totalArea * laborSpecs.laborCostPerM2 + laborSpecs.otherCosts;
  const totalCost = laborCost;
  const workTime = totalArea * laborSpecs.timePerM2;

  return {
    totalArea: Number.parseFloat(totalArea.toFixed(2)),
    laborCost,
    totalCost,
    workTime: Number.parseFloat(workTime.toFixed(1)),
  };
};

// Function for quick paint area calculation
export const calculateQuickPaintJob = (
  floorArea: number,
  laborSpecs: LaborSpecs,
) => {
  // S = Diện tích sàn × 3.2 - 8
  let totalArea =
    floorArea * QUICK_CALC_FLOOR_AREA_MULTIPLIER - QUICK_CALC_DEDUCTION;

  // Ensure the total area is not negative
  totalArea = Math.max(0, totalArea);

  // Calculate costs and work time
  const laborCost =
    totalArea * laborSpecs.laborCostPerM2 + laborSpecs.otherCosts;
  const totalCost = laborCost;
  const workTime = totalArea * laborSpecs.timePerM2;

  return {
    totalArea: Number.parseFloat(totalArea.toFixed(2)),
    laborCost,
    totalCost,
    workTime: Number.parseFloat(workTime.toFixed(1)),
  };
};
