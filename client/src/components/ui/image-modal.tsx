import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  children: React.ReactNode;
}

export function ImageModal({ src, alt, className, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`relative cursor-pointer group ${className}`}>
          {children}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[98vw] max-h-[98vh] w-[98vw] h-[98vh] p-0 bg-transparent border-none flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black text-white rounded-full p-3 transition-colors shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain rounded-lg shadow-2xl"
            style={{ maxWidth: '95vw', maxHeight: '90vh' }}
          />
          <div className="absolute bottom-4 left-4 right-16 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 rounded-lg">
            <p className="text-white text-base font-medium">{alt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}