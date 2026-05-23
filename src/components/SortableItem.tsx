import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon } from 'lucide-react';

export function SortableItem({ id, children }: { id: string | number, children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as const,
  };

  return (
    <li ref={setNodeRef} style={style} className={`flex items-stretch group relative rounded-xl border border-transparent transition-colors ${isDragging ? 'shadow-2xl opacity-95 bg-white border-blue-200 scale-[1.02]' : 'hover:bg-slate-50'}`}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing hover:bg-slate-200 flex items-center justify-center px-3 rounded-l-xl text-slate-400 hover:text-slate-700 transition-colors touch-none">
        <GripVerticalIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 p-6 pl-2">
        {children}
      </div>
    </li>
  );
}
