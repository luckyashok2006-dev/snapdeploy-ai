'use client';
export function UnifiedDiffViewer({diff}:{diff:string}){return <pre className="h-full overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-5 text-slate-200">{diff || 'No pending diff. Auto-healer patches will appear here.'}</pre>}
