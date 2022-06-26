import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

// O CSS dessa página faz com que a página tenha um flex direction column, do Header e do main, e que o main tenha 100% da VH

export function Event() {
  const { slug } = useParams<{ slug: string; }>();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {
          slug
          ? <Video lessonSlug={slug} />
          : <div className="flex-1" />
        }
        <Sidebar />
      </main>
    </div>
  );
};
