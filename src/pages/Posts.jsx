import React, { useState, useMemo, useEffect } from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostServise from "../API/PostServise";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../components/utils/page";
import Pagination from "../components/UI/pagination/pagination";

function Posts() {
  // const [value, setValue] = useState('Текст')
  const [posts, setPosts] = useState([
    // {id: 1, title: 'Javascript', body: 'Текст про JS'},
    // {id: 2, title: 'HTML', body: 'Текст про HTML'},
    // {id: 3, title: 'CSS', body: 'Текст про CSS'},
  ])

  // const [posts2, setPosts2] = useState([
  //   {id: 1, title: 'Python 1', body: 'Текст про Python'},
  //   {id: 2, title: 'Python 2', body: 'Текст про Python'},
  //   {id: 3, title: 'Python 3', body: 'Текст про Python'},
  // ])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  let pagesArray = getPagesArray(totalPages)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const responce = await PostServise.getAll(limit, page);
    setPosts(responce.data)
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Top anime'} />
      {/* <MyButton onClick={() => setModal(true)} >Новый пост</MyButton> */}
      {/* <Pagination totalPages={totalPages} page={page} changePage={changePage}/> */}
    </div >
  );
}

export default Posts;
