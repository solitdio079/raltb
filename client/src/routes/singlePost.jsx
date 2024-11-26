import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { useLoaderData } from 'react-router-dom'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import { FaClock, FaCode, FaShapes } from 'react-icons/fa6'
import Youtube from '@tiptap/extension-youtube'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

//import { FaCheck } from 'react-icons/fa6'
import { url } from '../utils/serverUrl'

//lowlight

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from 'lowlight'

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(common)

export async function loader({ params }) {
  const { id } = params

  try {
    const req = await fetch(url + `/posts/${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await req.json()
    if (response.error) throw new Error(response.error)
    return response
  } catch (error) {
    return { error: error.message }
  }
}

export default function SinglePost() {
  const loadedPost = useLoaderData()

  //const [editorContent, setEditorContent]= useState('')
  console.log(loadedPost)

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Image,
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]

  const content = JSON.parse(loadedPost.content)

  const editor = useEditor({
    extensions,
    content,
    editable: false,
  })

  // console.log('editor: ' + editor)
  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4 mx-auto mt-5">
        <h1 className="text-4xl font-bold  lg:text-5xl text-center">
          {' '}
          {loadedPost.title}{' '}
        </h1>
        <div className="flex justify-center ">
          <span className="flex items-center text-sm justify-between text-gray-400 m-2 lg:m-4">
            {' '}
            <FaShapes className="mr-2" /> {loadedPost.category.name}{' '}
          </span>
          <span className="flex text-sm items-center justify-between text-gray-400 m-2 lg:m-4">
            {' '}
            <FaClock className="mr-2" />{' '}
            {new Date(loadedPost.createdAt).toLocaleDateString()}{' '}
          </span>
        </div>
      </div>

      <EditorContent className="px-10" editor={editor} />
    </div>
  )
}
