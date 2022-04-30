import { XCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { Input, Label, Textarea } from '~/components/Form';
import { useCreatePost } from '~/utils/hooks/usePosts';
import { validateUserSession } from '~/utils/session';

const CreatePostPage = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    title: '',
    text: '',
  });
  const addPost = useCreatePost();

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const newPost = await addPost.mutateAsync(post);
      router.push(`/post/${newPost.id}`);
    } catch {}
  };

  return (
    <form onSubmit={createPost} className="max-w-md m-auto flex flex-col gap-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          disabled={addPost.isLoading}
          value={post.title}
          onChange={(e) =>
            setPost((post) => ({ ...post, title: e.target.value }))
          }
        />
      </div>
      <div>
        <Label htmlFor="text">Text</Label>
        <Textarea
          id="text"
          name="text"
          disabled={addPost.isLoading}
          value={post.text}
          onChange={(e) =>
            setPost((post) => ({ ...post, text: e.target.value }))
          }
        />
      </div>

      <Button type="submit" loading={addPost.isLoading}>
        Submit
      </Button>
      {addPost.error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {addPost.error.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
export const getServerSideProps = validateUserSession;

export default CreatePostPage;
