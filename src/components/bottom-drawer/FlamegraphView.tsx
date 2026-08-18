'use client';
import { flamegraphData } from '@/lib/telemetry/flamegraph-data'; import type { FlamegraphFrame } from '@/types/workspace';
function Frame({f,depth=0}:{f:FlamegraphFrame;depth?:number}){return <div className="my-1 rounded-lg px-3 py-2 text-xs" style={{marginLeft:depth*18, width:`${Math.max(18,f.value)}%`, background:f.color}}><b>{f.name}</b> {f.value}ms{f.children?.map(c=><Frame key={c.name} f={c} depth={depth+1}/>)}</div>}
export function FlamegraphView(){return <div className="h-full overflow-auto p-4"><Frame f={flamegraphData}/></div>}
