import type {
  PaintCalculationInputs,
  QuickCalculationInputs,
  LaborSpecs,
  Results,
} from './components/types';
import {
  HouseType,
  STANDARD_DOOR_AREA,
  STANDARD_WINDOW_AREA,
  STANDARD_BALCONY_DOOR_AREA,
  PRIMER_COVERAGE_PER_LITER,
  FINISH_PAINT_COVERAGE_PER_LITER,
  DEFAULT_COEFFICIENTS,
  DAILY_WORK_HOURS,
} from './constants';

// Function for detailed paint area calculation
export const calculateDetailedPaintJob = (
  inputs: PaintCalculationInputs,
  laborSpecs: LaborSpecs,
): Results => {
  const {
    houseType,
    ceilingHeight,
    numDoors,
    numWindows,
    numBalconyDoors,
    mainFloorDimensions,
    numFloors,
    totalFloorArea,
    staircaseLength,
    balconyLength,
    numRooms,
  } = inputs;

  const {
    wallCoefficient,
    surfaceCoefficient,
    ceilingCoefficient,
    complexDesignCoefficient,
    staircaseCoefficient,
    sharedWallCoefficient,
    balconyCoefficient,
    economicCoefficient,
    wastageFactor,
  } = DEFAULT_COEFFICIENTS[houseType];

  let totalAreaBeforeWastage = 0;
  let totalCeilingArea = 0;

  // Calculate total exclusion area (doors, windows, balcony doors)
  const totalExclusionArea =
    (numDoors || 0) * STANDARD_DOOR_AREA +
    (numWindows || 0) * STANDARD_WINDOW_AREA +
    (numBalconyDoors || 0) * STANDARD_BALCONY_DOOR_AREA;

  switch (houseType) {
    case HouseType.CAP_4: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeter = 2 * (length + width);
      const floorArea = length * width;

      const wallArea =
        perimeter * ceilingHeight * wallCoefficient * surfaceCoefficient;
      totalCeilingArea = floorArea * ceilingCoefficient;

      totalAreaBeforeWastage = wallArea + totalCeilingArea - totalExclusionArea;
      break;
    }
    case HouseType.NHA_ONG: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeterPerFloor = 2 * (length + width);

      // Area of walls per floor, before subtracting doors/windows
      const wallAreaPerFloor =
        perimeterPerFloor * ceilingHeight * wallCoefficient;
      const totalWallAreaBeforeExclusionPerFloor =
        wallAreaPerFloor - totalExclusionArea;
      const totalWallAreaForFloors =
        totalWallAreaBeforeExclusionPerFloor * (numFloors || 1);

      const staircasePaintArea =
        (staircaseLength || 0) * ceilingHeight * staircaseCoefficient;

      totalAreaBeforeWastage = totalWallAreaForFloors + staircasePaintArea;
      // Assume ceiling is painted for each floor
      totalCeilingArea = length * width * (numFloors || 1) * ceilingCoefficient;
      totalAreaBeforeWastage += totalCeilingArea;
      break;
    }
    case HouseType.BIET_THU: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeterPerFloor = 2 * (length + width);

      const wallAreaForTotalFloors_NoCoeff =
        perimeterPerFloor * ceilingHeight * (numFloors || 1);
      const wallArea_WithCoeff =
        wallAreaForTotalFloors_NoCoeff * wallCoefficient * surfaceCoefficient;

      totalCeilingArea = (totalFloorArea || 0) * ceilingCoefficient;

      const baseArea =
        wallArea_WithCoeff + totalCeilingArea - totalExclusionArea;
      totalAreaBeforeWastage = baseArea * (1 + complexDesignCoefficient);
      break;
    }
    case HouseType.CHUNG_CU: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeterInside = 2 * (length + width);
      const floorArea = length * width;

      const wallAreaInside = perimeterInside * ceilingHeight * wallCoefficient;
      const balconyPaintArea =
        (balconyLength || 0) * ceilingHeight * balconyCoefficient;

      totalCeilingArea = floorArea * ceilingCoefficient;

      totalAreaBeforeWastage =
        wallAreaInside +
        balconyPaintArea +
        totalCeilingArea -
        totalExclusionArea;
      break;
    }
    case HouseType.NHA_LIEN_KE: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeterPerFloor = 2 * (length + width);

      const wallAreaPerFloor =
        perimeterPerFloor *
        ceilingHeight *
        wallCoefficient *
        sharedWallCoefficient;
      const totalWallAreaForFloors = wallAreaPerFloor * (numFloors || 1);

      totalAreaBeforeWastage = totalWallAreaForFloors - totalExclusionArea;

      // Assume ceiling is painted for each floor
      totalCeilingArea = length * width * (numFloors || 1) * ceilingCoefficient;
      totalAreaBeforeWastage += totalCeilingArea;
      break;
    }
    case HouseType.NHA_TRO: {
      const { length, width } = mainFloorDimensions?.[0] || {
        length: 0,
        width: 0,
      };
      const perimeterPerRoom = 2 * (length + width);
      const floorAreaPerRoom = length * width;

      const wallAreaPerRoom =
        perimeterPerRoom *
        ceilingHeight *
        wallCoefficient *
        surfaceCoefficient *
        economicCoefficient;
      const totalExclusionAreaPerRoom =
        (numDoors || 0) * STANDARD_DOOR_AREA +
        (numWindows || 0) * STANDARD_WINDOW_AREA;

      const areaPerRoomBeforeWastage =
        wallAreaPerRoom +
        floorAreaPerRoom * ceilingCoefficient -
        totalExclusionAreaPerRoom; // Assuming ceiling is also painted per room
      totalAreaBeforeWastage = areaPerRoomBeforeWastage * (numRooms || 1);
      break;
    }
    default:
      totalAreaBeforeWastage = 0;
      break;
  }

  const totalArea = totalAreaBeforeWastage * (1 + wastageFactor);

  // Calculate paint quantities
  const primerPaintLiters = totalArea / PRIMER_COVERAGE_PER_LITER;
  const finishPaintLiters =
    (totalArea / FINISH_PAINT_COVERAGE_PER_LITER) *
    (laborSpecs.numFinishPaintCoats || 2); // Default to 2 coats if not specified

  // Calculate costs and work time
  const totalPaintCost = primerPaintLiters * 0 + finishPaintLiters * 0; // Assuming paint cost will be added later
  const laborCost = totalArea * laborSpecs.laborCostPerM2;
  const totalCost = totalPaintCost + laborCost + laborSpecs.otherCosts;
  const workTime = totalArea * laborSpecs.timePerM2;

  return {
    totalArea: Number.parseFloat(totalArea.toFixed(2)),
    primerPaintLiters: Number.parseFloat(primerPaintLiters.toFixed(2)),
    finishPaintLiters: Number.parseFloat(finishPaintLiters.toFixed(2)),
    laborCost: Number.parseFloat(laborCost.toFixed(0)),
    totalCost: Number.parseFloat(totalCost.toFixed(0)),
    workTime: Number.parseFloat(workTime.toFixed(1)),
  };
};

