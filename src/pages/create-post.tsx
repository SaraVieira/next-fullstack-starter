import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '~/components/Button';
import { Feedback } from '~/components/Feedback';
import { Input, Textarea } from '~/components/Form';
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
        <Input
          label="Title"
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
        <Textarea
          label="Content"
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
        <Feedback variant="error" message={addPost.error.message} />
      )}
    </form>
  );
};
export const getServerSideProps = validateUserSession;

export default CreatePostPage;
