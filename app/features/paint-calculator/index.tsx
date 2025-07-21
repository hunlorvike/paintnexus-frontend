import { useState, useEffect, useCallback } from 'react';
import {
  calculateDetailedPaintJob,
  calculateQuickPaintJob,
} from './calculations';
import { CalculatorHeader } from './components/CalculatorHeader';
import { LaborSpecifications } from './components/LaborSpecifications';
import { ResultsPanel } from './components/ResultsPanel';
import { CalculatorInputs } from './components/CalculatorInputs';
import type {
  PaintCalculationInputs,
  QuickCalculationInputs,
  LaborSpecs,
  Results,
} from './components/types';
import { QuickCalculation } from './components/QuickCalculation';
import { CalculationTab, HouseType, WallSurfaceType } from './constants';

const PaintCalculator = () => {
  const [activeTab, setActiveTab] = useState<CalculationTab>(
    CalculationTab.DETAILED,
  );

  const [detailedInputs, setDetailedInputs] = useState<PaintCalculationInputs>({
    roomLengths: [10],
    roomWidths: [8],
    ceilingHeight: 3.2,
    houseType: HouseType.TWO_THREE_ROOMS,
    numDoors: 2,
    numWindows: 4,
    otherDoorArea: 0,
    paintCeiling: true,
    wallSurfaceType: WallSurfaceType.FLAT,
  });

  const [quickInputs, setQuickInputs] = useState<QuickCalculationInputs>({
    floorArea: 100,
  });

  const [laborSpecs, setLaborSpecs] = useState<LaborSpecs>({
    laborCostPerM2: 30000,
    otherCosts: 0,
    timePerM2: 0.25,
  });

  const [results, setResults] = useState<Results>({
    totalArea: 0,
    laborCost: 0,
    totalCost: 0,
    workTime: 0,
  });

  const addRoom = useCallback(() => {
    setDetailedInputs((prev) => ({
      ...prev,
      roomLengths: [...prev.roomLengths, 0],
      roomWidths: [...prev.roomWidths, 0],
    }));
  }, []);

  const removeRoom = useCallback((index: number) => {
    setDetailedInputs((prev) => ({
      ...prev,
      roomLengths: prev.roomLengths.filter((_, i) => i !== index),
      roomWidths: prev.roomWidths.filter((_, i) => i !== index),
    }));
  }, []);

  const updateRoomDimension = useCallback(
    (index: number, type: 'length' | 'width', value: number) => {
      setDetailedInputs((prev) => {
        const newLengths = [...prev.roomLengths];
        const newWidths = [...prev.roomWidths];

        if (type === 'length') {
          newLengths[index] = value;
        } else {
          newWidths[index] = value;
        }

        return {
          ...prev,
          roomLengths: newLengths,
          roomWidths: newWidths,
        };
      });
    },
    [],
  );

  useEffect(() => {
    let newResults: Results;
    if (activeTab === CalculationTab.DETAILED) {
      newResults = calculateDetailedPaintJob(detailedInputs, laborSpecs);
    } else {
      newResults = calculateQuickPaintJob(quickInputs.floorArea, laborSpecs);
    }
    setResults(newResults);
  }, [activeTab, detailedInputs, quickInputs, laborSpecs]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <CalculatorHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {activeTab === CalculationTab.DETAILED ? (
            <CalculatorInputs
              inputs={detailedInputs}
              setInputs={setDetailedInputs}
              addRoom={addRoom}
              removeRoom={removeRoom}
              updateRoomDimension={updateRoomDimension}
            />
          ) : (
            <QuickCalculation inputs={quickInputs} setInputs={setQuickInputs} />
          )}
          <LaborSpecifications
            laborSpecs={laborSpecs}
            setLaborSpecs={setLaborSpecs}
          />
        </div>
        <div className="lg:col-span-1">
          <ResultsPanel results={results} laborSpecs={laborSpecs} />
        </div>
      </div>
    </div>
  );
};

export default PaintCalculator;
