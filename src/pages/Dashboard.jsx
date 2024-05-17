import React, { useEffect } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

const Dashboard = () => {
  const articleCollection = collection(db, "artikel");
  const [articles, setArticles] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const addArticle = async (e) => {
    e.preventDefault()
    try {
      const res = await addDoc(articleCollection, {
        title,
        description,
      });
      console.log(res);
      await getArticles();
      Swal.fire({
        icon: "success",
        title: "Add Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      const res = await deleteDoc(doc(articleCollection, id));
      await getArticles();
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Delete Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editArticle = async (id) => {
    try {
      const res = await updateDoc(doc(articleCollection, id), {
        title,
        description,
      });
      console.log(res);
      await getArticles();
      Swal.fire({
        icon: "success",
        title: "Edit Success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getArticles = async () => {
    try {
      const res = await getDocs(articleCollection);
      const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setArticles(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div>
      <p>dashboard</p>
      <form onSubmit={addArticle}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">desciption</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <div>
        {articles.map((article) => (
          <div key={article.id}>
            <p>{article.title}</p>
            <p>{article.description}</p>
            <button onClick={() => deleteArticle(article.id)}>delete</button>
            <button onClick={() => editArticle(article.id)}>edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
