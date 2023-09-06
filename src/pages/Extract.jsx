import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick, submit } from "../assets";
import { useLazyExtractContentQuery } from "../services/article";
import parse from "html-react-parser";
const Extract = () => {
  const [article, setArticle] = useState({
    url: "",
    content: "",
    title: "",
    description: "",
    image: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState();

  const [getContent, { isFetching, error }] = useLazyExtractContentQuery();

  useEffect(() => {
    const articlesLocalStorage = JSON.parse(localStorage.getItem("articles"));

    if (articlesLocalStorage) {
      setAllArticles(articlesLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getContent({ articleUrl: article.url });

    if (data?.content) {
      const newArticle = {
        ...article,
        content: data.content,
        description: data.description,
        image: data.image,
        title: data.title,
      };

      const updatedArticles = [...allArticles, newArticle];

      setArticle(newArticle);
      setAllArticles(updatedArticles);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => setCopied(false), 3000);
  };

  const handleDelete = (urlToDelete) => {
    const updatedArticles = allArticles.filter(
      (article) => article.url !== urlToDelete
    );

    setAllArticles(updatedArticles);

    // Update local storage with the new list of articles
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  return (
    <section className="mt-10 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />

          <button type="submit" className="submit_btn">
            <img src={submit} alt="" />
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from triggering the parent link_card's click event
                  handleDelete(article.url);
                }}
                className="delete_btn"
              >
                Delete
              </button>
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 text-blue-500 truncate font-medium text-sm">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Error Happened <br />
            <span className="font-normal text-gray-700">
              {error?.data?.error || "Please try again later"}
            </span>
          </p>
        ) : (
          article.content && (
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-gray-600 text-2xl">
                {article.title}
              </h1>
              <p className="text-gray-500">{article.description}</p>
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-60 object-cover"
                />
              )}
              <h2 className="font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Extractor</span>
              </h2>

              <div className="summary_box">
                <p>{parse(article.content)}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Extract;
