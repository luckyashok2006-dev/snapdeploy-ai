import JSZip from 'jszip';
import { saveAs } from 'file-saver';
export async function packageProject(name: string, files: Record<string,string>): Promise<Blob> { const zip=new JSZip(); Object.entries(files).forEach(([path,content])=>zip.file(path,content)); zip.file('SNAPDEPLOY_EXPORT.json', JSON.stringify({name,exportedAt:new Date().toISOString(),fileCount:Object.keys(files).length},null,2)); return zip.generateAsync({type:'blob'}); }
export async function downloadProjectZip(name: string, files: Record<string,string>): Promise<void> { const blob=await packageProject(name,files); saveAs(blob,`${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.zip`); }
