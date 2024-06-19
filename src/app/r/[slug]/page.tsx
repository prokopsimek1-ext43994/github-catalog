/* eslint-disable tailwindcss/no-custom-classname */
import { github } from '@/lib/github';
import { Badge, Container, Flex, Heading, Link, Section } from '@radix-ui/themes';
import qry from '@/queries/getRepoQuery';
import { Commit, Repository } from '@octokit/graphql-schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  BookCopy,
  Braces,
  Cpu,
  Github,
  MessageSquare,
  Navigation,
  Users,
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const getData = async (slug: string) => {
  const org = process.env.GITHUB_ORG || 'DXHeroes';
  const data: { repository: Repository } = await github.graphql(qry(org, slug));
  return data.repository;
};

export default async function RepositoryDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getData(slug);
  console.log(data);

  const topics = data.repositoryTopics?.nodes?.map((topic) => {
    return (
      <Link href={`/?query=topic:${topic!.topic.name}`} key={topic!.topic.name}>
        <Badge color='indigo' key={topic!.topic.name}>
          {topic!.topic.name}
        </Badge>
      </Link>
    );
  });

  return (
    <Section>
      <Container>
        <Flex>
          <Heading size='7'>{data.name}</Heading>
        </Flex>
        <Flex>
          <p className='mt-1 text-muted-foreground'>{data.description}</p>
        </Flex>
        <Flex className='mt-4' gap='2' wrap='wrap'>
          {topics}
        </Flex>
      </Container>

      <Container className='mt-12'>
        <Tabs defaultValue='overview'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='readme'>Getting Started</TabsTrigger>
            <TabsTrigger value='apiref'>API Reference</TabsTrigger>
            <TabsTrigger value='sonar'>SonarQube</TabsTrigger>
          </TabsList>

          {/* Tab: Overview */}
          <TabsContent value='overview' className='mt-4'>
            <Flex className='gap-4'>
              {/* Important links */}
              <Card x-chunk='dashboard-01-chunk-0' className='w-1/2 space-y-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className={`text-sm font-medium`}>Important Links</CardTitle>
                  <Navigation className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <ul className='grid grid-cols-2 gap-2'>
                    <li className='flex items-center space-x-2'>
                      <Github className='h-4 w-4 text-muted-foreground' />
                      <Link href={data.url} target='_blank'>
                        Repository
                      </Link>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <BookCopy className='h-4 w-4 text-muted-foreground' />
                      <Link href='#' target='_blank'>
                        Wiki
                      </Link>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <Braces className='h-4 w-4 text-muted-foreground' />
                      <Link href='#' target='_blank'>
                        Dev Doc
                      </Link>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <MessageSquare className='h-4 w-4 text-muted-foreground' />
                      <Link href='#' target='_blank'>
                        MS Team
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Primary language */}
              <Card x-chunk='dashboard-01-chunk-0' className='w-1/4 space-y-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className={`text-sm font-medium`}>Technology</CardTitle>
                  <Cpu className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div
                    className='text-2xl font-bold'
                    style={{ color: data.primaryLanguage?.color?.toString() }}
                  >
                    {data.primaryLanguage?.name || 'No primary language'}
                  </div>
                </CardContent>
              </Card>

              {/* Last updated at */}
              <Card x-chunk='dashboard-01-chunk-0' className='w-1/4 space-y-2'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Last updated at</CardTitle>
                  <Activity className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {formatDistance(new Date(), data.updatedAt, { addSuffix: true })}
                  </div>
                </CardContent>
              </Card>
            </Flex>

            <Flex className='mt-2 gap-4'>
              {/* Last 10 commits */}
              <Card x-chunk='dashboard-01-chunk-0' className='mt-4 w-2/3'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Last 10 commits</CardTitle>
                  <Activity className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent className='mt-4'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Message</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data.defaultBranchRef?.target as Commit)?.history?.edges?.map((cmt) => {
                        const commit = cmt?.node;
                        return (
                          <TableRow key={commit?.id}>
                            <TableCell className='w-3/5 max-w-full text-ellipsis'>
                              {commit?.message}
                            </TableCell>
                            <TableCell>
                              <Flex className='items-center gap-4'>
                                <Avatar className='h-4 w-4'>
                                  <AvatarImage src={commit?.author?.avatarUrl} alt='Avatar' />
                                  <AvatarFallback>{commit?.author?.name}</AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                  <p className='text-sm font-medium leading-none'>
                                    {commit?.author?.name}
                                  </p>
                                </div>
                              </Flex>
                            </TableCell>
                            <TableCell>
                              {formatDistance(new Date(), commit?.committedDate, {
                                addSuffix: true,
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Contributors */}
              <Card x-chunk='dashboard-01-chunk-0' className='mt-4 w-1/3'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Contributors</CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent className='mt-4 grid gap-8'>
                  {data.collaborators?.nodes?.map((collaborator) => {
                    return (
                      <div className='flex items-center gap-4'>
                        <Avatar className='hidden h-9 w-9 sm:flex'>
                          <AvatarImage src={collaborator?.avatarUrl} alt='Avatar' />
                          <AvatarFallback>{collaborator?.login}</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-1'>
                          <p className='text-sm font-medium leading-none'>{collaborator?.name}</p>
                          <p className='text-xs text-muted-foreground'>@{collaborator?.login}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </Flex>
          </TabsContent>

          {/* Tab: Api Reference */}
          <TabsContent value='apiref'>
            <SwaggerUI url='https://petstore.swagger.io/v2/swagger.json' />
          </TabsContent>
        </Tabs>
      </Container>
    </Section>
  );
}
