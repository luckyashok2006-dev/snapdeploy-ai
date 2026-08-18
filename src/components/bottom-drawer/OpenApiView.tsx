'use client';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
export function OpenApiView(){const s=useWorkspaceStore(); return <pre className="h-full overflow-auto bg-slate-950 p-4 text-xs text-sky-200">{s.workspaces.find(w=>w.id===s.activeId)?.openApiSpec}</pre>}
