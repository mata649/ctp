import { NewsList } from "../../components/admin/news/NewsList";
import { NewsRow } from "../../components/admin/news/NewsRow";
import { useFetchNews } from "../../hooks/useFetchNews";
import Link from "next/link";
const Noticias = () => {
  const { setTitle, news } = useFetchNews();
  
  const handleDelete = () => {
    try {
    } catch (error) {}
  };
  return (
    <div className="container">
      <h1 className="text-center mt-3">Administración de Noticias</h1>
      <div className="d-flex justify-content-center">
        {news.length > 0 ? (
          <NewsList>
            {news.map(({ id, title, text, published }) => (
              <NewsRow
                key={id}
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
        <Link href="/admin/nueva_noticia">
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
