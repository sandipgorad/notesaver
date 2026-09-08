import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Copy, Check, FileText } from "lucide-react";
import { useState } from "react";

const Viewpaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p._id === id);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!paste?.content) return;

    await navigator.clipboard.writeText(paste.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!paste) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Paste not found
          </h2>

          <p className="mt-2 text-gray-500">
            This paste may have been deleted or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>Paste</span>
              </div>

              <h1 className="break-words text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {paste.title}
              </h1>
            </div>

           
            <button
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Metadata */}
          <div className="mt-3 text-sm text-gray-500">
            Shared paste
          </div>
        </div>

        {/* Content */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          
          {/* Code header */}
          <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-400"></span>
            </div>

            <span className="text-xs font-medium text-gray-400">
              PASTE CONTENT
            </span>
          </div>

          {/* Paste content */}
          <pre className="overflow-x-auto bg-gray-950 p-5 text-sm leading-7 text-gray-200 sm:p-6 sm:text-base">
            <code>{paste.content}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>Paste ID: {paste._id}</span>

          <button
            onClick={handleCopy}
            className="font-medium text-gray-500 hover:text-gray-900"
          >
            Copy content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewpaste;