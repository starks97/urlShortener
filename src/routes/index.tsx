import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <header>
        <h1>Shortener URL</h1>
        <p>¡Acorta tus URLs de manera rápida y sencilla!</p>
      </header>

      <main>
        <section id="home">
          <h2 className="text-yellow-300">Bienvenido a Shortener URL</h2>
          <p>
            En Shortener URL, nuestro objetivo es facilitarte la vida al acortar
            URLs largas de manera rápida y sencilla. Con nuestra herramienta,
            puedes convertir enlaces largos en URLs cortas que son fáciles de
            compartir y recordar.
          </p>
          <img
            src="images/home-banner.jpg"
            alt="Banner de Shortener URL"
            className="banner-img"
          />
        </section>

        <section id="about">
          <h2 className="white">Sobre el Proyecto</h2>
          <p>
            Shortener URL es una solución moderna y eficiente para acortar
            enlaces. Ofrecemos una interfaz fácil de usar y características
            avanzadas como personalización de enlaces y estadísticas de clics.
          </p>
          <img
            src="images/project-overview.jpg"
            alt="Visión general del proyecto"
            className="project-img"
          />
          <p>
            Además de la funcionalidad básica, estamos trabajando en nuevas
            características emocionantes, incluyendo una extensión de Chrome que
            te permitirá acortar URLs directamente desde tu navegador.
          </p>
        </section>

        <section id="news">
          <h2>Noticias y Actualizaciones</h2>
          <article>
            <h3>¡Próximamente: Extensión de Chrome!</h3>
            <p>
              Estamos emocionados de anunciar que estamos desarrollando una
              extensión de Chrome para Shortener URL. Esta extensión te
              permitirá acortar enlaces sin salir de tu navegador, lo que hará
              que el proceso sea aún más rápido y conveniente.
            </p>
            <img
              src="images/chrome-extension.jpg"
              alt="Extensión de Chrome en desarrollo"
              className="news-img"
            />
            <p>
              La extensión estará disponible pronto, ¡así que estate atento a
              las actualizaciones!
            </p>
          </article>
        </section>

        <section id="contact">
          <h2>Contacto</h2>
          <p>
            Si tienes preguntas o sugerencias, no dudes en ponerte en contacto
            con nosotros. Puedes enviarnos un correo electrónico a{" "}
            <a href="mailto:contacto@shortenerurl.com">
              contacto@shortenerurl.com
            </a>
            .
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Shortener URL. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
