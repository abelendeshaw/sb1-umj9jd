"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Calculator, Equal, Delete, Divide, Minus, Plus, X } from "lucide-react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num: string) => {
    if (hasResult) {
      setDisplay(num);
      setEquation(num);
      setHasResult(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
      setEquation(equation === "0" ? num : equation + num);
    }
  };

  const handleOperator = (op: string) => {
    if (!equation.endsWith(" ") && equation !== "") {
      setEquation(equation + " " + op + " ");
      setDisplay("0");
      setHasResult(false);
    }
  };

  const calculate = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasResult(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setHasResult(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setHasResult(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Calculator</h1>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground overflow-hidden">
            {equation || "0"}
          </div>
          <div className="text-4xl font-bold text-right overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            className="text-red-500"
            onClick={clear}
          >
            <Delete className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator("/")}
          >
            <Divide className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator("*")}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperator("-")}
          >
            <Minus className="h-4 w-4" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="secondary"
              onClick={() => handleNumber(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handleOperator("+")}
          >
            <Plus className="h-4 w-4" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              variant="secondary"
              onClick={() => handleNumber(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="row-span-2"
            onClick={calculate}
          >
            <Equal className="h-4 w-4" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="secondary"
              onClick={() => handleNumber(num.toString())}
            >
              {num}
            </Button>
          ))}

          <Button
            variant="secondary"
            className="col-span-2"
            onClick={() => handleNumber("0")}
          >
            0
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleNumber(".")}
          >
            .
          </Button>
        </div>
      </Card>
    </main>
  );
}