'use client';
import { motion } from 'framer-motion';
export function EditorCommandStrip(){return <div className="flex h-11 items-center gap-2 border-t border-white/10 bg-slate-900 px-3"><div className="flex h-6 items-end gap-1">{[8,16,11,22,14].map((h,i)=><motion.span key={i} animate={{height:[h,24-h,h]}} transition={{repeat:Infinity,duration:1+i*.1}} className="w-1 rounded bg-emerald-400" />)}</div>{['+ tRPC/Zod','+ JWT Auth','+ Dark Theme'].map(x=><button key={x} className="rounded-full bg-slate-800 px-3 py-1 text-xs">{x}</button>)}</div>}