// Function for quick paint area calculation
export const calculateQuickPaintJob = (
  inputs: QuickCalculationInputs,
  laborSpecs: LaborSpecs,
): Results => {
  const { houseType, totalFloorArea, numFloors, numRooms } = inputs;
  const { quickCalcMultiplier, quickCalcDeduction } =
    DEFAULT_COEFFICIENTS[houseType];

  let totalArea = 0;

  switch (houseType) {
    case HouseType.CAP_4:
    case HouseType.CHUNG_CU: {
      totalArea =
        (totalFloorArea || 0) * quickCalcMultiplier - quickCalcDeduction;
      break;
    }
    case HouseType.NHA_ONG:
    case HouseType.NHA_LIEN_KE:
    case HouseType.BIET_THU: {
      totalArea =
        (totalFloorArea || 0) * quickCalcMultiplier -
        (numFloors || 1) * quickCalcDeduction;
      break;
    }
    case HouseType.NHA_TRO: {
      totalArea = (numRooms || 0) * quickCalcMultiplier - quickCalcDeduction;
      break;
    }
    default:
      totalArea = 0;
      break;
  }

  // Ensure the total area is not negative
  totalArea = Math.max(0, totalArea);

  // Calculate paint quantities
  const primerPaintLiters = totalArea / PRIMER_COVERAGE_PER_LITER;
  const finishPaintLiters =
    (totalArea / FINISH_PAINT_COVERAGE_PER_LITER) *
    (laborSpecs.numFinishPaintCoats || 2);

  // Calculate costs and work time
  const totalPaintCost = primerPaintLiters * 0 + finishPaintLiters * 0; // Assuming paint cost will be added later
  const laborCost = totalArea * laborSpecs.laborCostPerM2;
  const totalCost = totalPaintCost + laborCost + laborSpecs.otherCosts;
  const workTime = totalArea * laborSpecs.timePerM2;

  return {
    totalArea: Number.parseFloat(totalArea.toFixed(2)),
    primerPaintLiters: Number.parseFloat(primerPaintLiters.toFixed(2)),
    finishPaintLiters: Number.parseFloat(finishPaintLiters.toFixed(2)),
    laborCost: Number.parseFloat(laborCost.toFixed(0)),
    totalCost: Number.parseFloat(totalCost.toFixed(0)),
    workTime: Number.parseFloat(workTime.toFixed(1)),
  };
};
