export type FileKind = 'file' | 'directory';
export type DrawerTab = 'terminal' | 'healing' | 'flamegraph' | 'openapi';
export type DrawerHeight = 'collapsed' | 'default' | 'expanded' | 'fullscreen';
export type DeviceMode = 'desktop' | 'tablet' | 'mobile';
export interface VfsNode { path: string; kind: FileKind; content?: string; updatedAt: number }
export interface DemoWorkspace { id: string; name: string; description: string; accent: string; files: Record<string,string>; openApiSpec: string; diagnostics: string[]; templateTags: string[] }
export interface HealingStep { id: string; label: string; status: 'pending'|'running'|'passed'|'failed'; detail: string }
export interface FlamegraphFrame { name: string; value: number; color: string; children?: FlamegraphFrame[] }
export interface VisionTelemetry { label: string; confidence: number; detail: string }
export interface TerminalLine { id: string; stream: 'stdout'|'stderr'|'system'; text: string; timestamp: number }
