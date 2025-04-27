import styles from "../homePage/HomePage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
    >
      {/* Navigation */}

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Take Control of Your{" "}
            <span className="text-indigo-600">Medication</span> Routine
          </h1>
          <p className="text-lg md:text-xl mb-8 dark:text-gray-300">
            Never miss a dose again with our intelligent medication management
            system. Get reminders, track adherence, and simplify prescription
            renewals - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
            >
              Get Started for Free
            </button>
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors font-medium hover:cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div
              className={`absolute -top-6 -left-6 w-64 h-64 bg-indigo-100 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles["animate-blob"]}`}
            ></div>
            <div
              className={`absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles["animate-blob"]} ${styles["animation-delay-2000"]}`}
            ></div>
            <div
              className={`absolute top-20 left-20 w-64 h-64 bg-pink-100 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${styles["animate-blob"]} ${styles["animation-delay-4000"]}`}
            ></div>
            <div className="relative z-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Morning Medication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      8:00 AM - Ibuprofen (200mg)
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Afternoon Medication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      2:00 PM - Vitamin D (1000IU)
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Evening Medication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      8:00 PM - Lisinopril (10mg)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Smart Reminders",
                description:
                  "Customizable alerts that ensure you never miss a dose, with snooze and reschedule options.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
                title: "Prescription Management",
                description:
                  "Easy renewal requests and automatic refill reminders when your medication is running low.",
              },
              {
                icon: (
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: "Adherence Tracking",
                description:
                  "Visual reports showing your medication history and adherence patterns over time.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-white"
                  } shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "MediTrack has completely transformed how I manage my medications. I used to forget doses all the time, but now I'm at 98% adherence!",
              name: "Sarah J.",
              role: "Type 2 Diabetes Patient",
            },
            {
              quote:
                "As a caregiver for my elderly mother, this app has been a lifesaver. The reminders and easy renewal process save us so much time and stress.",
              name: "Michael T.",
              role: "Family Caregiver",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
                } border`}
            >
              <svg
                className="w-8 h-8 text-indigo-600 mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                className={`text-lg italic mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-indigo-50"}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            Join thousands of users who are managing their medications
            effortlessly with MediTrack.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg hover:cursor-pointer"
          >
            Get Started - Its Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default HomePage;
