import Image from 'next/image'
import React from 'react'
import type { book } from '~/types/BookType'

function Book({ BookProps }: { BookProps: book }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <Image src={BookProps.image} alt="book" width={200} height={200} />
      </div>
      <div className="text-base font-bold">{BookProps.name as string}</div>
      <div className="text-sm">{BookProps.author as string}</div>
    </div>
  );
}

export default Book