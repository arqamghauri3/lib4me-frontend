import Image from 'next/image'
import React from 'react'
import type { book } from '~/types/BookType'

function Book({ BookProps }: { BookProps: book }) {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div>
            <Image src={BookProps.image} alt='book' width={150} height={200} />
        </div>
        <div className='font-bold text-base'>
            {BookProps.name as string}
        </div>
        <div className='text-sm'>
            {BookProps.author as string}
        </div>
    </div>
  )
}

export default Book