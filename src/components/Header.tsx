'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { ThemeDropDownMenu } from './ThemeDropdown';
import { Home } from 'lucide-react';
import ListItem from './ui/list-item';
import { buttonVariants } from './ui/button';

const hrefs = [
  ['/?h', 'All'],
  ['/?query=topic:feature-toggles', 'Feature Toggles'],
  ['/?query=topic:sample', 'Samples'],
  // {
  //   label: 'All',
  //   items: [
  //     ['/?', 'All Repositories'],
  //     ['/?query=lang:java lang:kotlin', 'Java & Kotlin'],
  //     ['/?query=lang:js lang:ts', 'JavaScript & TypeScript'],
  //     ['/?query=lang:csharp', 'C#'],
  //     ['/?query=lang:python', 'Python'],
  //     ['/?query=lang:terraform', 'Terraform'],
  //   ],
  // },
  {
    label: 'Applications',
    items: [
      ['/?query=topic:app lang:java lang:kotlin', 'Java & Kotlin'],
      ['/?query=topic:app lang:js lang:ts', 'JavaScript & TypeScript'],
      ['/?query=topic:app lang:csharp', 'C#'],
      ['/?query=topic:app lang:python', 'Python'],
      ['/?query=topic:app lang:terraform', 'Terraform'],
    ],
  },
  {
    label: 'Libraries',
    items: [
      ['/?query=topic:lib lang:java lang:kotlin', 'Java & Kotlin'],
      ['/?query=topic:lib lang:js lang:ts', 'JavaScript & TypeScript'],
      ['/?query=topic:lib lang:csharp', 'C#'],
      ['/?query=topic:lib lang:python', 'Python'],
      ['/?query=topic:lib lang:terraform', 'Terraform'],
    ],
  },
  {
    label: 'Tools',
    items: [
      ['/?query=topic:tool lang:java lang:kotlin', 'Java & Kotlin'],
      ['/?query=topic:tool lang:js lang:ts', 'JavaScript & TypeScript'],
      ['/?query=topic:tool lang:csharp', 'C#'],
      ['/?query=topic:tool lang:python', 'Python'],
      ['/?query=topic:tool lang:terraform', 'Terraform'],
    ],
  },
  // {
  //   label: 'Other',
  //   items: [
  //     ['/?query=topic:feature-toggles', 'Feature Toggles'],
  //     ['/?query=topic:samples', 'Samples']
  //   ],
  // },
];

export const Header = () => {
  return (
    <header>
      {/* Left side */}
      <div className='flex items-center justify-between p-6'>
        <div className='basis-1/6'>
          <Link href='/?h'>
            <Home />
          </Link>
        </div>

        {/* Center */}
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {hrefs.map((item) => {
                if (Array.isArray(item)) {
                  return (
                    <NavigationMenuItem
                      key={item[0]}
                      className={buttonVariants({ variant: 'link' })}
                    >
                      <Link href={item[0]}>
                        <NavigationMenuLink>{item[1]}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='grid w-[200px] gap-3 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px] '>
                          {item.items.map((subitem) => (
                            <ListItem key={subitem[0]} href={subitem[0]}>
                              {subitem[1]}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className='flex basis-1/6 items-center justify-end'>
          <ThemeDropDownMenu />
        </div>
      </div>
    </header>
  );
};
