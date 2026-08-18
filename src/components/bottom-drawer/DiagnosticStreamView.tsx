'use client';
import { healReactError } from '@/lib/agent/react-healer'; import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
export function DiagnosticStreamView(){const s=useWorkspaceStore(); const r=healReactError('src/app/page.tsx:1 JSX diagnostic stream clean',s.files); return <div className="grid h-full gap-3 overflow-auto p-4 md:grid-cols-5">{r.steps.map(step=><div key={step.id} className="rounded-2xl bg-slate-950 p-4"><b className="text-emerald-300">{step.label}</b><p className="mt-2 text-xs text-slate-400">{step.detail}</p></div>)}</div>}
