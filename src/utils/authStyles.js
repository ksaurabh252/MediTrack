export const getAuthStyles = (darkMode) => ({
  container: `min-h-screen flex flex-col ${
    darkMode
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
  }`,

  card: `w-full max-w-md ${
    darkMode
      ? "bg-gray-800/50 border-gray-700/50"
      : "bg-white/80 border-gray-200/50"
  } backdrop-blur-xl border rounded-2xl shadow-2xl p-8 space-y-6`,

  input: `block w-full pl-10 pr-10 py-3 border rounded-xl transition-all ${
    darkMode
      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
  } focus:outline-none focus:ring-2 focus:ring-indigo-500/50`,

  label: `block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`,

  button:
    "w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",

  secondaryButton: `w-full py-3 px-4 rounded-xl font-semibold text-center border-2 transition-all ${
    darkMode
      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
      : "border-gray-300 text-gray-700 hover:bg-gray-50"
  }`,

  icon: `h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`,
});
