'use client';

import { useDebouncedCallback } from 'use-debounce';
import { Input } from './ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Flex } from '@radix-ui/themes';

export const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Flex>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        className='max-w-sm'
      />
    </Flex>
  );
};
