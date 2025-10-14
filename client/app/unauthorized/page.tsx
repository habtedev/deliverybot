export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-200">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-xs text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Token Required</h2>
        <p className="text-gray-700">
          A valid token from the Telegram bot is required to access this page.<br/>
          Please open this link directly from your Telegram app using the official bot.
        </p>
      </div>
    </div>
  );
}
