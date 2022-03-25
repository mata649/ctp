import { NewsList } from "../../components/admin/news/NewsList";
import { NewsRow } from "../../components/admin/news/NewsRow";
import { useFetchNews } from "../../hooks/useFetchNews";
import Link from "next/link";
import { NewsService } from "../../client";
import Swal from "sweetalert2";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useContext, useRef } from "react";
import { AppContext } from "../../components/context/appContext";

const Noticias = () => {
  const titleForm = useRef(null);
  const { setLoading } = useContext(AppContext);
  const { setTitle, news, setNews } = useFetchNews();
  useIsAdmin();
  const handleDelete = (id, title) => {
    Swal.fire({
      title: "¿Deseas eliminar a " + title + "?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await NewsService.deleteNewsNewsNewsIdDelete(id);
          Swal.fire("Eliminado", title, "success");
          setNews(news.filter((news) => id != news.id));
        } catch (error) {
          Swal.fire("Error al eliminar", title, "error");
        }
        setLoading(false);
      }
    });
  };
  const handleFilterNews = (e) => {
    e.preventDefault();
    setTitle(titleForm.current["title"].value);
  };
  return (
    <div className="container">
      <h1 className="text-center mt-3">Administración de Noticias</h1>

      <div className="d-flex flex-column align-items-center justify-content-center">
        <form className="my-4 w-75" ref={titleForm} onSubmit={handleFilterNews}>
          <input
            className="form-control"
            type="text"
            placeholder="Titulo"
            name="title"
          />
        </form>
        {news.length > 0 ? (
          <NewsList>
            {news.map(({ id, title, text, published }) => (
              <NewsRow
                key={id}
                id={id}
                title={title}
                text={text}
                published={published}
                handleDelete={handleDelete}
              />
            ))}
          </NewsList>
        ) : (
          <h3>Noticias no encontradas</h3>
        )}
      </div>
      <div className="d-flex w-full gap-2 justify-content-center">
        <Link href="/admin/noticia_form">
          <a className="btn btn-primary">Crear Noticia</a>
        </Link>
        <Link href="/admin">
          <a className="btn btn-secondary">Volver</a>
        </Link>
      </div>
    </div>
  );
};

export default Noticias;
