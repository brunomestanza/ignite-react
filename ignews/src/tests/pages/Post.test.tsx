import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>Post excerpt</p>', updatedAt: 'March, 10' }

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post}/>);

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

   it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);
    const response = await getServerSideProps({ params: { slug: 'my-new-post'} } as any);
  
    expect(response).toEqual(expect.objectContaining({
      redirect: expect.objectContaining({
        destination: '/posts/preview/my-new-post',
      })
    }))
  });

  it('loads intial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);
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
    const response = await getServerSideProps({ params: { slug: 'my-new-post'} } as any);
  
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
