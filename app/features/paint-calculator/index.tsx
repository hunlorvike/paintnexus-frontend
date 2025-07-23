import { useState, useEffect } from 'react';
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
import { CalculationTab, HouseType } from './constants';
import { QuickCalculation } from './components/QuickCalculation';

const PaintCalculator = () => {
  const [activeTab, setActiveTab] = useState<CalculationTab>(
    CalculationTab.DETAILED,
  );

  const [detailedInputs, setDetailedInputs] = useState<PaintCalculationInputs>({
    houseType: HouseType.CAP_4, // Default to Nha Cap 4
    ceilingHeight: 2.7,
    numDoors: 2,
    numWindows: 4,
    mainFloorDimensions: [{ length: 8, width: 6 }], // Example for Cap 4
  });

  const [quickInputs, setQuickInputs] = useState<QuickCalculationInputs>({
    houseType: HouseType.CAP_4, // Default to Nha Cap 4
    totalFloorArea: 48, // Example for Cap 4
  });

  const [laborSpecs, setLaborSpecs] = useState<LaborSpecs>({
    laborCostPerM2: 30000,
    timePerM2: 0.25,
    otherCosts: 0,
    numFinishPaintCoats: 2, // Default to 2 coats
  });

  const [results, setResults] = useState<Results>({
    totalArea: 0,
    primerPaintLiters: 0,
    finishPaintLiters: 0,
    laborCost: 0,
    totalCost: 0,
    workTime: 0,
  });

  useEffect(() => {
    let newResults: Results;
    if (activeTab === CalculationTab.DETAILED) {
      newResults = calculateDetailedPaintJob(detailedInputs, laborSpecs);
    } else {
      newResults = calculateQuickPaintJob(quickInputs, laborSpecs);
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
