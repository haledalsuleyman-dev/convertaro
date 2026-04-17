"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { RotateCcw, Calculator as CalcIcon } from "lucide-react";

interface CalculatorContainerProps {
  children: ReactNode;
}

export function CalculatorContainer({ children }: CalculatorContainerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {children}
    </div>
  );
}

interface CalculatorFormProps {
  children: ReactNode;
  onCalculate: () => void;
  onReset?: () => void;
  title?: string;
}

export function CalculatorForm({ children, onCalculate, onReset, title }: CalculatorFormProps) {
  return (
    <div className="lg:col-span-7 space-y-6 bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-border">
      {title && <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">{title}</h3>}
      <div className="space-y-4">
        {children}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
        <Button 
          size="lg" 
          onClick={onCalculate} 
          className="flex-1 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
        >
          <CalcIcon className="mr-2 h-5 w-5" />
          Calculate
        </Button>
        {onReset && (
          <Button 
            variant="outline" 
            size="lg" 
            onClick={onReset} 
            className="rounded-xl"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}

interface CalculatorResultPanelProps {
  title?: string;
  result: string | number;
  label?: string;
  children?: ReactNode;
  hint?: string;
}

export function CalculatorResultPanel({ title = "Result", result, label, children, hint }: CalculatorResultPanelProps) {
  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      <div className="flex-1 rounded-3xl border-2 border-primary/10 bg-white p-6 sm:p-8 shadow-xl shadow-primary/5 flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">{title}</h3>
          <div className="h-2 w-12 rounded-full bg-primary/20" />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
          {label && <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>}
          <div className="relative inline-block">
             <div className="absolute -inset-4 rounded-full bg-primary/5 blur-2xl" />
             <p className="relative text-6xl sm:text-7xl font-black text-primary tracking-tight">
               {result}
             </p>
          </div>
          {hint && <p className="mt-4 text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">{hint}</p>}
        </div>

        {children && (
          <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
            {children}
          </div>
        )}
      </div>
      
      <div className="mt-4 p-4 rounded-xl bg-sky-50 border border-sky-100">
        <p className="text-xs text-sky-700 text-center leading-relaxed">
          Results are estimates based on standard formulas. Always verify critical calculations.
        </p>
      </div>
    </div>
  );
}

interface CalculatorResultRowProps {
  label: string;
  value: string | number;
  isBold?: boolean;
}

export function CalculatorResultRow({ label, value, isBold }: CalculatorResultRowProps) {
  return (
    <div className="flex items-center justify-between py-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={cn("text-sm font-medium text-slate-900 border-b border-dotted border-slate-300", isBold && "font-bold text-base border-none")}>
        {value}
      </span>
    </div>
  );
}

interface CalculatorInputGroupProps {
  label: string;
  helperText?: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function CalculatorInputGroup({ label, helperText, children, icon }: CalculatorInputGroupProps) {
  return (
    <div className="space-y-1.5 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="text-slate-400">{icon}</span>}
        <label className="text-sm font-bold text-slate-700">{label}</label>
      </div>
      <div className="relative group">
        {children}
      </div>
      {helperText && <p className="text-xs text-slate-500 pl-1">{helperText}</p>}
    </div>
  );
}
