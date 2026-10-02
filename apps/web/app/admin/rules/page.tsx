'use client';

import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, XCircle, AlertCircle, ShieldCheck, RefreshCw, Code2 } from 'lucide-react';

const SAMPLE_FACTS = {
  "astrology.planets.sun.sign": "LEO",
  "astrology.planets.sun.degree": 14.5,
  "astrology.planets.sun.house": 10,
  "astrology.planets.moon.sign": "PISCES",
  "astrology.planets.moon.degree": 22.1,
  "astrology.planets.moon.house": 5,
  "tuvi.palaces.menh.has_tu_vi": true,
  "tuvi.palaces.menh.has_hoa_loc": true,
  "numerology.core.life_path.value": 7,
  "numerology.core.expression.value": 11,
  "tarot.spread.position_1.card": "MAJOR_00_FOOL"
};

export default function RuleSimulatorPage() {
  const [factsInput, setFactsInput] = useState(JSON.stringify(SAMPLE_FACTS, null, 2));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    setError(null);
    try {
      const parsedFacts = JSON.parse(factsInput);
      const res = await fetch('/api/admin/rules/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facts: parsedFacts }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Simulation failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setFactsInput(JSON.stringify(SAMPLE_FACTS, null, 2));
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
          <Cpu className="w-4 h-4" />
          <span>Rule Engine Simulator & Conflict Resolver</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Trình Giả Lập & Kiểm Tra Quy Tắc (Admin Simulator)</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Kiểm thử việc so khớp quy tắc (Rule Matching), tính điểm đặc thù (Specificity Scoring), và giải quyết xung đột (Conflict Resolution) trong môi trường an toàn trước khi kích hoạt trên hệ thống thực.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input Facts JSON */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Dữ Liệu Sự Kiện Đầu Vào (Facts JSON)</span>
            </label>
            <button
              onClick={handleLoadSample}
              className="text-xs text-accentGold hover:underline"
            >
              Tải Dữ Liệu Mẫu
            </button>
          </div>

          <textarea
            rows={18}
            value={factsInput}
            onChange={(e) => setFactsInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-background border border-borderDark text-green-400 font-mono text-xs focus:outline-none focus:border-purple-500 leading-relaxed"
          />

          <button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Đang chạy mô phỏng Rule Engine...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Khởi Chạy Giả Lập & Đánh Giá Quy Tắc
              </>
            )}
          </button>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Simulation Output */}
        <div className="space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-3">
              <Cpu className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-gray-400 font-medium">Chưa có kết quả giả lập</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Nhấn "Khởi Chạy Giả Lập" để kiểm tra xem tập facts hiện tại sẽ kích hoạt những quy tắc nào và lý do các quy tắc khác bị bỏ qua.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-surface border border-borderDark text-center">
                  <div className="text-xs text-gray-400">Tổng Đánh Giá</div>
                  <div className="text-2xl font-bold text-white font-mono">{result.totalRulesEvaluated}</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                  <div className="text-xs text-emerald-400 font-semibold">Khớp (Matched)</div>
                  <div className="text-2xl font-bold text-emerald-300 font-mono">{result.matchedCount}</div>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/50 border border-borderDark text-center">
                  <div className="text-xs text-gray-400">Bỏ Qua (Skipped)</div>
                  <div className="text-2xl font-bold text-gray-400 font-mono">{result.skippedCount}</div>
                </div>
              </div>

              {/* Matched Rules List */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Quy Tắc Đã Kích Hoạt ({result.matchedRules.length})</span>
                </h3>

                <div className="space-y-3">
                  {result.matchedRules.map((r: any) => (
                    <div key={r.ruleCode} className="p-3.5 rounded-xl bg-background/60 border border-emerald-500/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-400">{r.ruleCode}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-surface border border-borderDark text-gray-300 font-mono text-[11px]">
                            Priority: {r.priority}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300 font-mono text-[11px]">
                            Specificity: {r.specificity}
                          </span>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        Target Interpretation: <span className="text-accentGold font-mono">{r.targetInterpretationId}</span> ({r.domain})
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skipped Rules List */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-gray-500" />
                  <span>Quy Tắc Bị Bỏ Qua ({result.skippedRules.length})</span>
                </h3>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {result.skippedRules.map((s: any) => (
                    <div key={s.ruleCode} className="p-3 rounded-xl bg-background/40 border border-borderDark/60 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-gray-300">{s.ruleCode}</span>
                        <span className="text-[10px] text-gray-500 font-mono">P: {s.priority} | S: {s.specificity}</span>
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        Lý do: <span className="text-gray-400">{s.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
