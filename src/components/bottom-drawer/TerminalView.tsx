'use client';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
export function TerminalView(){const lines=useWorkspaceStore(s=>s.terminal); return <pre className="h-full overflow-auto bg-black p-4 text-xs text-emerald-200">{lines.map(l=>`[${l.stream}] ${l.text}`).join('\n')}</pre>}
