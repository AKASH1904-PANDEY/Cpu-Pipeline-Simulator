import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/card.jsx";
import { Button } from "../components/button.jsx";

import { Pause, Play, RotateCcw } from "lucide-react";

const defaultInstructions = [
  { id: 1, name: "ADD R1, R2, R3" },
  { id: 2, name: "SUB R4, R1, R5" },
  { id: 3, name: "LOAD R6, 0(R4)" },
  { id: 4, name: "STORE R6, 0(R7)" },
  { id: 5, name: "BEQ R1, R2, LABEL" },
];

const stages = ["IF", "ID", "EX", "MEM", "WB"];

export default function CPUPipelineSimulator() {
  const [instructions, setInstructions] = useState(defaultInstructions);
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [newInstruction, setNewInstruction] = useState("");

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCycle((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const advanceCycle = () => setCycle((prev) => prev + 1);
  const resetSimulation = () => {
    setCycle(0);
    setIsRunning(false);
    setInstructions(defaultInstructions);
  };

  const addInstruction = () => {
    if (newInstruction.trim() === "") return;
    setInstructions((prev) => [
      ...prev,
      { id: prev.length + 1, name: newInstruction.trim() },
    ]);
    setNewInstruction("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">🚀 CPU Pipeline Simulator</h1>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Button onClick={advanceCycle} className="px-6 py-2 text-base">Next Cycle</Button>
        <Button onClick={() => setIsRunning(!isRunning)} className="px-6 py-2 text-base">
          {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isRunning ? "Pause" : "Play"}
        </Button>
        <Button onClick={resetSimulation} variant="secondary" className="px-6 py-2 text-base">
          <RotateCcw className="mr-2" /> Reset
        </Button>
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
        <input
          type="text"
          className="border border-gray-300 px-4 py-2 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter custom instruction"
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
        />
        <Button onClick={addInstruction} className="px-4 py-2">Add Instruction</Button>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 gap-2 min-w-[700px]">
          <div className="font-bold text-center bg-gray-100 py-2 rounded-xl">Instruction</div>
          {stages.map((stage) => (
            <div key={stage} className="font-bold text-center bg-gray-100 py-2 rounded-xl">{stage}</div>
          ))}
          {instructions.map((inst, i) => (
            <React.Fragment key={`inst-row-${inst.id}`}>
              <div
                className="font-medium text-gray-800 text-center bg-gray-50 py-2 px-2 rounded-xl shadow-sm"
              >
                {inst.name}
              </div>
              {stages.map((_, j) => {
                const step = cycle - i;
                const active = step === j;
                return (
                  <div
                    key={`inst-${i}-stage-${j}`}
                    className={`h-12 flex items-center justify-center rounded-xl transition-all duration-300 border text-sm ${
                      active
                        ? "bg-blue-500 text-white font-semibold shadow-md border-blue-500"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {active ? stages[j] : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}