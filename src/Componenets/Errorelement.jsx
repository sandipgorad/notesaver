import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="max-w-xl text-center">

        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none 
                       text-slate-800 select-none">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            This page got lost.
          </h2>

          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Don't worry, your saved notes are still safe.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-white text-slate-950 
                         font-semibold hover:bg-slate-200 transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-xl border border-slate-700 
                         text-white font-semibold hover:bg-slate-900 transition"
            >
              Go Back
            </button>
          </div>

          {/* Branding */}
          <p className="mt-12 text-sm text-slate-500">
            Instanta • Save it. Find it. Anytime.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
