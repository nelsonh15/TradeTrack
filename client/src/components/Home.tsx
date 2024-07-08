/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom"

function Home() {
  return (
    <div>
      <body className="d-flex flex-column h-100">
        <main className="flex-shrink-0">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
              <a className="navbar-brand" href="index.html">TradeTrack</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
                  className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/loggedin">Home</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <header className="bg-dark py-5">
            <div className="container px-5">
              <div className="row gx-5 align-items-center justify-content-center">
                <div className="col-lg-8 col-xl-7 col-xxl-6">
                  <div className="my-5 text-center text-xl-start">
                    <h1 className="display-5 fw-bolder text-white mb-2">Welcome to TradeTrack</h1>
                    <p className="lead fw-normal text-white-50 mb-4">TradeTrack is a cutting-edge tool designed for traders looking to enhance their trading strategy through meticulous record-keeping and analytics.</p>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                      <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                      <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5"
                  src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /></div>
              </div>
            </div>
          </header>
          <section className="py-5" id="features">
            <div className="container px-5 my-5">
              <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <h2 className="fw-bolder mb-0">A better way to start building.</h2>
                </div>
                <div className="col-lg-8">
                  <div className="row gx-5 row-cols-1 row-cols-md-2">
                    <div className="col mb-5 h-100">
                      <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i>
                      </div>
                      <h2 className="h5">Featured title</h2>
                      <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more
                        text.</p>
                    </div>
                    <div className="col mb-5 h-100">
                      <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i>
                      </div>
                      <h2 className="h5">Featured title</h2>
                      <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more
                        text.</p>
                    </div>
                    <div className="col mb-5 mb-md-0 h-100">
                      <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i>
                      </div>
                      <h2 className="h5">Featured title</h2>
                      <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more
                        text.</p>
                    </div>
                    <div className="col h-100">
                      <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i>
                      </div>
                      <h2 className="h5">Featured title</h2>
                      <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more
                        text.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5 bg-light" id="scroll-target">
            <div className="container px-5 my-5">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /></div>
                <div className="col-lg-6">
                  <h2 className="fw-bolder">Our founding</h2>
                  <p className="lead fw-normal text-muted mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est, ut esse a labore aliquam beatae expedita. Blanditiis impedit numquam libero molestiae et fugit cupiditate, quibusdam expedita, maiores eaque quisquam.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container px-5 my-5">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src="https://dummyimage.com/600x400/343a40/6c757d" alt="..." /></div>
                <div className="col-lg-6">
                  <h2 className="fw-bolder">Growth &amp; beyond</h2>
                  <p className="lead fw-normal text-muted mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto est, ut esse a labore aliquam beatae expedita. Blanditiis impedit numquam libero molestiae et fugit cupiditate, quibusdam expedita, maiores eaque quisquam.</p>
                </div>
              </div>
            </div>
          </section>


        </main>
        <footer className="bg-dark py-4 mt-auto">
          <div className="container px-5">
            <div className="row align-items-center justify-content-between flex-column flex-sm-row">
              <div className="col-auto">
                <div className="small m-0 text-white">Copyright &copy; Your Website 2023</div>
              </div>
              <div className="col-auto">
                <a className="link-light small" href="#!">Privacy</a>
                <span className="text-white mx-1">&middot;</span>
                <a className="link-light small" href="#!">Terms</a>
                <span className="text-white mx-1">&middot;</span>
                <a className="link-light small" href="#!">Contact</a>
              </div>
            </div>
          </div>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

      </body>

    </div>
  )
}

export default Home