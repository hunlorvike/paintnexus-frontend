import React from 'react';
import type { CalculationTab, HouseType, WallSurfaceType } from '../constants';

export interface PaintCalculationInputs {
  roomLengths: number[];
  roomWidths: number[];
  ceilingHeight: number;
  houseType: HouseType;
  numDoors: number;
  numWindows: number;
  otherDoorArea: number;
  paintCeiling: boolean;
  wallSurfaceType: WallSurfaceType;
}

export interface LaborSpecs {
  laborCostPerM2: number;
  timePerM2: number;
  otherCosts: number;
}

export interface Results {
  totalArea: number;
  laborCost: number;
  totalCost: number;
  workTime: number;
}

// Props Interfaces for Components
export interface CalculatorInputsProps {
  inputs: PaintCalculationInputs;
  setInputs: React.Dispatch<React.SetStateAction<PaintCalculationInputs>>;
  addRoom: () => void;
  removeRoom: (index: number) => void;
  updateRoomDimension: (
    index: number,
    type: 'length' | 'width',
    value: number,
  ) => void;
}

export interface QuickCalculationInputs {
  floorArea: number;
}

export interface QuickCalculationProps {
  inputs: QuickCalculationInputs;
  setInputs: React.Dispatch<React.SetStateAction<QuickCalculationInputs>>;
}

export interface LaborSpecificationsProps {
  laborSpecs: LaborSpecs;
  setLaborSpecs: React.Dispatch<React.SetStateAction<LaborSpecs>>;
}

export interface ResultsPanelProps {
  results: Results;
  laborSpecs: LaborSpecs;
}

export interface CalculatorHeaderProps {
  activeTab: CalculationTab;
  setActiveTab: React.Dispatch<React.SetStateAction<CalculationTab>>;
}
