// deliverybot/client/app/unauthorized/page.tsx
"use client";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-200 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-red-700">ለድር ገፅ ፈቃድ የሚያስፈልገው ቶክን የለም / Token Missing</h2>

        <p className="text-gray-700">
          ይህንን ገፅ ለመገኘት ከTelegram ቦቱ የተላከ ትክክለኛ ቶክን ያስፈልጋል።<br/>
          A valid token from the official Telegram bot is required to access this page.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
            onClick={() => { window.location.reload(); }}
          >
            እንደገና ይጫኑ / Reload
          </button>

          <button
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50"
            onClick={() => {
              // try to open the official bot in a new tab (user may need to open in Telegram)
              try { window.open('https://t.me/UoGDelivery_bot', '_blank'); } catch {}
            }}
          >
            Open Bot (Telegram)
          </button>

          <button
            className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg shadow hover:bg-rose-100"
            onClick={() => {
              try {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied — open it in an external browser and try again.");
              } catch {
                alert('Could not copy. Please manually copy the URL.');
              }
            }}
          >
            Copy Link
          </button>
        </div>

  <p className="text-sm text-gray-500 mt-2">If you believe this is an error, contact support or try opening the link in your phone&apos;s browser.</p>
      </div>
    </div>
  );
}
