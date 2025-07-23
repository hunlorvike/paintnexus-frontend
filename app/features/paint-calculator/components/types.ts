import React from 'react';
import type { CalculationTab, HouseType } from '../constants';

// Detailed Calculation Inputs
export interface PaintCalculationInputs {
  houseType: HouseType;
  // Common inputs
  ceilingHeight: number;
  numDoors: number;
  numWindows: number;

  // Specific to certain house types
  mainFloorDimensions?: { length: number; width: number }[]; // For CAP_4, Nha Ong (dimensions per floor)
  numFloors?: number; // For Nha Ong, Biet Thu, Nha Lien Ke
  totalFloorArea?: number; // For Biet Thu, Chung Cu, Nha Lien Ke
  numBalconyDoors?: number; // For Biệt Thự, Chung Cư
  staircaseLength?: number; // For Nha Ong
  balconyLength?: number; // For Chung Cu
  numRooms?: number; // For Nha Tro (number of rooms in the complex)
}

// Quick Calculation Inputs
export interface QuickCalculationInputs {
  houseType: HouseType;
  totalFloorArea?: number; // For most types
  numFloors?: number; // For Nha Ong, Biet Thu, Nha Lien Ke
  numRooms?: number; // For Nha Tro
}

// Labor and Cost Specifications
export interface LaborSpecs {
  laborCostPerM2: number; // Chi phí nhân công trên m2
  timePerM2: number; // Thời gian thi công trên m2 (giờ/m2)
  otherCosts: number; // Các chi phí khác
  numFinishPaintCoats: number; // Số lớp sơn phủ
}

// Calculation Results
export interface Results {
  totalArea: number; // Tổng diện tích sơn (m2)
  primerPaintLiters: number; // Lượng sơn lót cần (lít)
  finishPaintLiters: number; // Lượng sơn phủ cần (lít)
  laborCost: number; // Tổng chi phí nhân công
  totalCost: number; // Tổng chi phí dự kiến (bao gồm sơn, nhân công, chi phí khác)
  workTime: number; // Tổng thời gian thi công (giờ)
}

// Props Interfaces for Components
export interface CalculatorInputsProps {
  inputs: PaintCalculationInputs;
  setInputs: React.Dispatch<React.SetStateAction<PaintCalculationInputs>>;
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
