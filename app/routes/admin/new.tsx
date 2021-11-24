import { redirect, Form, useActionData } from "remix";
import type { ActionFunction } from "remix";
import { createPost } from "~/post";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  let title = formData.get("title");
  let slug = formData.get("slug");
  let markdown = formData.get("markdown");

  let errors: { title?: boolean; slug?: boolean; markdown?: boolean } = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  let errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title && <em className="error">Required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown</label>
        <br />
        <textarea name="markdown" id="markdown" rows={20} />
      </p>
      <p>
        <button type="submit">Create Post</button>
      </p>
    </Form>
  );
}
