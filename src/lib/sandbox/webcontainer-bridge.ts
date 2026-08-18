import type { TerminalLine } from '@/types/workspace';
type WebContainerApi = typeof import('@webcontainer/api').WebContainer;
type WebContainerInstance = Awaited<ReturnType<WebContainerApi['boot']>>;
export interface SandboxStatus { ready: boolean; url: string; port: number; message: string }
export class WebContainerBridge {
  private container: WebContainerInstance | null = null;
  async boot(): Promise<SandboxStatus> { const mod = await import('@webcontainer/api'); this.container = await mod.WebContainer.boot(); this.container.on('server-ready',(port,url)=>{ this.status={ready:true,url,port,message:`Port ${port} Ready`}; }); return this.status; }
  status: SandboxStatus = { ready:false, url:'about:blank', port:3000, message:'Sandbox idle' };
  async mount(files: Record<string,string>): Promise<void> { if(!this.container) await this.boot(); const tree = Object.fromEntries(Object.entries(files).map(([name,contents])=>[name,{file:{contents}}])); await this.container?.mount(tree); }
  async spawn(command: string, args: string[], onLine: (line: TerminalLine)=>void): Promise<number> { if(!this.container) await this.boot(); const proc = await this.container!.spawn(command,args); const pipe = async (stream: ReadableStream<string>, kind: 'stdout'|'stderr') => { const reader=stream.getReader(); for(;;){ const {done,value}=await reader.read(); if(done) break; onLine({id:crypto.randomUUID(),stream:kind,text:value,timestamp:Date.now()}); } }; void pipe(proc.output,'stdout'); return proc.exit; }
}
export const sandboxBridge = new WebContainerBridge();
