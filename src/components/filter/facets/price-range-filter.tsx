import type React from "react";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [inputMin, setInputMin] = useState<string>(value[0].toString());
  const [inputMax, setInputMax] = useState<string>(value[1].toString());
  const [error, setError] = useState<string>("");

  // Update local state when props change
  useEffect(() => {
    setLocalValue(value);
    setInputMin(value[0].toString());
    setInputMax(value[1].toString());
    setError("");
  }, [value]);

  // Handle slider change
  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setLocalValue(newValue as [number, number]);
      setInputMin(newValue[0].toString());
      setInputMax(newValue[1].toString());
      setError("");
      onChange(newValue as [number, number]);
    }
  };

  // Handle min input change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setInputMin(newMin);

    if (newMin === "") return;

    const numValue = Number.parseInt(newMin, 10);
    if (!isNaN(numValue)) {
      const validMin = Math.max(min, Math.min(numValue, localValue[1]));
      const newValue: [number, number] = [validMin, localValue[1]];
      setLocalValue(newValue);
      setError("");
      onChange(newValue);
    }
  };
  // Handle max input change (LIVE VALIDATION)
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setInputMax(newMax);

    if (newMax === "") {
      setError("");
      return;
    }

    const numValue = Number.parseInt(newMax, 10);

    if (!isNaN(numValue)) {
      if (numValue < localValue[0]) {
        // 🚨 Live validation error
        setError("Max price should be greater than Min price");
      } else {
        const validMax = Math.min(max, numValue);
        const newValue: [number, number] = [localValue[0], validMax];
        setLocalValue(newValue);
        setError(""); // clear error once valid
        onChange(newValue);
      }
    }
  };

  // Handle blur events to ensure valid values
  const handleMinBlur = () => {
    if (inputMin === "" || isNaN(Number.parseInt(inputMin, 10))) {
      setInputMin(localValue[0].toString());
      return;
    }

    const numValue = Number.parseInt(inputMin, 10);
    const validMin = Math.max(min, Math.min(numValue, localValue[1]));
    setInputMin(validMin.toString());

    if (validMin !== localValue[0]) {
      const newValue: [number, number] = [validMin, localValue[1]];
      setLocalValue(newValue);
      setError("");
      onChange(newValue);
    }
  };

  const handleMaxBlur = () => {
    if (inputMax === "" || isNaN(Number.parseInt(inputMax, 10))) {
      setInputMax(localValue[1].toString());
      return;
    }

    const numValue = Number.parseInt(inputMax, 10);

    if (numValue < localValue[0]) {
      setError("Max price should be greater than Min price");
      return;
    }

    const validMax = Math.min(max, numValue);
    setInputMax(validMax.toString());

    if (validMax !== localValue[1]) {
      const newValue: [number, number] = [localValue[0], validMax];
      setLocalValue(newValue);
      setError("");
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Inputs Row */}
      <div className="flex items-center gap-4">
        {/* Min Price */}
        <div className="flex-1">
          <label
            htmlFor="min-price"
            className="block text-sm text-gray-700 mb-1"
          >
            Min Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="min-price"
              value={inputMin}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
              className="block w-full rounded-md border border-gray-300 ps-7 pe-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Max Price */}
        <div className="flex-1">
          <label
            htmlFor="max-price"
            className="block text-sm text-gray-700 mb-1"
          >
            Max Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
              $
            </span>
            <input
              type="text"
              id="max-price"
              value={inputMax}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
              className={`block w-full rounded-md border ${
                error ? "border-red-500" : "border-gray-300"
              } ps-7 pe-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="ml-2">
        <Slider
          range
          min={min}
          max={max}
          value={localValue}
          onChange={handleSliderChange}
          className="mx-0"
          trackStyle={[{ backgroundColor: "#3b82f6" }]}
          handleStyle={[
            { borderColor: "#3b82f6", backgroundColor: "#3b82f6" },
            { borderColor: "#3b82f6", backgroundColor: "#3b82f6" },
          ]}
          railStyle={{ backgroundColor: "#e5e7eb" }}
        />
      </div>
      {/* Centered Error Message */}
      {error && (
        <div className="flex justify-center">
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
