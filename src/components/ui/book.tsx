import Image from 'next/image'
import React from 'react'
import type { book } from '~/types/BookType'

function Book({ BookProps }: { BookProps: book }) {
  return (
    <div className="flex flex-col items-start justify-start group cursor-pointer w-full">
      <div className="relative w-full aspect-2/3 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] mb-4">
        <Image src={BookProps.image} alt="book" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="text-base font-bold text-foreground w-full truncate mb-1">{BookProps.name as string}</div>
      <div className="text-sm text-muted-foreground italic w-full truncate">{BookProps.author as string}</div>
    </div>
  );
}

export default Book