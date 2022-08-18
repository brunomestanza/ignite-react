import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../services/prismic');

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>Post excerpt</p>', updatedAt: 'March, 10' }

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false] as any);
    render(<Post post={post}/>);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

   it('redirects user to full post when user in subscribed', async () => {
    const pushMock = jest.fn();
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: { 
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      },
    } as any)
    const useRouterMocked = jest.mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);
    render(<Post post={post}/>);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('loads intial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post'}],
          content: [{ type: 'paragraph', text: 'Post content'}],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any);
    const response = await getStaticProps({ params: { slug: 'my-new-post'} } as any);
  
    expect(response).toEqual(expect.objectContaining({
      props: {
        post: {
          slug: 'my-new-post',
          title: 'My new post',
          content: '<p>Post content</p>',
          updatedAt: '01 de abril de 2021'
        }
      }
    }))
  });
});
