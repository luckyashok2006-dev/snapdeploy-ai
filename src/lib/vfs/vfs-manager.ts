import type { VfsNode } from '@/types/workspace';
export class VfsManager {
  private files = new Map<string,VfsNode>(); private snapshots = new Map<string,Map<string,VfsNode>>();
  constructor(seed: Record<string,string> = {}) { Object.entries(seed).forEach(([p,c])=>this.createFile(p,c)); }
  list(): VfsNode[] { return [...this.files.values()].sort((a,b)=>a.path.localeCompare(b.path)); }
  toRecord(): Record<string,string> { return Object.fromEntries(this.list().filter(f=>f.kind==='file').map(f=>[f.path,f.content ?? ''])); }
  createFile(path: string, content: string): VfsNode { const node={path:this.clean(path),kind:'file' as const,content,updatedAt:Date.now()}; this.files.set(node.path,node); return node; }
  updateFile(path: string, content: string): VfsNode { const key=this.clean(path); if(!this.files.has(key)) return this.createFile(key,content); const node={...this.files.get(key)!,content,updatedAt:Date.now()}; this.files.set(key,node); return node; }
  deleteFile(path: string): void { this.files.delete(this.clean(path)); }
  renameFile(from: string, to: string): void { const node=this.files.get(this.clean(from)); if(!node) throw new Error(`Missing file ${from}`); this.files.delete(node.path); this.files.set(this.clean(to), {...node,path:this.clean(to),updatedAt:Date.now()}); }
  readFile(path: string): string { const node=this.files.get(this.clean(path)); if(!node || node.kind !== 'file') throw new Error(`Missing file ${path}`); return node.content ?? ''; }
  readDir(prefix = ''): VfsNode[] { const p=this.clean(prefix); return this.list().filter(f=>!p || f.path.startsWith(p)); }
  snapshot(label = crypto.randomUUID()): string { this.snapshots.set(label,new Map([...this.files].map(([k,v])=>[k,{...v}]))); return label; }
  commit(label: string): void { this.snapshots.delete(label); }
  rollback(label: string): void { const snap=this.snapshots.get(label); if(!snap) throw new Error(`Unknown snapshot ${label}`); this.files = new Map([...snap].map(([k,v])=>[k,{...v}])); this.snapshots.delete(label); }
  private clean(path: string): string { return path.replace(/^\/+/, '').replace(/\/+/g, '/'); }
}
