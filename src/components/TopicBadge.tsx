/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@radix-ui/themes';
import { Badge } from '@radix-ui/themes';

export const TopicBadge = ({ name }: { name: string }) => {
  let color = 'indigo';

  if (name === 'lib' || name === 'tool' || name === 'app') {
    color = 'ruby';
  } else if (name === 'commons' || name === 'common') {
    color = 'green';
  } else if (name === 'sample' || name === 'samples') {
    color = 'lime';
  }

  return (
    <div>
      <Link href={`/?query=topic:${name}`} key={name}>
        <Badge color={color as any} key={name}>
          {name}
        </Badge>
      </Link>
    </div>
  );
};

export default TopicBadge;
