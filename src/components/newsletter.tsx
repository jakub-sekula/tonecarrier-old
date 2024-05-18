export default function Newsletter() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* CTA box */}
          <div
            className="relative bg-gray-900 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden"
            data-aos="zoom-y-out"
          >
            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="h3 text-white mb-2">
                  Be the first to know of new products
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  We are developing more scanning tools for 110 and 127 formats.
                  <br />
                  Sign up to the newsletter and be notified of new releases.
                </p>

                {/* CTA form */}
                <form className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:mx-0">
                    <input
                      type="email"
                      className="form-input w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500"
                      placeholder="Your email…"
                      aria-label="Your email…"
                    />
                    <a
                      className="btn text-white bg-amber-600 hover:bg-amber-700 shadow"
                      href="#0"
                    >
                      Subscribe
                    </a>
                  </div>
                  {/* Success message */}
                  {/* <p className="text-sm text-gray-400 mt-3">Thanks for subscribing!</p> */}
                  <p className="text-sm text-gray-400 mt-3">
                    No spam. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
